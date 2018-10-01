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
    root.Flashmoov.GeoJsonGeometryCollection = factory(root.Flashmoov.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GeoJsonGeometryCollection model module.
   * @module model/GeoJsonGeometryCollection
   * @version 2.0.0
   */

  /**
   * Constructs a new <code>GeoJsonGeometryCollection</code>.
   * @alias module:model/GeoJsonGeometryCollection
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>GeoJsonGeometryCollection</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GeoJsonGeometryCollection} obj Optional instance to populate.
   * @return {module:model/GeoJsonGeometryCollection} The populated <code>GeoJsonGeometryCollection</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('geometries')) {
        obj['geometries'] = ApiClient.convertToType(data['geometries'], [Object]);
      }
    }
    return obj;
  }

  /**
   * @member {String} type
   * @default 'GeometryCollection'
   */
  exports.prototype['type'] = 'GeometryCollection';
  /**
   * @member {Array.<Object>} geometries
   */
  exports.prototype['geometries'] = undefined;



  return exports;
}));


