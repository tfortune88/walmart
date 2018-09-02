
const assert = require('assert');
const server = require('../server.js');
const request = require('request');
const sleep = require('sleep');

// Give the server a chance to start
console.log("Let the Server Startup Complete...")
sleep.sleep(3);

describe('API', function() {
  describe('/product/bedding', function() {
    it('should return 200', function() {
      request('http://localhost:8000/product/bedding', function (error, response, body) {
        assert.equal(response && response.statusCode, 200);
      });      
    });
  });
  describe('/product/tommyfortune', function() {
    it('should return 404', function() {
      request('http://localhost:8000/product/tommyfortune', function (error, response, body) {
        assert.equal(response && response.statusCode, 404);
      });      
    });
  });
  describe('/product/', function() {
    it('should return 400', function() {
      request('http://localhost:8000/product/', function (error, response, body) {
        assert.equal(response && response.statusCode, 400);
      });      
    });
  });
});

