/**
 * Tests for /api/profile and /api/session endpoints
 */

const { assert } = require('chai');
const { getClient } = require('./helpers');

describe('Profile API', function() {
  let client;

  before(function() {
    client = getClient();
  });

  describe('GET /api/profile/user (getProfile)', function() {
    it('should return user profile with required fields', async function() {
      const result = await client.apis.profile.getProfile();

      assert.equal(result.status, 200);
      assert.property(result.body, 'id');
      assert.isNumber(result.body.id);
      assert.property(result.body, 'name');
      assert.isString(result.body.name);
      // User schema must include email
      assert.property(result.body, 'email');
      assert.isString(result.body.email);
      assert.include(result.body.email, '@');
    });
  });

  describe('PATCH /api/profile/user (updateUserName)', function() {
    it('should update user name and verify the change', async function() {
      // Get current name
      let profile = await client.apis.profile.getProfile();
      const originalName = profile.body.name;
      const newName = 'TestUser_' + Date.now();

      // Update name
      await client.apis.profile.updateUserName({}, {
        requestBody: { name: newName }
      });

      // Verify change
      profile = await client.apis.profile.getProfile();
      assert.equal(profile.body.name, newName);

      // Restore original name
      await client.apis.profile.updateUserName({}, {
        requestBody: { name: originalName }
      });
    });
  });

  describe('POST /api/profile/user/locale (updateUserLocale)', function() {
    it('should update user locale and verify via profile', async function() {
      // Set locale to French
      await client.apis.profile.updateUserLocale({}, {
        requestBody: { locale: 'fr' }
      });

      // Verify locale was set
      let profile = await client.apis.profile.getProfile();
      assert.equal(profile.body.locale, 'fr');

      // Change to German
      await client.apis.profile.updateUserLocale({}, {
        requestBody: { locale: 'de' }
      });

      // Verify locale changed
      profile = await client.apis.profile.getProfile();
      assert.equal(profile.body.locale, 'de');

      // Clear locale (reset to default)
      await client.apis.profile.updateUserLocale({}, {
        requestBody: { locale: null }
      });

      // Verify locale was cleared
      profile = await client.apis.profile.getProfile();
      assert.isNull(profile.body.locale);
    });
  });

  describe('Profile and Session consistency', function() {
    it('should return same user in profile and session', async function() {
      const profile = await client.apis.profile.getProfile();
      const session = await client.apis.session.getActiveSession();

      assert.equal(session.body.user.id, profile.body.id);
      assert.equal(session.body.user.name, profile.body.name);
    });
  });

  describe('API Key Management', function() {
    it('should get current API key (getApiKey)', async function() {
      const result = await client.apis.profile.getApiKey();

      assert.equal(result.status, 200);
      const apiKey = result.data || result.body || result.text;
      assert.isString(apiKey);
      // API keys are non-empty strings
      assert.isAbove(apiKey.length, 0);
    });

    // Note: createApiKey and deleteApiKey tests are skipped because
    // regenerating/deleting the API key would break subsequent tests
    // that rely on the TEST_SUPPORT_API_KEY for authentication
  });
});

describe('Session API', function() {
  let client;

  before(function() {
    client = getClient();
  });

  describe('GET /api/session/access/active (getActiveSession)', function() {
    it('should return session with user and org info', async function() {
      const result = await client.apis.session.getActiveSession();

      assert.equal(result.status, 200);
      assert.property(result.body, 'user');
      assert.property(result.body.user, 'id');
      assert.isNumber(result.body.user.id);
      assert.property(result.body.user, 'name');
      assert.isString(result.body.user.name);
    });
  });

  describe('GET /api/session/access/all (getAllSessions)', function() {
    it('should return all session users and orgs', async function() {
      const result = await client.apis.session.getAllSessions();

      assert.equal(result.status, 200);
      assert.property(result.body, 'users');
      assert.isArray(result.body.users);
      assert.isAbove(result.body.users.length, 0);
      assert.property(result.body, 'orgs');
      assert.isArray(result.body.orgs);
    });
  });
});
