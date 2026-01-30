/**
 * Mocha root hooks - runs once before/after all test files
 *
 * Set GRIST_RUNNING=1 to skip starting/stopping the Grist container
 * (useful when Grist is provided externally, e.g., via GitHub Actions services)
 */

const { startGrist, stopGrist, waitForGrist, createClient, getClient } = require('./helpers');

const externalGrist = process.env.GRIST_RUNNING === '1';

exports.mochaHooks = {
  async beforeAll() {
    this.timeout(120000);

    if (externalGrist) {
      console.log('Using external Grist instance...');
    } else {
      startGrist();
    }
    await waitForGrist();

    // Create the Swagger client from grist.yml spec
    console.log('Creating API client from grist.yml...');
    await createClient();
    console.log('API client ready');

    // Set up a template document for template tests
    await setupTemplates();
  },

  async afterAll() {
    if (!externalGrist) {
      stopGrist();
    }
  }
};

/**
 * Create a workspace and template document in the templates org
 */
async function setupTemplates() {
  console.log('Setting up template document...');
  const client = getClient();

  // Get the org
  const orgsResult = await client.apis.orgs.listOrgs();
  const orgId = orgsResult.body[0].id;

  // Rename the org domain to "templates" to match GRIST_TEMPLATE_ORG
  await client.apis.orgs.modifyOrg({ orgId }, {
    requestBody: { domain: 'templates' }
  });

  // Create a workspace for templates
  const wsResult = await client.apis.workspaces.createWorkspace({ orgId }, {
    requestBody: { name: 'Templates' }
  });
  const workspaceId = wsResult.body;

  // Create a template document
  const docResult = await client.apis.docs.createDoc({ workspaceId }, {
    requestBody: { name: 'Sample Template', isPinned: true }
  });
  const docId = docResult.body;

  // Make the template document publicly accessible (required for templates)
  await client.apis.docs.modifyDocAccess({ docId }, {
    requestBody: {
      delta: {
        users: {
          'everyone@getgrist.com': 'viewers'
        }
      }
    }
  });

  console.log('Template setup complete');
}
