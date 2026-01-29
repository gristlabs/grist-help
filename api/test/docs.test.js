/**
 * Tests for /api/docs endpoints using Swagger client
 *
 * These tests verify actual behavior, not just status codes.
 */

const { assert } = require('chai');
const { getClient } = require('./helpers');

describe('Docs API', function() {
  let client;

  before(function() {
    client = getClient();
  });

  describe('Document lifecycle', function() {
    let orgId;
    let workspaceId;

    before(async function() {
      // Get org and create a workspace for document tests
      const orgsResult = await client.apis.orgs.listOrgs();
      orgId = orgsResult.body[0].id;

      const wsResult = await client.apis.workspaces.createWorkspace({ orgId }, {
        requestBody: { name: 'DocTests_' + Date.now() }
      });
      workspaceId = wsResult.body;
    });

    it('should create a doc in workspace and verify its name', async function() {
      const docName = 'TestDoc_' + Date.now();

      // Create doc in workspace (this saves it with a name)
      const createResult = await client.apis.docs.createDoc({ workspaceId }, {
        requestBody: { name: docName }
      });

      assert.equal(createResult.status, 200);
      const docId = createResult.body;

      // Verify the doc exists and has the correct name
      const describeResult = await client.apis.docs.describeDoc({ docId });
      assert.equal(describeResult.status, 200);
      assert.equal(describeResult.body.name, docName);
      assert.equal(describeResult.body.id, docId);
      assert.property(describeResult.body, 'access');
      assert.property(describeResult.body, 'workspace');
    });

    it('should rename a document via modifyDoc', async function() {
      const originalName = 'Original_' + Date.now();
      const newName = 'Renamed_' + Date.now();

      // Create doc in workspace
      const createResult = await client.apis.docs.createDoc({ workspaceId }, {
        requestBody: { name: originalName }
      });
      const docId = createResult.body;

      // Verify original name
      let describeResult = await client.apis.docs.describeDoc({ docId });
      assert.equal(describeResult.body.name, originalName);

      // Rename
      await client.apis.docs.modifyDoc({ docId }, {
        requestBody: { name: newName }
      });

      // Verify new name
      describeResult = await client.apis.docs.describeDoc({ docId });
      assert.equal(describeResult.body.name, newName);
    });

    it('should pin and unpin a document', async function() {
      const createResult = await client.apis.docs.createDoc({ workspaceId }, {
        requestBody: { name: 'PinTest_' + Date.now() }
      });
      const docId = createResult.body;

      // Initially not pinned
      let describeResult = await client.apis.docs.describeDoc({ docId });
      assert.equal(describeResult.body.isPinned, false);

      // Pin it (PATCH endpoint, no body needed)
      await client.apis.docs.pinDoc({ docId });
      describeResult = await client.apis.docs.describeDoc({ docId });
      assert.equal(describeResult.body.isPinned, true);

      // Unpin it
      await client.apis.docs.unpinDoc({ docId });
      describeResult = await client.apis.docs.describeDoc({ docId });
      assert.equal(describeResult.body.isPinned, false);
    });
  });

  describe('Tables API', function() {
    let docId;

    before(async function() {
      const createResult = await client.apis.docs.createDocUnified({}, {
        requestBody: { name: 'TablesTest_' + Date.now() }
      });
      docId = createResult.body;
    });

    it('should have default Table1 in a fresh document', async function() {
      const result = await client.apis.tables.listTables({ docId });

      assert.equal(result.status, 200);
      assert.property(result.body, 'tables');
      assert.isArray(result.body.tables);
      // A fresh Grist doc comes with Table1 by default
      assert.lengthOf(result.body.tables, 1);

      const table = result.body.tables[0];
      assert.equal(table.id, 'Table1');
      // Validate TablesList schema - tables have id and fields
      assert.property(table, 'fields');
      assert.isObject(table.fields);
      // tableRef is a key field in the response
      assert.property(table.fields, 'tableRef');
      assert.isNumber(table.fields.tableRef);
    });

    it('should add a table and verify it appears in listTables', async function() {
      const tableName = 'Products';

      // Add table
      const addResult = await client.apis.tables.addTables({ docId }, {
        requestBody: {
          tables: [
            { id: tableName, columns: [
              { id: 'Name', fields: { type: 'Text' } },
              { id: 'Price', fields: { type: 'Numeric' } }
            ]}
          ]
        }
      });

      assert.equal(addResult.status, 200);

      // Verify table exists
      const listResult = await client.apis.tables.listTables({ docId });
      const tableIds = listResult.body.tables.map(t => t.id);
      assert.include(tableIds, tableName);
    });

    it('should list columns of a table', async function() {
      const result = await client.apis.columns.listColumns({ docId, tableId: 'Products' });

      assert.equal(result.status, 200);
      assert.property(result.body, 'columns');

      const columnIds = result.body.columns.map(c => c.id);
      assert.include(columnIds, 'Name');
      assert.include(columnIds, 'Price');
    });

    it('should rename a table via modifyTables', async function() {
      // Add a record to Table1 (which has default columns A, B, C)
      await client.apis.records.addRecords({ docId, tableId: 'Table1' }, {
        requestBody: { records: [{ fields: { A: 'Paris', B: 42 } }] }
      });

      // Rename Table1 to Cities
      const result = await client.apis.tables.modifyTables({ docId }, {
        requestBody: {
          tables: [{ id: 'Table1', fields: { tableId: 'Cities' } }]
        }
      });
      assert.equal(result.status, 200);

      // Verify the table is now named Cities
      const tablesResult = await client.apis.tables.listTables({ docId });
      const tableIds = tablesResult.body.tables.map(t => t.id);
      assert.include(tableIds, 'Cities');
      assert.notInclude(tableIds, 'Table1');

      // Verify data is accessible via the new name
      const records = await client.apis.records.listRecords({ docId, tableId: 'Cities' });
      assert.equal(records.status, 200);
      const values = records.body.records.map(r => r.fields.A);
      assert.include(values, 'Paris');
    });
  });

  describe('Columns CRUD', function() {
    let docId;
    const tableId = 'Items';

    before(async function() {
      const createResult = await client.apis.docs.createDocUnified({}, {
        requestBody: { name: 'ColumnsTest_' + Date.now() }
      });
      docId = createResult.body;

      // Create a table to work with
      await client.apis.tables.addTables({ docId }, {
        requestBody: {
          tables: [{ id: tableId, columns: [{ id: 'Name', fields: { type: 'Text' } }] }]
        }
      });
    });

    it('should add columns to a table', async function() {
      const result = await client.apis.columns.addColumns({ docId, tableId }, {
        requestBody: {
          columns: [
            { id: 'Description', fields: { type: 'Text' } },
            { id: 'Quantity', fields: { type: 'Int' } }
          ]
        }
      });

      assert.equal(result.status, 200);
      assert.property(result.body, 'columns');
      assert.lengthOf(result.body.columns, 2);

      // Verify columns exist
      const listResult = await client.apis.columns.listColumns({ docId, tableId });
      const columnIds = listResult.body.columns.map(c => c.id);
      assert.include(columnIds, 'Description');
      assert.include(columnIds, 'Quantity');
    });

    it('should modify a column type', async function() {
      // Modify Description column type to Choice
      const modifyResult = await client.apis.columns.modifyColumns({ docId, tableId }, {
        requestBody: {
          columns: [
            { id: 'Description', fields: { type: 'Choice' } }
          ]
        }
      });

      assert.equal(modifyResult.status, 200);

      // Verify the change by listing columns
      const listResult = await client.apis.columns.listColumns({ docId, tableId });
      const descCol = listResult.body.columns.find(c => c.id === 'Description');
      assert.exists(descCol);
      assert.equal(descCol.fields.type, 'Choice');
    });

    it('should delete a column', async function() {
      // Get initial column count
      let listResult = await client.apis.columns.listColumns({ docId, tableId });
      const initialCount = listResult.body.columns.length;

      // Delete Quantity column
      await client.apis.columns.deleteColumn({ docId, tableId, colId: 'Quantity' });

      // Verify deletion
      listResult = await client.apis.columns.listColumns({ docId, tableId });
      assert.lengthOf(listResult.body.columns, initialCount - 1);
      const columnIds = listResult.body.columns.map(c => c.id);
      assert.notInclude(columnIds, 'Quantity');
    });

    it('should add or update columns via replaceColumns', async function() {
      // replaceColumns: add a new column and update an existing one
      const result = await client.apis.columns.replaceColumns({ docId, tableId }, {
        requestBody: {
          columns: [
            { id: 'Description', fields: { type: 'Text' } },  // update existing
            { id: 'NewCol', fields: { type: 'Int' } }         // add new
          ]
        }
      });

      assert.equal(result.status, 200);

      // Verify both columns exist
      const listResult = await client.apis.columns.listColumns({ docId, tableId });
      const columnIds = listResult.body.columns.map(c => c.id);
      assert.include(columnIds, 'Description');
      assert.include(columnIds, 'NewCol');
    });
  });

  describe('Records API', function() {
    let docId;
    const tableId = 'Customers';

    before(async function() {
      // Create doc with a table
      const createResult = await client.apis.docs.createDocUnified({}, {
        requestBody: { name: 'RecordsTest_' + Date.now() }
      });
      docId = createResult.body;

      // Add table
      await client.apis.tables.addTables({ docId }, {
        requestBody: {
          tables: [
            { id: tableId, columns: [
              { id: 'Name', fields: { type: 'Text' } },
              { id: 'Email', fields: { type: 'Text' } },
              { id: 'Age', fields: { type: 'Int' } }
            ]}
          ]
        }
      });
    });

    it('should add records and retrieve them', async function() {
      // Add records
      const addResult = await client.apis.records.addRecords({ docId, tableId }, {
        requestBody: {
          records: [
            { fields: { Name: 'Alice', Email: 'alice@example.com', Age: 30 } },
            { fields: { Name: 'Bob', Email: 'bob@example.com', Age: 25 } }
          ]
        }
      });

      assert.equal(addResult.status, 200);
      assert.lengthOf(addResult.body.records, 2);
      const aliceId = addResult.body.records[0].id;
      const bobId = addResult.body.records[1].id;

      // Retrieve and verify
      const listResult = await client.apis.records.listRecords({ docId, tableId });
      assert.equal(listResult.status, 200);

      const records = listResult.body.records;
      assert.lengthOf(records, 2);

      const alice = records.find(r => r.id === aliceId);
      assert.equal(alice.fields.Name, 'Alice');
      assert.equal(alice.fields.Email, 'alice@example.com');
      assert.equal(alice.fields.Age, 30);

      const bob = records.find(r => r.id === bobId);
      assert.equal(bob.fields.Name, 'Bob');
    });

    it('should modify a record and verify the change', async function() {
      // Get current records
      let listResult = await client.apis.records.listRecords({ docId, tableId });
      const alice = listResult.body.records.find(r => r.fields.Name === 'Alice');

      // Modify Alice's age
      await client.apis.records.modifyRecords({ docId, tableId }, {
        requestBody: {
          records: [
            { id: alice.id, fields: { Age: 31 } }
          ]
        }
      });

      // Verify change
      listResult = await client.apis.records.listRecords({ docId, tableId });
      const updatedAlice = listResult.body.records.find(r => r.id === alice.id);
      assert.equal(updatedAlice.fields.Age, 31);
      assert.equal(updatedAlice.fields.Name, 'Alice'); // unchanged
    });

    it('should delete a record and verify it is gone', async function() {
      // Get current records
      let listResult = await client.apis.records.listRecords({ docId, tableId });
      const initialCount = listResult.body.records.length;
      const bob = listResult.body.records.find(r => r.fields.Name === 'Bob');

      // Delete Bob
      await client.apis.records.deleteRecords({ docId, tableId }, {
        requestBody: [bob.id]
      });

      // Verify deletion
      listResult = await client.apis.records.listRecords({ docId, tableId });
      assert.lengthOf(listResult.body.records, initialCount - 1);
      const bobStillExists = listResult.body.records.find(r => r.id === bob.id);
      assert.isUndefined(bobStillExists);
    });

    it('should filter records with query parameter', async function() {
      // Add more records for filtering
      await client.apis.records.addRecords({ docId, tableId }, {
        requestBody: {
          records: [
            { fields: { Name: 'Charlie', Email: 'charlie@example.com', Age: 35 } },
            { fields: { Name: 'Diana', Email: 'diana@example.com', Age: 28 } }
          ]
        }
      });

      // Filter by Age > 30
      const filterResult = await client.apis.records.listRecords({
        docId,
        tableId,
        filter: JSON.stringify({ Age: [31, 35] })
      });

      assert.equal(filterResult.status, 200);
      // Should get Alice (31) and Charlie (35)
      const names = filterResult.body.records.map(r => r.fields.Name);
      assert.include(names, 'Alice');
      assert.include(names, 'Charlie');
      assert.notInclude(names, 'Diana');
    });

    it('should add or update records via replaceRecords', async function() {
      // Add a record with a unique identifier
      await client.apis.records.addRecords({ docId, tableId }, {
        requestBody: {
          records: [
            { fields: { Name: 'Eve', Email: 'eve@example.com', Age: 40 } }
          ]
        }
      });

      // Use replaceRecords to update Eve's age (match by Email)
      const result = await client.apis.records.replaceRecords({ docId, tableId }, {
        requestBody: {
          records: [
            {
              require: { Email: 'eve@example.com' },
              fields: { Age: 41 }
            }
          ]
        }
      });

      assert.equal(result.status, 200);

      // Verify the update
      const listResult = await client.apis.records.listRecords({ docId, tableId });
      const eve = listResult.body.records.find(r => r.fields.Email === 'eve@example.com');
      assert.exists(eve);
      assert.equal(eve.fields.Age, 41);
    });
  });

  describe('Row-based Data API (deprecated)', function() {
    let docId;
    const tableId = 'Items';

    before(async function() {
      const createResult = await client.apis.docs.createDocUnified({}, {
        requestBody: { name: 'RowDataTest_' + Date.now() }
      });
      docId = createResult.body;

      await client.apis.tables.addTables({ docId }, {
        requestBody: {
          tables: [{
            id: tableId,
            columns: [
              { id: 'Name', fields: { type: 'Text' } },
              { id: 'Count', fields: { type: 'Int' } }
            ]
          }]
        }
      });
    });

    it('should add rows via addRows', async function() {
      const result = await client.apis.data.addRows({ docId, tableId }, {
        requestBody: {
          Name: ['Apple', 'Banana'],
          Count: [10, 20]
        }
      });

      assert.equal(result.status, 200);
      assert.isArray(result.body);
      assert.lengthOf(result.body, 2);
    });

    it('should fetch data via getTableData', async function() {
      const result = await client.apis.data.getTableData({ docId, tableId });

      assert.equal(result.status, 200);
      assert.property(result.body, 'id');
      assert.property(result.body, 'Name');
      assert.property(result.body, 'Count');
      assert.isArray(result.body.Name);
      assert.include(result.body.Name, 'Apple');
      assert.include(result.body.Name, 'Banana');
    });

    it('should modify rows via modifyRows', async function() {
      // Get row IDs
      const data = await client.apis.data.getTableData({ docId, tableId });
      const rowId = data.body.id[0];

      // Modify first row
      await client.apis.data.modifyRows({ docId, tableId }, {
        requestBody: {
          id: [rowId],
          Name: ['Apple Updated']
        }
      });

      // Verify
      const updated = await client.apis.data.getTableData({ docId, tableId });
      assert.include(updated.body.Name, 'Apple Updated');
    });

    it('should delete rows via deleteRows', async function() {
      // Get row IDs
      const data = await client.apis.data.getTableData({ docId, tableId });
      const rowId = data.body.id[0];

      // Delete first row
      await client.apis.data.deleteRows({ docId, tableId }, {
        requestBody: [rowId]
      });

      // Verify deletion
      const updated = await client.apis.data.getTableData({ docId, tableId });
      assert.notInclude(updated.body.id, rowId);
    });
  });

  describe('Document Downloads', function() {
    let docId;
    const tableId = 'People';

    before(async function() {
      const createResult = await client.apis.docs.createDocUnified({}, {
        requestBody: { name: 'DownloadTest_' + Date.now() }
      });
      docId = createResult.body;

      // Create a table with data
      await client.apis.tables.addTables({ docId }, {
        requestBody: {
          tables: [{
            id: tableId,
            columns: [
              { id: 'Name', fields: { type: 'Text' } },
              { id: 'Age', fields: { type: 'Int' } }
            ]
          }]
        }
      });

      await client.apis.records.addRecords({ docId, tableId }, {
        requestBody: {
          records: [
            { fields: { Name: 'Alice', Age: 30 } },
            { fields: { Name: 'Bob', Age: 25 } }
          ]
        }
      });
    });

    it('should download table as CSV', async function() {
      const result = await client.apis.docs.downloadDocCsv({ docId, tableId });

      assert.equal(result.status, 200);
      // Response should be CSV text
      assert.isString(result.data);
      // Should contain our data
      assert.include(result.data, 'Alice');
      assert.include(result.data, 'Bob');
      assert.include(result.data, '30');
      assert.include(result.data, '25');
    });

    it('should download document as Excel', async function() {
      const result = await client.apis.docs.downloadDocXlsx({ docId });

      assert.equal(result.status, 200);
      const blob = result.data;
      const arrayBuffer = await blob.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      // XLSX files are ZIP files, starting with PK (0x50 0x4B)
      assert.equal(bytes[0], 0x50); // P
      assert.equal(bytes[1], 0x4B); // K
    });

    it('should download table as TSV', async function() {
      const result = await client.apis.docs.downloadDocTsv({ docId, tableId });

      assert.equal(result.status, 200);
      assert.isString(result.data);
      // TSV uses tabs
      assert.include(result.data, '\t');
      assert.include(result.data, 'Alice');
      assert.include(result.data, 'Bob');
    });

    it('should download table as DSV', async function() {
      const result = await client.apis.docs.downloadDocDsv({ docId, tableId });

      assert.equal(result.status, 200);
      assert.isString(result.data);
      // DSV uses 💩 (poop emoji) as delimiter
      assert.include(result.data, '💩');
      assert.include(result.data, 'Alice');
      assert.include(result.data, 'Bob');
    });

    it('should download document as Sqlite (downloadDoc)', async function() {
      const result = await client.apis.docs.downloadDoc({ docId });

      assert.equal(result.status, 200);
      const blob = result.data;
      const arrayBuffer = await blob.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      // SQLite files start with "SQLite format 3\0"
      const header = String.fromCharCode(...bytes.slice(0, 6));
      assert.equal(header, 'SQLite');
    });

    it('should download table schema', async function() {
      const result = await client.apis.docs.downloadTableSchema({ docId, tableId });

      assert.equal(result.status, 200);
      // Response follows frictionlessdata table-schema format
      const response = result.body || result.data;
      assert.property(response, 'name');
      assert.property(response, 'schema');
      assert.property(response.schema, 'fields');
      assert.isArray(response.schema.fields);

      // Should have our columns
      const names = response.schema.fields.map(f => f.name);
      assert.include(names, 'Name');
      assert.include(names, 'Age');
    });
  });

  describe('Soft Delete (Trash)', function() {
    let workspaceId;

    before(async function() {
      // Create a workspace for these tests
      const orgsResult = await client.apis.orgs.listOrgs();
      const orgId = orgsResult.body[0].id;

      const wsResult = await client.apis.workspaces.createWorkspace({ orgId }, {
        requestBody: { name: 'TrashTests_' + Date.now() }
      });
      workspaceId = wsResult.body;
    });

    it('should move document to trash and restore it', async function() {
      // Create a doc in the workspace
      const docName = 'TrashMe_' + Date.now();
      const createResult = await client.apis.docs.createDoc({ workspaceId }, {
        requestBody: { name: docName }
      });
      const docId = createResult.body;

      // Verify doc exists
      let descResult = await client.apis.docs.describeDoc({ docId });
      assert.equal(descResult.body.name, docName);

      // Move to trash
      await client.apis.docs.removeDoc({ docId });

      // Doc should return 404 after soft delete
      try {
        await client.apis.docs.describeDoc({ docId });
        assert.fail('Should have thrown 404');
      } catch (err) {
        assert.equal(err.status, 404);
      }

      // Restore from trash
      await client.apis.docs.unremoveDoc({ docId });

      // Verify doc is accessible again
      descResult = await client.apis.docs.describeDoc({ docId });
      assert.equal(descResult.body.name, docName);
    });

    it('should permanently delete a document', async function() {
      // Create a doc
      const createResult = await client.apis.docs.createDoc({ workspaceId }, {
        requestBody: { name: 'DeleteMe_' + Date.now() }
      });
      const docId = createResult.body;

      // Permanently delete (skip trash)
      await client.apis.docs.removeDoc({ docId, permanent: true });

      // Doc should not be accessible
      try {
        await client.apis.docs.describeDoc({ docId });
        assert.fail('Should have thrown 404');
      } catch (err) {
        assert.equal(err.status, 404);
      }

      // Unremove should fail since it's permanently deleted
      try {
        await client.apis.docs.unremoveDoc({ docId });
        assert.fail('Should have thrown 404');
      } catch (err) {
        assert.equal(err.status, 404);
      }
    });

    it('should delete a document via DELETE method (deleteDoc)', async function() {
      // Create a doc
      const createResult = await client.apis.docs.createDoc({ workspaceId }, {
        requestBody: { name: 'DeleteViaMethod_' + Date.now() }
      });
      const docId = createResult.body;

      // Delete using the DELETE method
      const result = await client.apis.docs.deleteDoc({ docId });
      assert.equal(result.status, 200);

      // Doc should not be accessible
      try {
        await client.apis.docs.describeDoc({ docId });
        assert.fail('Should have thrown 404');
      } catch (err) {
        assert.equal(err.status, 404);
      }
    });
  });

  describe('Copy and Move', function() {
    let orgId;
    let sourceWorkspaceId;
    let targetWorkspaceId;

    before(async function() {
      const orgsResult = await client.apis.orgs.listOrgs();
      orgId = orgsResult.body[0].id;

      // Create two workspaces
      const ws1 = await client.apis.workspaces.createWorkspace({ orgId }, {
        requestBody: { name: 'CopyMoveSource_' + Date.now() }
      });
      sourceWorkspaceId = ws1.body;

      const ws2 = await client.apis.workspaces.createWorkspace({ orgId }, {
        requestBody: { name: 'CopyMoveTarget_' + Date.now() }
      });
      targetWorkspaceId = ws2.body;
    });

    it('should copy a document to another workspace', async function() {
      // Create source doc
      const createResult = await client.apis.docs.createDoc({ workspaceId: sourceWorkspaceId }, {
        requestBody: { name: 'ToCopy_' + Date.now() }
      });
      const sourceDocId = createResult.body;

      // Add some data to verify it's copied
      await client.apis.records.addRecords({ docId: sourceDocId, tableId: 'Table1' }, {
        requestBody: {
          records: [{ fields: { A: 'test data' } }]
        }
      });

      // Copy to target workspace
      const copyName = 'Copied_' + Date.now();
      const copyResult = await client.apis.docs.copyDoc({ docId: sourceDocId }, {
        requestBody: {
          workspaceId: targetWorkspaceId,
          documentName: copyName
        }
      });

      assert.equal(copyResult.status, 200);
      const copiedDocId = copyResult.body;

      // Verify copy exists with correct name
      const descResult = await client.apis.docs.describeDoc({ docId: copiedDocId });
      assert.equal(descResult.body.name, copyName);

      // Verify data was copied
      const records = await client.apis.records.listRecords({ docId: copiedDocId, tableId: 'Table1' });
      assert.isAbove(records.body.records.length, 0);
      assert.equal(records.body.records[0].fields.A, 'test data');
    });

    it('should move a document to another workspace', async function() {
      // Create doc in source workspace
      const docName = 'ToMove_' + Date.now();
      const createResult = await client.apis.docs.createDoc({ workspaceId: sourceWorkspaceId }, {
        requestBody: { name: docName }
      });
      const docId = createResult.body;

      // Verify it's in source workspace
      let sourceWs = await client.apis.workspaces.describeWorkspace({ workspaceId: sourceWorkspaceId });
      assert.isTrue(sourceWs.body.docs.some(d => d.id === docId));

      // Move to target workspace
      await client.apis.docs.moveDoc({ docId }, {
        requestBody: { workspace: targetWorkspaceId }
      });

      // Verify it's no longer in source workspace
      sourceWs = await client.apis.workspaces.describeWorkspace({ workspaceId: sourceWorkspaceId });
      assert.isFalse(sourceWs.body.docs.some(d => d.id === docId));

      // Verify it's in target workspace
      const targetWs = await client.apis.workspaces.describeWorkspace({ workspaceId: targetWorkspaceId });
      assert.isTrue(targetWs.body.docs.some(d => d.id === docId));
    });

    it('should fork a document (forkDoc)', async function() {
      // Create a document to fork
      const createResult = await client.apis.docs.createDoc({ workspaceId: sourceWorkspaceId }, {
        requestBody: { name: 'ToFork_' + Date.now() }
      });
      const docId = createResult.body;

      // Fork it
      const forkResult = await client.apis.docs.forkDoc({ docId });

      assert.equal(forkResult.status, 200);
      assert.property(forkResult.body, 'docId');
      assert.property(forkResult.body, 'urlId');
      assert.isString(forkResult.body.docId);
      assert.isString(forkResult.body.urlId);

      // The forked doc should be accessible
      const forkDesc = await client.apis.docs.describeDoc({ docId: forkResult.body.docId });
      assert.equal(forkDesc.status, 200);
    });

    it('should import a document (importDoc)', async function() {
      // Create a document and download it
      const createResult = await client.apis.docs.createDoc({ workspaceId: sourceWorkspaceId }, {
        requestBody: { name: 'ToExport_' + Date.now() }
      });
      const docId = createResult.body;

      // Download as .grist file (returns Blob)
      const downloadResult = await client.apis.docs.downloadDoc({ docId });
      const fileBlob = downloadResult.data;

      // swagger-client needs a File object (not just Blob) for multipart uploads
      const file = new File([fileBlob], 'document.grist', { type: 'application/x-sqlite3' });

      const importResult = await client.apis.docs.importDoc(
        { workspaceId: targetWorkspaceId },
        { requestBody: { upload: file } }
      );

      assert.equal(importResult.status, 200);
      assert.property(importResult.body, 'id');
    });
  });

  describe('Access Control', function() {
    let docId;
    let workspaceId;

    before(async function() {
      const orgsResult = await client.apis.orgs.listOrgs();
      const orgId = orgsResult.body[0].id;

      const wsResult = await client.apis.workspaces.createWorkspace({ orgId }, {
        requestBody: { name: 'AccessTest_' + Date.now() }
      });
      workspaceId = wsResult.body;

      const createResult = await client.apis.docs.createDoc({ workspaceId }, {
        requestBody: { name: 'AccessTestDoc_' + Date.now() }
      });
      docId = createResult.body;
    });

    it('should list document access', async function() {
      const result = await client.apis.docs.listDocAccess({ docId });

      assert.equal(result.status, 200);
      assert.property(result.body, 'users');
      assert.isArray(result.body.users);
      // Should have at least the owner
      assert.isAbove(result.body.users.length, 0);

      const owner = result.body.users.find(u => u.access === 'owners');
      assert.exists(owner);
    });

    it('should modify document access (add public access)', async function() {
      // Add public read access
      await client.apis.docs.modifyDocAccess({ docId }, {
        requestBody: {
          delta: {
            users: {
              'everyone@getgrist.com': 'viewers'
            }
          }
        }
      });

      // Verify the change
      const result = await client.apis.docs.listDocAccess({ docId });
      const publicUser = result.body.users.find(u => u.email === 'everyone@getgrist.com');
      assert.exists(publicUser);
      assert.equal(publicUser.access, 'viewers');
    });

    it('should remove document access', async function() {
      // Remove public access
      await client.apis.docs.modifyDocAccess({ docId }, {
        requestBody: {
          delta: {
            users: {
              'everyone@getgrist.com': null
            }
          }
        }
      });

      // Verify removed
      const result = await client.apis.docs.listDocAccess({ docId });
      const publicUser = result.body.users.find(u => u.email === 'everyone@getgrist.com');
      assert.isUndefined(publicUser);
    });
  });

  describe('applyUserActions (batch operations)', function() {
    let docId;

    before(async function() {
      const createResult = await client.apis.docs.createDocUnified({}, {
        requestBody: { name: 'ActionsTest_' + Date.now() }
      });
      docId = createResult.body;
    });

    it('should apply multiple actions in a single call', async function() {
      // Create table and add records in one batch
      const result = await client.apis.docs.applyUserActions({ docId }, {
        requestBody: [
          ['AddTable', 'BatchTable', [
            { id: 'Name', type: 'Text' },
            { id: 'Value', type: 'Int' }
          ]],
          ['AddRecord', 'BatchTable', null, { Name: 'First', Value: 100 }],
          ['AddRecord', 'BatchTable', null, { Name: 'Second', Value: 200 }]
        ]
      });

      assert.equal(result.status, 200);
      assert.property(result.body, 'actionNum');
      assert.property(result.body, 'retValues');
      assert.lengthOf(result.body.retValues, 3);

      // Verify table and records exist
      const tables = await client.apis.tables.listTables({ docId });
      assert.include(tables.body.tables.map(t => t.id), 'BatchTable');

      const records = await client.apis.records.listRecords({ docId, tableId: 'BatchTable' });
      assert.lengthOf(records.body.records, 2);
    });

    it('should support bulk operations', async function() {
      // Bulk add records
      const result = await client.apis.docs.applyUserActions({ docId }, {
        requestBody: [
          ['BulkAddRecord', 'BatchTable', [null, null, null], {
            Name: ['Third', 'Fourth', 'Fifth'],
            Value: [300, 400, 500]
          }]
        ]
      });

      assert.equal(result.status, 200);

      // Verify all records
      const records = await client.apis.records.listRecords({ docId, tableId: 'BatchTable' });
      assert.lengthOf(records.body.records, 5);
    });
  });

  describe('Attachments', function() {
    let docId;

    before(async function() {
      const createResult = await client.apis.docs.createDocUnified({}, {
        requestBody: { name: 'AttachmentsTest_' + Date.now() }
      });
      docId = createResult.body;
    });

    it('should list attachments with correct response structure', async function() {
      const result = await client.apis.attachments.listAttachments({ docId });

      assert.equal(result.status, 200);
      // Validate AttachmentsList schema
      assert.property(result.body, 'records');
      assert.isArray(result.body.records);
      // New doc should have no attachments
      assert.lengthOf(result.body.records, 0);

      // The records array would contain objects with id and fields when populated
      // Each record would have fields: fileName, fileSize, timeUploaded
    });

    it('should return 404 for non-existent attachment', async function() {
      try {
        await client.apis.attachments.getAttachmentMetadata({ docId, attachmentId: 99999 });
        assert.fail('Should have thrown');
      } catch (err) {
        assert.equal(err.status, 404);
      }
    });

    it('should upload, list, and download an attachment', async function() {
      const testContent = 'Hello, this is test attachment content!';
      const file = new File([testContent], 'test.txt', { type: 'text/plain' });

      // Upload the attachment
      const uploadResult = await client.apis.attachments.uploadAttachments(
        { docId },
        { requestBody: { upload: [file] } }
      );

      assert.equal(uploadResult.status, 200);
      assert.isArray(uploadResult.body);
      assert.lengthOf(uploadResult.body, 1);
      const attachmentId = uploadResult.body[0];
      assert.isNumber(attachmentId);

      // Verify it appears in list
      const listResult = await client.apis.attachments.listAttachments({ docId });
      assert.lengthOf(listResult.body.records, 1);
      const record = listResult.body.records[0];
      assert.equal(record.id, attachmentId);
      assert.equal(record.fields.fileName, 'test.txt');
      assert.isNumber(record.fields.fileSize);

      // Get metadata
      const metaResult = await client.apis.attachments.getAttachmentMetadata({ docId, attachmentId });
      assert.equal(metaResult.status, 200);
      assert.equal(metaResult.body.fileName, 'test.txt');

      // Download the attachment
      const downloadResult = await client.apis.attachments.downloadAttachment({ docId, attachmentId });
      assert.equal(downloadResult.status, 200);
      // Text content comes as string, binary as Blob
      const downloadedContent = typeof downloadResult.data === 'string'
        ? downloadResult.data
        : await downloadResult.data.text();
      assert.equal(downloadedContent, testContent);
    });

    it('should upload multiple attachments at once', async function() {
      const file1 = new File(['Content 1'], 'file1.txt', { type: 'text/plain' });
      const file2 = new File(['Content 2'], 'file2.txt', { type: 'text/plain' });

      const uploadResult = await client.apis.attachments.uploadAttachments(
        { docId },
        { requestBody: { upload: [file1, file2] } }
      );

      assert.equal(uploadResult.status, 200);
      assert.isArray(uploadResult.body);
      assert.lengthOf(uploadResult.body, 2);
    });
  });

  // Note: Snapshots require a versioned S3-compatible external store to be meaningful.
  // Without external storage, snapshots are trivial/not available.
  // These tests validate the API structure but may have limited data.
  describe('Snapshots and States', function() {
    let docId;

    before(async function() {
      const createResult = await client.apis.docs.createDocUnified({}, {
        requestBody: { name: 'SnapshotTest_' + Date.now() }
      });
      docId = createResult.body;

      // Make some changes to create history
      await client.apis.tables.addTables({ docId }, {
        requestBody: {
          tables: [{ id: 'History', columns: [{ id: 'Event', fields: { type: 'Text' } }] }]
        }
      });
    });

    it('should return snapshots with valid structure', async function() {
      const result = await client.apis.docs.listSnapshots({ docId });

      assert.equal(result.status, 200);
      assert.isArray(result.body.snapshots);
      assert.isAbove(result.body.snapshots.length, 0);

      const snapshot = result.body.snapshots[0];
      assert.property(snapshot, 'snapshotId');
      assert.isString(snapshot.snapshotId);
      assert.property(snapshot, 'lastModified');
      assert.isString(snapshot.lastModified);
      assert.equal(snapshot.docId, docId);
    });

    it('should return states tracking document history', async function() {
      const result = await client.apis.docs.getStates({ docId });

      assert.equal(result.status, 200);
      assert.isArray(result.body.states);
      assert.isAbove(result.body.states.length, 0);

      const state = result.body.states[0];
      assert.property(state, 'n');
      assert.isNumber(state.n);
      assert.property(state, 'h');
      assert.isString(state.h);
    });

    it('should remove a snapshot via removeSnapshots', async function() {
      // Get current snapshots
      const listResult = await client.apis.docs.listSnapshots({ docId });
      const initialCount = listResult.body.snapshots.length;

      if (initialCount < 2) {
        // Need at least 2 snapshots to test removal while keeping one
        this.skip();
      }

      const snapshotToRemove = listResult.body.snapshots[1].snapshotId;

      // Remove the snapshot
      const result = await client.apis.docs.removeSnapshots({ docId }, {
        requestBody: {
          snapshotIds: [snapshotToRemove]
        }
      });

      assert.equal(result.status, 200);

      // Verify removal
      const afterResult = await client.apis.docs.listSnapshots({ docId });
      const stillExists = afterResult.body.snapshots.find(s => s.snapshotId === snapshotToRemove);
      assert.isUndefined(stillExists);
    });

    it('should compare document versions via compareVersions', async function() {
      // Get states to find version hashes
      const statesResult = await client.apis.docs.getStates({ docId });

      if (statesResult.body.states.length < 2) {
        this.skip();
      }

      const leftHash = statesResult.body.states[1].h;
      const rightHash = statesResult.body.states[0].h;

      const result = await client.apis.docs.compareVersions({
        docId,
        left: leftHash,
        right: rightHash
      });

      assert.equal(result.status, 200);
      assert.property(result.body, 'left');
      assert.property(result.body, 'right');
    });

    it('should compare two documents via compareDocuments', async function() {
      // Create a second document to compare
      const doc2Result = await client.apis.docs.createDocUnified({}, {
        requestBody: { name: 'CompareTarget_' + Date.now() }
      });
      const docId2 = doc2Result.body;

      const result = await client.apis.docs.compareDocuments({ docId, docId2 });

      assert.equal(result.status, 200);
      assert.property(result.body, 'left');
      assert.property(result.body, 'right');
      assert.property(result.body, 'summary');
    });

    it('should truncate action history via deleteActions', async function() {
      // Get current states count
      const beforeStates = await client.apis.docs.getStates({ docId });
      const beforeCount = beforeStates.body.states.length;

      if (beforeCount < 2) {
        this.skip();
      }

      // Truncate to keep only latest action
      const result = await client.apis.docs.deleteActions({ docId }, {
        requestBody: { keep: 1 }
      });

      assert.equal(result.status, 200);

      // Verify states were truncated
      const afterStates = await client.apis.docs.getStates({ docId });
      assert.isAtMost(afterStates.body.states.length, beforeCount);
    });
  });

  describe('Timing', function() {
    let docId;

    before(async function() {
      const createResult = await client.apis.docs.createDocUnified({}, {
        requestBody: { name: 'TimingTest_' + Date.now() }
      });
      docId = createResult.body;
    });

    it('should track timing state transitions', async function() {
      // Initially disabled
      let status = await client.apis.docs.getTimingStatus({ docId });
      assert.equal(status.body.status, 'disabled');

      // Start timing
      await client.apis.docs.startTiming({ docId }, { requestBody: {} });
      status = await client.apis.docs.getTimingStatus({ docId });
      assert.equal(status.body.status, 'active');

      // Stop timing
      await client.apis.docs.stopTiming({ docId }, { requestBody: {} });
      status = await client.apis.docs.getTimingStatus({ docId });
      assert.equal(status.body.status, 'disabled');
    });
  });

  describe('Document Operations', function() {
    let docId;

    before(async function() {
      const createResult = await client.apis.docs.createDocUnified({}, {
        requestBody: { name: 'DocOpsTest_' + Date.now() }
      });
      docId = createResult.body;

      // Add some data to make flush meaningful
      await client.apis.records.addRecords({ docId, tableId: 'Table1' }, {
        requestBody: { records: [{ fields: { A: 'test data' } }] }
      });
    });

    it('should flush document to storage (flushDoc)', async function() {
      const result = await client.apis.docs.flushDoc({ docId });

      assert.equal(result.status, 200);
      // Returns boolean indicating if document was flushed
      assert.isBoolean(result.body);

      // Verify data persists after flush
      const records = await client.apis.records.listRecords({ docId, tableId: 'Table1' });
      assert.isAbove(records.body.records.length, 0);
    });

    it('should force reload document (forceReload)', async function() {
      // Add more data before reload
      await client.apis.records.addRecords({ docId, tableId: 'Table1' }, {
        requestBody: { records: [{ fields: { A: 'before reload' } }] }
      });

      const result = await client.apis.docs.forceReload({ docId });
      assert.equal(result.status, 200);

      // Verify document is accessible and data persists after reload
      const records = await client.apis.records.listRecords({ docId, tableId: 'Table1' });
      assert.equal(records.status, 200);
      const values = records.body.records.map(r => r.fields.A);
      assert.include(values, 'before reload');
    });
  });

  describe('SQL API', function() {
    let docId;

    before(async function() {
      const createResult = await client.apis.docs.createDocUnified({}, {
        requestBody: { name: 'SqlTest_' + Date.now() }
      });
      docId = createResult.body;

      // Add a table with data for SQL queries
      await client.apis.tables.addTables({ docId }, {
        requestBody: {
          tables: [{
            id: 'Products',
            columns: [
              { id: 'Name', fields: { type: 'Text' } },
              { id: 'Price', fields: { type: 'Numeric' } }
            ]
          }]
        }
      });

      await client.apis.records.addRecords({ docId, tableId: 'Products' }, {
        requestBody: {
          records: [
            { fields: { Name: 'Apple', Price: 1.50 } },
            { fields: { Name: 'Banana', Price: 0.75 } },
            { fields: { Name: 'Cherry', Price: 3.00 } }
          ]
        }
      });
    });

    it('should run SQL query via GET (runSqlGet)', async function() {
      const result = await client.apis.sql.runSqlGet({
        docId,
        q: 'SELECT * FROM Products'
      });

      assert.equal(result.status, 200);
      // Validate SqlResultSet schema
      assert.property(result.body, 'statement');
      assert.property(result.body, 'records');
      assert.isArray(result.body.records);
      assert.lengthOf(result.body.records, 3);

      // Check record structure
      const record = result.body.records[0];
      assert.property(record, 'fields');
      assert.property(record.fields, 'Name');
      assert.property(record.fields, 'Price');
    });

    it('should run SQL query via POST with parameters (runSql)', async function() {
      const result = await client.apis.sql.runSql({ docId }, {
        requestBody: {
          sql: 'SELECT * FROM Products WHERE Price > ?',
          args: [1.00]
        }
      });

      assert.equal(result.status, 200);
      assert.property(result.body, 'records');
      assert.isArray(result.body.records);
      // Should return Apple (1.50) and Cherry (3.00)
      assert.lengthOf(result.body.records, 2);

      const names = result.body.records.map(r => r.fields.Name);
      assert.include(names, 'Apple');
      assert.include(names, 'Cherry');
      assert.notInclude(names, 'Banana');
    });

    it('should return error for invalid SQL', async function() {
      try {
        await client.apis.sql.runSql({ docId }, {
          requestBody: {
            sql: 'DROP TABLE Products'
          }
        });
        assert.fail('Should have thrown');
      } catch (err) {
        assert.equal(err.status, 400);
      }
    });
  });

  describe('Webhooks API', function() {
    let orgId;
    let workspaceId;
    let docId;
    let webhookId;

    before(async function() {
      // Webhooks require a saved document in a workspace (not an unsaved copy)
      const orgsResult = await client.apis.orgs.listOrgs();
      orgId = orgsResult.body[0].id;

      const wsResult = await client.apis.workspaces.createWorkspace({ orgId }, {
        requestBody: { name: 'WebhookTests_' + Date.now() }
      });
      workspaceId = wsResult.body;

      const createResult = await client.apis.docs.createDoc({ workspaceId }, {
        requestBody: { name: 'WebhookTest_' + Date.now() }
      });
      docId = createResult.body;
    });

    it('should list webhooks (empty initially)', async function() {
      const result = await client.apis.webhooks.listWebhooks({ docId });

      assert.equal(result.status, 200);
      assert.property(result.body, 'webhooks');
      assert.isArray(result.body.webhooks);
      assert.lengthOf(result.body.webhooks, 0);
    });

    it('should create a webhook', async function() {
      const result = await client.apis.webhooks.createWebhooks({ docId }, {
        requestBody: {
          webhooks: [{
            fields: {
              url: 'http://localhost:9999/webhook-test',
              eventTypes: ['add', 'update'],
              tableId: 'Table1'
            }
          }]
        }
      });

      assert.equal(result.status, 200);
      assert.property(result.body, 'webhooks');
      assert.isArray(result.body.webhooks);
      assert.lengthOf(result.body.webhooks, 1);
      assert.property(result.body.webhooks[0], 'id');
      webhookId = result.body.webhooks[0].id;
    });

    it('should list webhooks after creation', async function() {
      const result = await client.apis.webhooks.listWebhooks({ docId });

      assert.equal(result.status, 200);
      assert.lengthOf(result.body.webhooks, 1);

      const webhook = result.body.webhooks[0];
      assert.equal(webhook.id, webhookId);
      assert.property(webhook, 'fields');
    });

    it('should modify a webhook', async function() {
      const result = await client.apis.webhooks.modifyWebhook({ docId, webhookId }, {
        requestBody: {
          enabled: false
        }
      });

      assert.equal(result.status, 200);

      // Verify the webhook was modified
      const listResult = await client.apis.webhooks.listWebhooks({ docId });
      const webhook = listResult.body.webhooks.find(w => w.id === webhookId);
      assert.equal(webhook.fields.enabled, false);
    });

    it('should delete a webhook', async function() {
      const result = await client.apis.webhooks.deleteWebhook({ docId, webhookId });

      assert.equal(result.status, 200);
      assert.property(result.body, 'success');
      assert.equal(result.body.success, true);

      // Verify deletion
      const listResult = await client.apis.webhooks.listWebhooks({ docId });
      assert.lengthOf(listResult.body.webhooks, 0);
    });
  });

  describe('Service Accounts API', function() {
    let serviceAccountId;

    it('should list service accounts', async function() {
      const result = await client.apis['service accounts'].listServiceAccounts();
      assert.equal(result.status, 200);
      assert.isArray(result.body);
    });

    it('should create a service account', async function() {
      // expiresAt is required - set to 1 year from now
      const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
      const result = await client.apis['service accounts'].createServiceAccount({}, {
        requestBody: {
          label: 'Test Service Account ' + Date.now(),
          description: 'Created by API test',
          expiresAt
        }
      });

      assert.equal(result.status, 200);
      assert.property(result.body, 'id');
      assert.property(result.body, 'key');  // API key returned on creation
      serviceAccountId = result.body.id;
    });

    it('should get service account details', async function() {
      const result = await client.apis['service accounts'].getServiceAccount({
        saId: serviceAccountId
      });

      assert.equal(result.status, 200);
      assert.equal(result.body.id, serviceAccountId);
    });

    it('should modify a service account', async function() {
      const newLabel = 'Updated Service Account ' + Date.now();
      const result = await client.apis['service accounts'].modifyServiceAccount(
        { saId: serviceAccountId },
        { requestBody: { label: newLabel } }
      );

      assert.equal(result.status, 200);
      // Response is empty on success - verify by fetching the updated account
      const getResult = await client.apis['service accounts'].getServiceAccount({
        saId: serviceAccountId
      });
      assert.equal(getResult.body.label, newLabel);
    });

    it('should delete a service account', async function() {
      const result = await client.apis['service accounts'].deleteServiceAccount({
        saId: serviceAccountId
      });

      assert.equal(result.status, 200);

      // Verify deletion - should return 404
      try {
        await client.apis['service accounts'].getServiceAccount({
          saId: serviceAccountId
        });
        assert.fail('Should have thrown 404');
      } catch (err) {
        assert.equal(err.status, 404);
      }
    });
  });

  describe('Error handling', function() {
    it('should return 404 for non-existent document', async function() {
      try {
        await client.apis.docs.describeDoc({ docId: 'nonexistent-doc-12345' });
        assert.fail('Should have thrown');
      } catch (err) {
        assert.equal(err.status, 404);
      }
    });

    it('should return 404 for non-existent table', async function() {
      const createResult = await client.apis.docs.createDocUnified({}, {
        requestBody: {}
      });
      const docId = createResult.body;

      try {
        await client.apis.records.listRecords({ docId, tableId: 'NonExistentTable' });
        assert.fail('Should have thrown');
      } catch (err) {
        assert.equal(err.status, 404);
      }
    });
  });
});
