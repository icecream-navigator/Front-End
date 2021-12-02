<template>
  <v-app>
    <div id="mainContainer">

      <header>
        <Menu
          @component="replaceComponent"
          @user="user"
          ref="refresh"
        />
      </header>
      <main id="main">
        <router-view
          :user="userData"
          @refresh="refresh"
        />
      </main>
    </div>
  </v-app>
</template>

<script>
import Menu from './components/Menu/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu
  },
  data() {
    return {
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
    refresh() {
      if (this.selectedComponent == 'SearchEngine')
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

a {
  text-decoration: none; 
  color: inherit;
}

@media (orientation: portrait) {
  html, body {
    height: 100%;

    #mainContainer {
      height: 100%;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      #main {
        height: 100vh;
        background-color: pink;
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
        background-color: pink;
      }
    }
  }
}
</style>