<template>
  <div class="p-a-1-5">
    <!-- <v-container> -->
    <div>
      <h1 class="headerFont">Document Request</h1>
      <v-layout row wrap align-center>
        <!-- <v-flex xs12> -->
        <v-flex xs2>
          <v-subheader v-text="'Status Customer : '"></v-subheader>
        </v-flex>
        <v-flex xs2 class="padding-status">
          <v-select v-model="states" :items="itemss" :menu-props="{ maxWight: '800' }" attach chips label="Status" multiple></v-select>
        </v-flex>



        <v-flex xs1 offset-xs1>
          <v-subheader v-text="'Team Sales: '"></v-subheader>
        </v-flex>
        <v-flex xs2 ml-3>
          <v-select v-model="teamsales" :items="itemteamsale" :menu-props="{ maxWight: '800' }"attach chips label="Team" multiple></v-select>
        </v-flex>


        <v-flex xs1 ml-5>
          <v-subheader v-text="'SO Type: '"></v-subheader>
        </v-flex>
        <v-flex xs2>
          <v-select v-model="sotype" :items="itemsotype" :menu-props="{ maxWight: '800' }"attach chips label="SO Type" multiple></v-select>
        </v-flex>

    <!-- <v-flex xs2 offset-xs2 >
    <v-subheader style="font-size: 16px"v-text="'Service Type : '"></v-subheader>
  </v-flex>
  <v-flex xs2 >
  <v-select v-model="servicetype" :items="itemservicetype" :menu-props="{ maxWight: '800' }"attach chips label="Service Type" multiple></v-select>
</v-flex> -->
</v-layout>

<v-layout row wrap align-center>
  <v-flex md2 >
    <v-subheader v-text="'Summary : '"></v-subheader>
  </v-flex>
  <v-flex xs2 class="padding-status">
    <v-text-field class="inputTextCenter" v-model="SUMtotal " readonly> </v-text-field>
  </v-flex>
  <v-flex xs1>
    <v-subheader >Baht./Month</v-subheader>
  </v-flex>
  <v-flex xs2>
    <v-subheader v-text="'Service Type: '"></v-subheader>
  </v-flex>
  <v-flex xs2 style="margin-left: -100px">
    <v-select v-model="servicetype" :items="itemservicetype" :menu-props="{ maxWight: '800' }"attach chips label="Service Type" multiple></v-select>
  </v-flex>
</v-layout>

<v-layout row wrap>
<v-flex xs2 sm2 pl-3>
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
<v-flex xs2 sm2 >
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
</v-layout>



<div class="" v-if="userData['position'] === 'GROUPLEAD' || userData['position'] === 'HEAD OF SALES'">


  <v-layout row wrap>
    <v-flex xs4 md4 offset-md8>
      <v-text-field label="Search" v-model="searchTxt" append-icon="search"></v-text-field>
    </v-flex>
  </v-layout>
  <v-data-table :pagination.sync="pagination" :headers="headers" :rows-per-page-items="[{text:'All', value: -1}]" :items="filterBySearchBox" class="elevation-1">
    <!-- <template slot="headerCell" slot-scope="props">
    <v-tooltip bottom>
    <span slot="activator" class="fontHead">
    {{ props.header.text }}
  </span>
  <span>
  {{ props.header.text }}
