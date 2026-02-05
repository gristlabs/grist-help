/**
 * Shared test helpers and utilities
 */

const { execSync } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const SwaggerClient = require('swagger-client');

const GRIST_PORT = 8485;
const GRIST_HOST = `http://localhost:${GRIST_PORT}`;
const CONTAINER_NAME = 'grist-api-test';
const API_KEY = 'api_key_for_support';

// Loaded OpenAPI spec and client (initialized in createClient)
let spec = null;
let client = null;

/**
 * Load the OpenAPI spec from grist.yml
 */
function loadSpec() {
  if (!spec) {
    const specPath = path.join(__dirname, '..', 'grist.yml');
    const specContent = fs.readFileSync(specPath, 'utf8');
    spec = yaml.load(specContent);

    // Update the server URL to point to our test instance
    // The spec paths don't include /api since it's in the server URL
    spec.servers = [{ url: `${GRIST_HOST}/api` }];
  }
  return spec;
}

/**
 * Create the Swagger client from the spec
 */
async function createClient() {
  if (!client) {
    const spec = loadSpec();
    client = await SwaggerClient({
      spec,
      authorizations: {
        ApiKey: {
          value: API_KEY
        }
      }
    });
  }
  return client;
}

/**
 * Get the current client (must call createClient first)
 */
function getClient() {
  if (!client) {
    throw new Error('Client not initialized - call createClient() first');
  }
  return client;
}

/**
 * Start the Grist Docker container
 */
function startGrist() {
  // Clean up any existing test container
  try {
    execSync(`docker rm -f ${CONTAINER_NAME}`, { stdio: 'ignore' });
  } catch (e) {
    // Container didn't exist, that's fine
  }

  console.log('Starting Grist container...');
  execSync(
    `docker run -d --name ${CONTAINER_NAME} ` +
    `-p ${GRIST_PORT}:8484 ` +
    `-e GRIST_TEST_LOGIN=1 ` +
    `-e TEST_SUPPORT_API_KEY=${API_KEY} ` +
    `-e GRIST_WIDGET_LIST_URL=https://github.com/gristlabs/grist-widget/releases/download/latest/manifest.json ` +
    `-e GRIST_ENABLE_SERVICE_ACCOUNTS=1 ` +
    `-e ALLOWED_WEBHOOK_DOMAINS=* ` +
    `-e GRIST_TEMPLATE_ORG=templates ` +
    `gristlabs/grist`,
    { stdio: 'inherit' }
  );
}

/**
 * Stop and remove the Grist Docker container
 */
function stopGrist() {
  console.log('Stopping Grist container...');
  try {
    execSync(`docker rm -f ${CONTAINER_NAME}`, { stdio: 'ignore' });
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Wait for Grist to respond to requests
 */
async function waitForGrist(maxAttempts = 30) {
  console.log('Waiting for Grist to be ready...');
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await httpGet(`${GRIST_HOST}/api/session/access/active`);
      if (response.status === 200) {
        console.log('Grist is ready');
        return;
      }
    } catch (e) {
      // Ignore connection errors while waiting
    }
    await sleep(2000);
  }
  throw new Error('Grist did not become ready in time');
}

/**
 * HTTP GET request (low-level, for waiting/health checks)
 */
function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let body;
        try {
          body = JSON.parse(data);
        } catch (e) {
          body = data;
        }
        resolve({ status: res.statusCode, body });
      });
    }).on('error', reject);
  });
}

/**
 * HTTP POST request (low-level, kept for compatibility)
 */
function httpPost(url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const postData = JSON.stringify(data);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        let body;
        try {
          body = JSON.parse(responseData);
        } catch (e) {
          body = responseData;
        }
        resolve({ status: res.statusCode, body });
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  GRIST_HOST,
  CONTAINER_NAME,
  startGrist,
  stopGrist,
  waitForGrist,
  loadSpec,
  createClient,
  getClient,
  httpGet,
  httpPost,
  sleep,
};
