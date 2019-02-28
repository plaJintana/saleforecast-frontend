<template lang="html">
  <div>
  <v-card style="box-shadow: none;">
    <v-card-title class="border-bottom-head mr-3 ml-3" height="50px" >
      <h2 class="font-head pl-20 pt-3">Presale Remark</h2>
    </v-card-title>
    <v-card-text class="mt-4">
      <v-flex xs12 sm12 md12 lg12 class="pb-0 mb-0">
        <v-layout row wrap spacing>
          <v-flex md12 lg12>
            <v-text-field v-model="remarkRejectPresale" textarea class="remove-height" readonly></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-card-text>
  </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      remarkRejectPresale: ''
    }
  },
  methods: {
    setValue (source) {
      this.remarkRejectPresale = source
    }
  }
}
</script>

<style lang="css">
</style>
