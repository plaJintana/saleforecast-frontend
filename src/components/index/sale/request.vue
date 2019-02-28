<template lang="html">
  <div class="p-a-1-5">
    <!-- <div id="divCheckbox" style="display: none;">{{ SUMtotal = 0 }}</div> -->
    <!-- <v-container> -->
    <div class="">
      <h1 class="headerFont">Request {{ this.userData.position }}</h1>
      <!-- <h1 class="headerFont">Sumary {{  this.SUMtotal }}</h1> -->
      <v-layout row wrap align-center>
        <!-- <v-flex xs12> -->
        <v-flex xs6 md2>
          <v-subheader style="font-size: 16px"v-text="'Customer Status: '"></v-subheader>
        </v-flex>
        <v-flex xs6 md2>
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
        <v-flex xs0 sm2 md2>
        </v-flex>
        <v-flex xs10 sm2 md2>
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
      <v-flex xs10 sm2 md2>
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
    <!-- </v-flex> -->
  </v-layout>

  <v-layout row wrap align-center>
    <v-flex xs4 md2>
      <v-subheader style="font-size: 16px"v-text="'Summary : '"></v-subheader>
    </v-flex>
    <v-flex xs4 md2>
      <v-text-field class="inputTextRight" v-model="SUMtotal " readonly> </v-text-field>
    </v-flex>
    <v-flex xs3 pl-3 md2>
      <v-subheader class="fontSize">Baht./Month</v-subheader>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <!-- </v-flex>
    <v-card-text class="">
    <v-flex xs12 sm12 md12 lg12 class="pb-0 mb-0">
    <v-layout row wrap spacing>
    <v-flex md1><v-subheader class="fontSize">Summary :</v-subheader></v-flex>
    <v-flex md1 lg1 class="text-lg-right">
    <v-text-field class="inputTextCenter" v-model="SUMtotal" readonly></v-text-field>
  </v-flex>
  <v-flex md1 lg1 class="pl-3"><v-subheader class="fontSize">Baht.</v-subheader></v-flex>
</v-layout>
</v-flex>
</v-card-text> -->


<!-- <v-card-text class="">
<v-flex xs12 sm12 md12 lg12 class="pb-0 mb-0">
<v-layout row wrap spacing>
<v-flex md1><v-subheader class="fontSize">Summary :</v-subheader></v-flex>
<v-flex md1 lg1 class="text-lg-right">
<v-text-field class="inputTextCenter" v-model="SUMtotal" readonly></v-text-field>
</v-flex>
<v-flex md1 lg1 class="pl-3"><v-subheader class="fontSize">Baht.</v-subheader></v-flex>
</v-layout>
</v-flex>
</v-card-text> -->


<v-flex xs12 md4 offset-md8 >
  <v-text-field label="Search" v-model="searchTxt" append-icon="search"></v-text-field>
</v-flex>
</v-layout>
<!-- <v-card-text class="mt-1"> -->
<!-- <v-flex xs11 sm12 md12 lg12 class="pb-0 mb-0"> -->

<!-- <v-layout row wrap spacing>
<v-flex md1 ><v-subheader class="fontSize">Summary :</v-subheader></v-flex>
<v-flex md1 lg1 class="text-lg-center">
<v-text-field class="inputTextCenter" v-model="SUMtotal" readonly></v-text-field>
</v-flex>
<v-flex md1 lg1 class="pl-3"><v-subheader class="fontSize">Baht.</v-subheader></v-flex>
</v-layout> -->

<!-- </v-flex> -->
<!-- </v-card-text> -->
<div v-if=" this.userData.position === 'GROUPLEAD'">
  <v-data-table :pagination.sync="saleGroupLead" :headers="headtteamlead" :items="filterBySearchBox" class="elevation-1">
    <!-- <template slot="headerCell" slot-scope="props">
    <v-tooltip bottom>
    <span slot="activator">
    {{ props.header.text }}
  </span>
  <span>
  {{ props.header.text }}
