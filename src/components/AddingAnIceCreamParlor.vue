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
              <span id="span1">Dodaj zdjęcie lodziarny:</span>
              <input id="input" type="file" @change="onFileSelected">
              <span id="span2">(niewymagane)</span>
            </div>
            <img id="image" :style="{'height': height + 'px'}" :src="image">
          </v-container>
          <v-card-text>
            <v-container>
              <slot name="v-text-field"/>
              <v-text-field
                v-model="name"
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
            <MglGeocoderControl :accessToken="accessToken"/>
            <MglMarker
              v-if="coordinates"
              :coordinates="coordinates"
              color="blue"
            />
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
    <Announcement
      v-if="whetherToDisplay"
      @close="closeTheMessage"
      >
      <template v-slot:content>
        <template v-if="communique.contents">
          <font-awesome id="symbol" :icon="['fas', communique.symbol]"/>
          <span class="content">{{communique.contents}}</span>
        </template>
        <v-progress-circular
          v-else
          class="content"
          indeterminate
          color="green"
        ></v-progress-circular>
      </template>
    </Announcement>
  </div>
</template>

<script>
import Announcement from './Announcement.vue'

import { MglMap, MglMarker } from "vue-mapbox"
import MglGeocoderControl from 'vue-mapbox-geocoder'

import axios from 'axios'

export default {
  name: 'AddingAniCeCreamParlor',
  components: {
    Announcement,
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
      coordinates: null,
      defaultInput: null,
      image: null,
      height: 0,
      formData: new FormData(),
      name: null,
      lat: null,
      lon: null,
      town: null,
      postal_code: null,
      street: null,
      place_name: null,
      whetherToDisplay: false,
      communique: {
        symbol: null,
        contents: null
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
      
      this.formData.append('photo', file)
    },
    addMarker(map) {
      const lngLat = map.mapboxEvent.lngLat
      this.coordinates = [lngLat.lng, lngLat.lat]

      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng}, ${lngLat.lat}.json?access_token=${this.accessToken}`)
        .then(response =>
        {
          this.dataFilter(response.data.features[0])
        })
        .catch(error =>
        {
          this.communique.symbol = "times-circle"
          this.communique.contents = error
        })

      this.formData.append('lat', lngLat.lat)
      this.formData.append('lon', lngLat.lng)
    },
    dataFilter(place_name) {
      this.formData.append('town', place_name.context[1].text)
      this.formData.append('postal_code', place_name.context[0].text)

      if (place_name.address)
      {
        this.formData.append('street', place_name.text + " " + place_name.address)
      }
      else
      {
        if (place_name.properties.address)
        {
          this.formData.append('street', place_name.properties.address)
          this.formData.append('place_name', place_name.text)
        }
        else
        {
          this.formData.append('street', place_name.text)
        }
      }
    },
    sendingData() {
      this.formData.append('name', this.name)

      const config = {
        headers: { 
          'Authorization': `Bearer ${this.user.access_token}`,
          'Content-Type': 'multipart/form-data'
        }
      }

      this.whetherToDisplay = true

      axios.post("https://citygame.ga/api/stall/create", this.formData, config)
        .then(response => {
        if (response)
        {
          this.communique.symbol = "check-circle"
          this.communique.contents = "Utworzono lodziarne"
        }
        })
        .catch(error => {
          this.communique.symbol = "times-circle"
        
          if (!error.response)
          {
            this.communique.contents = "Brak połączenia, spróbuj ponownie później"
          }
          else 
          {
            const status = error.response.status

            if (status == 422)
            {
              this.communique.contents = "Uzupełnij dane"
            }
            else
            {
              this.communique.contents = error
            }
          }
        })

      this.formData.delete('place_name')
    },
    closeTheMessage() {
      this.communique.contents = null
      this.whetherToDisplay = false
    },
  }
}
</script>

<style lang="scss">
@import './AddingAnIceCreamParlorP.scss';

#span2 {
  font-size: 11px;
}

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
        #span1 {
          position: absolute;
          bottom: 30px;
        }
        #span2 {
          position: absolute;
          bottom: -17px;
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
    @media (max-width: 1000px) {
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