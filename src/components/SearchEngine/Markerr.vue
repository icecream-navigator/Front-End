<template>
  <IceCreamParlour
    :user="user"
    :iceCreamShop="iceCreamShop"
    :search="search"
  />
</template>

<script>
import IceCreamParlour from '../RegularUserView/IceCreamParlour.vue'

export default {
  name: 'markerr',
  props: ['user', 'iceCreamShop'],
  data() {
    return {
      search: true
    }
  },
  components: {
    IceCreamParlour
  }
}
</script>