<template>
  <div>
    <Dialog
      @hideMenu="hideMenu"
      @emailAndPassword="sendingData"
      @user="provideUserData"
      >
      <template v-slot:buttonInscription>
        ZALOGUJ SIĘ
      </template>
      <template v-slot:checkBox>
        <v-checkbox
          label="Zapamiętaj mnie"
          hide-details
        ></v-checkbox>
      </template>
      <template v-slot:action>
        zaloguj się
      </template>
    </Dialog>
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
import Dialog from './Dialog.vue'
import Announcement from './Announcement.vue'

import axios from 'axios'

export default {
  name: 'Login',
  components: {
    Dialog,
    Announcement
  },
  data() {
    return {
      login: {
        email: null,
        password: null
      },
      whetherToDisplay: false,
      communique: {
        symbol: null,
        contents: null
      }
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
        this.provideUserData(response.data);
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
      this.communique.contents = null
      this.whetherToDisplay = false
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