<template lang="html">
  <div class="p-t-1-5">
    <v-container>
      <div class="">
        <h1 class="headerFont">Reject</h1>


        <v-layout row wrap align-center>
          <!-- <v-flex xs12> -->
          <v-flex xs2 sm2>
            <v-subheader style="font-size: 16px"v-text="'Status Customer : '"></v-subheader>
          </v-flex>
          <v-flex xs2 sm2>
            <v-select
            v-model="states"
            :items="itemss"
            :menu-props="{ maxWight: '800' }"
            attach
            chips
            label="Status"
            multiple
            ></v-select>
          </v-flex>
          <v-flex xs2 sm2>
          </v-flex>
          <v-flex xs2 sm2>
            <v-menu
            :close-on-content-click="false"
            v-model="datefromSearch"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
            >
            <v-text-field
            slot="activator"
            v-model="computedDateFormattedFrom"
            label="จาก"
            persistent-hint
            prepend-icon="event"
            readonly
            ></v-text-field>
            <v-date-picker v-model="datefrom" no-title @input="datefromSearch = false"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs1 sm1 class="centerDiv"><v-icon>minimize</v-icon></v-flex>
        <v-flex xs2 sm2>
          <v-menu
          :close-on-content-click="false"
          v-model="datetoSearch"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
          >
          <v-text-field
          slot="activator"
          v-model="computedDateFormattedTo"
          label="ถึง"
          persistent-hint
          prepend-icon="event"
          readonly
          ></v-text-field>
          <v-date-picker v-model="dateto" :min="datefrom" no-title @input="datetoSearch = false"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs1 sm1><v-btn @click="clearDate()" color="error" small flat fab style="font-size: 12px">clear</v-btn></v-flex>

      <!-- </v-flex> -->
    </v-layout>

    <v-layout row wrap spacing>
      <v-flex md2 lg2><v-subheader style="font-size: 16px">Summary :</v-subheader></v-flex>
      <v-flex md2 lg2 class="text-lg-right">
        <v-text-field class="inputTextCenter" v-model="SUMtotal" readonly></v-text-field>
      </v-flex>
      <v-flex md1 lg1 class="pl-3"><v-subheader class="fontSize">Baht./Month</v-subheader></v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs4 md4 offset-md8>
        <v-text-field label="Search" v-model="searchTxt" append-icon="search"></v-text-field>
      </v-flex>
    </v-layout>
    <v-data-table v-bind:pagination.sync="pagination" :headers="headers" :items="filterBySearchBox" class="elevation-1">
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td class="tdListSale">{{ props.index + 1 }}</td>
        <td class="tdListSale">{{ props.item.project_name }}</td>
        <td align="left">{{ props.item.cust_name }}</td>
        <td align="left">{{ props.item.sale_fname }} {{ props.item.sale_lname }}</td>
        <td class="tdListSale" align="left">{{ props.item.date_proceed }}</td>
        <td class="tdListSale" align="center">{{ props.item.grade_name }}</td>
        <td class="tdListSale" align="right">{{ props.item.order_status_sale }}</td>
        <td class="tdListSale" align="right">{{ priceSale(props.item.sfc_total) }}</td>
        <td v-if="userData['position'] === 'SALES'" class="tdListSale" align="center">
          <v-btn @click="rejectReport(props.item.id)" small flat fab><v-icon icon medium color="info">edit</v-icon></v-btn>
          <v-btn @click="deleteReport(props.item.id)" small flat fab><v-icon icon medium color="error">delete</v-icon></v-btn>
        </td>
        <td v-else-if="userData['position'] === 'TEAMLEAD' || userData['position'] === 'GROUPLEAD'" class="tdListSale" align="center">
          <v-btn @click="rejectReport(props.item.id)" small flat fab color="success"><v-icon icon>visibility</v-icon></v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</v-container>
</div>
</template>

