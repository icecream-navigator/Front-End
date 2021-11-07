<template>
<<<<<<< HEAD
  <div>
    <v-row justify="center">
      <v-btn
        id="buttonPortait"
        class="button"
        @click="dialog = true, hideMenu()"
      >
        <b>
          <slot name="buttonInscription"/>
        </b>
      </v-btn>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="325px"
      >
        <v-card id="card">
          <button
            id="close"
            @click="dialog = false"
          >
            <font-awesome :icon="['fas', 'times']"/>
          </button>
          <div id="circle">
            <img id ="logo" alt="logo" src="@/assets/logo.png">
=======
  <v-row
    v-resize="onResize"
    justify="center"
    >
    <v-btn
      id="buttonPortait"
      class="button"
      @click="dialog = true, hideMenu()"
      >
      <b>
        <slot name="buttonInscription"/>
      </b>
    </v-btn>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="325px"
      >
      <v-card id="card">
        <button
          id="close"
          @click="dialog = false"
          >
          <font-awesome :icon="['fas', 'times']"/>
        </button>
        <div id="circle">
          <img id ="logo" alt="logo" src="@/assets/logo.png">
        </div>
        <v-card-text>
          <v-container>
            <slot name="v-text-field"/>
            <v-text-field
              v-model="email"
              label="Email"
              required
              ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              label="Hasło"
              required
              ></v-text-field>
            <slot name="repeatPassword"/>
          </v-container>
          <slot name="rememberMe"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            id="buttonLogIn"
            block
            color="blue darken-1"
            @click="provideTheData"
            >
            <slot name="action"/>
          </v-btn>
        </v-card-actions>
        <div id="otherLogins">
          <span>lub
            <slot name="action"/>
            przez</span>
          <div id="icons">
            <button @click="fb">
              <font-awesome :icon="['fab', 'facebook-square']"/>
            </button>
            <!--<button @click="google">-->
            <!--<font-awesome id="google" :icon="['fab', 'google']"/>-->
            <!--</button>-->
            <button v-on:click="Google">Google</button>
>>>>>>> 46fd2d55acbcd2b7cfef0a6d6e85ee85b3c76a60
          </div>
          <v-card-text>
            <v-container>
              <slot name="v-text-field"/>
              <v-text-field
                v-model="email"
                label="Email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                type="password"
                label="Hasło"
                required
              ></v-text-field>
              <slot name="repeatPassword"/>
            </v-container>
            <slot name="checkBox"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              id="buttonLogIn"
              block
              color="blue darken-1"
              @click="provideTheData"
            >
              <slot name="action"/>
            </v-btn>
          </v-card-actions>
          <div id="otherLogins">
            <span>lub
              <slot name="action"/>
            przez</span>
            <div id="icons">
              <facebook-login appId="997146227801816"/>
              <GoogleLogin 
                :params="params"
                :onSuccess="getTokenGoogle"
              >
                <font-awesome id="google" :icon="['fab', 'google']"/>
              </GoogleLogin>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
    <Announcement 
      v-if="whetherToDisplay"
      @close="closeTheMessage"
      >
      <template v-slot:content>
        <template v-if="communique.contents">
          <font-awesome id="symbol" :icon="['fas', communique.symbol]"/>
          <span class="content">{{communique.contents}}</span>
        </template>
        <v-progress-circular
          v-else
          class="content"
          indeterminate
          color="green"
        ></v-progress-circular>
      </template>
    </Announcement>
  </div>
</template>

<script>
import Announcement from './Announcement.vue'

import GoogleLogin from 'vue-google-login'
import FacebookLogin from 'facebook-login-vuejs';

import axios from 'axios'


