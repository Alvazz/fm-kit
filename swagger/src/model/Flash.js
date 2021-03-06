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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Actor', 'model/FlashCard', 'model/FlashContent', 'model/Meta', 'model/StoreObject'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Actor'), require('./FlashCard'), require('./FlashContent'), require('./Meta'), require('./StoreObject'));
  } else {
    // Browser globals (root is window)
    if (!root.Flashmoov) {
      root.Flashmoov = {};
    }
    root.Flashmoov.Flash = factory(root.Flashmoov.ApiClient, root.Flashmoov.Actor, root.Flashmoov.FlashCard, root.Flashmoov.FlashContent, root.Flashmoov.Meta, root.Flashmoov.StoreObject);
  }
}(this, function(ApiClient, Actor, FlashCard, FlashContent, Meta, StoreObject) {
  'use strict';




  /**
   * The Flash model module.
   * @module model/Flash
   * @version 2.0.0
   */

  /**
   * Constructs a new <code>Flash</code>.
   * @alias module:model/Flash
   * @class
   * @extends module:model/StoreObject
   * @param traitSuperclassOf {module:model/Trait.TraitSuperclassOfEnum} 
   */
  var exports = function(traitSuperclassOf) {
    var _this = this;
    StoreObject.call(_this, traitSuperclassOf);




  };

  /**
   * Constructs a <code>Flash</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Flash} obj Optional instance to populate.
   * @return {module:model/Flash} The populated <code>Flash</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      StoreObject.constructFromObject(data, obj);
      if (data.hasOwnProperty('base')) {
        obj['base'] = ApiClient.convertToType(data['base'], 'String');
      }
      if (data.hasOwnProperty('owner')) {
        obj['owner'] = Actor.constructFromObject(data['owner']);
      }
      if (data.hasOwnProperty('card')) {
        obj['card'] = FlashCard.constructFromObject(data['card']);
      }
      if (data.hasOwnProperty('content')) {
        obj['content'] = FlashContent.constructFromObject(data['content']);
      }
    }
    return obj;
  }

  exports.prototype = Object.create(StoreObject.prototype);
  exports.prototype.constructor = exports;

  /**
   * @member {String} base
   */
  exports.prototype['base'] = undefined;
  /**
   * @member {module:model/Actor} owner
   */
  exports.prototype['owner'] = undefined;
  /**
   * @member {module:model/FlashCard} card
   */
  exports.prototype['card'] = undefined;
  /**
   * @member {module:model/FlashContent} content
   */
  exports.prototype['content'] = undefined;



  return exports;
}));


