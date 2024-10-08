const http = require('http');
const assert = require('assert');
const server = require('./app');  // Import the server instance

function testHelloWorld() {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        assert.strictEqual(res.statusCode, 200, 'Expected status code 200');
        assert.strictEqual(data, 'Hello World', 'Expected response body to be "Hello World"');
        console.log('Test passed!');
      } catch (error) {
        console.error('Test failed:', error.message);
      } finally {
        // Close the server
        server.close(() => {
          console.log('Server closed');
        });
      }
    });
  });

  req.on('error', (error) => {
    console.error('Request error:', error.message);
    server.close();  // Ensure server is closed in case of error
  });

  req.end();
}

// Run the test
testHelloWorld();