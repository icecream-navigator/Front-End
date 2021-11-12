<template>
  <div>
    <v-row justify="center">
      <v-btn
        id="button"
        x-large
        @click="dialog = true"
      >
        <b>+</b>
      </v-btn>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="1000px"
      >
        <v-card id="card" class="cardWithMap">
          <button
            id="close"
            @click="dialog = false"
          >
            <font-awesome :icon="['fas', 'times']"/>
          </button>
          <v-container id="uploadImage">
            <div id="addImage">
              <span>Dodaj zdjęcie lodziarny:</span>
              <input id="input" type="file" @change="onFileSelected">
            </div>
            <img id="image" :style="{'height': height + 'px'}" :src="image">
          </v-container>
          <v-card-text>
            <v-container>
              <slot name="v-text-field"/>
              <v-text-field
                v-model="iceCreamShop.name"
                label="Nazwa lodziarny"
                required
              ></v-text-field>
            </v-container>
          </v-card-text>
          <MglMap
            id="map"
            :accessToken="accessToken"
            :mapStyle="mapStyle"
            :center="center"
            :zoom="zoom"
            @click="addMarker"
          >
            <MglGeocoderControl
              :accessToken="accessToken"
              :input="defaultInput"
            />
            <MglMarker :coordinates="coordinates" color="blue"/>
          </MglMap>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              id="buttonLogIn"
              block
              color="blue darken-1"
              @click="sendingData"
            >
              Stwórz
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { MglMap, MglMarker } from "vue-mapbox"
import MglGeocoderControl from 'vue-mapbox-geocoder'

import axios from 'axios'

export default {
  name: 'AddingAniCeCreamParlor',
  components: {
    MglMap,
    MglMarker,
    MglGeocoderControl
  },
  props: ['user'],
  data() {
    return {
      dialog: false,
      accessToken: process.env.VUE_APP_TOKEN_MAPBOX,
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      center: [19, 52.25],
      zoom: 4.5,
      coordinates: [0, 0],
      defaultInput: null,
      image: null,
      height: 0,
      iceCreamShop: {
        photo: null,
        name: null,
        lat: null,
        lon: null,
        town: null,
        postal_code: null,
        street: null,
        place_name: 'null'
      }
    }
  },
  created() {
    this.map = null
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0]
      this.image = URL.createObjectURL(file)

      this.height = 210

      this.iceCreamShop.photo = file
    },
    addMarker(map) {
      const lngLat = map.mapboxEvent.lngLat
      this.coordinates = [lngLat.lng, lngLat.lat]

      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng}, ${lngLat.lat}.json?access_token=${process.env.VUE_APP_TOKEN_MAPBOX}`)
        .then(response =>
        {
          this.dataFilter(response.data.features[0])
        })
        .catch(error =>
        {
          console.log(error)
        })

      this.iceCreamShop.lat = lngLat.lat
      this.iceCreamShop.lon = lngLat.lng
    },
    dataFilter(place_name) {
      this.iceCreamShop.town = place_name.context[1].text
      this.iceCreamShop.postal_code = place_name.context[0].text

      if (place_name.address)
      {
        this.iceCreamShop.street = place_name.text + " " + place_name.address
        this.iceCreamShop.place_name = 'null'
      }
      else
      {
        this.iceCreamShop.street = place_name.properties.address
        this.iceCreamShop.place_name = place_name.text
      }

      console.log(this.iceCreamShop)
    },
    sendingData() {
      const config = {
        headers: { 
          'Authorization': `Bearer ${this.user.access_token}`,
          'Content-Type': 'multipart/form-data'
        }
      }

      axios.post("https://citygame.ga/api/stall/create", this.iceCreamShop, config)
        .then(response =>
        {
          console.log(response)
        })
    }
  }
}
</script>

<style lang="scss">
@import './AddingAnIceCreamParlorP.scss';

@media (orientation: landscape) {
  #button {
    padding: 0px;

    width: 3.5vw;
    height: 3.5vw;

    min-width: auto;

    background-color: #4287f5;
    border-radius: 50%;

    font-size: 4vw;
    color: white;
  }
  .cardWithMap {
    padding-top: 2.2rem !important;
    padding-bottom: 1% !important;
    #uploadImage {
      padding: 0;
      padding-left: 48px;
      padding-right: 48px;

      display: flex;
      justify-content: space-between;
      #addImage {
        margin-top: 50px;

        width: 170px;
        
        display: flex;
        flex-direction: column;
        position: relative;
        span {
          position: absolute;
          bottom: 30px;
        }
        #input {
          position: absolute;
          bottom: 0;

          margin-top: 10px;
          margin-bottom: auto;
          
          width: 105px;
        }
      }
    }
    #map {
      margin-bottom: 1%;

      width: 100%;
      height: 375px;
      .mapboxgl-ctrl-top-right {
        top: auto;
        right: auto;
      }
    }
    @media only screen and (max-width: 1000px) {
      #image {
        height: 25vw !important;
      }
      #map {
        height: 75vh;
      }
    }
  }
}
</style>