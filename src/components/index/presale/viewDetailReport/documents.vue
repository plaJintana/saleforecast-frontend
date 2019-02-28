<template lang="html">
  <div class="">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1 class="centerDiv bgHeadTitle"><h2 style="color:white;">รายละเอียดการขาย</h2></v-flex>
      <v-flex xs10 offset-xs1 class="borderRadius bgBody">
        <v-layout row wrap class="m-b-2">
          <v-flex xs12 class="m-t-2">
            <v-layout row wrap>
              <v-flex xs2 offset-xs1>เปิดการขาย:</v-flex>
              <v-flex xs2>{{date_proceed}}</v-flex>
              <v-flex xs1 offset-xs2>So-Type:</v-flex>
              <v-flex xs2>{{namesotype}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="m-t-2">
            <v-layout row wrap class="centerHeightText">
              <v-flex xs2 sm2 md2 offset-xs1>Sale Order Status:</v-flex>
              <v-flex xs2>
                <div>
                  <v-chip>
                    <v-avatar :color="colorOrder" size="36">{{order}}</v-avatar>
                    {{orderfull}}
                  </v-chip>
                </div>
              </v-flex>
              <v-flex xs1 offset-xs2>Grade:</v-flex>
              <v-flex xs2>{{gradename}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="m-t-2">
            <v-layout row wrap spacing>
              <v-flex xs2 offset-xs1>Result:</v-flex>
              <v-flex xs2>{{resultname}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="m-t-2">
            <v-layout row wrap spacing>
              <v-flex xs2 offset-xs1>Result Remark:</v-flex>
              <v-flex xs9>{{resultremark}}</v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      date_proceed: null,
      namesotype: '',
      ordername: '',
      order: '',
      orderfull: '',
      gradename: '',
      resultname: '',
      resultremark: '',
      totalcost: '',
      remark: '',
      colorOrder: ''
    }
  },
  methods: {
    setValue (source) {
      this.date_proceed = this.formatDate(source[0].date_proceed)
      this.namesotype = source[0].namesotype
      this.ordername = source[0].ordername
      if (this.ordername === 'O') {
        this.colorOrder = 'green accent-3'
        this.orderfull = 'Order'
        this.order = this.ordername
      } else if (this.ordername === 'W') {
        this.colorOrder = 'amber lighten-2'
        this.orderfull = 'Wait'
        this.order = this.ordername
      } else if (this.ordername === 'R') {
        this.colorOrder = 'red darken-1'
        this.orderfull = 'Risk'
        this.order = this.ordername
      } else {
        this.colorOrder = 'blue lighten-3'
        this.order = this.ordername[0]
        this.orderfull = this.ordername
      }
      this.gradename = source[0].gradename
      this.resultname = source[0].resultname
      this.resultremark = source[0].resultremark
    },
    formatDate (date) {
      if (!date) return null
      moment.locale('en')
      var someDate = new Date(date)
      return moment(someDate).format('LL')
    }
  }
}
</script>

<style>
.bgHeadTitle {
  background-color: #99D5C9 !important;
}
.bgBody {
  background-color: #f2f2f2 !important;
}
.borderTitle {
  border-style: solid;
  border-width: 1px;
}
.borderRadius {
  border-radius: 0 0 12px 12px;
}
</style>
