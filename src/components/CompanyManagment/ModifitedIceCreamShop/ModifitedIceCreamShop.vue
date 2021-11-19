<template>
  <div>
    <IceCreamShop
      :orTheOwner="orTheOwner"
      :user="user"
      :iceCreamShop="iceCreamShop"
    >
      <template v-slot:owner>
        <div class="update">
          <v-btn
            id="trash"
            @click="confirmationNotification"
          >
            <font-awesome :icon="['fas', 'trash']"/>
          </v-btn>
          <UpdateIceCreamShop
            :user="user"
            :iceCreamShop="iceCreamShop"
            @refresh="refresh"
          />
        </div>
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
import UpdateIceCreamShop from './UpdateIceCreamShop.vue'

export default {
  name: 'ModifitedIceCreamShop',
  props: ['user', 'iceCreamShop'],
  components: {
    IceCreamShop,
    ConfirmationNotification,
    UpdateIceCreamShop
  },
  data() {
    return {
      orTheOwner: true,
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
    refresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style>
.update {
  margin-top: -2.25rem;
  font-size: 18px !important;

  display: flex;
}
#trash {
  border-radius: 0px;
  background-color: crimson !important;
}
</style>