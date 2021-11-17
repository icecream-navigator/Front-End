<template>
  <div>
    <IceCreamShop :iceCreamShop="iceCreamShop">
      <template v-slot:owner>
        <v-btn
          class="update"
          id="trash"
          @click="confirmationNotification"
        >
          <font-awesome :icon="['fas', 'trash']"/>
        </v-btn>
        <v-btn
          class="update"
          id="edit"
          @click="confirmationNotification"
        >
          <font-awesome :icon="['fas', 'edit']"/>
        </v-btn>
      </template>
    </IceCreamShop>
    <ConfirmationNotification
      v-if="whetherToDisplay"
      @choice="orContinue"
    >
      <font-awesome id="symbol" :icon="['fas', communique.symbol]"/>
      <span class="content">{{communique.contents}}</span>
    </ConfirmationNotification>
  </div>
</template>

<script>
import IceCreamShop from '../../IceCreamShopTemplate/IceCreamShop.vue'
import ConfirmationNotification from '../../Notifications/ConfirmationNotification.vue'

export default {
  name: 'ModifitedIceCreamShop',
  props: ['iceCreamShop'],
  components: {
    IceCreamShop,
    ConfirmationNotification
  },
  data() {
    return {
      whetherToDisplay: false,
      communique: {
        symbol: null,
        contents: null
      }
    }
  },
  methods: {
    confirmationNotification() {
      this.communique.symbol = "exclamation-circle"
      this.communique.contents = "Czy na pewno chcesz usunąć lodziarnie?"
      this.whetherToDisplay = true
    },
    orContinue(choice) {
      this.whetherToDisplay = false
      this.communique.contents = null

      if (choice)
      {
        this.delet()
      }
    },
    delet() {
      this.$emit('delet', this.iceCreamShop.id)
    },
    update() {
      
    }
  }
}
</script>

<style>
.update {
  margin-top: -3.2rem;
  width: 50px;
  font-size: 18px !important;
  border-radius: 0px;
}
#trash {
  background-color: crimson !important;
}
#edit {
  background-color: darkorchid !important;
  border-end-end-radius: 10px;
}
</style>