</span>
</v-tooltip>
</template> -->
<template slot="items" slot-scope="props">
  <pre>{{props.item}}</pre>
  <td class="centerDiv">{{ props.index + 1 }}</td>
  <td align="left">{{ formatDate(props.item.create_date) }}</td>
  <td align="left">{{ props.item.project_name }}</td>
  <td align="left" class="thListCusName">{{ props.item.cust_name }}</td>
  <td align="left">{{ formatDate(props.item.date_proceed) }}</td>
  <td align="left">{{ props.item.sale_fname }} {{ props.item.sale_lname }}</td>
  <td class="tdListSale" align="center">{{ props.item.grade_name }}</td>
  <!-- <td class="tdListSale" align="center">{{ props.item.order_status_sale }}</td> -->
  <td class="tdListSale" align="right">{{ priceSale(props.item.sfc_total) }}</td>
  <td v-if="userData['position'] === 'SALES' || userData['position'] === 'TEAMLEAD' || userData['position'] === 'GROUPLEAD' || userData['position'] === 'HEAD OF SALES'" class="tdListSale" align="center">
    <v-btn @click="editReport(props.item.id)" small flat fab color="info"><v-icon medium icon>edit</v-icon></v-btn>
    <v-btn @click="check(props.item.id)" small flat fab color="success"><v-icon medium icon>assignment_turned_in</v-icon></v-btn>
    <v-btn v-if="userData['position'] === 'SALES'" @click="deleteReport(props.item.id)" small flat fab color="error"><v-icon medium icon>delete</v-icon></v-btn>
  </td>
  <div v-if="userData['position'] === 'TEAMLEAD'">
    <td align="center"><v-btn color="success" @click="approve(props.item.id)"><v-icon left>mdi-checkbox-marked-circle</v-icon>Approve</v-btn></td>
  </div>

</template>
</v-data-table>
</div>

<div v-if="this.userData.position === 'TEAMLEAD' ">
  <v-data-table :pagination.sync="pagination" :headers="headtteamlead" :items="filterBySearchBox" class="elevation-1">
    <!-- <template slot="headerCell" slot-scope="props">
    <v-tooltip bottom>
    <span slot="activator">
    {{ props.header.text }}
  </span>
  <span>
  {{ props.header.text }}
</span>
</v-tooltip>
</template> -->
<template slot="items" slot-scope="props">
  <!-- <td class="centerDiv">{{ props.index + 1 }}</td> -->
  <td class="centerDiv">{{ props.index + 1 }}</td>
  <td align="left">{{ formatDate(props.item.create_date) }}</td>
  <td align="left">{{ props.item.project_name }}</td>
  <td align="left" >{{ props.item.cust_name }}</td>
  <td align="left">{{ formatDate(props.item.date_proceed) }}</td>
  <td align="left">{{ props.item.sale_fname }} {{ props.item.sale_lname }}</td>
  <td align="center">{{ props.item.grade_name }}</td>
  <!-- <td class="tdListSale" align="center">{{ props.item.order_status_sale }}</td> -->
  <td class="tdListSale" align="left">{{ priceSale(props.item.sfc_total) }}</td>
  <td class="tdListSale" align="left">{{ props.item.order_status_sale }}</td>
  <div v-if="userData['position'] === 'TEAMLEAD'">
    <td align="right"><v-btn round color="primary" style="width: 5px; font-size: 10px"  @click="approve(props.item.id)"><v-icon small left>mdi-checkbox-marked-circle</v-icon> Approve</v-btn></td>
  </div>
  <td v-if="userData['position'] === 'SALES' || userData['position'] === 'TEAMLEAD' || userData['position'] === 'GROUPLEAD' || userData['position'] === 'HEAD OF SALES'" align="center">
    <v-btn @click="editReport(props.item.id)" small flat fab color="info"><v-icon medium icon>edit</v-icon></v-btn>
    <v-btn @click="check(props.item.id)" small flat fab color="success"><v-icon medium icon>assignment_turned_in</v-icon></v-btn>
    <v-btn v-if="userData['position'] === 'SALES'" @click="deleteReport(props.item.id)" small flat fab color="error"><v-icon medium icon>delete</v-icon></v-btn>
    <v-btn @click="deleteSFC(props.item.id)" small flat fab color="red"><v-icon medium icon>delete</v-icon></v-btn>
  </td>

</template>
</v-data-table>
</div>


<div v-if="this.userData.position === 'SALES'">
  <v-data-table :pagination.sync="pagination" :headers="headers" :rows-per-page-items="[{text:'All', value: -1}]" :items="filterBySearchBox" class="elevation-1">
    <!-- <template slot="headerCell" slot-scope="props">
    <v-tooltip bottom>
    <span slot="activator">
    {{ props.header.text }}
  </span>
  <span>
  {{ props.header.text }}
