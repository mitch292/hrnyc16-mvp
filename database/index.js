const mongoose = require('mongoose');
const hmacsha1 = require('hmacsha1');
let connectionLink = process.env.MONGODB_URI || 'mongodb://localhost/hrmvp'
mongoose.connect(connectionLink);

let traditionalEraSchema = mongoose.Schema({
  count: Number,
  verified: Boolean
});

let sabrEraSchema = mongoose.Schema({
  count: Number,
  verified: Boolean
});

let statcastEraSchema = mongoose.Schema({
  count: Number,
  verified: Boolean
});

let countSchema = mongoose.Schema({
  id: {type: String, unique: true},
  date: String,
  count: Number,
  era: String
});

let Traditional = mongoose.model('Traditional', traditionalEraSchema);
let SabrEra = mongoose.model('SabrEra', sabrEraSchema);
let Statcast = mongoose.model('Statcast', statcastEraSchema);
let History = mongoose.model('History', countSchema);



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
    let newData = new Traditional({
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



let historicalSave = (dataToSave, category) => {

  let hash = hmacsha1(dataToSave.date, category);

  let newData = new History({
    id: hash,
    date: dataToSave.date,
    count: dataToSave.count,
    era: category
  });
  newData.save((err, success) => {
    if (err) {
      console.log('there was an error saving to mogno', err)
    }
  });
};





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



let clearCollection = (collection) => {
  console.log('in the clear collections function')
  mongoose.connection.db.dropCollection(collection, (err, succ) => {
    if (err) {
      console.log('there was an error deleteing the collection', err);
    } else {
      console.log('success deleting the collection');
    }
  })
}

exports.save = save;
exports.find = find;
exports.historicalSave = historicalSave;
exports.delete = clearCollection;