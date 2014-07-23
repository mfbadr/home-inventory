/* jshint expr:true */
/* global describe, it */
'use strict';


var expect = require('chai').expect;
var Item = require('../../app/models/item');

describe('Item', function(){
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
});
