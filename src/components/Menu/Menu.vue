<template>
  <div id="containerMenu">
    <div id="profile">
      <img alt="avatar"
        :src="avatarImage"
        :style="{'width': avatarSize + 'vw'}"/>
    </div>
    <nav>
      <v-app-bar-nav-icon
        id="buttonMenu"
        @click = "menuStatusChange">
      </v-app-bar-nav-icon>
      <ul :class="currentMenuStatus">
        <li>
          <v-btn
            class="button"
            @click="menuStatusChange(), eventSearchEngine()"
          >
            <b>SZUKAJ LODA</b>
          </v-btn>
        </li>
        <li>
          <component
            :is="selectedComponent1"
            :user="userData"
            @user="user"

            @event="event"
            @hideMenu="menuStatusChange"

            @open="open"
            ref="refresh"
          />
        </li>
        <li>
          <component
            :is="selectedComponent2"
            @event="event"
            @hideMenu="menuStatusChange"

            @logOut="logOut"
          />
        </li>
      </ul>
    </nav>
    <footer>
      <center>Robert Klinger i Krzysztof Picur © 2021 wszelkie prawa zastrzeżone</center>
    </footer>
  </div>
</template>

<script>
import Login from '../Identification/Login.vue'
import Registration from '../Identification/Registration.vue'

import CompanyManagmentB from './CompanyManagmentB.vue'
import FavoritesB from './FavoritesB.vue'
import LogOut from '../Identification/LogOut.vue'

import Cookies from 'js-cookie'

import image from "@/assets/avatar.png"

export default{
  name: 'Menu',
  components: {
    Login,
    Registration,
    CompanyManagmentB,
    FavoritesB,
    LogOut
  },
  data() {
    return {
      selectedComponent1: Login,
      selectedComponent2: Registration,
      userData: null,
      avatarImage: image,
      avatarSize: 4.15,
      menu: false,
      currentMenuStatus: null
    }
  },
  methods: {
    user(data) {
      if (data.social_user)
      {
        this.userData = data.social_user
        this.avatarImage = data.social_user.avatar

        this.selectedComponent1 = FavoritesB
      }
      else
      {
        this.userData = data
        this.avatarImage = data.user_avatar

        if (data.is_admin)
        {
          this.selectedComponent1 = CompanyManagmentB
        }
        else
        {
          this.selectedComponent1 = FavoritesB
        }
      }

      this.avatarSize = 13

      this.selectedComponent2 = LogOut
      
      this.$emit('user', this.userData)
    },
    logOut() {
      Cookies.remove('email')
      Cookies.remove('password')

      Cookies.remove('_token')
      Cookies.remove('_provider')

      this.$emit('user', null)

      this.avatarImage = image
      this.avatarSize = 4.15

      this.selectedComponent1 = Login
      this.selectedComponent2 = Registration
    },
    menuStatusChange() {
      if (this.menu)
      {
        this.menu = false,
        this.currentMenuStatus = 'show'
      }
      else
      {
        this.menu = true,
        this.currentMenuStatus = null
      }
    },
    eventSearchEngine() {
      this.$emit('component', 'SearchEngine')
    },
    event(component) {
      if (this.selectedComponent2 == LogOut)
      {
        this.$emit('component', component)
      }
    },
    open() {
      this.$emit('open')
    },
    refresh() {
      this.$refs.refresh.refresh()
    }
  }
}
</script>

<style lang="scss">
@import './MenuP.scss';

@media (orientation: landscape) {
  #containerMenu {
    width: 15.6%;
    height: 100vh;
    background-color: #ff9e4f;
    position: fixed;
    #profile {
      margin: 1.3vw auto 1.3vw;

      width: 13vw;
      height: 13vw;

      border-radius: 50%;
      background-color: #ffcf7f;

      overflow: hidden;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    #buttonMenu {
      display: none;
    }
    ul {
      list-style-type: none;
      .button {
        padding: 1.565vw !important;

        width: 100%;
        height: 3.15vw !important;

        border-radius: 0px;
        justify-content: left;
        font-size: 1.565vw !important;
        letter-spacing: 0px;
        color: white !important;

        background-color: #ff9e4f !important;
      }
      .button:hover {
        background-color: #ee8d3e !important;
      }
    }
    center {
      position: absolute;
      bottom: .75vw;

      font-size: 0.8vw;
      line-height: 125%;
      justify-content: center;
    }
  }
}
</style>