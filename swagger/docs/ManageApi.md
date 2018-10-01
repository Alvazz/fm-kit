# Flashmoov.ManageApi

All URIs are relative to *http://35.205.158.207:8080/rest*

Method | HTTP request | Description
------------- | ------------- | -------------
[**flashCreateCard**](ManageApi.md#flashCreateCard) | **POST** /card/create | Create card
[**flashDelete**](ManageApi.md#flashDelete) | **POST** /flash/delete | Delete products
[**flashUpdate**](ManageApi.md#flashUpdate) | **POST** /flash/update | Update product
[**flashUploadContent**](ManageApi.md#flashUploadContent) | **POST** /flash/upload/{id} | Uploads a file.


<a name="flashCreateCard"></a>
# **flashCreateCard**
> FlashmoovAPIResponse flashCreateCard(flashCreateCardBody)

Create card

### Example
```javascript
var Flashmoov = require('flashmoov');
var defaultClient = Flashmoov.ApiClient.instance;

// Configure API key authorization: JWT
var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix = 'Token';

var apiInstance = new Flashmoov.ManageApi();

var flashCreateCardBody = new Flashmoov.FlashCreateCardBody(); // FlashCreateCardBody | Flash content


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.flashCreateCard(flashCreateCardBody, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **flashCreateCardBody** | [**FlashCreateCardBody**](FlashCreateCardBody.md)| Flash content | 

### Return type

[**FlashmoovAPIResponse**](FlashmoovAPIResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="flashDelete"></a>
# **flashDelete**
> FlashmoovAPIResponse flashDelete(flashDeleteBody)

Delete products

Delete product

### Example
```javascript
var Flashmoov = require('flashmoov');
var defaultClient = Flashmoov.ApiClient.instance;

// Configure API key authorization: JWT
var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix = 'Token';

var apiInstance = new Flashmoov.ManageApi();

var flashDeleteBody = new Flashmoov.FlashDeleteBody(); // FlashDeleteBody | more book information


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.flashDelete(flashDeleteBody, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **flashDeleteBody** | [**FlashDeleteBody**](FlashDeleteBody.md)| more book information | 

### Return type

[**FlashmoovAPIResponse**](FlashmoovAPIResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="flashUpdate"></a>
# **flashUpdate**
> FlashmoovAPIResponse flashUpdate(flashUpdateBody)

Update product

Update product

### Example
```javascript
var Flashmoov = require('flashmoov');
var defaultClient = Flashmoov.ApiClient.instance;

// Configure API key authorization: JWT
var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix = 'Token';

var apiInstance = new Flashmoov.ManageApi();

var flashUpdateBody = new Flashmoov.FlashUpdateBody(); // FlashUpdateBody | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.flashUpdate(flashUpdateBody, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **flashUpdateBody** | [**FlashUpdateBody**](FlashUpdateBody.md)|  | 

### Return type

[**FlashmoovAPIResponse**](FlashmoovAPIResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="flashUploadContent"></a>
# **flashUploadContent**
> FlashmoovAPIResponse flashUploadContent(id, cover, opts)

Uploads a file.

### Example
```javascript
var Flashmoov = require('flashmoov');
var defaultClient = Flashmoov.ApiClient.instance;

// Configure API key authorization: JWT
var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix = 'Token';

var apiInstance = new Flashmoov.ManageApi();

var id = "id_example"; // String | Flash id

var cover = "/path/to/file.txt"; // File | 

var opts = { 
  'contentImage': "/path/to/file.txt", // File | 
  'contentVideo': "/path/to/file.txt", // File | 
  'contentAudio': "/path/to/file.txt", // File | 
  'contentText': "contentText_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.flashUploadContent(id, cover, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Flash id | 
 **cover** | **File**|  | 
 **contentImage** | **File**|  | [optional] 
 **contentVideo** | **File**|  | [optional] 
 **contentAudio** | **File**|  | [optional] 
 **contentText** | **String**|  | [optional] 

### Return type

[**FlashmoovAPIResponse**](FlashmoovAPIResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: Not defined

