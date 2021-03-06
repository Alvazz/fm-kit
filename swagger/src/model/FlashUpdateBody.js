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
    define(['ApiClient', 'model/Flash'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Flash'));
  } else {
    // Browser globals (root is window)
    if (!root.Flashmoov) {
      root.Flashmoov = {};
    }
    root.Flashmoov.FlashUpdateBody = factory(root.Flashmoov.ApiClient, root.Flashmoov.Flash);
  }
}(this, function(ApiClient, Flash) {
  'use strict';




  /**
   * The FlashUpdateBody model module.
   * @module model/FlashUpdateBody
   * @version 2.0.0
   */

  /**
   * Constructs a new <code>FlashUpdateBody</code>.
   * @alias module:model/FlashUpdateBody
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>FlashUpdateBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FlashUpdateBody} obj Optional instance to populate.
   * @return {module:model/FlashUpdateBody} The populated <code>FlashUpdateBody</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('appId')) {
        obj['appId'] = ApiClient.convertToType(data['appId'], 'String');
      }
      if (data.hasOwnProperty('query')) {
        obj['query'] = ApiClient.convertToType(data['query'], Object);
      }
      if (data.hasOwnProperty('flash')) {
        obj['flash'] = Flash.constructFromObject(data['flash']);
      }
    }
    return obj;
  }

  /**
   * @member {String} appId
   */
  exports.prototype['appId'] = undefined;
  /**
   * @member {Object} query
   */
  exports.prototype['query'] = undefined;
  /**
   * @member {module:model/Flash} flash
   */
  exports.prototype['flash'] = undefined;



  return exports;
}));


