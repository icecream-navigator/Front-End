<template>
  <div id="containerCompanyManagment">
    <div id="addingAnIceCreamParlor">
      <AddingAnIceCreamParlor
        :user="user"
        @refresh="getData"
      />
    </div>
    <v-card
      v-for="iceCreamShop in companyManagment" :key="iceCreamShop.id"
      class="card"
      width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="250"
        :src="iceCreamShop.photo_url"
      ></v-img>

      <v-card-title>{{iceCreamShop.name}}</v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="iceCreamShop.rate"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div v-if="iceCreamShop.rate" class="grey--text ms-4">
            {{iceCreamShop.rate + " (" + iceCreamShop.rates_time + ")"}}
          </div>
        </v-row>

        <div v-if="iceCreamShop.place_name" class="my-4 text-subtitle-1">
          {{iceCreamShop.town + " " + iceCreamShop.postal_code + ", " + iceCreamShop.place_name + ", "  + iceCreamShop.street}}
        </div>

        <div v-else class="my-4 text-subtitle-1">
          {{iceCreamShop.town + " " + iceCreamShop.postal_code + ", "  + iceCreamShop.street}}
        </div>

      </v-card-text>
      <div id="buttonDetails">
        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
          <ModifitedIceCreamShop
            :user="user"
            :iceCreamShop="iceCreamShop"
            @delet="deleteIceCreamShop"
            @refresh="getData"
          />
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script>
import AddingAnIceCreamParlor from './AddingAnIceCreamParlor/AddingAnIceCreamParlor.vue'
import ModifitedIceCreamShop from './ModifitedIceCreamShop/ModifitedIceCreamShop.vue'

import axios from 'axios'

export default {
  name: 'CompanyManagment',
  components: {
    AddingAnIceCreamParlor,
    ModifitedIceCreamShop
  },
  props: ['user'],
  data() {
    return {
      companyManagment: null,
      config: {
        headers: {
          Authorization: `Bearer ${this.user.access_token}`
        }
      }
    }
  },
  methods: {
    getData() {
      axios.get("https://citygame.ga/api/stall/my", this.config)
        .then(response =>
        {
          this.companyManagment = response.data
        })
    },
    deleteIceCreamShop(id) {
      axios.delete("https://citygame.ga/api/stall/delete/" + id, this.config)
        .then(
          this.getData()
        )
    }
  }
}
</script>

<style lang="scss">
@import './CompanyManagmentP.scss';

@media (orientation: landscape) {
  #containerCompanyManagment {
    margin-left: 15.6%;
    width: 84.4%;
    background-color: pink;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    #addingAnIceCreamParlor {
      z-index: 1;

      position: fixed;
      top: 1vw;
      right: 1vw;
    }
    .card {
      margin: 25px;
      height: 493px;
      #buttonDetails {
        position: absolute;
        bottom: 0;
        width: 100%;
      }
    }
  }
}
</style>