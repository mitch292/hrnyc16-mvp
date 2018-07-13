const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hrmvp');

let traditionalEraSchema = mongoose.Schema({
  category: String,
  verified: Boolean
});

let sabrEraSchema = mongoose.Schema({
  category: String,
  verified: Boolean
});

let statcastEraSchema = mongoose.Schema({
  count: Number,
  verified: Boolean
});

let countSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  date: Date,
  category: String,
  verified: Boolean,
  era: String
});

let Traditional = mongoose.model('Traditional', traditionalEraSchema);
let SabrEra = mongoose.model('SabrEra', sabrEraSchema);
let Statcast = mongoose.model('Statcast', statcastEraSchema);

//TODO: function to save data to db
let save = (total, era) => {
  if (era === 'statcast') {
    let newData = new Statcast({
      count: total,
      verified: false
    });
    newData.save((err, success) => {
      if (err) {
        console.log('there was an error saving to mogno', err)
      }
    });
  } else if (era === 'sabr') {
    let newData = new SabrEra({
      count: total,
      verified: false
    });
    newData.save((err, success) => {
      if (err) {
        console.log('there was an error saving to mogno', err)
      }
    });
  } else if (era === 'traditional') {
    let newData = new SabrEra({
      count: total,
      verified: false
    });
    newData.save((err, success) => {
      if (err) {
        console.log('there was an error saving to mogno', err)
      }
    });
  } else {
    console.error('not a valid era to add to mongo')
  }

};

//TODO: function to post data to db
let find = (era, callback) => {
  if (era === 'statcast') {
    let results = Statcast.find();
    results.limit(1);
    results.select('count')
    results.exec((err, results) => {
      if (err) {
        console.error(err)
      } else {
        callback(results)
      }
    });
  } else if (era === 'sabr') {
    let results = SabrEra.find();
    results.limit(1);
    results.select('count')
    results.exec((err, results) => {
      if (err) {
        console.error(err)
      } else {
        callback(results)
      }
    });
  } else if (era === 'traditional') {
    let results = Traditional.find();
    results.limit(1);
    results.select('count')
    results.exec((err, results) => {
      if (err) {
        console.error(err)
      } else {
        callback(results)
      }
    });
  } else {
    console.error('invalid find era')
  }
};

exports.save = save;
exports.find = find;