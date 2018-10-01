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
    define(['ApiClient', 'model/Query'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Query'));
  } else {
    // Browser globals (root is window)
    if (!root.Flashmoov) {
      root.Flashmoov = {};
    }
    root.Flashmoov.UpdateParam = factory(root.Flashmoov.ApiClient, root.Flashmoov.Query);
  }
}(this, function(ApiClient, Query) {
  'use strict';




  /**
   * The UpdateParam model module.
   * @module model/UpdateParam
   * @version 2.0.0
   */

  /**
   * Constructs a new <code>UpdateParam</code>.
   * @alias module:model/UpdateParam
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>UpdateParam</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UpdateParam} obj Optional instance to populate.
   * @return {module:model/UpdateParam} The populated <code>UpdateParam</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('query')) {
        obj['query'] = Query.constructFromObject(data['query']);
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], Object);
      }
    }
    return obj;
  }

  /**
   * @member {module:model/Query} query
   */
  exports.prototype['query'] = undefined;
  /**
   * @member {Object} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


