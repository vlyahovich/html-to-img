const {spawn} = require('child_process');
const request = require('request');
const test = require('tape-async');

const testBody = require('./testBody');

// Start the app
const env = Object.assign({}, process.env, {PORT: 5234});
const child = spawn('node', ['index.js'], {env});

const APP_ENDPOINT = 'http://127.0.0.1:5234';

// Wait until the server is ready
test('start server', async (assert) => {
    await new Promise((resolve, reject) => {
        child.stdout.once('data', () => resolve());
    });

    assert.end();
});

test('GET /', (assert) => {
    request(APP_ENDPOINT, (error, response, body) => {
        assert.equal(response.statusCode, 404);
        assert.end();
    });
});

test('GET /snapshot', (assert) => {
    request(APP_ENDPOINT + '/snapshot?url=https://google.com', (error, response, body) => {
        assert.ok(response.body);
        assert.equal(response.statusCode, 200);
        assert.end();
    });
});

test('POST /snapshot', (assert) => {
    request.post({
        url: APP_ENDPOINT + '/snapshot?url=https://google.com',
        headers: {
            'Content-Type': 'application/json'
        },
        json: true,
        body: testBody
    }, (error, response, body) => {
        assert.ok(response.body);
        assert.equal(response.statusCode, 200);
        assert.end();
    });
});

test('end', (assert) => {
    child.kill();

    assert.end();

    process.exit(0);
});