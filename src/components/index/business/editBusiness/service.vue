<template lang="html">
  <div class="">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1 class="centerDiv bgHeadTitle"><h2 style="color:white;">Service</h2></v-flex>
      <v-flex xs10 offset-xs1 class="borderRadius bgBody centerDiv p-b-2">
        <v-layout row wrap>
          <v-flex xs11 class="centerDiv" v-for="services,i in serviceReport" :key="i">
            <v-layout row wrap class="m-t-2 m-b-1 centerDiv">
              <v-flex xs11 offset-xs1>{{services.categories}}</v-flex>
              <v-flex xs11 offset-xs1><v-divider></v-divider></v-flex>
              <v-flex xs12>
                <v-layout row wrap>
                  <v-flex xs12 class="m-t-1">
                    <v-layout row wrap>
                      <v-flex xs2 offset-xs1>Business Unit: </v-flex>
                      <v-flex xs4>{{services.bdinfoname}}</v-flex>
                      <v-flex xs1>Service: </v-flex>
                      <v-flex xs2 offset-xs1 v-if="services.bdinfoname === 'Trading' || services.bdinfoname === 'Other Products' || services.bdinfoname === 'Center'"> {{services.product_name}}</v-flex>
                      <v-flex xs2 offset-xs1 v-else> {{services.bdprodname}}</v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 class="m-t-1">
                    <v-layout row wrap>
                      <v-flex xs2 offset-xs1>Item: </v-flex>
                      <v-flex xs3 v-if="services.bdinfoname === 'Trading' || services.bdinfoname === 'Other Products' || services.bdinfoname === 'Center'">{{services.item_name}}</v-flex>
                      <v-flex xs3 v-else>{{services.proditemname}}</v-flex>
                      <v-flex xs1 offset-xs1>Item-Code: </v-flex>
                      <v-flex xs2 offset-xs1 v-if="services.bdinfoname === 'Trading' || services.bdinfoname === 'Other Products' || services.bdinfoname === 'Center'">{{services.item_code}}</v-flex>
                      <v-flex xs2 offset-xs1 v-else>{{services.itemCode}}</v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 class="m-t-1">
                    <v-layout row wrap>
                      <v-flex xs1 offset-xs7>Revunue: </v-flex>
                      <v-flex xs2 offset-xs1 class="color-mark">{{convertFormatRevenue(services.cost)}} </v-flex>
                      <v-flex xs1>Bath</v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 class="m-t-1">
                    <v-layout row wrap>
                      <v-flex xs1 offset-xs7>Status BD: </v-flex>
                      <v-flex xs2 offset-xs1 class="color-status">{{services.status_bd}} </v-flex>
                      <!-- <v-flex xs1>Bath</v-flex> -->
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 class="m-t-1">
                    <v-layout row wrap>
                      <v-flex xs1 offset-xs7>Remark: </v-flex>
                      <v-flex xs2 offset-xs1>{{services.remark_bd}} </v-flex>
                      <!-- <v-flex xs1>Bath</v-flex> -->
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      serviceReport: []
    }
  },
  methods: {
    setValue (source, data, statusBD) {
      // if (statusBD !== 'APPROVE') {
      //   for (var i = 0; i < data.groupBD.length; i++) {
      //     for (var j = 0; j < source.length; j++) {
      //       if (data.groupBD[i].bd_id == source[j].bdid) {
      //         this.serviceReport.push(source[j])
      //       }
      //     }
      //   }
      // } else {
      this.serviceReport = source
      console.log(this.serviceReport)
      console.log('==========MM===========')
      // }
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
.color-mark {
  color: #EF6C00;
  font-weight: bold;
  font-size: 18px;
}
.color-status {
  color: #0D47A1;
  font-weight: bold;
  font-size: 18px;
}
</style>
