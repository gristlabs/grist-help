/**
 * Tests for /api/orgs and /api/workspaces endpoints
 */

const { assert } = require('chai');
const { getClient } = require('./helpers');

describe('Orgs API', function() {
  let client;

  before(function() {
    client = getClient();
  });

  describe('GET /api/orgs (listOrgs)', function() {
    it('should return orgs including personal org with required fields', async function() {
      const result = await client.apis.orgs.listOrgs();

      assert.equal(result.status, 200);
      assert.isArray(result.body);
      assert.isAbove(result.body.length, 0);

      const org = result.body[0];
      assert.property(org, 'id');
      assert.isNumber(org.id);
      assert.property(org, 'name');
      assert.isString(org.name);
      assert.property(org, 'access');
      assert.isString(org.access);
      assert.property(org, 'createdAt');
      assert.isString(org.createdAt);
      assert.property(org, 'updatedAt');
      assert.isString(org.updatedAt);

      // owner can be null (personal orgs) or a User object
      assert.property(org, 'owner');
      if (org.owner !== null) {
        assert.property(org.owner, 'id');
        assert.property(org.owner, 'name');
      }
    });
  });

  describe('GET /api/orgs/{orgId} (describeOrg)', function() {
    it('should describe an org with full details', async function() {
      // Get first org
      const listResult = await client.apis.orgs.listOrgs();
      const orgId = listResult.body[0].id;

      const result = await client.apis.orgs.describeOrg({ orgId });

      assert.equal(result.status, 200);
      assert.equal(result.body.id, orgId);
      assert.property(result.body, 'name');
      assert.property(result.body, 'access');
    });
  });

  describe('GET /api/orgs/{orgId}/usage (getOrgUsage)', function() {
    it('should return usage summary with expected structure', async function() {
      // Get first org
      const listResult = await client.apis.orgs.listOrgs();
      const orgId = listResult.body[0].id;

      const result = await client.apis.orgs.getOrgUsage({ orgId });

      assert.equal(result.status, 200);

      // Check countsByDataLimitStatus structure
      assert.property(result.body, 'countsByDataLimitStatus');
      const counts = result.body.countsByDataLimitStatus;
      assert.property(counts, 'approachingLimit');
      assert.isNumber(counts.approachingLimit);
      assert.property(counts, 'gracePeriod');
      assert.isNumber(counts.gracePeriod);
      assert.property(counts, 'deleteOnly');
      assert.isNumber(counts.deleteOnly);

      // Check attachments structure
      assert.property(result.body, 'attachments');
      const attachments = result.body.attachments;
      assert.property(attachments, 'totalBytes');
      assert.isNumber(attachments.totalBytes);
      // limitExceeded is only present when the limit is exceeded
      if ('limitExceeded' in attachments) {
        assert.isBoolean(attachments.limitExceeded);
      }
    });
  });

  describe('PATCH /api/orgs/{orgId} (modifyOrg)', function() {
    it('should rename an org and verify the change', async function() {
      const listResult = await client.apis.orgs.listOrgs();
      const org = listResult.body[0];
      const orgId = org.id;
      const originalName = org.name;
      const newName = 'RenamedOrg_' + Date.now();

      // Rename the org
      await client.apis.orgs.modifyOrg({ orgId }, {
        requestBody: { name: newName }
      });

      // Verify the rename
      const descResult = await client.apis.orgs.describeOrg({ orgId });
      assert.equal(descResult.body.name, newName);

      // Restore original name
      await client.apis.orgs.modifyOrg({ orgId }, {
        requestBody: { name: originalName }
      });
    });
  });

  // Note: deleteOrg is not tested because there's no createOrg endpoint,
  // and deleting the only available personal org would break the test environment.

  describe('GET /api/orgs/{orgId}/access (listOrgAccess)', function() {
    it('should return users with access to org', async function() {
      const listResult = await client.apis.orgs.listOrgs();
      const orgId = listResult.body[0].id;

      const result = await client.apis.orgs.listOrgAccess({ orgId });

      assert.equal(result.status, 200);
      assert.property(result.body, 'users');
      assert.isArray(result.body.users);
      assert.isAbove(result.body.users.length, 0);

      // Check user structure — must include email
      const user = result.body.users[0];
      assert.property(user, 'id');
      assert.property(user, 'name');
      assert.property(user, 'email');
      assert.isString(user.email);
      assert.property(user, 'access');
    });
  });

  describe('PATCH /api/orgs/{orgId}/access (modifyOrgAccess)', function() {
    it('should add and remove org access', async function() {
      const listResult = await client.apis.orgs.listOrgs();
      const orgId = listResult.body[0].id;

      // Add viewer access for a test email
      await client.apis.orgs.modifyOrgAccess({ orgId }, {
        requestBody: {
          delta: {
            users: {
              'test-viewer@example.com': 'viewers'
            }
          }
        }
      });

      // Verify the addition
      let accessResult = await client.apis.orgs.listOrgAccess({ orgId });
      let testUser = accessResult.body.users.find(u => u.email === 'test-viewer@example.com');
      assert.exists(testUser);
      assert.equal(testUser.access, 'viewers');

      // Remove the access
      await client.apis.orgs.modifyOrgAccess({ orgId }, {
        requestBody: {
          delta: {
            users: {
              'test-viewer@example.com': null
            }
          }
        }
      });

      // Verify removal
      accessResult = await client.apis.orgs.listOrgAccess({ orgId });
      testUser = accessResult.body.users.find(u => u.email === 'test-viewer@example.com');
      assert.isUndefined(testUser);
    });
  });
});

