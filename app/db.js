'use strict';

const mongoose = require('mongoose');

module.exports = function(callback) {

  mongoose.connect('mongodb://localhost/testConnection');

  mongoose.connection.on('open', function(ref) {
    console.log('Connected to mongo server.');
    callback();
  });

  mongoose.connection.on('error', function(err) {
    console.log('Could not connect to the mongo server! \nError: %s', err);
  });
}
