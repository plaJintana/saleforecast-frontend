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
                <v-flex xs8>Bath./Month</v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 class="m-t-2 m-b-2" >
              <v-layout row wrap spacing>
                <v-flex xs2 offset-xs1>Remark Sales:</v-flex>
                <v-flex xs9>{{remark}}</v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 class="m-t-2 m-b-2" v-if="checkreject === 'REJECT' ">
              <v-layout row wrap spacing>
                <v-flex xs2 offset-xs1>Remark Reject Sales :</v-flex>
                <v-flex xs8>{{ remarkReject }}</v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <!-- <v-flex xs12>
            <v-layout row wrap spacing>
              <v-flex xs1 class="m-t-2" offset-xs2>Remark:</v-flex>
              <v-flex xs11 class="m-t-2">{{remark}}</v-flex>
            </v-layout>
          </v-flex> -->
        </v-flex>
      </v-flex>
      <!-- <v-flex xs12><v-text-field textarea label="remark of approve" v-model="remark"></v-text-field></v-flex> -->
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      remark: '',
      totalcost: '',
      remarkReject: '',
      checkreject: ''
    }
  },
  methods: {
    setValue (source, remarkRe) {
      this.remark = source.remark
      this.totalcost = this.convertFormatRevenue(source.sfc_total)
      console.log(remarkRe)
      if (remarkRe.length > 0) {
        this.checkreject = remarkRe[0].state_sale
        this.remarkReject = remarkRe[0].vpsale_remark
      }
    },
    // setRevenueTotal (revenue) {
    //   console.log('-------KK---------')
    //   console.log(revenue)
    // },
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
