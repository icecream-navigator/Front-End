<template>
  <v-row justify="center">
    <v-btn
      id="buttonEdit"
      @click="dialog = true"
    >
      <font-awesome :icon="['fas', 'edit']"/>
    </v-btn>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="120px"
      >
        <v-card id="card" class="cardUpdateIce">
          <button
            id="close"
            @click="dialog = false"
          >
            <font-awesome :icon="['fas', 'times']"/>
          </button>
          <div id="iceEdit">
            <input class="input" type="text" v-model="iceWithChange.flavour"/>
            <input class="input" type="text" v-model="iceWithChange.type"/>
            <input class="input" type="text" v-model="iceWithChange.form"/>
            <input class="input" type="text" v-model="iceWithChange.price"/>
            <input class="input" type="text" v-model="iceWithChange.quantity"/>
            <v-btn
              id ="buttonSave"
              elevation="2"
              small
              @click="saveChanges"
            >
              ZAPISZ ZMIANY
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UpdateIce',
  props: ['user', 'ice'],
  data: () => ({
    dialog: false,
    iceWithChange: {
      flavour: null,
      type: null,
      form: null,
      price: null,
      quantity: null
    }
  }),
  mounted() {
    this.iceWithChange.flavour = this.ice.flavour
    this.iceWithChange.type = this.ice.type
    this.iceWithChange.form = this.ice.form
    this.iceWithChange.price = this.ice.price
    this.iceWithChange.quantity = this.ice.quantity
  },
  methods: {
    saveChanges() {
      const config = {
        headers: { 
          Authorization: `Bearer ${this.user.access_token}`
        }
      }

      axios.post("https://citygame.ga/api/icecream/update/" + this.ice.id, this.iceWithChange, config)
        .then(response => {
          if (response)
          {
            this.$emit('refresh')
            this.dialog = false
          }
        })
    }
  }
}
</script>

<style lang="scss">
#buttonEdit {
  margin-top: 10px;

  width: 60px;
  height: 20px;

  min-width: 0;

  border-radius: 0 0 10px 0;
}
.cardUpdateIce {
  background-color: #606060 !important;
  #iceEdit {
    margin-top: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    .input {
      margin-top: 5px;

      height: 20px;
      width: 100px;
    
      background: white;
    }
    #buttonSave {
      margin-top: 10px;
      background-color: crimson !important;
      font-size: 10px;
    }
  }
}
</style>