export default {
  name: 'Dialog',
  components: {
    Announcement,
    GoogleLogin,
    FacebookLogin
  },
  data: () => ({
    dialog: false,
    token: 'ya29.a0ARrdaM-mbIJWMHkXZtRUw0wx1XsIefPiMigiw-Hs5YsnATDhppN6KRJofuFaFgYWFCwyyqEfl7sy7Z7nJY8NzsfSVfvNl8VqFqfNC54si2uPaHSpobgwYT4ysUc9zGBDymAR7E5MMTviBwDjhQ7WUmTxtRukQA',
    email: null,
    password: null,
<<<<<<< HEAD
    params: {
      client_id: process.env.VUE_APP_CLIENT_ID
    },
    social: {
      _token: null,
      _provider: null
    },
    whetherToDisplay: false,
    communique: {
      symbol: null,
      contents: null
=======
    apiresponse: null,
    windowSize: {
      x: 0,
      y: 0
>>>>>>> 46fd2d55acbcd2b7cfef0a6d6e85ee85b3c76a60
    }
  }),
  methods: {
    provideTheData() {
      this.$emit('emailAndPassword', this.email, this.password)
    },
    getTokenGoogle(googleUser) {
      this.social._token = googleUser.Zb.access_token
      this.social._provider = 'google'

      this.sendingToken()
    },
<<<<<<< HEAD
    getUserData() {
      this.FB.api('/me', 'GET', { fields: 'id,name,email' },
        userInformation => {
          console.warn("data api",userInformation)
          alert(userInformation.name)
        }
      )
    },
    sendingToken() {
      this.whetherToDisplay = true

      axios.post('https://citygame.ga/api/provider/callback', this.social)
      .then(response => {
      if (response)
      {
        this.communique.symbol = "check-circle"
        this.communique.contents = "Akcja się powiodła"
      }
      })
      .catch(error => {
        this.communique.symbol = "times-circle"

        if (!error.response)
        {
          this.communique.contents = "Brak połączenia, spróbuj ponownie później"
        }
        else 
        {
          this.communique.contents = "Akcja się NIE powiodła"
        }
      })
    },
    closeTheMessage() {
      this.communique.contents = null
      this.whetherToDisplay = false
    },
    hideMenu() {
      this.$emit('hideMenu')
=======

    Google: function() {

      axios.post('http://localhost:8081/api/provider/callback', {
        '_method': 'get',
        '_token' : this.token,
        '_provider' : 'google',
      }).then(response => {
        this.apiresponse = response.data
      });
      console.warn(this.apiresponse);
>>>>>>> 46fd2d55acbcd2b7cfef0a6d6e85ee85b3c76a60
    }
  }
}





</script>

<style lang="scss">
#card {
  padding-top: 15.5%;
  padding-bottom: 5%;
  background-color: #ff9e4f;

  position: relative;
  #close {
    position: absolute;
    top: 10px;
    right: 15px;

    font-size: x-large;
  }
  #circle {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 7.5%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: white;

    display: flex;
    justify-content: center;
    align-items: center;
    #logo {
      width: 123.63px;
    }
  }
  #buttonLogIn {
    color: white;
  }
  #otherLogins {
    display: flex;
    flex-direction: column;
    span {
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: center;
    }
    #icons {
      padding-left: 30%;
      padding-right: 30%;

      font-size: 40px;

      display: flex;
      justify-content: space-around;
      .container {
        margin: 0px;
        padding: 0px;

        width: 40px;
        height: 40px;
        button {
          position: none;
          padding: 0px;
          line-height: 0px;
          color: black;
          min-width: 0px;
          background: url(./../assets/fb.png);
          background-size: 40px;
          font-size: 50px;

          padding-bottom: 5px;
          width: 40px;
          height: 40px;

          text-indent: 100%;
          white-space: nowrap;
          overflow: hidden;

          position: relative;
          .spinner {
            display: none;
          }
          img {
            display: none;
          }
        }
      }
    }
  }
}

@media (orientation: portrait) {
  #buttonPortait {
    padding: 1.565vw !important;

    width: 100%;
    height: 10vw !important;

    border-radius: 0px;
    justify-content: left;
    font-size: 4vw !important;
    letter-spacing: 0px;
    color: white !important;

    background-color: #ffaf5f !important;
  }
}
</style>
