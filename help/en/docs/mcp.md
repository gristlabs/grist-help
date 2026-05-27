---
title: "Grist MCP server"
---

Model Context Protocol (MCP) is a standard that makes it easier for AI models to access external data. With Grist's MCP server, AI tools gain the ability to work across your team sites and documents and do things like:

- list and search tables,
- read and query records, 
- add or update rows, 
- create new docs and tables,
- manage access rules, and lots more.

## Setting up the MCP server

### Prerequisites
TBD

### Universal URL
TBD

## Available tools

Currently, Grist's MCP server has the following capabilities:

| Name | Description | 
| - | - |
| <code>Sample tool</code> | Sample description |

## Examples

You can use the Grist MCP server to:

- **Query structured data in plain language:** "In my CRM doc, who has an open task due in the next 7 days?"
- **Bulk-update records:** "In my Deliveries doc, updated all dates to follow ISO 8601 formatting."
- **Start a document from scratch:** "Create a new doc called 'Reviewer Sandbox' with a Sample table that has the properly-typed columns: Name, Value, Created."
- **Audit and manage sharing:** "Show who has access to the Invoices doc and to the workspace it lives in."

## FAQ

### What does the Grist MCP server cost?
TBD

### How does the MCP server handle my data?
The server only accesses data explicitly requested by the user, and no data is stored beyond session requirements. Data transmission is encrypted (HTTPS/TLS).

### What does the "token expired" error mean?
TBD

### What does the "missing scope" error mean?
TBD

### What does the "doc not found" error mean?
TBD