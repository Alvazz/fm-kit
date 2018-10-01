import Flashmoov from 'flashmoov'
console.log(Flashmoov)

const defaultClient = Flashmoov.ApiClient.instance;

var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = "YOUR API KEY"

const Swagger = {
  api:new Flashmoov.ActApi(),
  body: {
    flashLikeBody: new Flashmoov.LikeBodyRequest()
  }
}

export default Swagger
