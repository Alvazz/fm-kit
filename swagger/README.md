# flashmoov

Flashmoov - JavaScript client for flashmoov
Flashmoov
This SDK is automatically generated by the [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) project:

- API version: 2.0.0
- Package version: 2.0.0
- Build package: io.swagger.codegen.languages.JavascriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/),
please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install flashmoov --save
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing 
into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

Finally, switch to the directory you want to use your flashmoov from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

You should now be able to `require('flashmoov')` in javascript files from the directory you ran the last 
command above from.

#### git
#
If the library is hosted at a git repository, e.g.
https://github.com/YOUR_USERNAME/flashmoov
then install it via:

```shell
    npm install YOUR_USERNAME/flashmoov --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file, that's to say your javascript file where you actually 
use this library):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var Flashmoov = require('flashmoov');

var defaultClient = Flashmoov.ApiClient.instance;

// Configure API key authorization: JWT
var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = "YOUR API KEY"
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix['Authorization'] = "Token"

var api = new Flashmoov.ActApi()

var flashLikeBody = new Flashmoov.LikeBodyRequest(); // {LikeBodyRequest} more book information


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.flashLike(flashLikeBody, callback);

```

## Documentation for API Endpoints

All URIs are relative to *http://35.205.158.207:8080/rest*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*Flashmoov.ActApi* | [**flashLike**](docs/ActApi.md#flashLike) | **POST** /flash/like | Share the flash
*Flashmoov.ActApi* | [**flashShare**](docs/ActApi.md#flashShare) | **POST** /flash/share | Share the flash
*Flashmoov.CheckApi* | [**info**](docs/CheckApi.md#info) | **GET** /info | Check platform info
*Flashmoov.CheckApi* | [**isAlive**](docs/CheckApi.md#isAlive) | **GET** /alive | Check services are alive
*Flashmoov.ManageApi* | [**flashCreateCard**](docs/ManageApi.md#flashCreateCard) | **POST** /card/create | Create card
*Flashmoov.ManageApi* | [**flashDelete**](docs/ManageApi.md#flashDelete) | **POST** /flash/delete | Delete products
*Flashmoov.ManageApi* | [**flashUpdate**](docs/ManageApi.md#flashUpdate) | **POST** /flash/update | Update product
*Flashmoov.ManageApi* | [**flashUploadContent**](docs/ManageApi.md#flashUploadContent) | **POST** /flash/upload/{id} | Uploads a file.
*Flashmoov.RegisterApi* | [**appInitialization**](docs/RegisterApi.md#appInitialization) | **POST** /flash/init | App initialization
*Flashmoov.RetrieveApi* | [**flashAutocomplete**](docs/RetrieveApi.md#flashAutocomplete) | **POST** /flash/autocomplete | Create a new product
*Flashmoov.RetrieveApi* | [**flashPromoted**](docs/RetrieveApi.md#flashPromoted) | **POST** /flash/promoted | Get products
*Flashmoov.RetrieveApi* | [**flashQuery**](docs/RetrieveApi.md#flashQuery) | **POST** /flash/query | Get products
*Flashmoov.RetrieveApi* | [**flashRecommanded**](docs/RetrieveApi.md#flashRecommanded) | **POST** /flash/recommanded | Get products


## Documentation for Models

 - [Flashmoov.Actor](docs/Actor.md)
 - [Flashmoov.ActorAccount](docs/ActorAccount.md)
 - [Flashmoov.ActorEnum](docs/ActorEnum.md)
 - [Flashmoov.ActorProfile](docs/ActorProfile.md)
 - [Flashmoov.Address](docs/Address.md)
 - [Flashmoov.ApplicationConfiguration](docs/ApplicationConfiguration.md)
 - [Flashmoov.BlobStoreObject](docs/BlobStoreObject.md)
 - [Flashmoov.CardInteraction](docs/CardInteraction.md)
 - [Flashmoov.Coordinates](docs/Coordinates.md)
 - [Flashmoov.DateAndTime](docs/DateAndTime.md)
 - [Flashmoov.DateTimeInterval](docs/DateTimeInterval.md)
 - [Flashmoov.EnvironmentConfiguration](docs/EnvironmentConfiguration.md)
 - [Flashmoov.FacebookConfiguration](docs/FacebookConfiguration.md)
 - [Flashmoov.Flash](docs/Flash.md)
 - [Flashmoov.FlashAutocompleteBody](docs/FlashAutocompleteBody.md)
 - [Flashmoov.FlashBodyRequest](docs/FlashBodyRequest.md)
 - [Flashmoov.FlashCard](docs/FlashCard.md)
 - [Flashmoov.FlashConfiguration](docs/FlashConfiguration.md)
 - [Flashmoov.FlashContent](docs/FlashContent.md)
 - [Flashmoov.FlashContentTypeEnum](docs/FlashContentTypeEnum.md)
 - [Flashmoov.FlashCreateCardBody](docs/FlashCreateCardBody.md)
 - [Flashmoov.FlashDeleteBody](docs/FlashDeleteBody.md)
 - [Flashmoov.FlashInitBody](docs/FlashInitBody.md)
 - [Flashmoov.FlashPermission](docs/FlashPermission.md)
 - [Flashmoov.FlashPolicies](docs/FlashPolicies.md)
 - [Flashmoov.FlashPromoteBody](docs/FlashPromoteBody.md)
 - [Flashmoov.FlashQueryBody](docs/FlashQueryBody.md)
 - [Flashmoov.FlashRecommandedBody](docs/FlashRecommandedBody.md)
 - [Flashmoov.FlashTemp](docs/FlashTemp.md)
 - [Flashmoov.FlashUpdateBody](docs/FlashUpdateBody.md)
 - [Flashmoov.FlashVisibilityEnum](docs/FlashVisibilityEnum.md)
 - [Flashmoov.FlashmoovAPIRequest](docs/FlashmoovAPIRequest.md)
 - [Flashmoov.FlashmoovAPIResponse](docs/FlashmoovAPIResponse.md)
 - [Flashmoov.GeoJsonGeometryCollection](docs/GeoJsonGeometryCollection.md)
 - [Flashmoov.Ids](docs/Ids.md)
 - [Flashmoov.LikeBodyRequest](docs/LikeBodyRequest.md)
 - [Flashmoov.Location](docs/Location.md)
 - [Flashmoov.Meta](docs/Meta.md)
 - [Flashmoov.MongoConfiguration](docs/MongoConfiguration.md)
 - [Flashmoov.MongoConfigurationInner](docs/MongoConfigurationInner.md)
 - [Flashmoov.MultimediaContent](docs/MultimediaContent.md)
 - [Flashmoov.MultimediaContentEnum](docs/MultimediaContentEnum.md)
 - [Flashmoov.PlatformConfiguration](docs/PlatformConfiguration.md)
 - [Flashmoov.Props](docs/Props.md)
 - [Flashmoov.Query](docs/Query.md)
 - [Flashmoov.QueryPrj](docs/QueryPrj.md)
 - [Flashmoov.QuerySort](docs/QuerySort.md)
 - [Flashmoov.SessionTemp](docs/SessionTemp.md)
 - [Flashmoov.ShareBodyRequest](docs/ShareBodyRequest.md)
 - [Flashmoov.SocialEnum](docs/SocialEnum.md)
 - [Flashmoov.SocialInfo](docs/SocialInfo.md)
 - [Flashmoov.SocialProfile](docs/SocialProfile.md)
 - [Flashmoov.StatusEnum](docs/StatusEnum.md)
 - [Flashmoov.StoreObject](docs/StoreObject.md)
 - [Flashmoov.Tags](docs/Tags.md)
 - [Flashmoov.Trait](docs/Trait.md)
 - [Flashmoov.UpdateParam](docs/UpdateParam.md)


## Documentation for Authorization


### JWT

- **Type**: API key
- **API key parameter name**: Authorization
- **Location**: HTTP header
