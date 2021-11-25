<template>
  <div id="containerSerachEngine">
    <v-container fluid>
      <v-combobox
        v-model="model"
        multiple
        solo
      >
      <template slot="label">
        <font-awesome :icon="['fas', 'search']"/><span id="slotLabel">Szukaj</span>
      </template>
        <template v-slot:selection="{ item, parent }">
          <v-chip
            :color="`${item.color} lighten-3`"
            label
            small
          >
            <span class="pr-2">
              {{ item.text }}
            </span>
            <v-icon
              small
              @click="parent.selectItem(item)"
            >
              $delete
            </v-icon>
          </v-chip>
        </template>
      </v-combobox>
    </v-container>
    <MglMap
      id="map"
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      :center="center"
      :zoom="zoom"
    >
      <div v-for="iceCreamShop in iceCreamShops" :key="iceCreamShop.id">
        <Markerr
          :user="user"
          :iceCreamShop="iceCreamShop"
          @refresh="refresh"
        />
      </div>
    </MglMap>
  </div>
</template>

<script>
import Markerr from './Markerr.vue'

import { MglMap } from "vue-mapbox"

import axios from 'axios'

export default {
  name: 'SearchEngine',
  components: {
    Markerr,
    MglMap
  },
  props: ['user'],
  data: () => ({
    colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    nonce: 1,
    model: [],
    accessToken: process.env.VUE_APP_TOKEN_MAPBOX,
    mapStyle: "mapbox://styles/mapbox/streets-v11",
    center: [19, 52.25],
    zoom: 4.5,
    iceCreamShops: null
  }),
  watch: {
    model (val, prev) {
      if (val.length === prev.length) return
      this.model = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          }
          this.nonce++
        }
        return v
      })

      this.getIceCream()
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    getIceCream() {
      var modelString = ""

      this.model.forEach(element => {
        modelString += element.text + " "
      })
      
      axios.post("https://citygame.ga/api/icecream/search", { search: modelString })
        .then(response => {
          if (response)
          {
            this.getICeCreamShop(response.data)
          }
        })
    },
    getUniqueId(iceCream) {
      var allStallId = []

      iceCream.forEach(element => {
        allStallId.push(element.stall_id)
      })

      const uniqueStallId = Array.from(new Set(allStallId))

      return uniqueStallId
    },
    getICeCreamShop(iceCream) {
      const uniqueStallId = this.getUniqueId(iceCream)

      this.iceCreamShops = []

      uniqueStallId.forEach(element => {
        axios.get("https://citygame.ga/api/stall/show/" + element)
          .then(response => {
            if (response)
            {
              this.iceCreamShops.push(response.data[0])
            }
          })
      })
    },
    refresh()
    {
      axios.get("https://citygame.ga/api/stall/all")
      .then(response => {
        if (response)
        {
          this.iceCreamShops = response.data
        }
      })

      this.$emit("refresh")
    }
  }
}
</script>

<style lang="scss">
@import './SearchEngineP.scss';

#slotLabel {
  margin-left: 10px;
}

@media (orientation: landscape) {
  #containerSerachEngine {
    margin-left: 15.6%;
    width: 84.4%;
    background-color: pink;
    .container {
      padding: 24px;
    }
    #map {
      width: 100%;
      height: calc(100% - 126px);
    }
  }
}
</style>