</span>
</v-tooltip>
</template> -->
<template slot="items" slot-scope="props">
  <td align="left">{{ props.index + 1 }}</td>
  <td align="left">{{ props.item.project_name }}</td>
  <td align="left">{{ props.item.cust_name }}</td>
  <td align="left">{{ formatDate(props.item.date_proceed) }}</td>
  <td align="center">{{ props.item.nname }} {{ props.item.salefname }}</td>
  <td align="right">{{ props.item.order_status_sale }}</td>
  <td align="center">{{props.item.order_status_presale}}</td>
  <td align="center">
    <!-- <v-chip outline disabled color="success" v-if="0 "> -->
    {{props.item.order_status_bd}}
    <!-- </v-chip> -->
    <!-- <v-chip outline disabled color="warning" v-else>PENDING</v-chip> -->
  </td>
  <td align="right">{{ priceSale(props.item.sfc_total) }}</td>
  <td align="center">
    <v-chip outline disabled color="warning" v-if="props.item.state_sale === 'SALES'">PENDING</v-chip>
    <v-chip outline disabled color="error" v-if="props.item.state_sale === 'REJECT'">REJECT</v-chip>
    <v-chip outline disabled color="success" v-if="props.item.state_sale === 'TEAMLEAD'">APPROVE</v-chip>
  </td>
  <td align="center">
    <div v-if="props.item.state_presale === 'APPROVE'">
      <v-chip outline disabled color="success" >{{ props.item.state_presale }}</v-chip>
    </div>
    <div v-else-if="props.item.state_presale === ''">
      <v-chip outline disabled color="warning" >PENDING</v-chip>
      <!-- <v-btn round color="primary"  style="width: 5px; font-size: 10px" @click="approve(props.item.id)"><v-icon small left>mdi-checkbox-marked-circle</v-icon> Approve</v-btn> -->
    </div>
  </td>
  <td align="center">
    <!-- <v-btn @click="editReport(props.item.id)" small flat fab color="info"><v-icon medium icon>edit</v-icon></v-btn> -->
    <v-btn class="m-l-2" @click="check(props.item.id)" small flat fab color="success"><v-icon medium icon>assignment_turned_in</v-icon></v-btn>
  </td>

</template>
</v-data-table>

</div>
</div>


<div v-if="userData['position'] === 'TEAMLEAD'">
  <v-layout row wrap>

    <v-flex xs4 md4 offset-md8>
      <v-text-field label="Search" v-model="searchTxt" append-icon="search"></v-text-field>
    </v-flex>
  </v-layout>

  <v-data-table :pagination.sync="presale_pagination" :rows-per-page-items="[{text:'All', value: -1}]" :headers="headers" :items="filterBySearchBox" class="elevation-1">
    <!-- <template slot="headerCell" slot-scope="props">
    <v-tooltip bottom>
    <span slot="activator" class="fontHead">
    {{ props.header.text }}
  </span>
  <span>
  {{ props.header.text }}
</span>
</v-tooltip>
</template> -->
<template slot="items" slot-scope="props">
  <td align="left">{{ props.index + 1 }}</td>
  <td align="center">{{ props.item.project_name }}</td>
  <td align="left">{{ props.item.cust_name }}</td>
  <td align="center">{{ formatDate(props.item.date_proceed) }}</td>
  <td align="center">{{ props.item.nname }} {{ props.item.salefname }}</td>
  <td align="center">{{ props.item.order_status_sale }}</td>
  <td align="center">{{props.item.order_status_presale}}</td>
  <td align="center">
    <!-- <v-chip outline disabled color="success" v-if="0 "> -->
    {{props.item.order_status_bd}}
    <!-- </v-chip> -->
    <!-- <v-chip outline disabled color="warning" v-else>PENDING</v-chip> -->
  </td>
  <td align="center">{{ priceSale(props.item.sfc_total) }}</td>
  <td align="center">
    <v-chip outline disabled color="warning" v-if="props.item.state_sale === 'SALES'">PENDING</v-chip>
    <v-chip outline disabled color="error" v-if="props.item.state_sale === 'REJECT'">REJECT</v-chip>
    <v-chip outline disabled color="success" v-if="props.item.state_sale === 'TEAMLEAD'">APPROVE</v-chip>

  </td>

  <td align="center">
    <div v-if="props.item.state_presale === 'APPROVE'">
      <v-chip outline disabled color="success" >{{ props.item.state_presale }}</v-chip>
    </div>
    <div v-else-if="props.item.state_presale === ''">
      <v-btn round color="primary"  style="width: 5px; font-size: 11px" @click="approve(props.item.id)" ><v-icon small left>mdi-checkbox-marked-circle</v-icon> Approve</v-btn>
    </div>
  </td>
  <td align="center">
    <v-btn @click="editReport(props.item.id)" small flat fab color="info" v-if="props.item.state_presale !== 'APPROVE'"><v-icon medium icon>edit</v-icon></v-btn>
    <!-- <v-btn @click="editReport(props.item.id)" small flat fab color="info"><v-icon medium icon>edit</v-icon></v-btn> -->
    <v-btn class="m-l-2" @click="check(props.item.id)" small flat fab color="success"><v-icon medium icon>assignment_turned_in</v-icon></v-btn>
  </td>
