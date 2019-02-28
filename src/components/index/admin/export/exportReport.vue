<template lang="html">
  <div class="p-t-1-5">
    <v-container>
      <div>
        <h1 class="headerFont">Export Report</h1>
        <div class="athiti">
          <v-layout row wrap>
            <v-card class="widthfull  m-t-1">
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
import filterReport from '@/components/index/admin/export/filterReport'
export default {
  components: {
    filterReport
  },
  methods: {
    testExcel () {
      this.axios.post(process.env.API + '/testExcel').then((response) => {
        // var result = JSON.parse(Decode.decode(response.data))
        var result = response.data
        if (result === 'success') {
          // this.listReport = result.data
          // console.log(this.listReport)
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
