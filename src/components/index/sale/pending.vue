<template lang="html">
  <div class="p-t-1-5">
    <v-container>
      <div class="">
        <h1 class="headerFont">Document Pending</h1>
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
        <v-flex xs1 sm1><v-btn @click="clearDate()" color="error" small flat fab style="font-size: 12px">clear</v-btn></v-flex>
        <!-- <v-flex xs1 sm1><v-btn @click="searchDate()" flat icon fab><v-icon>search</v-icon></v-btn></v-flex> -->
        <v-flex xs2 sm2>
        </v-flex>
        <v-flex xs4 md4>
          <v-text-field label="Search" v-model="searchTxt" append-icon="search"></v-text-field>
        </v-flex>
      </v-layout>
      <v-data-table :pagination.sync="pagination" :headers="headers" :items="filterBySearchBox" class="elevation-1">
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
          <td class="tdListSale" align="center">{{ props.index + 1 }}</td>
          <td class="tdListSale" align="center">{{ props.item.cust_ID }}</td>
          <td align="left">{{ props.item.cust_name }}</td>
          <td align="left">{{ props.item.sale_fname }} {{ props.item.sale_lname }}</td>
          <td class="tdListSale" align="center">{{ props.item.date_proceed }}</td>
          <td class="tdListSale" align="center">{{ props.item.grade_name }}</td>
          <td class="tdListSale" align="left"></td>
          <!-- <td v-if="userData['position'] === 'NORMAL' || userData['position'] === 'VP' || userData['position'] === 'VP-GROUP' || userData['position'] === 'HEADER'" class="tdListSale" align="center">
            <v-btn @click="editReport()" small flat fab color="success"><v-icon icon>edit</v-icon></v-btn>
            <v-btn @click="check(props.item.id)" small color="info">ตรวจรับ</v-btn>
          </td> -->
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
  data () {
    return {
      listReport: [],
      listReportFilter: [],
      searchTxt: '',
      headers: [
        { text: '#', value: 'no', align: 'center', 'class': 'thListSale' },
        { text: 'CustomerNo', value: 'cusno', align: 'center', 'class': 'thListSale' },
        { text: 'Customer Name', value: 'custname', align: 'left', 'class': 'thListCusName' },
        { text: 'ชื่อ-นามสกุล sale', value: 'fullNameSale', align: 'left', 'class': 'thListNameSale' },
        { text: 'Date', value: 'dateproceed', align: 'center', 'class': 'thListNameSale' },
        { text: 'Grade', value: 'forecastGrade', align: 'center', 'class': 'thListNameSale' },
        { text: 'จัดการ', value: 'action', align: 'center', 'class': 'thListSale' }
      ],
      listUser: [],
      user: '',
      datefrom: null,
      dateto: null,
      datefromSearch: false,
      datetoSearch: false,
      pagination: {
        sortBy: 'create_date',
        'descending': true
      }
    }
  },
  created () {
    this.getReportPendingSale()
  },
  watch: {
    dateto () {
      if (this.datefrom !== null && this.dateto !== null) {
        for (var i = 0; i < this.listReport.length; i++) {
          if (this.listReport[i]['date_proceed'] >= this.datefrom && this.listReport[i]['date_proceed'] <= this.dateto) {
            this.listReportFilter.push(this.listReport[i])
          }
        }
      }
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
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['presale_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null) {
        return _.filter(this.listReportFilter, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['presale_name'].indexOf(searchTxt.trim()) !== -1
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
  methods: {
    getReportPendingSale () {
      var source = Encode.encode(JSON.stringify({'id': this.userData['emp_no'], 'position': this.userData['position']}))
      this.axios.post(process.env.API + '/getReportPendingSale', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listReport = result.data
        } else {
          console.log('ไม่สามารดึงข้อมูลได้')
        }
      })
    },
    clearDate () {
      this.dateto = null
      this.datefrom = null
    }
  }
}
</script>

<style lang="css">
</style>
