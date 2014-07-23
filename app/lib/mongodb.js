'use strict';

var MongoClient = require('mongodb').MongoClient;

function connect(name, cb){
  var url = 'mongodb://localhost/' + name;
  MongoClient.connect(url, function(err, db){
    global.mongodb = db;
    cb();
  });
}

module.exports = connect;