</template>
</v-data-table>

</div>

<div v-if="userData['position'] === 'PRESALES'">
  <v-layout row wrap>

    <v-flex xs4 md4 offset-md8>
      <v-text-field label="Search" v-model="searchTxt" append-icon="search"></v-text-field>
    </v-flex>
  </v-layout>

  <v-data-table :pagination.sync="presale_pagination" :rows-per-page-items="[{text:'All', value: -1}]" :headers="headerpresale" :items="filterBySearchBox" class="elevation-1">
    <!-- <template slot="headerCell" slot-scope="props">
    <v-tooltip bottom>
    <span slot="activator" class="fontHead">
    {{ props.header.text }}
  </span>
  <span>
  {{ props.header.text }}
</span>
</v-tooltip>
</template> -->
<template slot="items" slot-scope="props">
  <td align="left">{{ props.index + 1 }}</td>
  <td align="center">{{ props.item.project_name }}</td>
  <td align="left">{{ props.item.cust_name }}</td>
  <td align="center">{{ formatDate(props.item.date_proceed) }}</td>
  <td align="center">{{ props.item.nname }} {{ props.item.salefname }}</td>
  <td align="center">
    <!-- <v-chip outline disabled color="success" v-if="props.item.order_status_sale !== null "> -->
    {{props.item.order_status_sale}}
    <!-- </v-chip> -->
    <!-- <v-chip outline disabled color="warning" v-else>PENDING</v-chip> -->
  </td>
  <td align="center">
    <!-- <v-chip outline disabled color="success" v-if="props.item.order_status_presale !== null "> -->
    {{props.item.order_status_presale}}
    <!-- </v-chip> -->
    <!-- <v-chip outline disabled color="warning" v-else>PENDING</v-chip> -->

  </td>
  <td align="center">
    <!-- <v-chip outline disabled color="success" v-if="0 "> -->
    {{props.item.order_status_bd}}
    <!-- </v-chip> -->
    <!-- <v-chip outline disabled color="warning" v-else>PENDING</v-chip> -->
  </td>
  <td align="center">{{ priceSale(props.item.sfc_total) }}</td>

  <!-- <div v-else>
  <v-chip outline disabled color="warning" >PENDING</v-chip>
</div> -->
<td align="center">
  <v-chip outline disabled color="warning" v-if="props.item.state_sale === 'SALES'">PENDING</v-chip>
  <v-chip outline disabled color="error" v-if="props.item.state_sale === 'REJECT'">REJECT</v-chip>
  <v-chip outline disabled color="success" v-if="props.item.state_sale === 'TEAMLEAD'">APPROVE</v-chip>

</td>



<td align="center">
  <v-chip outline disabled color="warning" v-if="props.item.state_presale === ''">PENDING</v-chip>
  <v-chip outline disabled color="error" v-if="props.item.state_presale === 'REJECT'">REJECT</v-chip>
  <v-chip outline disabled color="success" v-if="props.item.state_presale === 'APPROVE'">APPROVE</v-chip>

</td>

<td align="center">
  <v-btn @click="editReport(props.item.id)" small flat fab color="info" v-if="props.item.state_presale !== 'APPROVE'"><v-icon medium icon>edit</v-icon></v-btn>
  <v-btn class="m-l-2" @click="check(props.item.id)" small flat fab color="success" ><v-icon medium icon>assignment_turned_in</v-icon></v-btn>
</td>
<!-- <td align="center">
<div v-if="props.item.state_presale === 'APPROVE'">
<v-chip outline disabled color="success" >{{ props.item.state_presale }}</v-chip>
</div>
<div v-else-if="props.item.state_presale === ''">
<v-btn round color="primary"  style="width: 5px; font-size: 10px" @click="approve(props.item.id)"><v-icon small left>mdi-checkbox-marked-circle</v-icon> Approve</v-btn>
</div>
</td> -->

