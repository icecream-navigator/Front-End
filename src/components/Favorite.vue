<template>
  <div>
    <v-btn
      id="buttonPortait"
      class="button"
      @click="hideMenu"
      >
      <b>
        ULUBIONE
      </b>
    </v-btn>  
  </div>
</template>

<script>
export default {
  name: "CompanyManagment",
  methods: {
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