<script>
import _ from 'lodash'
import { Decode, Encode } from '@/services'
export default {
  created () {
    this.getReportRejectSale()
    this.getstatus()
  },
  computed: {
    userData () {
      if (this.$cookies.isKey('information')) {
        return JSON.parse(Decode.decode(this.$cookies.get('information')))
      } else {
        return ''
      }
    },
    filterBySearchBox () {
      var searchTxt = this.searchTxt
      if ((this.dateto === null || this.datefrom === null) && this.states.length === 0) {
        console.log()
        if(this.SUMtotal !== this.totalreven) {
          this.SUMtotal = this.totalreven
          var parts = this.SUMtotal.toString().split('.')
          parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.SUMtotal = parts.join('.')
        }
        return _.filter(this.listReport, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['grade_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0) {
        // console.log(222)
        return _.filter(this.listReportFilter, function (o) {
          // console.log(o['cust_name'])
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0) {
        // console.log(333)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text) {
              console.log(this.states[i])
              this.listReportFilterstatus.push(this.listReport[j])
            } else {
            }
          }
        }
        for (var k = 0; k < this.listReportFilterstatus.length; k++) {
          this.SUMtotal += this.listReportFilterstatus[k]['totalcost']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatus, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['grade_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0) {
        // console.log(444)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var m = 0; m < this.listReportFilter.length; m++) {
          for (var l = 0; l < this.states.length; l++) {
            if (this.listReportFilter[m]['order_status_sale'] === this.states[l].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[m])
            } else {

            }
          }
        }
        for (var n = 0; n < this.listReportFilterstatus.length; n++) {
          this.SUMtotal += this.listReportFilterstatus[n]['totalcost']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatus, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1
        })
      }
    },
    computedDateFormattedFrom () {
      return this.datefrom
    },
    computedDateFormattedTo () {
      return this.dateto
    }
  },
  watch: {
    dateto () {
      this.listReportFilter = []
      this.SUMtotal = 0
      if (this.datefrom !== null && this.dateto !== null) {
        for (var i = 0; i < this.listReport.length; i++) {
          if (this.listReport[i]['date_proceed'] >= this.datefrom && this.listReport[i]['date_proceed'] <= this.dateto) {
            this.listReportFilter.push(this.listReport[i])
          }
        }

        for (var j = 0; j < this.listReportFilter.length; j++) {
          this.SUMtotal +=this.listReportFilter[j]['totalcost']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
      }else if (this.states.length !== 0) {
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
      }
    }
  },
  data () {
    return {
      pagination: {sortBy: 'apv_normal_date', descending: true},
      listReport: [],
      searchTxt: '',
      headers: [
        { text: '#', value: 'no', align: 'left', 'class': 'thListSale' },
        { text: 'ชื่อ Project', value: 'projectName', align: 'left', 'class': 'thListNameSale' },
        { text: 'ชื่อลูกค้า', value: 'custname', align: 'left' },
        { text: 'ชื่อ-นามสกุล sale', value: 'fullNameSale', align: 'left', 'class': 'thListNameSale' },
        { text: 'วันเริ่มดำเนินการ', value: 'dateproceed', align: 'left', 'class': 'thListNameSale' },
        { text: 'Forecast Grade', value: 'forecastGrade', align: 'center', 'class': 'thListNameSale' },
        { text: 'status', value: 'forecastGrade', align: 'center', 'class': 'thListNameSale' },
        { text: 'Revenue', value: 'forecastGrade', align: 'center', 'class': 'thListNameSale' },
        { text: 'จัดการ', value: 'action', align: 'center', 'class': 'thListSale' }
      ],
      listUser: [],
      dateto: null,
      datefrom: null,
      listReportFilter: [],
      datefromSearch: false,
      datetoSearch: false,
      SUMtotal: '0',
      states: [],
      itemss: [],
      checkk: []
    }
  },
  methods: {
    priceSale (val) {
      var parts = val.toString().split('.')
      parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    },
    getReportRejectSale () {
      var source = Encode.encode(JSON.stringify({'id': this.userData['emp_no'], 'position': this.userData['position']}))
      this.axios.post(process.env.API + '/getReportRejectsale', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listReport = result.data
          // console.log(this.listReport[0].totalcost)
          // console.log(this.listReport)
          for (var i = 0; i < this.listReport.length; i++) {
            if (this.listReport[i].project_name === null){
              this.listReport[i].project_name = '-'
            }
          }
          if(result.total[0].SUMtotalcost !== 0){
            this.SUMtotal = result.total[0].SUMtotalcost
            this.totalreven = result.total[0].SUMtotalcost
            var parts = this.SUMtotal.toString().split('.')
            parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.SUMtotal = parts.join('.')
          }else {
            this.SUMtotal = 0
          }
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    },getstatus () {
      // var source = Encode.encode(JSON.stringify({id: this.userData['emp_no'], position: this.userData['position']}))
      this.axios.post(process.env.API + '/getstatusSBP', {source: "source"}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          // console.log(result.data)
          for (var i = 0; i < result.data.length; i++) {
            this.itemss.push({ id: result.data[i].id , text: result.data[i].name })
          }
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    },
    rejectReport (val) {
      this.$emit('rejectSaleforecast', val)
    },
    clearDate(){
      this.dateto = null
      this.datefrom = null
      this.searchTxt = ''
      this.listReportFilter = []
      this.weekday = null
      this.states = []
      this.year = moment().get('year')
    },
    deleteReport (id) {
      this.$swal({
        title: 'คุณแน่ใจใช่ไหม ?',
        text: 'ต้องการที่จะ ลบ REPORT นี้ใช่ไหม',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result) {
          var source = Encode.encode(JSON.stringify({'id': this.userData['emp_no'], 'idsaleforecast': id}))
          this.axios.post(process.env.API + '/deleteSaleforecast', {source: source}).then((response) => {
            if (response.data === 'success') {
              this.$swal('ทำการลบReportสำเร็จ', '', 'success')
              this.getReportRejectSale()
            } else {
              this.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
            }
          })
        }
      }).catch(this.$swal.noop)
    }
  }
}
</script>

<style lang="css">
>>>.input-group__details {
  min-height: 0px;
}
.tdListSale {
  padding: 0 12px 0 24px !important;
}
.thListSale {
  padding: 0 30px 0 12px !important;
}
.thListNameSale {
  padding: 0 50px 0 22px !important;
}
.fontHead {
  font-size: 1.2em !important;
}
</style>
