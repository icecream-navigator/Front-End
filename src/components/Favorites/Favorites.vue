<template>
  <article>
    <div id="containerCompanyManagment">
      <v-card
        v-for="favorite in favorites" :key="favorite.id"
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
          :src="favorite.photo_url"
        ></v-img>

        <section>
          <v-card-title>{{favorite.name}}</v-card-title>
        </section>

        <v-card-text>
          <section>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :value="favorite.rate"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div v-if="favorite.rate" class="grey--text ms-4">
                {{favorite.rate + " (" + favorite.rates_time + ")"}}
              </div>
            </v-row>
          </section>

          <section>
            <div v-if="favorite.place_name" class="my-4 text-subtitle-1">
              {{favorite.town + " " + favorite.postal_code + ", " + favorite.place_name + ", "  + favorite.street}}
            </div>

            <div v-else class="my-4 text-subtitle-1">
              {{favorite.town + " " + favorite.postal_code + ", "  + favorite.street}}
            </div>
          </section>

        </v-card-text>
        <div id="buttonDetails">
          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <IceCreamParlour
              :user="user"
              :iceCreamShop="favorite"
              @refresh="getData"
            />
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </article>
</template>

<script>
import IceCreamParlour from '../RegularUserView/IceCreamParlour.vue'

import axios from 'axios'

export default {
  name: 'Favorites',
  props: ['user'],
  data() {
    return {
      favorites: null
    }
  },
  components: {
    IceCreamParlour
  },
  methods: {
    getData() {
      const config = {
        headers: {
          Authorization: `Bearer ${this.user.access_token}`
        }
      }

      axios.get("https:///citygame.ga/api/fav/index", config)
        .then(response =>
        {
          this.favorites = response.data
          this.$emit("refresh")
        })
    }
  }
}
</script>

<style lang="scss">
@import '../CompanyManagment/CompanyManagmentP.scss';

@media (orientation: landscape) {
  #containerCompanyManagment {
    width: 100%;
    height: 100%;
    background-color: pink;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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