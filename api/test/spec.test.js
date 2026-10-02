/**
 * Tests that validate the OpenAPI spec (grist.yml) itself for correctness.
 *
 * Uses @apidevtools/swagger-parser for standard OpenAPI 3.0 validation
 * ($ref resolution, structural rules, etc.), plus custom checks for
 * issues it doesn't cover.
 */

const { assert } = require('chai');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const SwaggerParser = require('@apidevtools/swagger-parser');

const specPath = path.join(__dirname, '..', 'grist.yml');

describe('OpenAPI Spec Validation', function() {
  // The spec embeds external $refs to frictionlessdata.io JSON schemas
  // (in TableSchemaResult) which use non-OpenAPI types. Skip external
  // ref resolution and strict schema validation; still validates
  // internal structure, refs, and spec-level semantics.
  it('should be a valid OpenAPI 3.0 spec', async function() {
    await SwaggerParser.validate(specPath, {
      resolve: { external: false },
      validate: { schema: false }
    });
  });

  describe('Custom checks', function() {
    let spec;

    before(function() {
      spec = yaml.load(fs.readFileSync(specPath, 'utf8'));
    });

    it('should not have orphaned schemas (unused by any endpoint or other schema)', function() {
      const specStr = JSON.stringify(spec);
      const schemas = spec.components?.schemas || {};

      const orphaned = [];
      for (const name of Object.keys(schemas)) {
        const refPattern = `"#/components/schemas/${name}"`;
        const occurrences = specStr.split(refPattern).length - 1;
        if (occurrences === 0) {
          orphaned.push(name);
        }
      }

      assert.deepEqual(orphaned, [],
        `Found orphaned schemas that are never referenced: ${orphaned.join(', ')}`);
    });

    it('should declare all tags that are used by endpoints', function() {
      const declaredTags = new Set((spec.tags || []).map(t => t.name));
      const usedTags = new Set();

      for (const [, methods] of Object.entries(spec.paths || {})) {
        for (const [method, operation] of Object.entries(methods)) {
          if (['get', 'post', 'put', 'patch', 'delete'].includes(method)) {
            for (const tag of (operation.tags || [])) {
              usedTags.add(tag);
            }
          }
        }
      }

      const undeclared = [...usedTags].filter(t => !declaredTags.has(t));
      assert.deepEqual(undeclared, [],
        `Tags used in endpoints but not declared: ${undeclared.join(', ')}`);
    });
  });
});
