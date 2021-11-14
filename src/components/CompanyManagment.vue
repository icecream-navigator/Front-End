<template>
  <div id="containerCompanyManagment">
    <div id="addingAnIceCreamParlor">
      <AddingAnIceCreamParlor :user="user"/>
    </div>
    <v-card
      v-for="item in companyManagment" :key="item.id"
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
        :src="item.photo_url"
      ></v-img>

      <v-card-title>{{item.name}}</v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="item.rate"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div v-if="item.rate" class="grey--text ms-4">
            {{item.rate + " (" + item.rates_time + ")"}}
          </div>
        </v-row>

        <div v-if="item.place_name" class="my-4 text-subtitle-1">
          {{item.town + " " + item.postal_code + ", " + item.place_name + ", "  + item.street}}
        </div>

        <div v-else class="my-4 text-subtitle-1">
          {{item.town + " " + item.postal_code + ", "  + item.street}}
        </div>

      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
        >
          SZCZEGÓŁY
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import AddingAnIceCreamParlor from './AddingAnIceCreamParlor.vue'

export default {
  name: 'CompanyManagment',
  components: {
    AddingAnIceCreamParlor
  },
  props: ['user', 'companyManagment'],
  data: () => ({
    selection: 1
  })
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
      height: 465px;
    }
  }
}
</style>