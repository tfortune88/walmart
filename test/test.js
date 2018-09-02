
const assert = require('assert');
const server = require('../server.js');
const request = require('request');
const sleep = require('sleep');

// Give the server a chance to start
console.log("Let the Server Startup Complete...")
sleep.sleep(3);

describe('API Test', function() {
  describe('/product/bedding', function() {
    it('should return 200', function() {
      request('http://localhost:8000/product/bedding', function (error, response, body) {
        assert.equal(response && response.statusCode, 200);
      });      
    });
  });
  describe('/product/bed', function() {
    it('should return 404 - only store words 4 characters or greater', function() {
      request('http://localhost:8000/product/bed', function (error, response, body) {
        assert.equal(response && response.statusCode, 404);
      });      
    });
  });
  describe('/product/tommyfortune', function() {
    it('should return 404 - not a keyword', function() {
      request('http://localhost:8000/product/tommyfortune', function (error, response, body) {
        assert.equal(response && response.statusCode, 404);
      });      
    });
  });
  describe('/product/', function() {
    it('should return 400 - invalid URL', function() {
      request('http://localhost:8000/product/', function (error, response, body) {
        assert.equal(response && response.statusCode, 400);
      });      
    });
  });
});

