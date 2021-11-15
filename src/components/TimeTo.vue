<template>
  <Time @time="sendTime">
    <template v-slot:content>
      Do:
    </template>
  </Time>
</template>

<script>
import Time from './Time.vue'

export default {
  name: 'TimeTo',
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