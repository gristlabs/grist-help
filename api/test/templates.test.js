/**
 * Tests for /api/templates endpoints
 *
 * Templates are configured via GRIST_SINGLE_ORG=templates and GRIST_TEMPLATE_ORG=templates.
 * A sample template is created in hooks.js during test setup.
 */

const { assert } = require('chai');
const { getClient } = require('./helpers');

describe('Templates API', function() {
  let client;

  before(function() {
    client = getClient();
  });

  describe('GET /api/templates (listTemplates)', function() {
    it('should return workspaces containing templates', async function() {
      const result = await client.apis.templates.listTemplates();

      assert.equal(result.status, 200);
      assert.isArray(result.body);
      assert.isAbove(result.body.length, 0);

      // Check workspace structure
      const workspace = result.body[0];
      assert.property(workspace, 'id');
      assert.property(workspace, 'name');
      assert.property(workspace, 'docs');
      assert.isArray(workspace.docs);
    });

    it('should include template documents in workspaces', async function() {
      const result = await client.apis.templates.listTemplates();

      // Find the Templates workspace we created in setup
      const templatesWs = result.body.find(ws => ws.name === 'Templates');
      assert.exists(templatesWs, 'Templates workspace should exist');
      assert.isAbove(templatesWs.docs.length, 0, 'Templates workspace should have docs');

      // Check doc structure
      const doc = templatesWs.docs[0];
      assert.property(doc, 'id');
      assert.property(doc, 'name');
    });
  });

  describe('GET /api/templates/{templateId} (getTemplate)', function() {
    it('should return template details', async function() {
      // First get a template ID from the list
      const listResult = await client.apis.templates.listTemplates();
      const templatesWs = listResult.body.find(ws => ws.name === 'Templates');
      const templateId = templatesWs.docs[0].id;

      const result = await client.apis.templates.getTemplate({ templateId });

      assert.equal(result.status, 200);
      assert.equal(result.body.id, templateId);
      assert.property(result.body, 'name');
      assert.property(result.body, 'workspace');
    });

    it('should return 404 for non-existent template', async function() {
      try {
        await client.apis.templates.getTemplate({ templateId: 'nonexistent-id' });
        assert.fail('Should have thrown');
      } catch (err) {
        assert.equal(err.status, 404);
      }
    });
  });
});
