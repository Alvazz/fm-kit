# Flashmoov.ActApi

All URIs are relative to *http://35.205.158.207:8080/rest*

Method | HTTP request | Description
------------- | ------------- | -------------
[**flashLike**](ActApi.md#flashLike) | **POST** /flash/like | Share the flash
[**flashShare**](ActApi.md#flashShare) | **POST** /flash/share | Share the flash


<a name="flashLike"></a>
# **flashLike**
> FlashmoovAPIResponse flashLike(flashLikeBody)

Share the flash

Share the flash

### Example
```javascript
var Flashmoov = require('flashmoov');
var defaultClient = Flashmoov.ApiClient.instance;

// Configure API key authorization: JWT
var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix = 'Token';

var apiInstance = new Flashmoov.ActApi();

var flashLikeBody = new Flashmoov.LikeBodyRequest(); // LikeBodyRequest | more book information


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.flashLike(flashLikeBody, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **flashLikeBody** | [**LikeBodyRequest**](LikeBodyRequest.md)| more book information | 

### Return type

[**FlashmoovAPIResponse**](FlashmoovAPIResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="flashShare"></a>
# **flashShare**
> FlashmoovAPIResponse flashShare(flashShareBody)

Share the flash

Share the flash

### Example
```javascript
var Flashmoov = require('flashmoov');
var defaultClient = Flashmoov.ApiClient.instance;

// Configure API key authorization: JWT
var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix = 'Token';

var apiInstance = new Flashmoov.ActApi();

var flashShareBody = new Flashmoov.ShareBodyRequest(); // ShareBodyRequest | more book information


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.flashShare(flashShareBody, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **flashShareBody** | [**ShareBodyRequest**](ShareBodyRequest.md)| more book information | 

### Return type

[**FlashmoovAPIResponse**](FlashmoovAPIResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

