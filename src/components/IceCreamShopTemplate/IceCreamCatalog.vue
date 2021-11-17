<template>
  <div id="containerIceCreamCatalog">
    <v-btn
      id="iceCreamCatalog"
      elevation="2"
      small
      @click="showTheIceCream(), getDataIce()"
    >
      Katolog lodów
    </v-btn>
    <div v-if="display" id="ice-cream">
      <span v-for="ice in iceCream" :key="ice.id">
        <div id="ice">
          <b>{{ice.flavour}}</b><br>
          {{ice.type}}<br>
          {{ice.form}}<br>
          Cena: {{ice.price}} zł<br>
          Ilość: {{ice.quantity}}<br>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'IceCreamCatalog',
  props: ['iceCreamShop'],
  data() {
    return {
      display: false,
      iceCream: null
    }
  },
  methods: {
    showTheIceCream() {
      if (this.display)
      {
        this.display = false
      }
      else
      {
        this.display = true
      }
    },
    getDataIce() {
      axios.get("https://citygame.ga/api/stall/show/1")
        .then(response =>
        {
          this.iceCream = response.data[0].icecreams
        })
    }
  }
}
</script>


<style lang="scss">
#iceCreamCatalog {
  margin-top: 24px;

  width: 140px;
  height: 40px;

  color: white;

  background-color: #505050;
  border-style: double;

  display: flex;
  justify-content: center;
  align-items: center;
}

#ice-cream {
  padding-top: 25px;
  padding-left: 15px;
  padding-right: 15px;
  
  background-color: #404040;

  display: flex;
  flex-wrap: wrap;
  #ice {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 25px;

    padding: 10px;

    width: 120px;
    height: 150px;

    color: white;

    border-radius: 10px;
    background-color: #606060;
  }
}
</style>