<template>
  <div>
    <v-btn
      id="edit"
      @click="dialog = true"
    >
      <font-awesome :icon="['fas', 'edit']"/>
    </v-btn>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="1000px"
      >
        <article>
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
                    <img id="image" style="height: 210px" :src="image">
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
                  <TimeFromUpdate
                    :time="timeOpen"
                    @time="timeFrom"
                  />
                  <TimeToUpdate
                    :time="timeClose"
                    @time="timeTo"
                  />
                </section>
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
                ZAPISZ ZMIANY
              </v-btn>
            </v-card-actions>
          </v-card>
        </article>
      </v-dialog>
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
import TimeFromUpdate from './TimeUpdate/TimeFromUpdate.vue'
import TimeToUpdate from './TimeUpdate/TimeToUpdate.vue'
import Announcement from '../../Notifications/Announcement.vue'

import { MglMap, MglMarker } from "vue-mapbox"
import MglGeocoderControl from 'vue-mapbox-geocoder'

import axios from 'axios'

export default {
  name: 'UpdateIceCreamShop',
  components: {
    TimeFromUpdate,
    TimeToUpdate,
    Announcement,
    MglMap,
    MglMarker,
    MglGeocoderControl
  },
  props: ['user', 'iceCreamShop'],
  data() {
    return {
      dialog: false,
      accessToken: process.env.VUE_APP_TOKEN_MAPBOX,
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      center: [19, 52.25],
      zoom: 4.5,
      coordinates: null,
      image: null,
      formData: new FormData(),
      name: null,
      timeOpen: {
        hour: this.iceCreamShop.open.substring(0, 2),
        minute: this.iceCreamShop.open.substring(3, 5)
      },
      timeClose: {
        hour: this.iceCreamShop.close.substring(0, 2),
        minute: this.iceCreamShop.close.substring(3, 5)
      },
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
  mounted() {
    this.image = this.iceCreamShop.photo_url
    this.name = this.iceCreamShop.name
    this.coordinates = [this.iceCreamShop.lon, this.iceCreamShop.lat]
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0]
      this.image = URL.createObjectURL(file)
      
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
          'Authorization': `Bearer ${this.user.access_token}`,
          'Content-Type': 'multipart/form-data'
        }
      }

      this.whetherToDisplay = true

      axios.post("https://citygame.ga/api/stall/update/" + this.iceCreamShop.id, this.formData, config)
        .then(response => {
        if (response)
        {
          this.communique.symbol = "check-circle"
          this.communique.contents = "Zaaktualizowano lodziarnie"
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
            this.communique.contents = error
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
@import '../AddingAnIceCreamParlor/AddingAnIceCreamParlorP.scss';

#edit {
  background-color: darkorchid !important;
  border-radius: 0 0 10px 0;
}

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