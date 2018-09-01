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

## Running
```bash
npm install
nmp start
```
## Accessing the API

