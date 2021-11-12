<template>
  <div id="containerCompanyManagment">
    <div id="addingAnIceCreamParlor">
      <AddingAnIceCreamParlor :user="user"/>
    </div>
  </div>
</template>

<script>
import AddingAnIceCreamParlor from './AddingAnIceCreamParlor.vue'

export default {
  name: 'CompanyManagment',
  components: {
    AddingAnIceCreamParlor
  },
  props: ['user']
}
</script>

<style lang="scss">
@import './CompanyManagmentP.scss';

@media (orientation: landscape) {
  #containerCompanyManagment {
    width: 84.4%;
    background-color: pink;

    position: relative;
    #addingAnIceCreamParlor {
      position: absolute;
      top: 1vw;
      right: 1vw;
    }
  }
}
</style>