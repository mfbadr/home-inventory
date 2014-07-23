/* jshint expr:true */
/* global describe, it, before, beforeEach */
'use strict';

var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var Item;

describe('Item', function(){
  before(function(done){
    console.log('i am in the before block');
    connect('home-inventory-test', function(){
    Item = require('../../app/models/item');
      done();
    });
  });

  beforeEach(function(done){
    global.mongodb.collection('Items').remove(function(){
      done();
    });
  });

  describe('constructor', function(){
    it('should create an Item with proper attributes', function(){
      var couch = new Item('couch', 'living room', '5/3/2011', '1', '500');

      expect(couch).to.be.instanceof(Item);
      expect(couch.name).to.equal('couch');
      expect(couch.room).to.equal('living room');
      expect(couch.dateAcquired).to.be.instanceof(Date);
      expect(couch.count).to.equal(1);
      expect(couch.cost).to.equal(500);
      console.log(couch.dateAcquired);
    });
  });
  describe('#save', function(){
    it('should save an item to the mongo db', function(done){
      var couch = new Item('couch', 'living room', '5/3/2011', '1', '500');
      couch.save(function(){
        expect(couch._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('.find', function(){
    it('should find all items in the mongo db', function(done){
      var couch = new Item('couch', 'living room', '5/3/2011', '1', '500');
      couch.save(function(){
        Item.find({},function(items){
          expect(items).to.have.length(1);
          done();
        });
      });
    });
    it('should find a specfic object', function(done){
      var couch = new Item('couch', 'living room', '5/3/2011', '1', '500');
      var chair = new Item('chair', 'living room', '5/3/2011', '1', '500');
      var bed = new Item('bed', 'living room', '5/3/2011', '1', '500');
      couch.save( function(){
        bed.save( function(){
          chair.save(function(){
            Item.find( {name:'couch'}, function(items){
              expect(items).to.have.length(1);
              expect(couch._id).to.be.instanceof(Mongo.ObjectID);
              expect(bed._id).to.be.instanceof(Mongo.ObjectID);
              expect(chair._id).to.be.instanceof(Mongo.ObjectID);
              done();
            });
          });
        });
      });
    });
  });
  describe('#value', function(){
    it('should give the total value of an item', function(){
      var couch = new Item('couch', 'living room', '5/3/2011', '2', '500');
      var couchCost = couch.value();
      expect(couchCost).to.equal(1000);
    });
  }); 
  describe('.value', function(){
    it('should give the total value of all items', function(done){
      var couch1 = new Item('couch', 'bedroom', '5/3/2011', '3', '500');
      var chair1 = new Item('chair', 'bedroom', '5/3/2011', '1', '500');
      var bed1 = new Item('bed', 'bedroom', '5/3/2011', '1', '10');
      var couch = new Item('couch', 'living room', '5/3/2011', '1', '500');
      var chair = new Item('chair', 'living room', '5/3/2011', '1', '500');
      var bed = new Item('bed', 'living room', '5/3/2011', '1', '500');
      
      couch.save (function(){
        bed.save(function(){
          chair.save(function(){
            couch1.save(function(){
              bed1.save(function(){
                chair1.save(function(){
                  Item.value( {name:'couch'}, function(value){
                    expect(value).to.equal(2000);
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
