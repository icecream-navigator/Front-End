<template>
  <div>
    <v-btn
      id="buttonPortait"
      class="button"
      @click="event(), hideMenu()"
      >
      <b>
        ULUBIONE
      </b>
      <div
        v-if="number"
        id="circle"
      >
        <b id="number">{{number}}</b>
      </div>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "FavoritesB",
  props: ['user'],
  data() {
    return {
      number: null
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    event() {
      this.$emit('event', 'Favorites')
    },
    hideMenu() {
      this.$emit('hideMenu')
    },
    refresh() {
      const config = {
        headers: {
          Authorization: `Bearer ${this.user.access_token}`
        }
      }

      axios.get("https://citygame.ga/api/fav/counter", config)
        .then(response =>
        {
          this.number = response.data
        })
    }
  }
}
</script>

<style lang="scss">
#circle {
  margin-bottom: 15px;

  width: 25px;
  height: 25px;

  font-size: 12px;

  border-radius: 50%;
  background-color: red;

  display: flex;
  justify-content: center;
  align-items: center;
  #number {
    margin-right: 3px;
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
    #circle {
      margin-bottom: 15px;

      width: 4vw;
      height: 4vw;

      font-size: 2.5vw;

      border-radius: 50%;
      background-color: red;

      display: flex;
      justify-content: center;
      align-items: center;
      #number {
        margin-right: 0.5vw;
      }
    }
  }
}
</style>