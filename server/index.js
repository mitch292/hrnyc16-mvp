const express = require('express');
const db = require('../database/index.js');
const bodyParse = require('body-parser');
const cors = require('cors');
const tweetSearch = require('../utils/searchTwitter.js').tweetSearch;

let app = express();
let port = process.env.PORT || 8080;

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
    res.json(dataFromMongo[0].count);
  })
})
//historical table
app.post('/history/traditional', (req, res) => {
  objToSave = {
    date: req.body.today,
    count: req.body.count.data,
    era: 'traditional'
  }
  db.historicalSave(objToSave, 'traditional');
  res.send();
});
//delete old data
app.get('/delete/traditional', (req, res) =>{
  db.delete('traditionals')
  res.send();
});


//sabr
app.post('/sabr', (req, res) => {
  tweetSearch(req.body,(count) => {
    db.save(count, 'sabr');
    res.send();
  })
});

app.get('/sabr', (req, res) => {
  db.find('sabr', (dataFromMongo) => {
    res.json(dataFromMongo[0].count);
  })
})
//historical table
app.post('/history/sabr', (req, res) => {
  console.log('the request body', req.body);
  objToSave = {
    date: req.body.today,
    count: req.body.count.data,
    era: 'sabr'
  }
  db.historicalSave(objToSave, 'sabr');
  res.send();
});
//delete old data
app.get('/delete/sabr', (req, res) =>{
  db.delete('sabreras')
  res.send();
});


//statcast
app.post('/statcast', (req, res) => {
  tweetSearch(req.body,(count) => {
    db.save(count, 'statcast');
    res.send();
  })
});

app.get('/statcast', (req, res) => {
  db.find('statcast', (dataFromMongo) => {
    res.json(dataFromMongo[0].count);
  })
})

app.post('/history/statcast', (req, res) => {
  console.log('the request body', req.body);
  objToSave = {
    date: req.body.today,
    count: req.body.count.data,
    era: 'statcast'
  }
  db.historicalSave(objToSave, 'statcast');
  res.send();
});

app.get('/delete/statcast', (req, res) =>{
  db.delete('statcasts')
  res.send();
});




//listener
app.listen(port, () => {
  console.log(`listening on port ${port}`);
})