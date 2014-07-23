'use strict';

var cItem = global.mongodb.collection('Items');

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
module.exports = Item;
