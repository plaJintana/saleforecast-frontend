<template>
  <div class="p-t-1-5">
    <v-container>
      <div>
        <h1 class="headerFont">Document Reject</h1>

        <v-layout row wrap align-center>
          <v-flex xs1 >
            <v-subheader v-text="'Summary : '"></v-subheader>
          </v-flex>
          <v-flex xs2 >
            <v-text-field class="inputTextCenter" v-model="SUMtotal " readonly> </v-text-field>
          </v-flex>
          <v-flex xs2 pl-3>
          <v-subheader class="fontSize">Baht./Month</v-subheader>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
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
      <!-- <v-flex xs1 sm1><v-btn @click="searchDate()" flat icon fab><v-icon>search</v-icon></v-btn></v-flex> -->
      <v-flex xs1 sm1><v-btn @click="clearDate()" color="error" small flat fab style="font-size: 12px">clear</v-btn></v-flex>
      <v-flex xs2 sm2>
      </v-flex>
      <v-flex xs4 md4>
        <v-text-field label="Search" v-model="searchTxt" append-icon="search"></v-text-field>
      </v-flex>
    </v-layout>
        <v-data-table :pagination.sync="pagination" :headers="headers" :items="filterBySearchBox" class="elevation-1">
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator" class="fontHead">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
          <template slot="items" slot-scope="props">
            <td align="left">{{ props.index + 1 }}</td>
            <td align="left">{{ props.item.project_name }}</td>
            <td align="left">{{ props.item.cust_name }}</td>
            <td align="left">{{ formatDate(props.item.date_proceed) }}</td>
            <td align="left">{{ props.item.fname }} {{ props.item.lname }}</td>
            <td align="center">{{ priceSale(props.item.sfc_total) }}</td>
            <td align="center">
            <v-chip outline disabled color="error" >REJECT</v-chip>
            </td>
            <!-- <td class="tdListSale" align="left">{{ props.item.date_proceed }}</td>
            <td class="tdListSale" align="left">{{ props.item.grade_name }}</td> -->
            <!-- <td class="tdListSale" align="left"></td> -->
            <td align="center">
              <v-btn class="m-l-2" @click="check(props.item.id)" small flat fab color="success"><v-icon medium icon>assignment_turned_in</v-icon></v-btn>
            </td>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>
<script>
import _ from 'lodash'
import moment from 'moment'
import { Decode, Encode } from '@/services'
export default {
  data () {
    return {
      headers: [
        { text: '#', value: 'no', align: 'left' },
        // { text: 'CustomerNo', value: 'cusno', align: 'center', 'class': 'thListSale' },
        { text: 'ชื่อโปรเจค', value: 'project', align: 'left' },
        { text: 'ชื่อบริษัท', value: 'custname', align: 'left' },
        { text: 'วันเริ่มดำเนินการ', value: 'dateproceed', align: 'left' },
        // { text: 'ชื่อ-นามสกุล sale', value: 'fullNameSale', align: 'left', 'class': 'thListNameSale' },
        { text: 'ชื่อ-นามสกุล presale', value: 'fullNamePresale', align: 'left' },
        { text: 'Revenue', value: 'action', align: 'center' },
        { text: 'สถานะ', value: 'action', align: 'center' },
        // { text: 'Date', value: 'dateproceed', align: 'center', 'class': 'thListNameSale' },
        // { text: 'Grade', value: 'forecastGrade', align: 'center', 'class': 'thListNameSale' },
        { text: 'รายละเอียด', value: 'action', align: 'center' }
      ],
      listReport: [],
      listReportFilter: [],
      pagination: {
        sortBy: 'id',
        'descending': true
      },
      datefrom: null,
      dateto: null,
      datefromSearch: false,
      datetoSearch: false,
      searchTxt: '',
      SUMtotal: 0
    }
  },
  watch: {
    dateto () {
      this.SUMtotal = 0
      this.listReportFilter = []
      if (this.datefrom !== null && this.dateto !== null) {
        for (var i = 0; i < this.listReport.length; i++) {
          if (this.listReport[i]['date_proceed'] >= this.datefrom && this.listReport[i]['date_proceed'] <= this.dateto) {
            this.listReportFilter.push(this.listReport[i])
          }
        }

        for (var i = 0; i < this.listReportFilter.length; i++) {
          this.SUMtotal += this.listReportFilter[i]['sfc_total']
          // console.log(this.listReportFilter[i]['sfc_total'])
        }

      }
    }
  },
  created () {
    this.getReportRejectPresale()
  },
  methods: {
    priceSale (val) {
      var parts = val.toString().split('.')
      parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    },
    getReportRejectPresale () {
      var source = Encode.encode(JSON.stringify({emp_no: this.userData['emp_no']}))
      this.axios.post(process.env.API + '/getReportRejectPresale', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listReport = result.data
          for (var i = 0; i < this.listReport.length; i++) {
            if(this.listReport[i].project_name === null){
              this.listReport[i].project_name = '-'
            }
          }
          for (var i = 0; i < this.listReport.length; i++) {
            this.SUMtotal += this.listReport[i]['sfc_total']
            // console.log(this.listReportFilter[i]['sfc_total'])
          }


          // console.log(this.listReport)
        } else {
          console.log(this.listReport)
        }
      })
    },
    check (id) {
      this.$router.push({ path: '/viewDetailReportPresale', 'query': { 'idsaleforecast': Encode.encode(id), 't': Encode.encode('reject') } })
    },
    formatDate (date) {
      if (!date) return null
      moment.locale('en')
      var someDate = new Date(date)
      return moment(someDate).format('LL')
    }
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
      if (this.dateto === null || this.datefrom === null) {
        return _.filter(this.listReport, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null) {
        return _.filter(this.listReportFilter, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      }
    },
    computedDateFormattedFrom () {
      return this.datefrom
    },
    computedDateFormattedTo () {
      return this.dateto
    }
  }
}
</script>
