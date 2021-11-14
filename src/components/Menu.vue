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
          @click="menuStatusChange(), eventSearchEngine()"
        >
          <b>SZUKAJ LODA</b>
        </v-btn>
      </li>
      <li>
        <component :is="selectedComponent1"
        @event="event"
        @hideMenu="menuStatusChange"

        @user="user"

        @companyManagment="companyManagment"
        :user="userData"/>
      </li>
      <li>
        <component :is="selectedComponent2"
        @event="event"

        @hideMenu="menuStatusChange"/>
      </li>
        <component :is="selectedComponent3" @logOut="logOut"/>
      <li>
      </li>
    </ul>
    <center>Robert Klinger i Krzysztof Picur © 2021 prawa zastrzeżone</center>
  </div>
</template>

<script>
import Login from './Login.vue'
import Registration from './Registration.vue'

import CompanyManagmentB from './CompanyManagmentB.vue'
import FavoriteB from './FavoriteB.vue'
import LogOut from './LogOut.vue'

import image from "@/assets/avatar.png"

export default{
  name: 'Menu',
  components: {
    Login,
    Registration,
    CompanyManagmentB,
    FavoriteB,
    LogOut
  },
  data() {
    return {
      selectedComponent1: Login,
      selectedComponent2: Registration,
      selectedComponent3: null,
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
        this.avatarImage = data.social_user.avatar
        this.selectedComponent1 = null
      }
      else
      {
        this.avatarImage = data.user_avatar
        if (data.is_admin)
        {
          this.selectedComponent1 = CompanyManagmentB
        }
        else
        {
          this.selectedComponent1 = null
        }
      }

      this.avatarSize = 13

      this.selectedComponent2 = FavoriteB
      this.selectedComponent3 = LogOut

      this.userData = data
      this.$emit('user', data)
    },
    logOut() {
      this.avatarImage = image
      this.avatarSize = 4.15

      this.selectedComponent1 = Login
      this.selectedComponent2 = Registration
      this.selectedComponent3 = null
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
      if (this.selectedComponent2 == FavoriteB)
      {
        this.$emit('component', component)
      }
    },
    companyManagment(data) {
      this.$emit('companyManagment', data)
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