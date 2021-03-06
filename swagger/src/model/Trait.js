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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.Flashmoov) {
      root.Flashmoov = {};
    }
    root.Flashmoov.Trait = factory(root.Flashmoov.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Trait model module.
   * @module model/Trait
   * @version 2.0.0
   */

  /**
   * Constructs a new <code>Trait</code>.
   * @alias module:model/Trait
   * @class
   * @param traitSuperclassOf {module:model/Trait.TraitSuperclassOfEnum} 
   */
  var exports = function(traitSuperclassOf) {
    var _this = this;

    _this['trait-superclass-of'] = traitSuperclassOf;

  };

  /**
   * Constructs a <code>Trait</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Trait} obj Optional instance to populate.
   * @return {module:model/Trait} The populated <code>Trait</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('trait-superclass-of')) {
        obj['trait-superclass-of'] = ApiClient.convertToType(data['trait-superclass-of'], 'String');
      }
      if (data.hasOwnProperty('trait')) {
        obj['trait'] = ApiClient.convertToType(data['trait'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {module:model/Trait.TraitSuperclassOfEnum} trait-superclass-of
   */
  exports.prototype['trait-superclass-of'] = undefined;
  /**
   * @member {String} trait
   */
  exports.prototype['trait'] = undefined;


  /**
   * Allowed values for the <code>trait-superclass-of</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TraitSuperclassOfEnum = {
    /**
     * value: "StoreObject"
     * @const
     */
    "StoreObject": "StoreObject"  };


  return exports;
}));


