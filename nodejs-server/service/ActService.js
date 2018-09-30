'use strict';


/**
 * Share the flash
 * Share the flash
 *
 * flashLikeBody LikeBodyRequest more book information
 * returns FlashmoovAPIResponse
 **/
exports.flashLike = function(flashLikeBody) {
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
 * Share the flash
 * Share the flash
 *
 * flashShareBody ShareBodyRequest more book information
 * returns FlashmoovAPIResponse
 **/
exports.flashShare = function(flashShareBody) {
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

