<template>
  <div id="containerSerachEngine">
    <v-container fluid>
      <v-combobox
        v-model="model"
        multiple
        solo
      >
      <template slot="label">
        <font-awesome :icon="['fas', 'search']"/><span id="slotLabel">Szukaj</span>
      </template>
        <template v-slot:selection="{ item, parent }">
          <v-chip
            :color="`${item.color} lighten-3`"
            label
            small
          >
            <span class="pr-2">
              {{ item.text }}
            </span>
            <v-icon
              small
              @click="parent.selectItem(item)"
            >
              $delete
            </v-icon>
          </v-chip>
        </template>
      </v-combobox>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'SearchEngine',
    data: () => ({
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      nonce: 1,
      model: []
    }),

    watch: {
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1],
            }

            this.nonce++
          }

          return v
        })
      }
    }
  }
</script>

<style lang="scss">
@import './SearchEngineP.scss';

#slotLabel {
  margin-left: 10px;
}

@media (orientation: landscape) {
  #containerSerachEngine {
    margin-left: 15.6%;
    width: 84.4%;
    background-color: pink;
  }

  .container {
    padding: 24px;
  }
}
</style>