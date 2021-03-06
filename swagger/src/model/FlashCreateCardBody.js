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
    define(['ApiClient', 'model/FlashCard', 'model/SocialInfo'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./FlashCard'), require('./SocialInfo'));
  } else {
    // Browser globals (root is window)
    if (!root.Flashmoov) {
      root.Flashmoov = {};
    }
    root.Flashmoov.FlashCreateCardBody = factory(root.Flashmoov.ApiClient, root.Flashmoov.FlashCard, root.Flashmoov.SocialInfo);
  }
}(this, function(ApiClient, FlashCard, SocialInfo) {
  'use strict';




  /**
   * The FlashCreateCardBody model module.
   * @module model/FlashCreateCardBody
   * @version 2.0.0
   */

  /**
   * Constructs a new <code>FlashCreateCardBody</code>.
   * @alias module:model/FlashCreateCardBody
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>FlashCreateCardBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FlashCreateCardBody} obj Optional instance to populate.
   * @return {module:model/FlashCreateCardBody} The populated <code>FlashCreateCardBody</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('appId')) {
        obj['appId'] = ApiClient.convertToType(data['appId'], 'String');
      }
      if (data.hasOwnProperty('owner')) {
        obj['owner'] = SocialInfo.constructFromObject(data['owner']);
      }
      if (data.hasOwnProperty('card')) {
        obj['card'] = FlashCard.constructFromObject(data['card']);
      }
    }
    return obj;
  }

  /**
   * @member {String} appId
   */
  exports.prototype['appId'] = undefined;
  /**
   * @member {module:model/SocialInfo} owner
   */
  exports.prototype['owner'] = undefined;
  /**
   * @member {module:model/FlashCard} card
   */
  exports.prototype['card'] = undefined;



  return exports;
}));


