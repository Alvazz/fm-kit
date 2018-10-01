/**
 * Flashmoov
 * Flashmoov
 *
 * OpenAPI spec version: 2.0.0
 * Contact: tech@flashmoov.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.Flashmoov);
  }
}(this, function(expect, Flashmoov) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new Flashmoov.DateAndTime();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('DateAndTime', function() {
    it('should create an instance of DateAndTime', function() {
      // uncomment below and update the code to test DateAndTime
      //var instane = new Flashmoov.DateAndTime();
      //expect(instance).to.be.a(Flashmoov.DateAndTime);
    });

    it('should have the property iso (base name: "iso")', function() {
      // uncomment below and update the code to test the property iso
      //var instane = new Flashmoov.DateAndTime();
      //expect(instance).to.be();
    });

    it('should have the property ts (base name: "ts")', function() {
      // uncomment below and update the code to test the property ts
      //var instane = new Flashmoov.DateAndTime();
      //expect(instance).to.be();
    });

    it('should have the property utcTS (base name: "utcTS")', function() {
      // uncomment below and update the code to test the property utcTS
      //var instane = new Flashmoov.DateAndTime();
      //expect(instance).to.be();
    });

  });

}));
