# API Tests

Tests for verifying Grist API endpoints match the documentation in `grist.yml`.

## Prerequisites

- Docker installed and running
- Node.js 16+

## Running Tests

```bash
npm install   # from repo root, if not already done
npm test
```

## Structure

```
api/test/
├── helpers.js        # Shared utilities (HTTP helpers, container management)
├── hooks.js          # Mocha root hooks (start/stop container once for all tests)
├── orgs.test.js      # Tests for /api/orgs endpoints
├── docs.test.js      # Tests for /api/docs endpoints
├── profile.test.js   # Tests for /api/profile endpoints
├── templates.test.js # Tests for /api/templates endpoints
└── widgets.test.js   # Tests for /api/widgets endpoints
```

## How It Works

- `hooks.js` starts a Grist Docker container before all tests and stops it after
- Each `*.test.js` file contains tests for a specific API area
- Tests verify response schemas match what's documented in `grist.yml`

The container is configured with:
- `GRIST_TEST_LOGIN=1` - Test login mode with support API key
- `GRIST_TEMPLATE_ORG=templates` - Enable template API (org domain is set via API at startup)
- `GRIST_ENABLE_SERVICE_ACCOUNTS=1` - Enable service account API
- `ALLOWED_WEBHOOK_DOMAINS=*` - Enable webhook API testing
