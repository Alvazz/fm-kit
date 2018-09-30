'use strict';

var utils = require('../utils/writer.js');
var Act = require('../service/ActService');

module.exports.flashLike = function flashLike (req, res, next) {
  var flashLikeBody = req.swagger.params['FlashLikeBody'].value;
  Act.flashLike(flashLikeBody)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.flashShare = function flashShare (req, res, next) {
  var flashShareBody = req.swagger.params['FlashShareBody'].value;
  Act.flashShare(flashShareBody)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
