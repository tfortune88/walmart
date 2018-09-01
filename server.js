'use strict';

const Hapi=require('hapi');
const sync = require('sync-request');
const sleep = require('sleep');

var productMap = [];

const prodIds = [14225185,
14225186,
14225188,
14225187,
39082884,
30146244,
12662817,
34890820,
19716431,
42391766,
35813552,
40611708,
40611825,
36248492,
44109840,
23117408,
35613901,
42248076];

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8000
});

// Add the route
server.route({
    method:'GET',
    path:'/hello',
    handler:function(request,h) {

        return'hello world';
    }
});

// Store each word in the string in a map where the key is the word and the value are the product ids
function hashResults(aDescription, itemId) {
//   console.log('shortDesc: ' + aDescription);

  var strSplit = aDescription.split(" ");
  var itemIds;

  for (var i = 0; i < strSplit.length; i++) {
    // Only store strings larger the 2 chars
    if (strSplit[i].length < 3) continue;

    // console.log(strSplit[i]);
    itemIds = productMap[strSplit[i]];
    if (itemIds == null) {
        // console.log("empty");
        productMap[strSplit[i]] = itemId;
    } else {
        // console.log(itemIds);
        productMap[strSplit[i]] = itemIds + ',' + itemId;
    }
  }

};

// Load the data from the datafile
function init() {
  console.log("init start");

  for (var i = 0; i < prodIds.length; i++) {
    sleep.sleep(1);
    console.log(prodIds[i]);
    var res = sync('GET','http://api.walmartlabs.com/v1/items/' + prodIds[i] + '?format=json&apiKey=kjybrqfdgp3u4yv2qzcnjndj')
    // console.log('Downloaded ' + res.getBody().length + ' bytes');
    // console.log('Status Code: ' + res.statusCode);
    // console.log('Body:' + res.getBody());
    var jsonObject = JSON.parse(res.getBody());
    // console.log(JSON.stringify(jsonObject, null, 2));
    // console.log(jsonObject.shortDescription);
    hashResults(jsonObject.shortDescription, jsonObject.itemId);
  }

  for (var x in productMap) {
    console.log("key: " + x + " -- value: " + productMap[x]);
  }

  console.log("init end");
};

// Start the server
async function start() {

    try {
        init();
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
