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
      <article>
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
            <v-card-text>
              <v-container>
                <section>
                  <div id="uploadImage">
                    <div id="addImage">
                      <span id="span1">Dodaj zdjęcie lodziarni:</span>
                      <input id="input" type="file" @change="onFileSelected">
                      <span id="span2">(niewymagane)</span>
                    </div>
                    <img id="image" :style="{'height': height + 'px'}" :src="image">
                  </div>
                </section>
                <section>
                  <v-text-field
                    v-model="name"
                    label="Nazwa lodziarni"
                    required
                  ></v-text-field>
                </section>
                <section>
                  <span id="span3">Godziny otwarcia:</span><br>
                  <TimeFrom @time="timeFrom"/>
                  <TimeTo @time="timeTo"/>
                </section>
              </v-container>
            </v-card-text>
            <section>
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
            </section>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                id="buttonLogIn"
                block
                color="blue darken-1"
                @click="sendingData"
              >
                STWÓRZ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </article>
    </v-row>
    <Announcement 
      v-if="whetherToDisplay"
      @close="closeTheMessage"
    >
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
    </Announcement>
  </div>
</template>

<script>
import TimeFrom from '../../Times/TimeFrom.vue'
import TimeTo from '../../Times/TimeTo.vue'
import Announcement from '../../Notifications/Announcement.vue'

import { MglMap, MglMarker } from "vue-mapbox"
import MglGeocoderControl from 'vue-mapbox-geocoder'

import axios from 'axios'

export default {
  name: 'AddingAniCeCreamParlor',
  components: {
    TimeFrom,
    TimeTo,
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
      image: null,
      height: 0,
      formData: new FormData(),
      name: null,
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
    timeFrom(time) {
      this.formData.append('open', time.hour + ":" + time.minute)
    },
    timeTo(time) {
      this.formData.append('close', time.hour + ":" + time.minute)
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
      place_name.context.forEach(element => {
        if (element.id.includes("postcode"))
        {
          this.formData.append('postal_code', element.text)
        }
        if (element.id.includes("place"))
        {
          this.formData.append('town', element.text)
        }
      })

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
          Authorization: `Bearer ${this.user.access_token}`
        }
      }

      this.whetherToDisplay = true

      axios.post("https://citygame.ga/api/stall/create", this.formData, config)
        .then(response => {
          if (response)
          {
            this.communique.symbol = "check-circle"
            this.communique.contents = "Utworzono lodziarne"
            this.$emit('refresh')
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
              this.communique.contents = "Uzupełnij dane albo skróć nazwe/nazwy"
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
      this.whetherToDisplay = false
      this.communique.contents = null
    }
  }
}
</script>

<style lang="scss">
@import './AddingAnIceCreamParlorP.scss';

#span2 {
  font-size: 11px;
}

#span3 {
  font-size: 18px;
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
      display: flex;
      justify-content: space-between;
      #addImage {
        width: 170px;
        height: 80px;
        
        color: black;
        
        display: flex;
        flex-direction: column;
        #span1 {  
          bottom: 30px;
        }
        #input {
          margin-top: 5px;
          margin-bottom: auto;
          
          width: 90px;
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
</style>