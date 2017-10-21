var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Moshe:ab456123@ds227325.mlab.com:27325/teachers', { useMongoClient: true });

module.exports = { mongoose };