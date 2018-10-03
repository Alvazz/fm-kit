<template>
  <div class="row mt-5 mb-5">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <div class="inner cover">
        <h1 class="text-center mb-5">User Login</h1>
        <div class="alert alert-danger alert-dismissible fade show" role="alert" v-show="error.length > 0">
          {{error}}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeError">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <button type="button" class="btn btn-primary btn-block" @click="openFbLoginDialog">Facebook Login</button>
        <div class="text-center mt-4 mb-5" style="width: 10rem; height: 13px; border-bottom: 1px dotted #ccc; margin: 0 auto;">
          <span style="font-size: 16px; background-color: #FFF; padding: 0 10px; font-weight: bold; color: #999">
            OR
          </span>
        </div>
        <form v-show="false">
          <div class="form-group">
            <input class="form-control" type="text" aria-describedby="emailHelp" v-model="form.username" placeholder="Username">
          </div>
          <div class="form-group">
            <input class="form-control" type="password" v-model="form.password" placeholder="password">
          </div>
          <div class="form-check">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input">
              Remember me
            </label>
          </div>
          <br>
          <button type="submit" class="btn btn-warning btn-block" @click="login">Log in</button>
        </form>
        <router-link class="btn btn-warning btn-block" to="/">
          Torna alla home
        </router-link>
        <router-link  v-show="false" class="btn btn-warning btn-block" to="/register">
          Rigistrazione
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api'
import jwt_decode from 'jwt-decode'

export default {
  name: 'Login',
  data () {
    return {
      error: '',
      form: {
        username: 'test',
        password: '123'
      }
    }
  },
  methods: {
    openFbLoginDialog () {
      FB.login(this.checkLoginState, { scope: 'email' })
    },
    closeError(){
      this.error = ''
    },
    checkLoginState (response) {
      const self= this
      if (response.status === 'connected') {
        console.log(response.authResponse.accessToken);
        //this.$router.push('/');
        //sessionStorage.setItem('token',response.authResponse.accessToken)
        //this.$store.dispatch('updateToken', response.authResponse.accessToken)
        const token = response.authResponse.accessToken

        FB.api('/me', (response) => {

          console.log(JSON.stringify(response))
          const owner ={
            owner: {
              id: response.id,
              social: "facebook",
              token: token
            }
          }
          
          sessionStorage.setItem('owner',JSON.stringify(owner))

          API.post('/flashmoov/rest/flash/init', owner)
          .then(res => {
            console.log(res.data)
          })
          .catch(err =>{
            console.log(err)
            self.error = err.response.statusText
          })

        });
        /*
        FB.api( "/me/feed",
        "POST",
        {
        "message": "Test"
      },
      (response) => {
      console.log(JSON.stringify(response));
    }
  )
  */
} else if (response.status === 'not_authorized') {
  // the user is logged in to Facebook,
  // but has not authenticated your app
} else {
  // the user isn't logged in to Facebook.
}
},
login (evt) {
  evt.preventDefault()
  // this.$router.push('/home')
  API.post(`user/login`, this.form)
  .then(response => {
    // JSON responses are automatically parsed.

    this.$router.push('/');
    const decoded = jwt_decode(response.data.token)
    const role = decoded.role
    sessionStorage.setItem('token',response.data.token);
    this.$store.dispatch('updateToken', response.data.token)

    // this.$store.dispatch('setRole', role)
    // this.$acl.change(role)
  })
  .catch(e => {
    console.log(e)
  })
}
}
}
</script>

<style scoped>
.inner {
  padding: 2rem;
}

.inner.cover {
  border: 1px solid #f0f0f0;
  padding: 2.5rem;
}

.cover {
  padding: 0 1.5rem;
}

.cover .btn-lg {
  padding: .75rem 1.25rem;
  font-weight: bold;
}

@media (min-width: 40em) {

  .cover-container {
    width: 100%;
  }

}

@media (min-width: 62em) {

  .cover-container {
    width: 42rem;
  }

}

</style>
