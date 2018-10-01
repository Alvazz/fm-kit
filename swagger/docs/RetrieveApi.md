# Flashmoov.RetrieveApi

All URIs are relative to *http://35.205.158.207:8080/rest*

Method | HTTP request | Description
------------- | ------------- | -------------
[**flashAutocomplete**](RetrieveApi.md#flashAutocomplete) | **POST** /flash/autocomplete | Create a new product
[**flashPromoted**](RetrieveApi.md#flashPromoted) | **POST** /flash/promoted | Get products
[**flashQuery**](RetrieveApi.md#flashQuery) | **POST** /flash/query | Get products
[**flashRecommanded**](RetrieveApi.md#flashRecommanded) | **POST** /flash/recommanded | Get products


<a name="flashAutocomplete"></a>
# **flashAutocomplete**
> FlashmoovAPIResponse flashAutocomplete(opts)

Create a new product

Create a new product

### Example
```javascript
var Flashmoov = require('flashmoov');
var defaultClient = Flashmoov.ApiClient.instance;

// Configure API key authorization: JWT
var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix = 'Token';

var apiInstance = new Flashmoov.RetrieveApi();

var opts = { 
  'flashAutocompleteBody': new Flashmoov.FlashAutocompleteBody() // FlashAutocompleteBody | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.flashAutocomplete(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **flashAutocompleteBody** | [**FlashAutocompleteBody**](FlashAutocompleteBody.md)|  | [optional] 

### Return type

[**FlashmoovAPIResponse**](FlashmoovAPIResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="flashPromoted"></a>
# **flashPromoted**
> FlashmoovAPIResponse flashPromoted(flashPromoteBody)

Get products

Get products

### Example
```javascript
var Flashmoov = require('flashmoov');
var defaultClient = Flashmoov.ApiClient.instance;

// Configure API key authorization: JWT
var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix = 'Token';

var apiInstance = new Flashmoov.RetrieveApi();

var flashPromoteBody = new Flashmoov.FlashPromoteBody(); // FlashPromoteBody | more book information


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.flashPromoted(flashPromoteBody, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **flashPromoteBody** | [**FlashPromoteBody**](FlashPromoteBody.md)| more book information | 

### Return type

[**FlashmoovAPIResponse**](FlashmoovAPIResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="flashQuery"></a>
# **flashQuery**
> FlashmoovAPIResponse flashQuery(flashQueryBody)

Get products

Get products

### Example
```javascript
var Flashmoov = require('flashmoov');
var defaultClient = Flashmoov.ApiClient.instance;

// Configure API key authorization: JWT
var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix = 'Token';

var apiInstance = new Flashmoov.RetrieveApi();

var flashQueryBody = new Flashmoov.FlashQueryBody(); // FlashQueryBody | more book information


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.flashQuery(flashQueryBody, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **flashQueryBody** | [**FlashQueryBody**](FlashQueryBody.md)| more book information | 

### Return type

[**FlashmoovAPIResponse**](FlashmoovAPIResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="flashRecommanded"></a>
# **flashRecommanded**
> FlashmoovAPIResponse flashRecommanded(flashRecommandedBody)

Get products

Get products

### Example
```javascript
var Flashmoov = require('flashmoov');
var defaultClient = Flashmoov.ApiClient.instance;

// Configure API key authorization: JWT
var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix = 'Token';

var apiInstance = new Flashmoov.RetrieveApi();

var flashRecommandedBody = new Flashmoov.FlashRecommandedBody(); // FlashRecommandedBody | more book information


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.flashRecommanded(flashRecommandedBody, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **flashRecommandedBody** | [**FlashRecommandedBody**](FlashRecommandedBody.md)| more book information | 

### Return type

[**FlashmoovAPIResponse**](FlashmoovAPIResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

