<template>
  <div>
    <div class="time">
      <slot name="content"/>&nbsp;
      <div class="area">{{time.hour}}</div>
      <div class="buttons">
      <div class="button" @click="addAnHour">▲</div>
      <div class="button" @click="subtractTheHour">▼</div>
      </div>
      :
      <div class="area">{{time.minute}}</div>
      <div class="buttons">
      <div class="button" @click="addAMinute">▲</div>
      <div class="button" @click="substractAMinute">▼</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Time',
  data() {
    return {
      time: {
        hour: "0" + 0,
        minute: "0" + 0
      }
    }
  },
  methods: {
    addAnHour() {
      this.time.hour++
      this.insertAnHour()
    },
    subtractTheHour() {
      this.time.hour--
      this.insertAnHour()
    },
    addAMinute() {
      this.time.minute++
      this.insertMinute()
    },
    substractAMinute() {
      this.time.minute--
      this.insertMinute()
    },
    insertAnHour() {
      if (this.time.hour > 23)
      {
        this.time.hour = 0
      }
      if (this.time.hour < 0)
      {
        this.time.hour = 23
      }
      if (this.time.hour < 10)
      {
        this.time.hour = "0" + this.time.hour
      }

      this.sendTime()
    },
    insertMinute() {
      if (this.time.minute > 59)
      {
        this.time.minute = 0
      }
      if (this.time.minute < 0)
      {
        this.time.minute = 59
      }
      if (this.time.minute < 10)
      {
        this.time.minute = "0" + this.time.minute
      }

      this.sendTime()
    },
    sendTime() {
      this.$emit('time', this.time)
    }
  }
}
</script>


<style lang="scss">
.time {
  margin-bottom: 5px;
  height: 22px;

  font-size: 16px;

  display: flex;
  flex-direction: row;
  .area {
    width: 20px;
    height: 20px;
    background-color: white;

    text-align: center;
  }
  .buttons {
    margin-top: -5px;
    .button {  
      height: 10px;
      font-size: 8px;
    }
    .button:hover {  
      color: #2eb0fb;
      cursor: pointer;
    }
  }
}
</style>