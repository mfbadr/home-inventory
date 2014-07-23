/* jshint expr:true */
/* global describe, it, before */
'use strict';


var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');
var Item;

describe('Item', function(){
  before(function(done){
    console.log('i am in the before block');
    connect('home-inventory-test', function(){
    Item = require('../../app/models/item');
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
        expect(couch._id).to.be.ok;
        done();
      });
    });
  });
});
