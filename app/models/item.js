'use strict';


function Item(name, room, dateAcquired, count, cost){
  this.name = name;
  this.room = room;
  this.dateAcquired = new Date(dateAcquired);
  this.count = parseInt(count);
  this.cost = parseFloat(cost);
}

module.exports = Item;
