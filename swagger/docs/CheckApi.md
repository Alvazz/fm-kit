# Flashmoov.CheckApi

All URIs are relative to *http://35.205.158.207:8080/rest*

Method | HTTP request | Description
------------- | ------------- | -------------
[**info**](CheckApi.md#info) | **GET** /info | Check platform info
[**isAlive**](CheckApi.md#isAlive) | **GET** /alive | Check services are alive


<a name="info"></a>
# **info**
> Object info()

Check platform info

Check platform info

### Example
```javascript
var Flashmoov = require('flashmoov');
var defaultClient = Flashmoov.ApiClient.instance;

// Configure API key authorization: JWT
var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix = 'Token';

var apiInstance = new Flashmoov.CheckApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.info(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

**Object**

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="isAlive"></a>
# **isAlive**
> Object isAlive()

Check services are alive

Check services are alive

### Example
```javascript
var Flashmoov = require('flashmoov');
var defaultClient = Flashmoov.ApiClient.instance;

// Configure API key authorization: JWT
var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix = 'Token';

var apiInstance = new Flashmoov.CheckApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.isAlive(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

**Object**

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

