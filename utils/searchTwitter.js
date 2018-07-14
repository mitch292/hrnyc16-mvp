const db = require('../database/index.js');
const config = {
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  callBackUrl: process.env.APP_URL
} || require('../config.js');
const Twitter = require('twitter-node-client').Twitter;




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