</span>
</v-tooltip>
</template> -->
<template slot="items" slot-scope="props">
  <td class="centerDiv">{{ props.index + 1 }}</td>
  <td align="left">{{ formatDate(props.item.create_date) }}</td>
  <td align="left">{{ props.item.project_name }}</td>
  <td align="left" >{{ props.item.cust_name }}</td>
  <td align="left">{{ props.item.sale_fname }} {{ props.item.sale_lname }}</td>
  <td align="left">{{ formatDate(props.item.date_proceed) }}</td>
  <td align="center">{{ props.item.grade_name }}</td>
  <td align="center">{{ props.item.order_status_sale }}</td>
  <!-- {{item}} -->
  <!-- <div id="divCheckbox" style="display: none;">{{ SUMtotal += props.item.totalcost }}</div> -->
  <td align="right">{{ priceSale(props.item.sfc_total) }}</td>
  <!-- <td align="right">{{ SUMtotal }}</td> -->
  <!-- {{SUMtotal += props.item.totalcost}} -->
  <!-- <v-btn color="success" @click="approve()"><v-icon left>mdi-checkbox-marked-circle</v-icon> Approve</v-btn> -->
  <!-- <td class="tdListSale" align="right">{{  props.item.totalcost }}</td> -->
  <td v-if="userData['position'] === 'SALES' " class="tdListSale" align="center">
    <v-btn @click="editReport(props.item.id)" small flat fab color="info"><v-icon medium icon>edit</v-icon></v-btn>
    <v-btn @click="check(props.item.id)" small flat fab color="success"><v-icon medium icon>assignment_turned_in</v-icon></v-btn>
    <v-btn v-if="userData['position'] === 'SALES'" @click="deleteReport(props.item.id)" small flat fab color="error"><v-icon medium icon>delete</v-icon></v-btn>
  </td>


</template>
</v-data-table>

</div>



