<template>
  <Dialog @hideMenu="hideMenu">
    <template v-slot:buttonInscription>
      ZALOGUJ SIĘ
    </template>
    <template v-slot:checkBox>
      <v-checkbox
        label="Zapamiętaj mnie"
        hide-details
      ></v-checkbox>
    </template>
    <template v-slot:action>
      zaloguj się
    </template>
  </Dialog>
</template>

<script>
import Dialog from './Dialog.vue'

export default {
  name: 'Login',
  components: {
    Dialog
  },
  methods: {
    hideMenu() {
      this.$emit('hideMenu')
    }
  }
}
</script>