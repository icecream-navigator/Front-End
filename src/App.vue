<template>
  <v-app>
    <div id="mainContainer">
      <Menu
        @component="replaceComponent"
        @user="user"
        @openCompanyManagment="openCompanyManagment"
      />
      <component
        :is="selectedComponent"
        ref="form"
        :user="userData"
      />
    </div>
  </v-app>
</template>

<script>
import Menu from './components/Menu/Menu.vue'

import Main from './components/MainPage/Main.vue'
import SearchEngine from './components/SearchEngine/SearchEngine.vue'
import CompanyManagment from './components/CompanyManagment/CompanyManagment.vue'

export default {
  name: 'App',
  components: {
    Menu,
    Main,
    SearchEngine,
    CompanyManagment
  },
  data() {
    return {
      selectedComponent: Main,
      userData: null,
      companyManagmentData: null
    }
  },
  methods: {
    replaceComponent(component) {
      this.selectedComponent = component
    },
    user(data) {
      this.userData = data
    },
    openCompanyManagment() {
      this.$refs.form.getData()
    }
  }
}
</script>

<style lang="scss">
.v-application {
  line-height: 1;
}

.v-application ul {
  padding-left: 0px;
}

.v-application .elevation-2 {
  box-shadow: none !important;
}

.row {
  margin: 0px;
}

.v-btn--is-elevated {
  box-shadow: none;
}

.v-input__append-inner {
    display: none !important;
}

.v-progress-circular {
  margin: 1rem;
}

@media (orientation: portrait) {
  html, body {
    height: 100%;

    #mainContainer {
      height: 100%;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }
  }
}

@media (orientation: landscape) {
  html, body {
    height: 100%;
  }

  html {
    z-index: 1;
    overflow-y: auto;

    #mainContainer {
    height: 100%;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    display: flex;
    flex-direction: row;
    }
  }
}
</style>