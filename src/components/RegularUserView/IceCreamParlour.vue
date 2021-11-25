<template>
  <div>
    <IceCreamShop
      :user="user"
      :iceCreamShop="iceCreamShop"
      :search="search"
      ref="refresh"
    >
      <template
        v-if="user && user.is_admin == false"
        v-slot:user
      >
        <button
          id="buttonStar"
          @click="star"
        >
          <font-awesome
            id="star"
            :icon="[fa, 'star']"
          />
          Ulubione
        </button>
      </template>
      <template
        v-if="user && user.is_admin == false"
        v-slot:addingACommentAndRating
      >
        <div id="containerCommentAndRating">
          <span>Dodaj komenatrz lub ocene albo oba naraz</span>
          <div id="addCommentOrRating">
            <textarea
              v-model="opinion"
              rows="3"
              id="opinion"
            />
            <div id="box">
              <div>
                <v-rating
                  v-model="rate"
                  color="warning"
                  hover
                  length="5"
                  size="16"
                />
              </div>
              <v-btn
                id="buttonAdd"
                @click="addCommentAndRating"
              >
                +
              </v-btn>
            </div>
          </div>
        </div>
      </template>
    </IceCreamShop>
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
import IceCreamShop from '../IceCreamShopTemplate/IceCreamShop.vue'
import Announcement from '../Notifications/Announcement.vue'

import axios from 'axios'

export default {
  name: 'IceCreamParlour',
  props: ['user', 'iceCreamShop', 'search'],
  components: {
    IceCreamShop,
    Announcement
  },
  data() {
    return {
      fa: "far",
      opinion: null,
      rate: null,
      whetherToDisplay: false,
      communique: {
        symbol: null,
        contents: null
      }
    }
  },
  mounted() {
    if (this.search)
    {
      this.fa = "far"
    }
    else
    {
      this.fa = "fas"
    }
  },
  methods: {
    config() {
      const config = {
        headers: {
          Authorization: `Bearer ${this.user.access_token}`
        }
      }

      return config
    },
    star() {
      if (this.fa == "far")
      {
        axios.post("https://citygame.ga/api/fav/" + this.iceCreamShop.id, null, this.config())
          .then(response => {
            if (response)
            {
              this.fa = "fas"
              this.$emit("refresh")
            }
          })
      }
      else
      {
        axios.delete("https://citygame.ga/api/unf/" + this.iceCreamShop.id, this.config())
          .then(response => {
            if (response)
            {
              this.fa = "far"
              this.$emit("refresh")
            }
          })
      }
    },
    addCommentAndRating() {
      if (this.opinion)
      {
        axios.post("https://citygame.ga/api/stall/" + this.iceCreamShop.id + "/opinion/create",
          {
            opinion: this.opinion
          },
          this.config())
            .then(response => {
              if (response)
              {
                this.$refs.refresh.comments()
              }
            })
      }

      if (this.rate)
      {
        axios.post("https://citygame.ga/api/stall/rate/" + this.iceCreamShop.id,
          {
            rate: this.rate
          },
          this.config())
            .then(response => {
              if (response)
              {
                this.$emit("refresh")
              }
            })
            .catch(error => {
              this.whetherToDisplay = true
              this.communique.symbol = "times-circle"
        
              if (!error.response)
              {
                this.communique.contents = "Brak połączenia, spróbuj ponownie później"
              }
              else 
              {
                const status = error.response.status

                if (status == 403)
                {
                  this.communique.contents = "Lodziarnia została wcześniej oceniona"
                }
                else
                {
                  this.communique.contents = error
                }
              }
            })
      }
    },
    closeTheMessage() {
      this.whetherToDisplay = false
      this.communique.contents = null
    },
  }
}
</script>

<style lang="scss">
@import './IceCreamParlourP.scss';

#buttonStar {
  position: absolute;
  top: 12.5px;
  left: 12.5px;

  font-size: 30px;
  #star {
    color: yellow;
  }
}
#addCommentOrRating {
  min-height: 80px;

  padding: 10px;

  border-radius: 20px;
  background-color: #606060;

  display: flex;
  justify-content: space-between;
  #opinion {
    padding: 10px;

    resize: none;

    color: white;

    border-radius: 20px;
    background-color: #808080;
  }
  #box {
    width: 90px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .v-rating .v-icon {
      padding: 0.5px;
    }
    #buttonAdd {
      font-size: 20px;
    }
  }
}
@media (orientation: landscape) {
  #opinion {
    width: calc(100% - 100px);
  }
  #box {
    width: 10vw;
    .v-icon.v-icon {
      font-size: 2vw;
    }
  }
}
</style>