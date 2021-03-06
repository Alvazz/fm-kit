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
    root.Flashmoov.FlashRecommandedBody = factory(root.Flashmoov.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The FlashRecommandedBody model module.
   * @module model/FlashRecommandedBody
   * @version 2.0.0
   */

  /**
   * Constructs a new <code>FlashRecommandedBody</code>.
   * @alias module:model/FlashRecommandedBody
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>FlashRecommandedBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FlashRecommandedBody} obj Optional instance to populate.
   * @return {module:model/FlashRecommandedBody} The populated <code>FlashRecommandedBody</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('appId')) {
        obj['appId'] = ApiClient.convertToType(data['appId'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} appId
   */
  exports.prototype['appId'] = undefined;



  return exports;
}));


