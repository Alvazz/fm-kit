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
    root.Flashmoov.DateAndTime = factory(root.Flashmoov.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The DateAndTime model module.
   * @module model/DateAndTime
   * @version 2.0.0
   */

  /**
   * Constructs a new <code>DateAndTime</code>.
   * @alias module:model/DateAndTime
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>DateAndTime</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DateAndTime} obj Optional instance to populate.
   * @return {module:model/DateAndTime} The populated <code>DateAndTime</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('iso')) {
        obj['iso'] = ApiClient.convertToType(data['iso'], 'String');
      }
      if (data.hasOwnProperty('ts')) {
        obj['ts'] = ApiClient.convertToType(data['ts'], 'Number');
      }
      if (data.hasOwnProperty('utcTS')) {
        obj['utcTS'] = ApiClient.convertToType(data['utcTS'], 'Number');
      }
    }
    return obj;
  }

  /**
   * @member {String} iso
   */
  exports.prototype['iso'] = undefined;
  /**
   * @member {Number} ts
   */
  exports.prototype['ts'] = undefined;
  /**
   * @member {Number} utcTS
   */
  exports.prototype['utcTS'] = undefined;



  return exports;
}));


