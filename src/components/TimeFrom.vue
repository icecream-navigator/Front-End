<template>
  <Time @time="sendTime">
    <template v-slot:content>
      Od:
    </template>
  </Time>
</template>

<script>
import Time from './Time.vue'

export default {
  name: 'TimeFrom',
  components: {
      Time
  },
  methods: {
    sendTime(time) {
      this.$emit('time', time)
    }
  }
}
</script>