'use strict';


/**
 * Create a new product
 * Create a new product
 *
 * flashAutocompleteBody FlashAutocompleteBody  (optional)
 * returns FlashmoovAPIResponse
 **/
exports.flashAutocomplete = function(flashAutocompleteBody) {
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
 * Get products
 * Get products
 *
 * flashPromoteBody FlashPromoteBody more book information
 * returns FlashmoovAPIResponse
 **/
exports.flashPromoted = function(flashPromoteBody) {
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
 * Get products
 * Get products
 *
 * flashQueryBody FlashQueryBody more book information
 * returns FlashmoovAPIResponse
 **/
exports.flashQuery = function(flashQueryBody) {
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
 * Get products
 * Get products
 *
 * flashRecommandedBody FlashRecommandedBody more book information
 * returns FlashmoovAPIResponse
 **/
exports.flashRecommanded = function(flashRecommandedBody) {
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