</div>
<!-- </v-container> -->
</div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { Decode, Encode } from '@/services'
export default {
  created () {
    console.log(this.userData)
    this.getReportRequestSale()
    this.getstatus ()
    if(this.userData.position === 'GROUPLEAD'){
      this.$router.push({path: '/sale/approve'})
    }else if( this.userData.position === 'HEAD OF SALES'){
      this.$router.push({path: '/sale/exportReport'})
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
      if ((this.dateto === null || this.datefrom === null) && this.states.length === 0) {
        if(this.SUMtotal !== this.totalreven){
          this.SUMtotal = this.totalreven
          var parts = this.SUMtotal.toString().split('.')
          parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.SUMtotal = parts.join('.')
        }
        return _.filter(this.listReport, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['order_status_sale'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0) {
        return _.filter(this.listReportFilter, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['grade_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterstatus.length; i++) {
          this.SUMtotal += this.listReportFilterstatus[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatus, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['grade_name'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterstatus.length; i++) {
          this.SUMtotal += this.listReportFilterstatus[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatus, function (o) {
          return o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['sale_fname'].indexOf(searchTxt.trim()) !== -1 || o['sale_lname'].indexOf(searchTxt.trim()) !== -1 || o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['grade_name'].indexOf(searchTxt.trim()) !== -1
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
      this.SUMtotal = 0
      this.listReportFilter = []
      if (this.datefrom !== null && this.dateto !== null && this.states.length === 0) {
        for (var i = 0; i < this.listReport.length; i++) {
          if (this.listReport[i]['date_proceed'] >= this.datefrom && this.listReport[i]['date_proceed'] <= this.dateto) {
            this.listReportFilter.push(this.listReport[i])

          }
        }
        for (var i = 0; i < this.listReportFilter.length; i++) {
          this.SUMtotal +=this.listReportFilter[i]['totalcost']
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
      pagination: {sortBy: 'create_date', descending: true},
      saleGroupLead: {sortBy: 'vpsale_date', descending: true},
      price: '',
      listReport: [],
      listReportFilter: [],
      searchTxt: '',
      headers: [
        { text: '#', value: 'no', align: 'center', sortable: false },
        { text: 'Create Date', value: 'createDate', align: 'left', sortable: false },
        { text: 'ชื่อ Project', value: 'projectName', align: 'left', sortable: false },
        { text: 'ชื่อลูกค้า', value: 'custname', align: 'left', sortable: false },
        { text: 'ชื่อ-นามสกุล Sales', value: 'fullNameSale', align: 'left', sortable: false },
        { text: 'วันเริ่มสัญญา', value: 'dateproceed', align: 'left', sortable: false },
        { text: 'Forecast Grade', value: 'forecastGrade', align: 'center', sortable: false },
        { text: 'Customer Status', value: 'forecastGrade', align: 'center', sortable: false },
        { text: 'Revenue', value: 'forecastGrade', align: 'right', sortable: false },
        { text: 'จัดการ', value: 'action', align: 'center', sortable: false }
      ],
      headtteamlead:[
        { text: '#', value: 'no', align: 'left', sortable: false },
        { text: 'Create Date', value: 'createDatePresale', align: 'left', 'class': 'thListNameSale', sortable: false },
        { text: 'ชื่อโปรเจค', value: 'project', align: 'left', sortable: false },
        { text: 'ชื่อบริษัท', value: 'custname', align: 'left', sortable: false },
        { text: 'วันเริ่มสัญญา', value: 'dateproceed', align: 'left', sortable: false },
        { text: 'ชื่อ-นามสกุล Sales', value: 'fullNamePresale', align: 'left', sortable: false },
        { text: 'Forecast Grade', value: 'forecastGrade', align: 'center', sortable: false },
        // { text: 'status', value: 'forecastGrade', align: 'center' },
        { text: 'Revenue', value: 'forecastGrade', align: 'center', sortable: false },
        { text: 'Customer Status', value: 'forecastGrade', align: 'center', sortable: false },
        { text: 'Approve', value: 'action', align: 'center', sortable: false },
        { text: 'จัดการ', value: 'action', align: 'center', sortable: false }
      ],
      listUser: [],
      user: '',
      remark: '-',
      SUMtotal: '0',
      datefrom: null,
      dateto: null,
      datefromSearch: false,
      datetoSearch: false,
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
    getReportRequestSale () {
      // console.log(this.props.item.totalcost)
      // console.log(this.dateto)
      var source = Encode.encode(JSON.stringify({'id': this.userData['emp_no'], position: this.userData['position']}))
      this.axios.post(process.env.API + '/getReportRequestSale', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listReport = result.data
          for (var i = 0; i < this.listReport.length; i++) {
            if (this.listReport[i].project_name === null){
              this.listReport[i].project_name = '-'
            }
          }
          // console.log(this.listReport[1])

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
          for (var i = 0; i < result.data.length; i++) {
            this.itemss.push({ id: result.data[i].id , text: result.data[i].name })
          }
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    },
    check (id) {
      this.$router.push({ path: '/viewDetailReport', 'query': { 'idsaleforecast': Encode.encode(id) ,'checkreject': Encode.encode('15') } })
    },
    editReport (val) {
      this.$emit('editSaleforecast', val)
    },
    clearDate () {
      this.dateto = null
      this.datefrom = null
      this.searchTxt = ''
      this.listReportFilter = []
      this.states = []
      this.getReportRequestSale ()
    },
    formatDate (datetime) {
      // var date = new Date(datetime)
      var date = new Date(datetime.replace(/\s/, 'T'))
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var month = (date.getMonth()) + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      var year = date.getFullYear()
      console.log(day + '/' + month + '/' + year)
      if (datetime === '' || datetime === null) {
        return ''
      } else {
        return day + '/' + month + '/' + year
      }
    },
    deleteSFC (val) {
      console.log(val)
      this.$swal({
        title: 'คุณแน่ใจใช่ไหม ?',
        text: 'ต้องการที่จะ Delete ข้อมูล',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result) {
          var source = Encode.encode(JSON.stringify({id_sfc: val}))
          this.axios.post(process.env.API + '/deleteSFC_All', {source: source}).then((response) => {
            var result = JSON.parse(Decode.decode(response.data))
            if (result.status === 'success') {
              this.$swal('ลบเรียบร้อยแล้ว', '', 'success')
              this.getReportRequestSale()
              this.getstatus ()
            }
          })
        }
      }).catch(this.$swal.noop)
    },
    approve (val) {
      var me = this
      this.$swal({
        title: 'คุณแน่ใจใช่ไหม ?',
        text: 'ต้องการที่จะ Approve ข้อมูล',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result) {

          console.log('PASS')
          // console.log(this.userData['emp_no'])
          // console.log(this.$route.query.idsaleforecast)
          // console.log(this.remark)
          var source = Encode.encode(JSON.stringify({id: val, apvid: this.userData['emp_no'], position: this.userData['position'], remark: this.remark}))
          this.axios.post(process.env.API + '/approve', {source: source}).then((response) => {
            if (response.data === 'success') {

              this.$swal('ดำเนินการเรียบร้อยแล้ว', '', 'success')
              this.getReportRequestSale()
              this.getstatus ()
              // this.$router.push('/sale/request')
            } else {
              this.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
            }
          })
        }
      }).catch(this.$swal.noop)
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
              this.getReportRequestSale()
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

<style lang="css" scoped="">
>>>.input-group__details {
  min-height: 0px;
}
.tdListSale {
  padding: 0 12px 0 34px !important;
}
.thListSale {
  padding: 0 30px 0 12px !important;
}
.thListCusName {
  padding: 0 12px 0 12px !important;
}
.thListNameSale {
  padding: 0 30px 0 22px !important;
}
>>>.input-group {
  padding: 0px;
}
>>>.input-group--text-field label {
  top: 0px;
}
>>>table.table thead th:not(:first-child) {
  padding: 0 0px;
}
.subheader {
  height: 21px !important;
}
@media only screen and (max-width: 823px) {
  .container{
    padding: 1em;
  }
  .subheader {
    padding: 0 3px !important;
  }
}
</style>
