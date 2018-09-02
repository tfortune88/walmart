# walmart
This is the Walmart Take Home Assignment

## Requirements
### Challange
Please see this list of item ids. Each id, represents a product in Walmart's catalogue. You are to write a REST search API that takes in a keyword and returns the list of products that have descriptions containing the keyword. A sample keyword would be backpack and that should return 3 products, i.e. 35613901, 35813552, 23117408.

To get the metadata associated with each product, please use Walmart's Product API with the API key kjybrqfdgp3u4yv2qzcnjndj.

Below is a sample request

http://api.walmartlabs.com/v1/items/14225185?format=json&apiKey=kjybrqfdgp3u4yv2qzcnjndj
Please keep in mind that the API rate-limits requests. So, as opposed to making requests in parallel, prefer serial requests.

This is your chance show of your engineering best practices, such as well decomposed code, unit testing, documentation, clean commit messages, etc. So, feel free to take as much time as you need. Once you are done with your work, please send us a link to your repo.

## Assumptions
* Will only parse the short description from the Walmart API
* Will only store alphanumeric keys that are at least 4 characters long.

## Running
```bash
npm install
nmp start
```
## Accessing the API
From your browser:
http://localhost:8000/product/{keyword}
* Example: http://localhost:8000/product/bedding

From your terminal
```bash
curl http://localhost:8000/product/{keyword}
```
* Example: curl http://localhost:8000/product/bedding

#### Response if data is available
```HTTP
HTTP/1.1 200 OK
content-type: application/json; charset=utf-8
cache-control: no-cache
content-length: 31
accept-ranges: bytes
Date: Sat, 01 Sep 2018 23:31:23 GMT
Connection: keep-alive

{"itemIds":"40611825,36248492"}
```

#### Response if data is not available
```HTTP
HTTP/1.1 404 Not Found
content-type: application/json; charset=utf-8
cache-control: no-cache
content-length: 93
Date: Sat, 01 Sep 2018 23:33:18 GMT
Connection: keep-alive

{"statusCode":404,"error":"Not Found","message":"no products for that keyword are available"}
```

## Testing the API
Run: npm test

The test will fire up the server and make 2 calls
* Test #1 - 200 Response
* Test #2 - 404 Response

Also, should really improve the unit and coverage testing before production ready.
