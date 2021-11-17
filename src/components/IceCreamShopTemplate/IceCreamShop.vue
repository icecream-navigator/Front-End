<template>
  <v-row justify="center">
    <v-btn
      color="deep-purple lighten-2"
      text
      @click="dialog = true, comments()"
      @click.once="commentsInterval"
    >
      SZCZEGÓŁY
    </v-btn>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="1000px"
    >
      <v-card id="card" class="cardIceCreamShop">
        <button
          id="close"
          @click="dialog = false"
        >
          <font-awesome :icon="['fas', 'times']"/>
        </button>
        <slot name="owner"/>
        <v-card-text>
          <v-container>
            <div id="boxTop">
              <img id="image" alt="lodziarnia" :src="iceCreamShop.photo_url"/>
              <div id="boxTopRight">
                <div id="boxTopRightTop">
                  <h1>{{iceCreamShop.name}}</h1>
                  <div
                    v-if="iceCreamShop.status == 'Closed'"
                    id="status"
                    style="background-color: red"
                  >
                    <span id="stringStatus">Zamknięte</span>
                  </div>
                  <div
                    v-else
                    id="status"
                    style="background-color: yellowgreen"
                  >
                    <span id="stringStatus">Otwarte</span>
                  </div>
                </div>
                <span v-if="iceCreamShop.place_name" id="address">
                  {{iceCreamShop.town + " " + iceCreamShop.postal_code + ", " + iceCreamShop.place_name + ", " + iceCreamShop.street}}
                </span>
                <span v-else id="address">
                  {{iceCreamShop.town + " " + iceCreamShop.postal_code + ", " + iceCreamShop.street}}
                </span>
                <div id="rating">
                  <v-rating
                    :value="iceCreamShop.rate"
                    color="blue"
                    dense
                    half-increments
                    readonly
                  ></v-rating>
                  <span id="ratingSpan">{{iceCreamShop.rate}} ({{iceCreamShop.rates_time}})</span>
                </div>
                <div id="openingTime">
                  Godziny otwarcia:<br>
                  Od: {{iceCreamShop.open}}<br>
                  Do: {{iceCreamShop.close}}<br>
                </div>
              </div>
            </div>
            <div/>
          </v-container>
        </v-card-text>
        <MglMap
          id="map"
          :accessToken="accessToken"
          :mapStyle="mapStyle"
          @load="onMapLoaded"
          :center="center"
          :zoom="zoom"
        >
          <MglMarker
            :coordinates="coordinates"
            color="blue"
          />
        </MglMap>
        <v-card-text>
          <v-container>
            <IceCreamCatalog :iceCreamShop="iceCreamShop"/>
          </v-container>
        </v-card-text>
        <v-card-text>
          <v-container>
            <span v-for="opinion in opinions" :key="opinion.id">
              <Comment :opinion="opinion"/>
            </span>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import IceCreamCatalog from './IceCreamCatalog.vue'
import Comment from './Comment.vue'

import { MglMap, MglMarker } from "vue-mapbox"

import axios from 'axios'

export default {
  name: 'IceCreamShop',
  components: {
    Comment,
    IceCreamCatalog,
    MglMap,
    MglMarker
  },
  props: ['iceCreamShop'],
  data() {
    return {
      dialog: false,
      accessToken: process.env.VUE_APP_TOKEN_MAPBOX,
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      center: [this.iceCreamShop.lon, this.iceCreamShop.lat],
      zoom: 17,
      coordinates: [this.iceCreamShop.lon, this.iceCreamShop.lat],
      opinions: null
    }
  },
  create() {
    this.map = null
  },
  methods: {
    onMapLoaded(event) {
      this.map = event.map
    },
    comments() {
      axios.get("https://citygame.ga/api/stall/show/" + this.iceCreamShop.id + "/opinions")
        .then(response =>
        {
          this.opinions = response.data[0].opinions
        })
    },
    commentsInterval() {
      setInterval(()=>{
        axios.get("https://citygame.ga/api/stall/show/" + this.iceCreamShop.id + "/opinions")
          .then(response =>
          {
            this.opinions = response.data[0].opinions
          })
      }, 5000)
    }
  }
}
</script>

<style lang="scss">
@import './IceCreamShopP.scss';

@media (orientation: landscape) {
  .cardIceCreamShop {
    padding-top: 2.2rem !important;
    padding-bottom: 0 !important;
    #boxTop {
      display: flex;
      flex-direction: row;
      #boxTopRight {
        margin-left: 40px;
        display: flex;
        flex-direction: column;
        #boxTopRightTop {
          display: flex;
          h1 {
            font-size: 32px;
            line-height: 100%;
          }
          #status {
            margin-left: 15px;

            width: 80px;
            height: 25px;

            border-style: solid;
            border-radius: 12.5px;

            text-align: center;
          }
        }
        #address {
          margin-top: 20px;
          margin-bottom: 10px;
          font-size: 22px;
        }
        #rating {
          display: flex;
          align-items: center;
          .v-icon.v-icon {
            font-size: 36px;
          }
          #ratingSpan {
            margin-left: 10px;
            font-size: 20px;
          }
        }
        #openingTime {
          margin-top: 10px;
          font-size: 16px;
        }
      }
    }
    #map {
      width: 100%;
      .mapboxgl-ctrl-top-right {
        top: auto;
        right: auto;
      }
    }
    @media (min-width: 1001px) {
      #map {
        height: 375px;
      }
    }
    @media (max-width: 1000px) {
      #boxTop {
        height: 21.5vw;
        #boxTopRight {
          margin-left: 4vw;
          line-height: 2.4vw;
          #boxTopRightTop {
            h1 {
              font-size: 3.25vw;
            }
            #status {
              margin-left: 1.5vw;

              width: 8.5vw;
              height: 2.5vw;

              border-radius: 1.25vw;
              font-size: 1.5vw;

              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          #address {
            margin-top: 1.5vw;
            margin-bottom: 1vw;
            font-size: 2.2vw;
          }
          #rating {
            .v-icon.v-icon {
              font-size: 3.5vw;
            }
            #ratingSpan {
              margin-left: 1vw;
              font-size: 2vw;
            }
          }
          #openingTime {
            margin-top: 1vw;
            font-size: 1.6vw;
          }
        }
        #map {
          height: 75vh;
        }
      }
    }
  }
}
</style>