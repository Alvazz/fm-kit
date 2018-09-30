'use strict';

var utils = require('../utils/writer.js');
var Retrieve = require('../service/RetrieveService');

module.exports.flashAutocomplete = function flashAutocomplete (req, res, next) {
  var flashAutocompleteBody = req.swagger.params['FlashAutocompleteBody'].value;
  Retrieve.flashAutocomplete(flashAutocompleteBody)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.flashPromoted = function flashPromoted (req, res, next) {
  var flashPromoteBody = req.swagger.params['FlashPromoteBody'].value;
  Retrieve.flashPromoted(flashPromoteBody)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.flashQuery = function flashQuery (req, res, next) {
  var flashQueryBody = req.swagger.params['FlashQueryBody'].value;
  Retrieve.flashQuery(flashQueryBody)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.flashRecommanded = function flashRecommanded (req, res, next) {
  var flashRecommandedBody = req.swagger.params['FlashRecommandedBody'].value;
  Retrieve.flashRecommanded(flashRecommandedBody)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
