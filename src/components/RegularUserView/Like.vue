<template>
  <div>
    <button @click.once="addLike">
      <font-awesome :icon="[fa, 'star']"/>
    </button>
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
import Announcement from '../Notifications/Announcement.vue'

import axios from 'axios'

export default {
  name: 'like',
  props: ['user', 'idIce'],
  components: {
    Announcement
  },
  data() {
    return {
      fa: "far",
      whetherToDisplay: false,
      communique: {
        symbol: null,
        contents: null
      }
    }
  },
  methods: {
    addLike() {
      const config = {
        headers: { 
          Authorization: `Bearer ${this.user.access_token}`
        }
      }

      axios.post("https://citygame.ga/api/icecream/vote/" + this.idIce, null, config)
        .then(response => {
          if (response)
          {
            this.fa = "fas"
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
              this.communique.contents = "Już wcześniej polubiłeś tego loda"
            }
            else
            {
              this.communique.contents = error
            }
          }
        })  
    },
    closeTheMessage() {
      this.whetherToDisplay = false
      this.communique.contents = null
    },
  }
}
</script>
