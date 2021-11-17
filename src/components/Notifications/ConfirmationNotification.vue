<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="300px"
    >
      <v-card id="card">
        <div id="content">
          <slot/>
        </div>
        <v-card-actions id="c">
          <div id="containerButtons">
            <v-btn
              class="button"
              color="blue darken-1"
              @click="dialog = false, choice = true, sendSelection()"
            >
              TAK
            </v-btn>
            <v-btn
              class="button"
              color="blue darken-1"
              @click="dialog = false, choice = false, sendSelection()"
            >
              NIE
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ConfirmationNotification',
  data: () => ({
    dialog: true,
    choice: null
  }),
  methods: {
    sendSelection() {
      this.$emit('choice', this.choice)
    }
  }
}
</script>

<style lang="scss">
#content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#c {
  display: flex;
  justify-content: center;
  #containerButtons {
    height: 100%;
    width: 150px;

    display: flex;
    justify-content: space-between;
    .button {
      color: white;
    }
  }
}
</style>