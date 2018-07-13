const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hrmvp');

let traditionalEraSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  category: String,
  verified: Boolean
});

let sabrEraSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  category: String,
  verified: Boolean
});

let statcastEraSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  category: String,
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
let SabrEra = mongoose.model('SabrEra', traditionalEraSchema);
let Statcast = mongoose.model('Statcast', traditionalEraSchema);

//TODO: function to save data to db
let save = () => {

};

//TODO: function to post data to db
let find = () => {

};

exports.save = save;
exports.find = find;