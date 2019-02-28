<template>
  <div class="p-a-1-5">
    <!-- <v-container> -->
    <div>
      <h1 class="headerFont">Document BD</h1>
      <v-layout row wrap align-center>
        <!-- <v-flex xs12> -->
        <v-flex xs1><v-subheader v-text="'Sales Status: '"></v-subheader></v-flex>
        <v-flex xs2><v-select v-model="states" :items="itemss" :menu-props="{ maxWight: '800' }" attach chips label="Status" multiple></v-select></v-flex>
        <v-flex xs2 offset-xs1><v-subheader v-text="'Presales Status: '"></v-subheader></v-flex>
        <v-flex xs2 class="padding-status"><v-select v-model="statesPresale" :items="getAllStatus" :menu-props="{ maxWight: '800' }" attach chips label="Status" multiple></v-select></v-flex>
        <v-flex xs1 offset-xs1><v-subheader v-text="'BD Status: '"></v-subheader></v-flex>
        <v-flex xs2><v-select v-model="statesBD" :items="getAllStatus" :menu-props="{ maxWight: '800' }" attach chips label="Status" multiple></v-select></v-flex>
      </v-layout>
      <v-layout row wrap align-center>
        <v-flex xs1><v-subheader v-text="'Team sales: '"></v-subheader></v-flex>
        <v-flex xs2 ><v-select v-model="teamsales" :items="itemteamsale" :menu-props="{ maxWight: '800' }"attach chips label="Team" multiple></v-select></v-flex>
        <v-flex xs1 offset-xs1><v-subheader v-text="'Service Type: '"></v-subheader></v-flex>
        <v-flex xs2 style="margin-left: 40px"><v-select v-model="servicetype" :items="itemservicetype" :menu-props="{ maxWight: '800' }"attach chips label="Service Type" multiple></v-select></v-flex>

        <v-flex xs1 offset-xs1><v-subheader v-text="'SO Type: '"></v-subheader></v-flex>
        <v-flex xs2><v-select v-model="sotype" :items="itemsotype" :menu-props="{ maxWight: '800' }"attach chips label="SO Type" multiple></v-select></v-flex>

        <!-- </v-flex> -->
      </v-layout>

      <v-layout row wrap align-center>
        <v-flex xs1 >
          <v-subheader v-text="'Summary : '"></v-subheader>
        </v-flex>
        <v-flex xs2 >
          <v-text-field class="inputTextCenter" v-model="SUMtotal " readonly> </v-text-field>
        </v-flex>
        <v-flex xs2 >
          <v-subheader>Baht./Month</v-subheader>
        </v-flex>
        <v-flex xs2 sm2 style="margin-left: 30px">
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

  </v-layout>


  <v-layout row wrap>
    <v-flex xs4 md4 offset-md8>
      <v-text-field label="Search" v-model="searchTxt" append-icon="search"></v-text-field>
    </v-flex>
  </v-layout>
  <v-data-table :pagination.sync="pagination" :rows-per-page-items="[{text:'All', value: -1}]" :headers="headers" :items="filterBySearchBox" class="elevation-1">
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
  <td align="left">{{ props.item.groupservicee }}</td>
  <td align="left">{{ formatDate(props.item.date_proceed) }}</td>
  <td align="left"> {{ props.item.nname }} {{ props.item.fname }}</td>
  <!-- <td align="left">{{ props.item.product }}</td> -->
  <td align="left">
    <v-tooltip bottom ><div slot="activator">{{ props.item.cust_status }}</div><span>{{props.item.StatusSales_old}}</span></v-tooltip>
  </td>

  <td align="left">
    <v-tooltip bottom ><div slot="activator">{{ props.item.Presalestatus }}</div><span>{{props.item.StatusPresale_old}}</span></v-tooltip>
  </td>
  <td align="left" class="line-presale">
    <div v-if="props.item.serviceBD === ''">
      <v-tooltip bottom><v-icon slot="activator" class="pointer" @click="dialogChange(props.item.ids)" medium icon>add_circle_outline</v-icon><span>{{props.item.statusBD_old}}</span></v-tooltip>
    </div>
    <div v-else-if="props.item.serviceBD !== ''">
      <!-- <v-select @click="changeStatus(props.item.ids)" :items="getAllStatus" v-model="status_BD" item-text="text" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select> -->
      <div v-for="itemStatus in status">
        <!-- <pre>{{itemStatus}}</pre> -->
        <v-tooltip bottom><div slot="activator" v-if="itemStatus.id === props.item.ids" class="pointer" @click="dialogChange(props.item.ids)">{{ itemStatus.status }}</div><span>{{props.item.statusBD_old}}</span></v-tooltip></div>
      </div>
      <div v-if="props.item.state_bdlead === 'APPROVE'">
        <v-tooltip bottom><div slot="activator">{{ props.item.serviceBD }}</div><span>{{props.item.statusBD_old}}</span></v-tooltip>
      </div>
    </td>
    <td align="right">{{ priceSale(props.item.sfc_total) }}</td>
    <td align="center">
      <div v-if="props.item.state_bdlead === 'APPROVE'">
        <v-chip outline disabled color="success" >APPROVE</v-chip>
        <!-- <td align="right">{{ props.item.state_bdlead }}</td> -->
      </div>
      <div v-if="props.item.state_bdlead === ''">
        <v-chip outline disabled color="warning" >PENDING</v-chip>
      </div>
    </td>
    <td align="center">
      <div v-if="props.item.state_bdlead === ''">
        <!-- <pre>{{props.item.id}}</pre> -->
        <v-btn align="center" class="m-l-2" @click="check(props.item.ids,props.item.productid, 1)" small flat fab color="primary"><v-icon medium icon>edit</v-icon></v-btn>
      </div>
      <div v-else>
        <v-btn class="m-l-2" @click="check(props.item.ids,props.item.productid,0)" small flat fab color="success"><v-icon medium icon>assignment</v-icon></v-btn>

      </div>
    </td>

  </template>
