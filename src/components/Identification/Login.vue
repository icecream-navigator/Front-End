<template>
  <div>
    <TemplateForLoginAndRegistration
      :rememberMe="rememberMe"
      @hideMenu="hideMenu"
      @emailAndPassword="sendingData"
      @user="provideUserData"
    >
      <template v-slot:buttonInscription>
        ZALOGUJ SIĘ
      </template>
      <template v-slot:checkBox>
        <v-checkbox
          v-model="rememberMe"
          label="Zapamiętaj mnie"
          hide-details
        ></v-checkbox>
      </template>
      <template v-slot:action>
        zaloguj się
      </template>
    </TemplateForLoginAndRegistration>
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
import TemplateForLoginAndRegistration from './TemplateForLoginAndRegistration.vue'
import Announcement from '../Notifications/Announcement.vue'

import Cookies from 'js-cookie'

import axios from 'axios'

export default {
  name: 'Login',
  components: {
    TemplateForLoginAndRegistration,
    Announcement
  },
  data() {
    return {
      login: {
        email: null,
        password: null
      },
      rememberMe: false,
      whetherToDisplay: false,
      communique: {
        symbol: null,
        contents: null
      }
    }
  },
  mounted() {
    if (Cookies.get('email'))
    {
      this.login.email = Cookies.get('email')
      this.login.password = Cookies.get('password')

      axios.post("https://citygame.ga/api/auth/login", this.login)
        .then(response => {
          this.provideUserData(response.data)
        })
    }
  },
  methods: {
    sendingData(email, password) {
      this.login.email = email
      this.login.password = password

      this.whetherToDisplay = true

      axios.post("https://citygame.ga/api/auth/login", this.login)
      .then(response => {
      if (response)
      {
        this.provideUserData(response.data)
        
        if (this.rememberMe)
        {
          Cookies.set('email', email)
          Cookies.set('password', password)
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
          const status = error.response.status

          if (status == 401 || status == 422)
          {
            this.communique.contents = "Nieprawidłowy email albo hasło"
          }
          else
          {
            this.communique.contents = error
          }
        }
      })
    },
    closeTheMessage() {
      this.whetherToDisplay = false
      this.communique.contents = null
    },
    provideUserData(data) {
      this.$emit('user', data)
    },
    hideMenu() {
      this.$emit('hideMenu')
    }
  }
}
</script>