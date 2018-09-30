'use strict';


/**
 * Create card
 *
 * flashCreateCardBody FlashCreateCardBody Flash content
 * returns FlashmoovAPIResponse
 **/
exports.flashCreateCard = function(flashCreateCardBody) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "total" : 6,
  "set" : [ "{}", "{}" ],
  "size" : 0,
  "session" : "{}",
  "custom" : "{}",
  "message" : "message",
  "status" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete products
 * Delete product
 *
 * flashDeleteBody FlashDeleteBody more book information
 * returns FlashmoovAPIResponse
 **/
exports.flashDelete = function(flashDeleteBody) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "total" : 6,
  "set" : [ "{}", "{}" ],
  "size" : 0,
  "session" : "{}",
  "custom" : "{}",
  "message" : "message",
  "status" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update product
 * Update product
 *
 * flashUpdateBody FlashUpdateBody 
 * returns FlashmoovAPIResponse
 **/
exports.flashUpdate = function(flashUpdateBody) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "total" : 6,
  "set" : [ "{}", "{}" ],
  "size" : 0,
  "session" : "{}",
  "custom" : "{}",
  "message" : "message",
  "status" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Uploads a file.
 *
 * id String Flash id
 * cover File 
 * contentImage File  (optional)
 * contentVideo File  (optional)
 * contentAudio File  (optional)
 * contentText String  (optional)
 * returns FlashmoovAPIResponse
 **/
exports.flashUploadContent = function(id,cover,contentImage,contentVideo,contentAudio,contentText) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "total" : 6,
  "set" : [ "{}", "{}" ],
  "size" : 0,
  "session" : "{}",
  "custom" : "{}",
  "message" : "message",
  "status" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

