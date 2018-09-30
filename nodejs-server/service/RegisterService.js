'use strict';


/**
 * App initialization
 * App initialization
 *
 * flashInitBody FlashInitBody Flash content
 * returns FlashmoovAPIResponse
 **/
exports.appInitialization = function(flashInitBody) {
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

