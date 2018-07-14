const localConfig = require('../config.js');
let config;
const prodConfig = {
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  callBackUrl: process.env.APP_URL} || localConfig;
  const Twitter = require('twitter-node-client').Twitter;
  
if (prodConfig.consumerKey === undefined) {
  config = localConfig;
} else {
  config = prodConfig;
}


console.log('config', config)
console.log('local config', localConfig);
const twitter = new Twitter(config);

let error = (err, response, body) => {
  console.log('error:', err)
}

let tweetSearch = ({query}, callback) => {
  twitter.getSearch({'q': query, 'count': 100}, error, (data) => {
    let count = 0
    let parsedData = JSON.parse(data);
    count = parsedData.statuses.length;
    callback(count);
  });
}



exports.tweetSearch = tweetSearch;






