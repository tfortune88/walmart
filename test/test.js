
const assert = require('assert');
const server = require('../server.js');
const request = require('request');
const sleep = require('sleep');

// TODO: Start the server with a test file instead of full CSV file

describe('API', function() {
  describe('#/product/{keyword}', function() {
    it('should return 200', function() {
      sleep.sleep(1);
      request('http://localhost:8000/product/bedding', function (error, response, body) {
        assert.equal(response && response.statusCode, 200);
      });      
    });
    it('should return 404', function() {
      sleep.sleep(1);
      request('http://localhost:8000/product/tommyfortune', function (error, response, body) {
        assert.equal(response && response.statusCode, 404);
      });      
    });
  });
});

