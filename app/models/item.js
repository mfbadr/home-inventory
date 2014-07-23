'use strict';

var cItem = global.mongodb.collection('Items');
var _ = require('lodash');

function Item(name, room, dateAcquired, count, cost){
  this.name = name;
  this.room = room;
  this.dateAcquired = new Date(dateAcquired);
  this.count = parseInt(count);
  this.cost = parseFloat(cost);
}

Item.prototype.save = function(cb){
  cItem.save(this, function(err, obj){
  cb();
  });
};

Item.find = function(query, cb){
  cItem.find(query).toArray(function(err, items){
    cb(items);
  });
};

Item.prototype.value = function(){
  return (this.count * this.cost);
};

Item.value = function(query, cb){
  var totalValue = 0;
  Item.find( query, function(items){
    for( var i =0; i < items.length; i++){
      var item = items[i];
      item = _.create(Item.prototype, item); //using lodash to reroute prototype chain   
      totalValue += item.value();
    }
    cb(totalValue);
  });
};


module.exports = Item;
