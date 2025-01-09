#!/usr/bin/env node

// This script is an attempt to automate work started in https://github.com/gristlabs/grist-help/pull/293
// TLDR: Swagger UI (and Grist API) console doesn't support inline parameters well, so they need to be
// converted to shared parameters. This script does that conversion, but it's not perfect and may need
// manual tweaking afterwards if the parameters are complex or have shared names.

const fs = require('fs');
const yaml = require('js-yaml');

// Get command-line arguments
const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];

if (!inputFilePath) {
  console.error('Usage: node api-parameters.js <inputFilePath> [outputFilePath]');
  process.exit(1);
}

try {
  const fileContents = fs.readFileSync(inputFilePath, 'utf8');
  const apiSpec = yaml.load(fileContents);

  // Initialize shared parameters in the components section if not already present
  apiSpec.components = apiSpec.components || {};
  apiSpec.components.parameters = apiSpec.components.parameters || {};

  // Function to generate a unique parameter name based on its contents
  const generateParameterName = (param) => {
    const baseName = param.name;
    return `${baseName}Param`;
  };

  // Function to create shared parameter references
  const createSharedParameter = (param) => {
    const paramName = generateParameterName(param);
    if (!apiSpec.components.parameters[paramName]) {
      apiSpec.components.parameters[paramName] = {
        in: param.in,
        name: param.name,
        schema: param.schema,
        description: param.description || `${param.name} parameter`,
        required: param.required
      };
    }
    return { $ref: `#/components/parameters/${paramName}` };
  };

  // Function to process each endpoint's parameters
  const processParameters = (parameters) => {
    return parameters.map((param) => {
      // Skip parameters that are already references
      if (param.$ref) {
        return param;
      }
      return createSharedParameter(param);
    });
  };

  // Update paths to use shared parameters
  Object.keys(apiSpec.paths).forEach((path) => {
    const methods = apiSpec.paths[path];
    Object.keys(methods).forEach((method) => {
      const operation = methods[method];
      if (operation.parameters) {
        operation.parameters = processParameters(operation.parameters);
      }
    });
  });

  // Write the updated YAML
  const updatedYaml = yaml.dump(apiSpec);

  if (outputFilePath === '-') {
    fs.writeFileSync(inputFilePath, updatedYaml, 'utf8');
    console.log(`Overwritten API spec at ${inputFilePath}`);
  } else if (outputFilePath) {
    fs.writeFileSync(outputFilePath, updatedYaml, 'utf8');
    console.log(`Updated API spec written to ${outputFilePath}`);
  } else {
    process.stdout.write(updatedYaml);
  }
} catch (e) {
  console.error(e);
}
