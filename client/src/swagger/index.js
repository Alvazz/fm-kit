import store from '@/store'
import router from '@/router'
import Flashmoov from 'flashmoov'

const defaultClient = Flashmoov.ApiClient.instance

var JWT = defaultClient.authentications['JWT']
JWT.apiKey = 'YOUR API KEY'
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//JWT.apiKeyPrefix = 'Token';

const apiInstance = {
  menageApi: new Flashmoov.ManageApi(),
  flashCreateCardBody: new Flashmoov.FlashCreateCardBody()
}

export default apiInstance