</v-data-table>
</div>
<v-dialog v-if="status_edit === 'Edit' || status_edit === '' " v-model="dialog" persistent max-width="500px">
  <v-card>
    <v-card-title style="background-color: #44bba4;color: #FFFFFF">
      <h3 class="headline">BD STATUS</h3>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout row wrap v-for="itemSection, indexSection in section" >
          <v-flex xs12 sm6 md6 ><v-subheader class="fontSize">{{itemSection}}</v-subheader></v-flex>
          <v-select :items="getAllStatus" v-model="status_BD" item-text="text" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4><v-subheader class="fontSize">Remark : </v-subheader></v-flex>
        <v-flex xs12 sm6 md8><v-text-field class="application" textarea v-model="remark" request></v-text-field></v-flex>
      </v-layout>
    </v-container>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
    <v-btn color="blue darken-1" flat @click.native="save()">Save</v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
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
        // { text: 'CustomerNo', value: 'cusno', align: 'center', 'class': 'thListSale' },
        { text: 'ชื่อโปรเจค', value: 'project', align: 'left', sortable: false },
        { text: 'ชื่อบริษัท', value: 'custname', align: 'left', sortable: false },
        { text: 'ชื่อเซอร์วิส', value: 'custname', align: 'left', sortable: false },
        { text: 'วันเริ่มสัญญา', value: 'dateproceed', align: 'left', sortable: false },
        // { text: 'ชื่อ-นามสกุล sale', value: 'fullNameSale', align: 'left', 'class': 'thListNameSale' },
        { text: 'Sales', value: 'fullNamePresale', align: 'left', sortable: false },
        // { text: 'Service', value: 'dateproceed', align: 'left' },
        { text: 'Sales Status', value: 'dateproceed', align: 'left', sortable: false },
        { text: 'Presales Status', value: 'statusPresale', align: 'left', sortable: false },
        { text: 'BD Status', value: 'statusPresale', align: 'center', sortable: false },
        { text: 'Revenue', value: 'statusPresale', align: 'right', sortable: false },
        { text: 'BDLEAD status', value: 'statusPresale', align: 'center', sortable: false },
        // { text: 'Date', value: 'dateproceed', align: 'center', 'class': 'thListNameSale' },
        // { text: 'Grade', value: 'forecastGrade', align: 'center', 'class': 'thListNameSale' },
        { text: 'จัดการ', value: 'action', align: 'center', sortable: false }
      ],
      snack: false,
      snackColor: '',
      snackText: '',
      statesPresale: '',
      statesBD: '',
      listReport: [],
      getAllStatus: [],
      listReportFilter: [],
      pagination: {
        sortBy: 'presale_date',
        'descending': true,
        'rows-per-page-text': 'All'
      },
      datefrom: null,
      dateto: null,
      datefromSearch: false,
      datetoSearch: false,
      searchTxt: '',
      SUMtotal: 0,
      states:[],
      itemss:[],
      checkk: [],
      totalreven: 0,
      status_BD: [],
      dialog: false,
      section: [],
      id: '',
      remark: '',
      indexBD: '',
      status: [],
      sotype: [],
      itemsotype: [],
      itemservicetype: [],
      servicetype: [],
      teamsales: [],
      itemteamsale: [],
      data: ''
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
    this.getReportApprovePresale()
    this.getstatus ()
    this.getStatusAll()
    this.getTeamsales()
    this.getSOtype()
    this.getServicetype()

  },
  // sockets: {
  //   // changeStatus: function (val) {
  //   //   console.log('this is socket')
  //   // },
  //   alertNoti: function (val) {
  //     console.log('============MM===========')
  //     console.log(val)
  //     this.data = val
  //   }
  // },
  methods: {
    clear () {
      this.status_BD = []
      this.section = []
      this.sotype = []
      this.servicetype = []
      this.statesPresale = []
      this.teamsales = []
      this.id = ''
      this.remark = ''
    },
    dialogChange (id) {
      this.dialog = true
      for (var i = 0; i < this.listReport.length; i++) {
        if (this.listReport[i].ids === id) {
          for (var j = 0; j< this.userData.groupBD.length; j++) {
            for (var k = 0; k < this.listReport[i].id_bd.length; k++) {
              if (this.userData.groupBD[j]['bd_id'] === this.listReport[i].id_bd[k]) {
                this.status_BD = this.listReport[i].serviceBD
                if (this.listReport[i].remarkBD !== null) {
                  this.remark = this.listReport[i].remarkBD[k]
                }
                if (this.listReport[i].sectionBD !== null) {
                  this.section.push(this.listReport[i].sectionBD[k])
                  var unique = this.uniqueArray2(this.section)
                  this.section = unique
                }
                this.id = this.listReport[i].ids
              }
            }
          }
        }
      }
    },
    uniqueArray2 (arr) {
      var a = []
      for (var i=0, l=arr.length; i<l; i++)
      if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
      a.push(arr[i])
      return a
    },
    close () {
      this.dialog = false
      this.clear()
    },
    getTeamsales () {
      var source = Encode.encode(JSON.stringify({emp_no: this.userData['emp_no'], position: this.userData['position']}))
      this.axios.post(process.env.API + '/getTeamSales_BD', {source: source}).then((response) => {
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
    save () {
      for (var i = 0; i < this.listReport.length; i++) {
        if (this.listReport[i].ids === this.id) {
          this.listReport[i].status_bd = this.status_BD
          if (this.remark === undefined) {
            this.listReport[i].remarkBD = '-'
          } else {
            this.listReport[i].remarkBD = this.remark
          }
          var source = Encode.encode(JSON.stringify({data: this.listReport[i], emp_no: this.userData.emp_no, groupBD: this.userData.groupBD}))
          this.axios.post(process.env.API + '/updateStatusBDNormal', {source: source}).then((response) => {
            var result = JSON.parse(Decode.decode(response.data))
            // console.log(result)
            if (result.status === 'success') {
              this.dialog = false
              this.status = []
              this.getReportApprovePresale()
              this.clear()
            }
          })
        }
      }
    },
    getStatusAll () {
      this.axios.post(process.env.API + '/getStatusBD').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        // console.log(result)
        if (result.statuss === 'success') {
          for (var i = 0; i < result.data.length; i++) {
            this.getAllStatus.push(result.data[i].name)
          }
        } else {
          this.getAllStatus = []
        }
      }, () => {
        this.getAllStatus = []
      })
    },
    priceSale (val) {
      var parts = val.toString().split('.')
      parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    },
    getReportApprovePresale () {
      var source = Encode.encode(JSON.stringify({emp_no: this.userData.emp_no}))
      this.axios.post(process.env.API + '/getReportApproveBD', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        this.status_edit = result.nonEdit['status_edit']
        if (result.status === 'success') {
          this.listReport = result.data
          console.log(this.listReport)
          // console.log(this.listReport)
          this.status_BD = this.listReport[i]
          // console.log(this.listReport[0].productid)
          // console.log(this.listReport)
          this.status_BD = this.listReport[i]
          for (var i = 0; i < this.listReport.length; i++) {
            for (var j = 0; j< this.userData.groupBD.length; j++) {
              for (var k = 0; k < this.listReport[i].id_bd.length; k++) {
                if (this.userData.groupBD[j]['bd_id'] === this.listReport[i].id_bd[k]) {
                  if (this.listReport[i].project_name === null) {
                    this.listReport[i].project_name = '-'
                  }
                  if (this.listReport[i].statusBD_old === null) {
                    this.listReport[i].statusBD_old = '-'
                  }
                  if (this.listReport[i].Group_service_type !==  null) {
                    this.listReport[i].Group_service_type = this.listReport[i].Group_service_type.split(',')
                  }
                  this.listReport[i].serviceBD = this.listReport[i].serviceBD.split(',')
                  this.listReport[i].serviceBD = this.listReport[i].serviceBD[k]
                  this.listReport[i].id_bd = this.listReport[i].id_bd.split(',')
                  this.listReport[i].sectionBD = this.listReport[i].sectionBD.split(',')
                  this.listReport[i].IDproduct = this.listReport[i].IDproduct.split(',')
                  if (this.listReport[i].remarkBD !== null) {
                    this.listReport[i].remarkBD = this.listReport[i].remarkBD.split(',')
                  }
                  var list_status = {id: '', status: ''}
                  for (var j = 0; j< this.userData.groupBD.length; j++) {
                    for (var k = 0; k < this.listReport[i].id_bd.length; k++) {
                      if (this.userData.groupBD[j]['bd_id'] === this.listReport[i].id_bd[k]) {
                        list_status['id'] = this.listReport[i].sfc_no
                        list_status['status'] = this.listReport[i].serviceBD
                        console.log(this.listReport[i].serviceBD)
                      }
                    }
                  }
                  this.status.push(list_status)
                }
              }
            }
          }
          // this.status = list_status
          if (result.total[0].SUMtotalcost !== 0) {
            this.SUMtotal = result.total[0].SUMtotalcost
            this.totalreven = result.total[0].SUMtotalcost
            var parts = this.SUMtotal.toString().split('.')
            parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            this.SUMtotal = parts.join('.')
          } else {
            this.SUMtotal = 0
          }
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
          // console.log(this.userData['emp_no'])
        }
      })
    },clearDate(){
      this.dateto = null
      this.datefrom = null
      this.vpsale = null
      this.quarter = []
      this.sotype = []
      this.servicetype = []
      this.statesPresale = []
      this.statesBD = []
      this.teamsales = []
      this.searchTxt = ''
      this.listReportFilter = []
      this.weekday = null
      this.states = []
      this.year = moment().get('year')
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
    check (id,proid,po) {
      // console.log(id)
      // console.log(proid)
      // console.log(po)
      this.$router.push({ path: '/editBusiness', 'query': { 'idsaleforecast': Encode.encode(id), 't': Encode.encode('approve') ,'productid': Encode.encode(proid), 'po': Encode.encode(po) } })
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
    // formatDate (date) {
    //   if (!date) return null
    //   moment.locale('en')
    //   var someDate = new Date(date)
    //   return moment(someDate).format('l')
    //   // return moment(someDate).format('LL')
    // }
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
      // console.log(this.statesPresale.length)
      this.listReportServicetype = []
      this.listReportFilterstatusBD = []
      this.listReportFilterteam = []
      this.listReportFilterstatus = []
      this.listReportSOtype = []
      var searchTxt = this.searchTxt
      if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        // console.log(this.SUMtotal)
        if(this.SUMtotal !== this.totalreven){
          this.SUMtotal = this.totalreven
          var parts = this.SUMtotal.toString().split('.')
          parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.SUMtotal = parts.join('.')
        }
        return _.filter(this.listReport, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilter, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              // console.log('=')
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        // console.log(444)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {

        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              this.listReportFilterstatus.push(this.listReport[j])
            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterstatusPRESALE.length; i++) {
          this.SUMtotal += this.listReportFilterstatusPRESALE[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatusPRESALE, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var i = 0; i < this.listReportFilterstatusPRESALE.length; i++) {
          this.SUMtotal += this.listReportFilterstatusPRESALE[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatusPRESALE, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
        // ////////////////////////////////////////////////////////////////
      } else if (this.dateto === null && this.datefrom === null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        // for (var j = 0; j < this.listReport.length; j++) {
        //   for (var i = 0; i < this.statesBD.length; i++) {
        //     if (this.listReport[j]['status_bd'] === this.statesBD[i]) {
        //       // console.log(this.states[i].text)
        //       this.listReportFilterstatus.push(this.listReport[j])
        //     } else {
        //
        //     }
        //   }
        // }
        // console.log(this.listReport[j].ids)
        // console.log(this.listReport[j].serviceBD[i])
        // console.log(this.listReport)
        var sfc = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.listReport[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReport[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReport[j].ids !== sfc){
                  this.listReportFilterstatus.push(this.listReport[j])
                  this.check[i] = 1
                  sfc = this.listReport[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var i = 0; i < this.listReportFilterstatusBD.length; i++) {
          this.SUMtotal += this.listReportFilterstatusBD[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatusBD, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0
        // for (var j = 0; j < this.listReportFilter.length; j++) {
        //   for (var i = 0; i < this.statesBD.length; i++) {
        //     if (this.listReportFilter[j]['status_bd'] === this.statesBD[i]) {
        //       // console.log(this.states[i].text)
        //       this.listReportFilterstatusBD.push(this.listReportFilter[j])
        //     } else {
        //
        //     }
        //   }
        // }

        var sfc = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.listReportFilter[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilter[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilter[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilter[j])
                  this.check[i] = 1
                  sfc = this.listReportFilter[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var i = 0; i < this.listReportFilterstatusBD.length; i++) {
          this.SUMtotal += this.listReportFilterstatusBD[i]['sfc_total']
        }

        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatusBD, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        // console.log(444)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        // for (var j = 0; j < this.listReportFilterstatus.length; j++) {
        //   for (var i = 0; i < this.statesBD.length; i++) {
        //     if (this.listReportFilterstatus[j]['status_bd'] === this.statesBD[i]) {
        //       // console.log(this.states[i].text)
        //       this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
        //     } else {
        //
        //     }
        //   }
        // }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var i = 0; i < this.listReportFilterstatusBD.length; i++) {
          this.SUMtotal += this.listReportFilterstatusBD[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatusBD, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {

        this.listReportFilterstatus = []
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var i = 0; i < this.listReportFilterstatusBD.length; i++) {
          this.SUMtotal += this.listReportFilterstatusBD[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatusBD, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        this.listReportFilterstatusBD = []
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var i = 0; i < this.listReportFilterstatusBD.length; i++) {
          this.SUMtotal += this.listReportFilterstatusBD[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatusBD, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var i = 0; i < this.listReportFilterstatusBD.length; i++) {
          this.SUMtotal += this.listReportFilterstatusBD[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatusBD, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []
        // for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
        //   for (var i = 0; i < this.statesBD.length; i++) {
        //     if (this.listReportFilterstatusPRESALE[j]['status_bd'] === this.statesBD[i]) {
        //       // console.log(this.states[i].text)
        //       this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
        //     } else {
        //
        //     }
        //   }
        // }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var i = 0; i < this.listReportFilterstatusBD.length; i++) {
          this.SUMtotal += this.listReportFilterstatusBD[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterstatusBD, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
        // ////////////////////////////////////////////////////////////////
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        // console.log('============123456789123456789=============')
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        // console.log(444)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {

        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              this.listReportFilterstatus.push(this.listReport[j])
            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusPRESALE[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].id
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusPRESALE[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].id
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
        // ////////////////////////////////////////////////////////////////
      } else if (this.dateto === null && this.datefrom === null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        var sfc = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.listReport[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReport[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReport[j].ids !== sfc){
                  this.listReportFilterstatus.push(this.listReport[j])
                  this.check[i] = 1
                  sfc = this.listReport[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0
        // for (var j = 0; j < this.listReportFilter.length; j++) {
        //   for (var i = 0; i < this.statesBD.length; i++) {
        //     if (this.listReportFilter[j]['status_bd'] === this.statesBD[i]) {
        //       // console.log(this.states[i].text)
        //       this.listReportFilterstatusBD.push(this.listReportFilter[j])
        //     } else {
        //
        //     }
        //   }
        // }

        var sfc = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.listReportFilter[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilter[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilter[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilter[j])
                  this.check[i] = 1
                  sfc = this.listReportFilter[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        // console.log(444)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {

        this.listReportFilterstatus = []
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        this.listReportFilterstatusBD = []
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
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
        // ////////////////////////////////////////////////////////////////
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        // console.log(this.SUMtotal)
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilter[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilter[j])
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        // console.log(444)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {

        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              this.listReportFilterstatus.push(this.listReport[j])
            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusPRESALE[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusPRESALE[j])
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusPRESALE[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusPRESALE[j])
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
        // ////////////////////////////////////////////////////////////////
      } else if (this.dateto === null && this.datefrom === null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        var sfc = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.listReport[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReport[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReport[j].ids !== sfc){
                  this.listReportFilterstatus.push(this.listReport[j])
                  this.check[i] = 1
                  sfc = this.listReport[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusBD[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusBD[j])
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0

        var sfc = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.listReportFilter[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilter[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilter[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilter[j])
                  this.check[i] = 1
                  sfc = this.listReportFilter[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusBD[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusBD[j])
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        // console.log(444)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusBD[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusBD[j])
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {

        this.listReportFilterstatus = []
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusBD[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusBD[j])
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        this.listReportFilterstatusBD = []
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusBD[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusBD[j])
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusBD[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusBD[j])
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusBD[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusBD[j])
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
        // ////////////////////////////////////////////////////////////////
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {


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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        // console.log(444)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {

        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              this.listReportFilterstatus.push(this.listReport[j])
            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusPRESALE[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusPRESALE[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
        // ////////////////////////////////////////////////////////////////
      } else if (this.dateto === null && this.datefrom === null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        var sfc = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.listReport[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReport[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReport[j].ids !== sfc){
                  this.listReportFilterstatus.push(this.listReport[j])
                  this.check[i] = 1
                  sfc = this.listReport[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0

        var sfc = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.listReportFilter[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilter[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilter[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilter[j])
                  this.check[i] = 1
                  sfc = this.listReportFilter[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        // console.log(444)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {

        this.listReportFilterstatus = []
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        this.listReportFilterstatusBD = []
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length === 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
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
        // ////////////////////////////////////////////////////////////////
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        // console.log(this.SUMtotal)
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')

        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReport[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReport[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilter[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              // console.log('=')
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        // console.log(444)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {

        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        console.log(this.listReportFilterstatus)
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        console.log(this.listReportFilterteam)
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              this.listReportFilterstatus.push(this.listReport[j])
            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatusPRESALE[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatusPRESALE[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatusPRESALE[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatusPRESALE[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
        // ////////////////////////////////////////////////////////////////
      } else if (this.dateto === null && this.datefrom === null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        // for (var j = 0; j < this.listReport.length; j++) {
        //   for (var i = 0; i < this.statesBD.length; i++) {
        //     if (this.listReport[j]['status_bd'] === this.statesBD[i]) {
        //       // console.log(this.states[i].text)
        //       this.listReportFilterstatus.push(this.listReport[j])
        //     } else {
        //
        //     }
        //   }
        // }
        // console.log(this.listReport[j].ids)
        // console.log(this.listReport[j].serviceBD[i])
        // console.log(this.listReport)
        var sfc = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.listReport[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReport[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReport[j].ids !== sfc){
                  this.listReportFilterstatus.push(this.listReport[j])
                  this.check[i] = 1
                  sfc = this.listReport[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatus[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatusBD[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatusBD[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0
        // for (var j = 0; j < this.listReportFilter.length; j++) {
        //   for (var i = 0; i < this.statesBD.length; i++) {
        //     if (this.listReportFilter[j]['status_bd'] === this.statesBD[i]) {
        //       // console.log(this.states[i].text)
        //       this.listReportFilterstatusBD.push(this.listReportFilter[j])
        //     } else {
        //
        //     }
        //   }
        // }

        var sfc = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.listReportFilter[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilter[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilter[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilter[j])
                  this.check[i] = 1
                  sfc = this.listReportFilter[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatusBD[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatusBD[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        // console.log(444)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatusBD[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatusBD[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {

        this.listReportFilterstatus = []
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatusBD[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatusBD[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        this.listReportFilterstatusBD = []
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatusBD[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatusBD[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatusBD[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatusBD[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []
        // for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
        //   for (var i = 0; i < this.statesBD.length; i++) {
        //     if (this.listReportFilterstatusPRESALE[j]['status_bd'] === this.statesBD[i]) {
        //       // console.log(this.states[i].text)
        //       this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
        //     } else {
        //
        //     }
        //   }
        // }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportFilterstatusBD[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportFilterstatusBD[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
        // ////////////////////////////////////////////////////////////////
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        // console.log('============123456789123456789=============')
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        // console.log(444)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {

        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              this.listReportFilterstatus.push(this.listReport[j])
            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusPRESALE[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusPRESALE[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
        // ////////////////////////////////////////////////////////////////
      } else if (this.dateto === null && this.datefrom === null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        var sfc = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.listReport[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReport[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReport[j].ids !== sfc){
                  this.listReportFilterstatus.push(this.listReport[j])
                  this.check[i] = 1
                  sfc = this.listReport[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0

        var sfc = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.listReportFilter[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilter[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilter[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilter[j])
                  this.check[i] = 1
                  sfc = this.listReportFilter[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        // console.log(444)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {

        this.listReportFilterstatus = []
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        this.listReportFilterstatusBD = []
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length === 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportServicetype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
        // ////////////////////////////////////////////////////////////////
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        // console.log(this.SUMtotal)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReport[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilter[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
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
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        // console.log(444)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
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
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {

        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
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
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
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
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              this.listReportFilterstatus.push(this.listReport[j])
            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusPRESALE[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusPRESALE[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusPRESALE[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusPRESALE[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
        // ////////////////////////////////////////////////////////////////
      } else if (this.dateto === null && this.datefrom === null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        var sfc = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.listReport[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReport[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReport[j].ids !== sfc){
                  this.listReportFilterstatus.push(this.listReport[j])
                  this.check[i] = 1
                  sfc = this.listReport[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
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
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusBD[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusBD[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0

        var sfc = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.listReportFilter[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilter[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilter[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilter[j])
                  this.check[i] = 1
                  sfc = this.listReportFilter[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusBD[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusBD[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        // console.log(444)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusBD[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusBD[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {

        this.listReportFilterstatus = []
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusBD[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusBD[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        this.listReportFilterstatusBD = []
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusBD[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusBD[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusBD[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusBD[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length === 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportFilterstatusBD[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportFilterstatusBD[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
        // ////////////////////////////////////////////////////////////////
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')
        // console.log('============123456789123456789=============')

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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        // console.log(444)
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {

        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              this.listReportFilterstatus.push(this.listReport[j])
            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusPRESALE[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length === 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusPRESALE[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
        // ////////////////////////////////////////////////////////////////
      } else if (this.dateto === null && this.datefrom === null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        var sfc = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.listReport[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReport[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReport[j].ids !== sfc){
                  this.listReportFilterstatus.push(this.listReport[j])
                  this.check[i] = 1
                  sfc = this.listReport[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
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
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        // console.log(this.listReport)
        // console.log(this.states)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              // console.log(this.listReport[j].serviceBD)
              // console.log(this.statesBD[k])
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0

        var sfc = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.listReportFilter[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilter[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilter[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilter[j])
                  this.check[i] = 1
                  sfc = this.listReportFilter[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length === 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        // console.log(444)
        this.listReportFilterstatusBD = []
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text ) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {

        this.listReportFilterstatus = []
        this.listReportFilterstatusBD = []
        this.SUMtotal = 0

        // console.log(this.listReportFilter)
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReport[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length === 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.SUMtotal = 0
        this.listReportFilterstatusBD = []
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if (this.listReportFilter[j]['Presalestatus'] === this.statesPresale[i] ) {
              // console.log(this.statesPresale[i].text)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.listReportFilterstatus[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatus[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatus[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatus[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatus[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if ((this.dateto === null || this.datefrom === null) && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReport.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReport[j]['cust_status'] === this.states[i].text ) {
              // console.log(this.states[i].text)
              this.listReportFilterstatus.push(this.listReport[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
      } else if (this.dateto !== null && this.datefrom !== null && this.states.length !== 0 && this.statesPresale.length !== 0 && this.statesBD.length !== 0 && this.servicetype.length !== 0 && this.sotype.length !== 0 && this.teamsales.length !== 0) {
        this.listReportFilterstatus = []
        this.listReportFilterstatusPRESALE = []
        this.SUMtotal = 0
        for (var j = 0; j < this.listReportFilter.length; j++) {
          for (var i = 0; i < this.states.length; i++) {
            if (this.listReportFilter[j]['cust_status'] === this.states[i].text) {
              // console.log(2222)
              this.listReportFilterstatus.push(this.listReportFilter[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportFilterstatus.length; j++) {
          for (var i = 0; i < this.statesPresale.length; i++) {
            if ( this.listReportFilterstatus[j]['Presalestatus'] === this.statesPresale[i]) {
              // console.log(this.states[i].text)
              this.listReportFilterstatusPRESALE.push(this.listReportFilterstatus[j])
            } else {

            }
          }
        }
        this.listReportFilterstatusBD = []

        var sfc = 0
        for (var j = 0; j < this.listReportFilterstatusPRESALE.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusPRESALE[j].serviceBD.length; i++) {
            for (var k = 0; k < this.statesBD.length; k++) {
              // console.log(88888888888888)***********************************************************************************************************************************************
              if (this.listReportFilterstatusPRESALE[j].serviceBD[i] === this.statesBD[k]) {
                if(sfc === 0 ||  this.listReportFilterstatusPRESALE[j].ids !== sfc){
                  this.listReportFilterstatusBD.push(this.listReportFilterstatusPRESALE[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusPRESALE[j].ids
                }

              } else {

              }
            }
          }
          sfc = 0
        }

        sfc = 0
        for (var j = 0; j < this.listReportFilterstatusBD.length; j++) {
          for (var i = 0; i < this.listReportFilterstatusBD[j].Group_service_type.length; i++) {
            for (var k = 0; k < this.servicetype.length; k++) {
              // console.log(88888888888888)*************************************************************************************************************************************************
              // console.log(this.listReport[j].Group_service_type[i])
              if (this.listReportFilterstatusBD[j].Group_service_type[i] === this.servicetype[k].id.toString()) {
                if(sfc === 0 ||  this.listReportFilterstatusBD[j].id !== sfc){
                  this.listReportServicetype.push(this.listReportFilterstatusBD[j])
                  this.check[i] = 1
                  sfc = this.listReportFilterstatusBD[j].id
                }

              } else {

              }
            }
          }
          sfc = 0
        }
        for (var j = 0; j < this.listReportServicetype.length; j++) {
          for (var i = 0; i < this.sotype.length; i++) {
            if (this.listReportServicetype[j]['SO_type_name'] === this.sotype[i].text ) {
              // console.log(2222)
              this.listReportSOtype.push(this.listReportServicetype[j])
            } else {

            }
          }
        }
        for (var j = 0; j < this.listReportSOtype.length; j++) {
          for (var i = 0; i < this.teamsales.length; i++) {
            if (this.listReportSOtype[j]['TeamSales_name'] === this.teamsales[i].text ) {
              // console.log(2222)
              this.listReportFilterteam.push(this.listReportSOtype[j])
            } else {

            }
          }
        }
        this.SUMtotal = 0
        for (var i = 0; i < this.listReportFilterteam.length; i++) {
          this.SUMtotal += this.listReportFilterteam[i]['sfc_total']
        }
        var parts = this.SUMtotal.toString().split('.')
        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.SUMtotal = parts.join('.')
        return _.filter(this.listReportFilterteam, function (o) {
          return o['project_name'].indexOf(searchTxt.trim()) !== -1 || o['cust_name'].indexOf(searchTxt.trim()) !== -1 || o['date_proceed'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1
        })
        // ////////////////////////////////////////////////////////////////
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

<style media="screen" scoped="">
  .headline {
    color: #FFFFFF;
  }
  .pointer {
    cursor: pointer;
  }
  .fontHead {
    font-size: 1.2em !important;
  }
  >>>.input-group__details {
    min-height: 0px;
  }
  >>>table.table thead th:not(:first-child) {
    padding: 0 0px;
  }
  .layout.wrap {
    height: 50px !important;
  }
  .line-presale {
    max-width: 6px !important;
  }
  >>>.input-group {
    min-width: 30px;
  }
  /* >>>.input-group--select .input-group__selections__comma {
    font-size: 13px;
  } */
  >>>.input-group {
    padding: 0px;
  }
  >>>.input-group--text-field label {
    top: 0px;
  }
  >>>.subheader {
    height: 30px;
  }
  >>>.input-group__input {
    min-width: 79px !important;
  }
  >>>.input-group--text-field.input-group--textarea:not(.input-group--full-width) .input-group__input {
    padding: 10px 14px 0 14px;
  }
  .card__actions {
    padding: 82px 0 3px;
  }
  .subheader {
    height: 21px !important;
  }
  .padding-status {
    margin-left: -78px !important;
  }
  >>>[data-v-65bb3edc] .input-group__input {
    min-width: 40px !important;
  }
</style>
