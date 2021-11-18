<template>
  <div id="ice">
    <input class="input" type="text" v-model="ice.flavour"/>
    <input class="input" type="text" v-model="ice.type"/>
    <input class="input" type="text" v-model="ice.form"/>
    <input class="input" type="text" v-model="ice.price"/>
    <input class="input" type="text" v-model="ice.quantity"/>
    <v-btn
      id ="buttonAdd"
      color="accent"
      elevation="2"
      small
      @click="addIce"
    >
      DODAJ
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddIce',
  props: ['user', 'IceCreamShop'],
  data() {
    return {
      ice: {
        flavour: 'smak',
        type: 'typ',
        form: 'forma',
        price: 'cena',
        quantity: 'ilość'
      }
    }
  },
  methods: {
    addIce() {
      const config = {
        headers: {
          Authorization: `Bearer ${this.user.access_token}`
        }
      }

      axios.post("https://citygame.ga/api/icecream/store/" + this.IceCreamShop.id, this.ice, config)
        .then(response => {
          if (response)
          {
            this.clear()
            this.$emit('refresh')
          }
        })
    },
    clear() {
      this.ice.flavour = null,
      this.ice.type = null,
      this.ice.form = null,
      this.ice.price = null,
      this.ice.quantity = null
    }
  }
}
</script>

<style lang="scss">
#ice {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 25px;

  padding: 10px;

  width: 120px;
  height: 150px;

  border-radius: 10px;
  background-color: #606060;
  .input {
    height: 20px;
    width: 100px;

    background: white;
  }
  #buttonAdd {
    margin-left: 40px;

    height: 20px;
    width: 60px;
  }
}
</style>