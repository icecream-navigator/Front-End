<template>
  <div id="containerMenu">
    <div id="profile">
      <img alt="avatar"
        :src="avatarImage"
        :style="{'width': avatarSize + 'vw'}"/>
    </div>
    <v-app-bar-nav-icon
      id="buttonMenu"
      @click = "menuStatusChange">
    </v-app-bar-nav-icon>
    <ul :class="currentMenuStatus">
      <li>
        <v-btn
          class="button"
          @click="menuStatusChange(), event()"
        >
          <b>SZUKAJ LODA</b>
        </v-btn>
      </li>
      <li>
        <component :is="selectedComponent1" 
        @hideMenu="menuStatusChange"
        @user="user"/>
      </li>
      <li>
        <component :is="selectedComponent2"
        @hideMenu="menuStatusChange"
        
        @logOut="logOut"
        />
      </li>
    </ul>
    <center>Robert Klinger i Krzysztof Picur © 2021 prawa zastrzeżone</center>
  </div>
</template>

<script>
import Login from './Login.vue'
import Registration from './Registration.vue'

import CompanyManagment from './CompanyManagment.vue'
import LogOut from './LogOut.vue'

import image from "@/assets/avatar.png"

export default{
  name: 'Menu',
  components: {
    Login,
    Registration,
    CompanyManagment,
    LogOut
  },
  data() {
    return {
      selectedComponent1: Login,
      selectedComponent2: Registration,
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
        this.avatarImage = data.social_user.avatar
        this.selectedComponent1 = null
      }
      else
      {
        this.avatarImage = data.user_avatar
        if (data.is_admin)
        {
          this.selectedComponent1 = CompanyManagment
        }
        else
        {
          this.selectedComponent1 = null
        }
      }

      this.avatarSize = 13

      this.selectedComponent2 = LogOut
    },
    logOut() {
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
    event() {
      this.$emit('activateTheSearchEngine')
    }
  }
}
</script>

<style lang="scss">
@import './MenuP.scss';

@media (orientation: landscape) {
  #containerMenu {
    width: 15.6%;
    background-color: #ff9e4f;
    position: relative;
    #profile {
      margin: 1.3vw auto 1.3vw;

      width: 13vw;
      height: 13vw;

      border-radius: 50%;
      background-color: #ffcf7f;

      overflow:hidden;

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