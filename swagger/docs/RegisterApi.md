# Flashmoov.RegisterApi

All URIs are relative to *http://35.205.158.207:8080/rest*

Method | HTTP request | Description
------------- | ------------- | -------------
[**appInitialization**](RegisterApi.md#appInitialization) | **POST** /flash/init | App initialization


<a name="appInitialization"></a>
# **appInitialization**
> FlashmoovAPIResponse appInitialization(flashInitBody)

App initialization

App initialization

### Example
```javascript
var Flashmoov = require('flashmoov');
var defaultClient = Flashmoov.ApiClient.instance;

// Configure API key authorization: JWT
var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix = 'Token';

var apiInstance = new Flashmoov.RegisterApi();

var flashInitBody = new Flashmoov.FlashInitBody(); // FlashInitBody | Flash content


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.appInitialization(flashInitBody, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **flashInitBody** | [**FlashInitBody**](FlashInitBody.md)| Flash content | 

### Return type

[**FlashmoovAPIResponse**](FlashmoovAPIResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

