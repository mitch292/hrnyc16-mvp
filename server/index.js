const express = require('express');
const db = require('../database/index.js');
const bodyParse = require('body-parser');
const cors = require('cors');
const tweetSearch = require('../utils/searchTwitter.js').tweetSearch;

let app = express();
let port = 8080;

//middleware
app.use(express.static(__dirname + '/../client/dist/'));
app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());
app.use(cors());

//set up my routes

app.post('/traditional', (req, res) => {

});

app.post('/sabr', (req, res) => {

});

app.post('/statcast', (req, res) => {
  console.log('in the server post function')
  console.log('request body in the server', req.body)
  return tweetSearch(req.body)
    .then((response) => {
      console.log('response in the server', response)
      res.send(response);
    })

});

app.get('/datadump', (req, res) => {

})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})