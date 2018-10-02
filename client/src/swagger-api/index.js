import Flashmoov from 'flashmoov'
console.log(Flashmoov)

const defaultClient = Flashmoov.ApiClient.instance;

var JWT = defaultClient.authentications['JWT'];
JWT.apiKey = "YOUR API KEY"

const Swagger = {
  api: {
    check: new Flashmoov.CheckApi(),
    act:new Flashmoov.ActApi(),
    register: new Flashmoov.RegisterApi(),
    menage: new Flashmoov.ManageApi(),
    retrive: new Flashmoov.RetrieveApi()
  },
  body: {
    check: {},
    act: {
      flashLikeBody: new Flashmoov.LikeBodyRequest(),
    },
    register: {
      flashInitBody: new Flashmoov.FlashInitBody(),
    },
    menage: {
      flashCreateCardBody: new Flashmoov.FlashCreateCardBody(),
      //flashReadableCodeBody: new Flashmoov.FlashReadableCodeBody(),
      //flashWritableCodeBody: new Flashmoov.FlashWritableCodeBody(),
      //flashUpdateBody: new Flashmoov.FlashUpdateBody(),
      //flashDeleteBody: new Flashmoov.FlashDeleteBody()
    },
    retrive: {}
  }
}

export default Swagger
