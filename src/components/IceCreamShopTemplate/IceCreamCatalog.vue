<template>
  <div id="containerIceCreamCatalog">
    <v-btn
      id="iceCreamCatalog"
      elevation="2"
      small
      @click="getDataIce(), showTheIceCream()"
    >
      Katolog lodów
    </v-btn>
    <div v-if="display" id="ice-cream">
      <div v-for="ice in iceCream" :key="ice.id" id="ice">
        <div id="like">
          <font-awesome id="icon" :icon="['fas', 'star']"/>
          {{ice.votes}}
        </div>
        <b>{{ice.flavour}}</b><br>
        {{ice.type}}<br>
        {{ice.form}}<br>
        Cena: {{ice.price}} zł<br>
        Ilość: {{ice.quantity}}<br>
        <div
          v-if="user && user.is_admin && search == false"
          id="buttons"
        >
          <DeleteIce
            :user="user"
            :idIce="ice.id"
            @refresh="getDataIce"
          />
          <UpdateIce
            :user="user"
            :ice="ice"
            @refresh="getDataIce"
          />
        </div>
        <Like
          v-if="user && user.is_admin == false"
          :user="user"
          :idIce="ice.id"
        />
      </div>
      <AddIce
        v-if="user && user.is_admin && search == false"
        :user="user"
        :IceCreamShop="iceCreamShop"
        @refresh="getDataIce"
      />
    </div>
  </div>
</template>

<script>
import AddIce from '../CompanyManagment/ModifitedIceCreamShop/Ice/AddIce.vue'
import DeleteIce from '../CompanyManagment/ModifitedIceCreamShop/Ice/DeleteIce.vue'
import UpdateIce from '../CompanyManagment/ModifitedIceCreamShop/Ice/UpdateIce.vue'
import Like from '../RegularUserView/Like.vue'

import axios from 'axios'

export default {
  name: 'IceCreamCatalog',
  components: {
    AddIce,
    DeleteIce,
    UpdateIce,
    Like
  },
  props: ['user', 'iceCreamShop', 'search'],
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
      axios.get("https://citygame.ga/api/stall/show/" + this.iceCreamShop.id)
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

    position: relative;
    #like {
      position: absolute;
      top: 0;
      right: 0;

      width: 50%;
      height: 12.5px;

      font-size: 10px;

      background-color: blueviolet;

      display: flex;
      align-items: center;
      #icon {
        margin-right: 4px;
      }
    }
    #buttons {
      display: flex;
    }
  }
}
</style>