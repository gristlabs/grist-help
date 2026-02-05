/**
 * Tests for /api/widgets endpoints
 */

const { assert } = require('chai');
const { getClient } = require('./helpers');

describe('Widgets API', function() {
  let client;

  before(function() {
    client = getClient();
  });

  describe('GET /api/widgets (listWidgets)', function() {
    it('should return built-in widgets with required fields', async function() {
      const result = await client.apis.widgets.listWidgets();

      assert.equal(result.status, 200);
      assert.isArray(result.body);
      // Grist includes built-in custom widgets
      assert.isAbove(result.body.length, 0);

      // Verify widget schema
      const widget = result.body[0];
      assert.property(widget, 'name');
      assert.isString(widget.name);
      assert.property(widget, 'url');
      assert.isString(widget.url);
      assert.property(widget, 'widgetId');
      assert.isString(widget.widgetId);
    });

    it('should include common widgets like Calendar and Markdown', async function() {
      const result = await client.apis.widgets.listWidgets();

      const widgetNames = result.body.map(w => w.name);
      // These are well-known built-in widgets
      assert.include(widgetNames, 'Calendar');
      assert.include(widgetNames, 'Markdown');
    });
  });
});
