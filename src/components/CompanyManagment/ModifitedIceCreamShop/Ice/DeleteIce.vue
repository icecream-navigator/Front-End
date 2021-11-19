<template>
  <v-btn
    id="buttonDelete"
    @click="delet"
  >
    <font-awesome :icon="['fas', 'trash']"/>
  </v-btn>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UpdateIce',
  props: ['user', 'idIce'],
  methods: {
    delet() {
      const config = {
        headers: { 
          Authorization: `Bearer ${this.user.access_token}`
        }
      }

      console.log()
      axios.delete("https://citygame.ga/api/icecream/delete/" + this.idIce, config)
        .then(response => {
          if (response)
          {
            this.$emit('refresh')
          }
        })
    }
  }
}
</script>

<style lang="scss">
#buttonDelete {
  margin-top: 10px;
  margin-left: -10px;

  width: 60px;
  height: 20px;

  min-width: 0;

  border-radius: 0 0 0 10px;
}
</style>