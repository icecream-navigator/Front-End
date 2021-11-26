<template>
  <v-app>
    <div id="mainContainer">
      <header>
        <Menu
          @component="replaceComponent"
          @user="user"
          @open="open"
          ref="refresh"
        />
      </header>
      <main id="main">
      <component
        :is="selectedComponent"
        ref="open"
        :user="userData"
        @refresh="refresh"
      />
      </main>
    </div>
  </v-app>
</template>

<script>
import Menu from './components/Menu/Menu.vue'

import Main from './components/MainPage/Main.vue'
import SearchEngine from './components/SearchEngine/SearchEngine.vue'
import CompanyManagment from './components/CompanyManagment/CompanyManagment.vue'
import Favorites from './components/Favorites/Favorites.vue'

export default {
  name: 'App',
  components: {
    Menu,
    Main,
    SearchEngine,
    CompanyManagment,
    Favorites
  },
  data() {
    return {
      selectedComponent: Main,
      userData: null
    }
  },
  methods: {
    replaceComponent(component) {
      this.selectedComponent = component
    },
    user(data) {
      this.userData = data
    },
    open() {
      this.$refs.open.getData()
    },
    refresh() {
      if (this.selectedComponent == SearchEngine)
      {
        this.$refs.refresh.refresh()
      }
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
      #main {
        height: 100;
      }
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
      #main {
        margin-left: 15.6%;
        width: 84.4%;
      }
    }
  }
}
</style>