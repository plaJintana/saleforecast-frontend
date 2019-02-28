<template lang="html">
  <div class="p-t-1-5">
    <v-container>
      <div>
        <h1 class="headerFont">Export Report</h1>
        <div class="athiti">
          <v-layout row wrap>
            <v-card class="widthfull  m-t-1-5">
              <v-card-text  class="centerDiv">
                <v-flex xs12 md12 lg12><filterReport/></v-flex>
              </v-card-text>
            </v-card>
          </v-layout>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import filterReport from '@/components/index/sale/export/filterReport'
export default {
  components: {
    filterReport
  }
}
</script>

<style lang="css">
</style>
