<template>
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
              <button>
                <font-awesome :icon="['fab', 'facebook-square']"/>
              </button>
              <GoogleLogin 
                :params="params"
                :onSuccess="getTokenGoogle"
              >
                <font-awesome :icon="['fab', 'google']"/>
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
    </Announcement>
  </div>
</template>

<script>
import Announcement from '../Notifications/Announcement.vue'

import GoogleLogin from 'vue-google-login'

import Cookies from 'js-cookie'
import axios from 'axios'

export default {
  name: 'TemplateForLoginAndRegistration',
  components: {
    Announcement,
    GoogleLogin
  },
  props: ['rememberMe'],
  data: () => ({
    dialog: false,
    email: null,
    password: null,
    params: {
      client_id: process.env.VUE_APP_CLIENT_ID
    },
    socialUser: {
      _token: null,
      _provider: null
    },
    whetherToDisplay: false,
    communique: {
      symbol: null,
      contents: null
    }
  }),
  mounted() {
    if (Cookies.get('_token'))
    {
      this.socialUser._token = Cookies.get('_token')
      this.socialUser._provider = Cookies.get('_provider')

      axios.post('https://citygame.ga/api/provider/callback', this.socialUser)
        .then(response => {
          this.$emit('user', response.data)
        })
    }
  },
  methods: {
    provideTheData() {
      this.$emit('emailAndPassword', this.email, this.password)
    },
    getTokenGoogle(googleUser) {
      this.socialUser._token = googleUser.wc.access_token
      this.socialUser._provider = 'google'

      this.sendingToken()
    },
    sendingToken() {
      this.whetherToDisplay = true

      axios.post('https://citygame.ga/api/provider/callback', this.socialUser)
        .then(response => {
        if (response)
        {
          this.communique.symbol = "check-circle"
          this.communique.contents = "Akcja się powiodła"

          this.$emit('user', response.data)

          if (this.rememberMe)
          {
            Cookies.set('_token', this.socialUser._token)
            Cookies.set('_provider', this.socialUser._provider)
          }
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
      this.whetherToDisplay = false
      this.communique.contents = null
    },
    hideMenu() {
      this.$emit('hideMenu')
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