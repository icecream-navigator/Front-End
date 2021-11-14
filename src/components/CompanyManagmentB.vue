<template>
  <div>
    <v-btn
      id="buttonPortait"
      class="button"
      @click="event(), getData(), hideMenu()"
      >
      <b>
        ZARZĄDZANIE
      </b>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "CompanyManagmentB",
  props: ['user'],
  methods: {
    event() {
      this.$emit('event', 'CompanyManagment')
    },
    getData() {
      const config = {
        headers: {
          Authorization: `Bearer ${this.user.access_token}`
        }
      }
      axios.get("https://citygame.ga/api/stall/my", config)
        .then(response => {
          this.$emit('companyManagment', response.data)
        })
    },
    hideMenu() {
      this.$emit('hideMenu')
    }
  }
}
</script>

<style>
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