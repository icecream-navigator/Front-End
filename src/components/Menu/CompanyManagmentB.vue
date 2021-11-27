<template>
  <div>
    <v-btn
      id="buttonPortait"
      class="button"
      @click="event(), hideMenu()"
      >
      <b>
        ZARZĄDZANIE
      </b>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "CompanyManagmentB",
  methods: {
    event() {
      this.$emit('event', 'CompanyManagment')
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