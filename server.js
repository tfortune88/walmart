'use strict';

const Hapi=require('hapi');
const sync = require('sync-request');
const sleep = require('sleep');
const Boom = require('boom')

var productMap = [];

// FOR TESTING ONLY
const testIds = [
    '14225185',
    '14225186'
];

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

server.route({
    method:'GET',
    path:'/product/{keyword}',
    handler:function(request,h) {
      var itemIds = productMap[encodeURIComponent(request.params.keyword).toLowerCase()];
      if (itemIds == null) {
          return Boom.notFound("no products for that keyword are available");
      }
      const data = { itemIds: itemIds };
      return h.response(data).code(200);
    }
});

// Store each word in the string in a map where the key is the word and the value are the product ids
function hashResults(aDescription, itemId) {
  var strSplit = aDescription.split(" ");
  var itemIds;

  for (var i = 0; i < strSplit.length; i++) {
    var aWord = cleanTheWord(strSplit[i]);

    // Only store strings larger the 3 chars
    if (aWord.length < 4) {
        continue;
    }

    itemIds = productMap[aWord];
    if (itemIds == null) {
        productMap[aWord] = itemId;
    } else {
        // Check to see if the id is already in the list before adding
        if (itemIds.toString().indexOf(itemId.toString()) > -1) {
            continue;
        }
        productMap[aWord] = itemIds + ',' + itemId;
    }
  }
};

// Strip out all non alpha numeric and force to lowercase
function cleanTheWord(dirtyWord) {
  var cleanedWord = dirtyWord.toLowerCase();
  cleanedWord = cleanedWord.replace(/\W/g, '');
  return cleanedWord;
};

// Load the data from the Walmart API into a Map before the server is ready to accept connections
function init(isProd) {
  console.log("init start");
  console.log('Prod: ' + isProd);
  
  var itemIds = testIds;

  if (isProd) {
    var fs = require('fs');
    itemIds = fs.readFileSync('data_file.csv').toString().split(",\n");
  }

  for (var i = 0; i < itemIds.length; i++) {
    console.log(itemIds[i]);
    
    // Use sync instead of request to serialize the requests to the Walmart API to stay of the the rev limiter
    var res = sync('GET','http://api.walmartlabs.com/v1/items/' + cleanTheWord(itemIds[i]) + '?format=json&apiKey=kjybrqfdgp3u4yv2qzcnjndj');
    
    // TODO: Handle Error here

    var jsonObject = JSON.parse(res.getBody());
    hashResults(jsonObject.shortDescription, jsonObject.itemId);
    
    // Need to sleep to stay off the rev limiter of the Walmart API
    sleep.sleep(1);
  }

  // Dump the Map
//   for (var x in productMap) {
//     console.log("key: " + x + " -- value: " + productMap[x]);
//   }

  console.log("init end");
};

// Start the server
async function start() {

    const args = process.argv;
    var prod = false;
    if (args[2] == 'prod') {
        prod = true;
    }

    try {
        init(prod);
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
