'use strict';

var utils = require('../utils/writer.js');
var Register = require('../service/RegisterService');

module.exports.appInitialization = function appInitialization (req, res, next) {
  var flashInitBody = req.swagger.params['FlashInitBody'].value;
  Register.appInitialization(flashInitBody)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