</template>
</v-data-table>

</div>


<!-- </v-container> -->
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
        { text: '#', value: 'no', align: 'left', sortable: false },
        { text: 'ชื่อโปรเจค', value: 'project', align: 'left', sortable: false },
        { text: 'ชื่อบริษัท', value: 'custname', align: 'left', sortable: false },
        { text: 'วันเริ่มเริ่มสัญญา', value: 'dateproceed', align: 'left', sortable: false },
        { text: 'ชื่อ-นามสกุล Sales', value: 'fullNamePresale', align: 'left', sortable: false },
        { text: 'Status Sales', value: 'action', align: 'center', sortable: false },
        { text: 'Status Presales', value: 'action', align: 'center', sortable: false },
        { text: 'Status BD', value: 'action', align: 'center', sortable: false },
        { text: 'Revenue', value: 'action', align: 'center', sortable: false },
        { text: 'สถานะ Sales', value: 'action', align: 'center', sortable: false },
        { text: 'สถานะ Presales', value: 'action', align: 'center', sortable: false },
        { text: 'จัดการ', value: 'action', align: 'center', sortable: false }

      ],
      headerpresale: [
        { text: '#', value: 'no', align: 'left', sortable: false },
        { text: 'ชื่อโปรเจค', value: 'project', align: 'left', sortable: false },
        { text: 'ชื่อบริษัท', value: 'custname', align: 'left', sortable: false },
        { text: 'วันเริ่มเริ่มสัญญา', value: 'dateproceed', align: 'left', sortable: false },
        { text: 'ชื่อ-นามสกุล Sales', value: 'fullNamePresale', align: 'left', sortable: false },
        { text: 'Status Sales', value: 'action', align: 'center', sortable: false },
        { text: 'Status Presales', value: 'action', align: 'center', sortable: false },
        { text: 'Status BD', value: 'action', align: 'center', sortable: false },
        { text: 'Revenue', value: 'action', align: 'center', sortable: false },
        { text: 'ทีมSALE', sortable: false, value: 'sale', align: 'center', 'class': 'thListNameSale' },
        { text: 'ทีมPRESALE', sortable: false, value: 'presale', align: 'center', 'class': 'thListNameSale' },
        { text: 'จัดการ', value: 'action', align: 'center', sortable: false }

      ],

      listReport: [],
      listReportFilter: [],
      pagination: {
        sortBy: 'date_sendPresale',
        'descending': true
      },
      presale_pagination: {
        sortBy: 'vpsale_date',
        'descending': true
      },
      presaleGroupLead: {sortBy: 'vpsale_date', descending: true},
      datefrom: null,
      dateto: null,
      datefromSearch: false,
      datetoSearch: false,
      searchTxt: '',
      SUMtotal: 0,
      listReportFilterteam: [],
      listReportSOtype: [],
      listReportServicetype: [],
      states:[],
      itemss:[],
      checkk: [],
      sotype: [],
      itemsotype: [],
      itemservicetype: [],
      servicetype: [],
      teamsales: [],
      itemteamsale: [],
      totalreven: 0
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
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
      } else if (this.states.length !== 0) {
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')

      }
    }
  },
  created () {
    this.getReportRequestPresale()
    this.getstatus ()
    this.getSOtype()
    this.getTeamsales ()
    this.getServicetype ()
    console.log(this.userData)
  },
  methods: {
    priceSale (val) {
      var parts = val.toString().split('.')
      parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    },
    getTeamsales () {
      var source = Encode.encode(JSON.stringify({emp_no: this.userData['emp_no'], position: this.userData['position']}))
      this.axios.post(process.env.API + '/getTeamPresale', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          for (var i = 0; i < result.data.length; i++) {
            this.itemteamsale.push({ id: result.data[i].id , text: result.data[i].name })
            // console.log(result.data[i])
          }
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    },
    getSOtype () {
      // var source = Encode.encode(JSON.stringify({id: this.userData['emp_no'], position: this.userData['position']}))
      this.axios.post(process.env.API + '/getSOtype', {source: "source"}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          for (var i = 0; i < result.data.length; i++) {
            this.itemsotype.push({ id: result.data[i].id , text: result.data[i].name })
            // console.log(result.data[i])
          }
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    },
    getServicetype () {
      // var source = Encode.encode(JSON.stringify({id: this.userData['emp_no'], position: this.userData['position']}))
      this.axios.post(process.env.API + '/getServicetype', {source: "source"}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          for (var i = 0; i < result.data.length; i++) {
            this.itemservicetype.push({ id: result.data[i].id , text: result.data[i].name })
            // console.log(result.data[i])
          }
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    },
    editReport (id) {
      this.$emit('editSaleforecast', id)
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
    },approve(id){

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
        // console.log(id)
        if (result) {
          var source = Encode.encode(JSON.stringify({id: id, emp_no: this.userData.emp_no}))
          me.axios.post(process.env.API + '/approvePresale', {source: source}).then((response) => {
            if (response.data === 'success') {
              me.$swal('ดำเนินการเรียบร้อยแล้ว', '', 'success')
              // me.$router.push({path: '/presale/request'})
              this.getReportRequestPresale()
            } else {
              me.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
            }
          })
        }
      }).catch(this.$swal.noop)
    },
    clearDate(){
      this.dateto = null
      this.datefrom = null
      this.vpsale = null
      this.quarter = []
      this.searchTxt = ''
      this.listReportFilter = []
      this.weekday = null
      this.states = []
      this.sotype = []
      this.servicetype = []
      this.teamsales = []
      this.year = moment().get('year')
    },
    getReportRequestPresale () {
      var source = Encode.encode(JSON.stringify({emp_no: this.userData['emp_no']}))
      this.axios.post(process.env.API + '/getReportRequestPresale', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))

        if (result.status === 'success') {
          this.listReport = result.data
          this.SUMtotal = 0
          console.log(this.listReport)
          for (var i = 0; i < this.listReport.length; i++) {
            if(this.listReport[i].project_name === null){
              this.listReport[i].project_name = '-'
            }
            if (this.listReport[i].order_status_bd !== null) {
              this.listReport[i].order_status_bd = this.listReport[i].order_status_bd.split(',')
              var unique = this.uniqueArray2(this.listReport[i].order_status_bd)
              this.listReport[i].order_status_bd = unique
            }
            var statusBD = ''
            var unique = this.uniqueArray2(this.listReport[i].order_status_bd)
            for (var j = 0; j < unique.length; j++) {
              if (this.listReport[i].order_status_bd[j] !== '') {
                if (statusBD !== '') {
                  statusBD += ', '
                }
                statusBD += this.listReport[i].order_status_bd[j]
              }
            }
            this.listReport[i].order_status_bd = statusBD
            if (this.listReport[i].Group_service_type !==  null) {
              this.listReport[i].Group_service_type = this.listReport[i].Group_service_type.split(',')
            }
          }
          for (var i = 0; i < this.listReport.length; i++) {
            this.SUMtotal += this.listReport[i]['sfc_total']
            // console.log(this.listReportFilter[i]['sfc_total'])
          }
          if(this.SUMtotal !== 0){
            this.totalreven = this.SUMtotal
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
    },
    uniqueArray2 (arr) {
      var a = []
      for (var i=0, l=arr.length; i<l; i++)
      if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
      a.push(arr[i])
      return a
    },
    // editReport () {
    //   this.$router.push({ path: '/reportPresale' })
    //   // this.$emit('editSaleforecastPresale', val)val
    // },
    check (id) {
      this.$router.push({ path: '/viewDetailReportPresale', 'query': { 'idsaleforecast': Encode.encode(id), 't': Encode.encode('request') } })
    },
    formatDate (datetime) {
      var date = new Date(datetime)
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var month = (date.getMonth()) + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      var year = date.getFullYear()
      if (datetime === '' || datetime === null) {
        return ''
      } else {
        return day + '/' + month + '/' + year
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
      this.listReportFilterteam = []
      this.listReportFilterstatus = []
      this.listReportSOtype = []
      this.listReportServicetype = []
      var searchTxt = this.searchTxt
      if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0) {
        this.SUMtotal = 0
        if(this.SUMtotal !== this.totalreven){
          this.SUMtotal = this.totalreven
          var parts = this.SUMtotal.toString().split('.')
          parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.SUMtotal = parts.join('.')
        }
        return _.filter(this.listReport, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0) {
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilter.length; i++) {
          this.SUMtotal += this.listReportFilter[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilter, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0) {
        // console.log(333)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
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
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length === 0) {
        // console.log(444)
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
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0) {
        this.listReportFilterteam = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReport[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0) {
        this.listReportFilterteam = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilter[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0) {
        // console.log(333)
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      }  else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length === 0) {
        // console.log(444)
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
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
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportSOtype = []
        this.SUMtotal = 0
        // console.log(2222)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReport[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReport[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto !== null && this.datefrom !== null) && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportSOtype = []
        console.log('==========')
        console.log(this.listReportFilter)
        console.log('==========')
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilter[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      }  else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        // console.log(333)
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        // console.log(444)
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
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportFilterteam = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReport[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterteam[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        this.listReportFilterteam = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilter[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterteam[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        // console.log(333)
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterteam[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      }  else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length === 0) {
        // console.log(444)
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
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
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterteam[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportSOtype.length; i++) {
          this.SUMtotal += this.listReportSOtype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportSOtype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.SUMtotal = 0
        var sfc = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.listReport[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReport[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReport[j].id !== sfc){
                  this.listReportServicetype.push(this.listReport[j])
                  this.check[i] = 1
                  sfc = this.listReport[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.SUMtotal = 0
        var sfc = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.listReportFilter[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilter[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilter[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilter[j])
                  this.check[i] = 1
                  sfc = this.listReportFilter[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        // console.log(333)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatus[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        // console.log(444)
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
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatus[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.listReportFilterteam = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReport[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReport[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        this.listReportFilterteam = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilter[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        // console.log(333)
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      }  else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length === 0 && this.servicetype.length !== 0) {
        // console.log(444)
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
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
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.listReportFilterteam[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterteam[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterteam[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterteam[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterteam[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportSOtype = []
        this.SUMtotal = 0
        // console.log(2222)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReport[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReport[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto !== null && this.datefrom !== null) && this.states.length === 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportSOtype = []
        console.log('==========')
        console.log(this.listReportFilter)
        console.log('==========')
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilter[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      }  else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        // console.log(333)
        this.listReportFilterstatus = []
        this.listReportSOtype = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.teamsales.length === 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        // console.log(444)
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
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatus[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportFilterteam = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReport[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterteam[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        this.listReportFilterteam = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilter[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterteam[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        // console.log(333)
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['order_status_sale'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterteam[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      }  else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.teamsales.length !== 0 && this.sotype.length !== 0 && this.servicetype.length !== 0) {
        // console.log(444)
        this.listReportFilterstatus = []
        this.listReportFilterteam = []
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
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['Group_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterteam.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterteam[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterteam[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.listReportSOtype[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportSOtype[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportSOtype[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportSOtype[j])
                  this.check[i] = 1
                  sfc = this.listReportSOtype[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportServicetype.length; i++) {
          this.SUMtotal += this.listReportServicetype[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportServicetype, function (o) {
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
<style scoped="">
>>>.input-group__details {
  min-height: 0px;
}
>>>.input-group {
  padding: 0px;
}
>>>.input-group--text-field label {
  top: 0px;
}
.subheader {
  height: 21px !important;
}
.padding-status {
  margin-left: -40px !important;
}
>>>.list__tile__action, .list__tile__avatar {
  min-width: 40px !important;
}
>>>.v-select.v-select--chips .v-select__selections {
  min-height: 20px !important;
}
>>>.v-label {
  font-size: 14px !important;
}
</style>