describe('Workspaces API', function() {
  let client;
  let orgId;

  before(async function() {
    client = getClient();
    // Get the first org to use for workspace tests
    const orgsResult = await client.apis.orgs.listOrgs();
    orgId = orgsResult.body[0].id;
  });

  describe('Workspace lifecycle', function() {
    let workspaceId;
    const workspaceName = 'TestWorkspace_' + Date.now();

    it('should create a workspace and verify it exists', async function() {
      const createResult = await client.apis.workspaces.createWorkspace({ orgId }, {
        requestBody: { name: workspaceName }
      });

      assert.equal(createResult.status, 200);
      workspaceId = createResult.body;
      assert.isNumber(workspaceId);

      // Verify it appears in the list
      const listResult = await client.apis.workspaces.listWorkspaces({ orgId });
      const workspace = listResult.body.find(ws => ws.id === workspaceId);
      assert.exists(workspace);
      assert.equal(workspace.name, workspaceName);
    });

    it('should describe a workspace with its details', async function() {
      const result = await client.apis.workspaces.describeWorkspace({ workspaceId });

      assert.equal(result.status, 200);
      assert.equal(result.body.id, workspaceId);
      assert.equal(result.body.name, workspaceName);
      assert.property(result.body, 'access');
      assert.property(result.body, 'docs');
      assert.isArray(result.body.docs);

      // Workspace should include timestamps
      assert.property(result.body, 'createdAt');
      assert.isString(result.body.createdAt);
      assert.property(result.body, 'updatedAt');
      assert.isString(result.body.updatedAt);
    });

    it('should rename a workspace via modifyWorkspace', async function() {
      const newName = 'RenamedWorkspace_' + Date.now();

      await client.apis.workspaces.modifyWorkspace({ workspaceId }, {
        requestBody: { name: newName }
      });

      // Verify the rename
      const result = await client.apis.workspaces.describeWorkspace({ workspaceId });
      assert.equal(result.body.name, newName);
    });

    it('should list documents in a workspace', async function() {
      // Create a doc in this workspace (createDoc is under docs tag)
      const docName = 'WorkspaceDoc_' + Date.now();
      await client.apis.docs.createDoc({ workspaceId }, {
        requestBody: { name: docName }
      });

      // List and verify
      const result = await client.apis.workspaces.describeWorkspace({ workspaceId });
      assert.isAbove(result.body.docs.length, 0);

      const doc = result.body.docs.find(d => d.name === docName);
      assert.exists(doc);
      assert.property(doc, 'id');
    });

    it('should delete a workspace', async function() {
      // Create a workspace to delete
      const createResult = await client.apis.workspaces.createWorkspace({ orgId }, {
        requestBody: { name: 'ToDelete_' + Date.now() }
      });
      const wsId = createResult.body;

      // Delete it
      await client.apis.workspaces.deleteWorkspace({ workspaceId: wsId });

      // Verify it's gone
      const listResult = await client.apis.workspaces.listWorkspaces({ orgId });
      const deleted = listResult.body.find(ws => ws.id === wsId);
      assert.isUndefined(deleted);
    });

    it('should soft-delete a workspace and restore it', async function() {
      // Create a workspace to soft-delete
      const createResult = await client.apis.workspaces.createWorkspace({ orgId }, {
        requestBody: { name: 'ToTrash_' + Date.now() }
      });
      const wsId = createResult.body;

      // Soft-delete it (move to trash)
      await client.apis.workspaces.removeWorkspace({ workspaceId: wsId });

      // Verify it's not in the regular list
      const listResult = await client.apis.workspaces.listWorkspaces({ orgId });
      const trashed = listResult.body.find(ws => ws.id === wsId);
      assert.isUndefined(trashed);

      // Restore it
      await client.apis.workspaces.unremoveWorkspace({ workspaceId: wsId });

      // Verify it's back
      const afterRestore = await client.apis.workspaces.listWorkspaces({ orgId });
      const restored = afterRestore.body.find(ws => ws.id === wsId);
      assert.exists(restored);

      // Clean up
      await client.apis.workspaces.deleteWorkspace({ workspaceId: wsId });
    });
  });

  describe('Error handling', function() {
    it('should return 404 for non-existent workspace', async function() {
      try {
        await client.apis.workspaces.describeWorkspace({ workspaceId: 999999 });
        assert.fail('Should have thrown');
      } catch (err) {
        assert.equal(err.status, 404);
      }
    });
  });

  describe('Workspace Access', function() {
    let testWorkspaceId;

    before(async function() {
      // Create a workspace for access tests
      const createResult = await client.apis.workspaces.createWorkspace({ orgId }, {
        requestBody: { name: 'AccessTest_' + Date.now() }
      });
      testWorkspaceId = createResult.body;
    });

    after(async function() {
      // Clean up
      await client.apis.workspaces.deleteWorkspace({ workspaceId: testWorkspaceId });
    });

    it('should list users with workspace access (listWorkspaceAccess)', async function() {
      const result = await client.apis.workspaces.listWorkspaceAccess({ workspaceId: testWorkspaceId });

      assert.equal(result.status, 200);
      assert.property(result.body, 'users');
      assert.isArray(result.body.users);
      assert.isAbove(result.body.users.length, 0);

      const user = result.body.users[0];
      assert.property(user, 'id');
      assert.property(user, 'access');
    });

    it('should add and remove workspace access (modifyWorkspaceAccess)', async function() {
      // Add viewer access
      await client.apis.workspaces.modifyWorkspaceAccess({ workspaceId: testWorkspaceId }, {
        requestBody: {
          delta: {
            users: {
              'ws-test@example.com': 'viewers'
            }
          }
        }
      });

      // Verify addition
      let accessResult = await client.apis.workspaces.listWorkspaceAccess({ workspaceId: testWorkspaceId });
      let testUser = accessResult.body.users.find(u => u.email === 'ws-test@example.com');
      assert.exists(testUser);
      assert.equal(testUser.access, 'viewers');

      // Remove access
      await client.apis.workspaces.modifyWorkspaceAccess({ workspaceId: testWorkspaceId }, {
        requestBody: {
          delta: {
            users: {
              'ws-test@example.com': null
            }
          }
        }
      });

      // Verify removal
      accessResult = await client.apis.workspaces.listWorkspaceAccess({ workspaceId: testWorkspaceId });
      testUser = accessResult.body.users.find(u => u.email === 'ws-test@example.com');
      assert.isUndefined(testUser);
    });
  });
});
