<template lang="html">
  <div class="">
    <v-layout row wrap>
      <v-flex xs12>
        <v-flex xs10 offset-xs1 class="centerDiv bgHeadTitle"><h2 style="color:white;">Summary</h2></v-flex>
        <v-flex xs10 offset-xs1 class="borderRadius bgBody centerDiv">
          <v-layout row wrap spacing class="m-t-2">
            <v-flex xs12>
              <v-layout row wrap spacing>
                <v-flex xs1 offset-xs1>Total Cost:</v-flex>
                <v-flex class="centerDiv textColorRevenue" xs2><b>{{totalcost}}</b></v-flex>
                <v-flex xs8>Bath</v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 class="m-t-2 m-b-2">
              <v-layout row wrap spacing>
                <v-flex xs1 offset-xs1>Remark:</v-flex>
                <v-flex xs10>{{remark}}</v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      remark: '',
      totalcost: ''
    }
  },
  methods: {
    setValue (source) {
      this.remark = source[0].remark
    },
    setRevenueTotal (revenue) {
      this.totalcost = this.convertFormatRevenue(revenue)
    },
    convertFormatRevenue (val) {
      var parts = val.toString().split('.')
      parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    }
  }
}
</script>

<style lang="css">
</style>
