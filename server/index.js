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


//traditional
app.post('/traditional', (req, res) => {
  tweetSearch(req.body,(count) => {
    db.save(count, 'traditional');
    res.send();
  })
});

app.get('/traditional', (req, res) => {
  db.find('traditional', (dataFromMongo) => {
    console.log('the count returned to the server form the db', dataFromMongo[0].count)
    res.json(dataFromMongo[0].count);
  })
})


//sabr
app.post('/sabr', (req, res) => {
  console.log('sabr req body in server', req.body)
  tweetSearch(req.body,(count) => {
    db.save(count, 'sabr');
    res.send();
  })
});

app.get('/sabr', (req, res) => {
  db.find('sabr', (dataFromMongo) => {
    // console.log('the count returned to the server form the db', dataFromMongo[0].count)
    // res.json(dataFromMongo[0].count);
  })
})


//statcast
app.post('/statcast', (req, res) => {
  tweetSearch(req.body,(count) => {
    db.save(count, 'statcast');
    res.send();
  })
});

app.get('/statcast', (req, res) => {
  db.find('statcast', (dataFromMongo) => {
    console.log('the count returned to the server form the db', dataFromMongo[0].count)
    res.json(dataFromMongo[0].count);
  })
})



//listener
app.listen(port, () => {
  console.log(`listening on port ${port}`);
})