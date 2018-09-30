'use strict';

var utils = require('../utils/writer.js');
var Manage = require('../service/ManageService');

module.exports.flashCreateCard = function flashCreateCard (req, res, next) {
  var flashCreateCardBody = req.swagger.params['FlashCreateCardBody'].value;
  Manage.flashCreateCard(flashCreateCardBody)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.flashDelete = function flashDelete (req, res, next) {
  var flashDeleteBody = req.swagger.params['FlashDeleteBody'].value;
  Manage.flashDelete(flashDeleteBody)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.flashUpdate = function flashUpdate (req, res, next) {
  var flashUpdateBody = req.swagger.params['FlashUpdateBody'].value;
  Manage.flashUpdate(flashUpdateBody)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.flashUploadContent = function flashUploadContent (req, res, next) {
  var id = req.swagger.params['id'].value;
  var cover = req.swagger.params['cover'].value;
  var contentImage = req.swagger.params['contentImage'].value;
  var contentVideo = req.swagger.params['contentVideo'].value;
  var contentAudio = req.swagger.params['contentAudio'].value;
  var contentText = req.swagger.params['contentText'].value;
  Manage.flashUploadContent(id,cover,contentImage,contentVideo,contentAudio,contentText)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
