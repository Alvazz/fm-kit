'use strict';

var utils = require('../utils/writer.js');
var Check = require('../service/CheckService');

module.exports.info = function info (req, res, next) {
  Check.info()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.isAlive = function isAlive (req, res, next) {
  Check.isAlive()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
