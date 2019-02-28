<template>
  <div>
    <v-toolbar class="bgToolbar">
      <v-btn dark icon @click.stop="forward()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title><h3 style="color:white;">Report</h3></v-toolbar-title>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="m-t-1 m-l-1 m-r-1 m-b-1">
          <v-card-text>
            <saleinfo class="m-t-1" ref="saleinfo"/>
            <customer class="m-t-1" ref="Customer"/>
            <documents class="m-t-1" ref="Documents"/>
            <service class="m-t-1" ref="Service"/>
            <summarys class="m-t-1" ref="Summary"/>
            <!-- <v-flex v-if="page !== 'approve'" xs8 offset-xs2 class="m-t-1"><v-text-field textarea label="Remark of approve" v-model="remark"></v-text-field></v-flex> -->
          </v-card-text>
          <v-card-actions v-if="(checkState(userData.position) >= checkState(state)) &&  page !== 'approve' || statepresale !== 'APPROVE' ">
          <!-- <v-card-actions v-if="(checkState(userData.position) >= checkState(state)) &&  page !== 'approve' || statepresale !== 'APPROVE' ">     || this.userData.position === 'GROUPLEAD'           -->
          <v-layout row wrap v-if=" this.userData.position === 'GROUPLEAD' ">
            <v-flex xs2 class="centerDiv m-b-2" offset-xs5 v-if="userData.position == 'SALES' && po !== '1'"><v-btn outline round color="teal" dark class="fontSize widthfull"  @click="approve()">SEND</v-btn></v-flex>
            <v-flex xs8 offset-xs2 class="m-t-1" v-if="state !== 'TEAMLEAD'"><v-text-field textarea label="Remark of reject" v-model="remark" request></v-text-field></v-flex>
            <v-flex xs2 class="m-b-2" offset-xs4 v-if="state !== 'TEAMLEAD'"><v-btn round outline color="success" @click="approve()"><v-icon left>mdi-checkbox-marked-circle</v-icon>Approve</v-btn></v-flex>
            <v-flex xs2 class="m-b-2" pl-5  v-if="checkreject !== '5' && state !== 'TEAMLEAD'"><v-btn round outline color="error" @click="reject()"><v-icon left>mdi-close-circle</v-icon> Reject</v-btn></v-flex>
          </v-layout>
            <v-layout row wrap v-else>
              <v-flex xs2 class="centerDiv m-b-2" offset-xs5 v-if="userData.position == 'SALES' && po !== '1'"><v-btn outline round color="teal" dark class="fontSize widthfull"  @click="approve()">SEND</v-btn></v-flex>
              <v-flex xs8 offset-xs2 class="m-t-1" v-if="(userData.position !== 'SALES' && po !== '1')"><v-text-field textarea label="Remark of reject" v-model="remark" request></v-text-field></v-flex>
              <v-flex xs2 class="m-b-2" offset-xs4 v-if="(userData.position !== 'SALES' && po !== '1')"><v-btn round outline color="success" @click="approve()"><v-icon left>mdi-checkbox-marked-circle</v-icon>Approve</v-btn></v-flex>
              <v-flex xs2 class="m-b-2" pl-5  v-if="(userData.position !== 'SALES' && po !== '1') && checkreject !== '5'"><v-btn round outline color="error" @click="reject()"><v-icon left>mdi-close-circle</v-icon> Reject</v-btn></v-flex>
            </v-layout>
          </v-card-actions>


        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import service from '@/components/index/sale/viewDetailReport/service'
import customer from '@/components/index/sale/viewDetailReport/customer'
import saleinfo from '@/components/index/sale/viewDetailReport/saleinfo'
import documents from '@/components/index/sale/viewDetailReport/documents'
import summarys from '@/components/index/sale/viewDetailReport/summary'
import {Decode, Encode} from '@/services'
import moment from 'moment'
export default {
  components: {
    customer,
    service,
    saleinfo,
    documents,
    summarys
  },
  data () {
    return {
      serviceReport: [],
      saleReport: [],
      contact: [],
      totalcost: 0,
      user: [],
      remark: '',
      state: '',
      statepresale: '',
      page: '',
      po:0,
      checkreject : '',
      yearValue : null,
      weekValue : 0,
      weekdat :'',
      weekdate :''
    }
  },
  created () {
    if (this.$route.query.idsaleforecast) {
      let idsaleforecast = Decode.decode(this.$route.query.idsaleforecast)
      this.checkreject = Decode.decode(this.$route.query.checkreject)
      console.log(this.checkreject)
      this.getDataReport(idsaleforecast)
       // && checkreject !== '5'
    }
    if (this.$route.query.pf) {
      this.page = Decode.decode(this.$route.query.pf)
      this.po = Decode.decode(this.$route.query.po)
    }
  },
  computed: {
    userData () {
      if (this.$cookies.isKey('information')) {
        return JSON.parse(Decode.decode(this.$cookies.get('information')))
      } else {
        return ''
      }
    }
  },
  methods: {
    getDataReport (id) {
      var source = Encode.encode(JSON.stringify({id: id, position: this.userData.position, emp_no: this.userData.emp_no}))
      this.axios.post(process.env.API + '/getDataReport', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        // console.log(result)
        if (result.status === 'success') {
          this.serviceReport = result.service
          console.log(result)
          console.log('=========MM===========')
          this.saleReport = result.saleinfo[0]
          this.contact = result.contact
          let customer = {project_name: this.saleReport.project_name, cust_ID: this.saleReport.cust_ID, cust_name: this.saleReport.cust_name, contact: result.contact}
          this.$refs.Customer.setValue(customer)
          this.$refs.Service.setValue(this.serviceReport)
          this.$refs.saleinfo.setValue(this.saleReport)
          this.$refs.Documents.setValue(this.saleReport)
          this.$refs.Summary.setValue(this.saleReport, result.state)
          // for (var i = 0; i < this.serviceReport.length; i++) {
          //   this.totalcost = this.totalcost + this.serviceReport[i].cost
          // }
          // this.$refs.Summary.setRevenueTotal(this.saleReport.sfc_total)
          if (result.state.length > 0) {
            this.state = result.state[0].state_sale
            this.statepresale = result.state[0].state_presale
            // console.log(this.statepresale)
          } else {
            this.state = 'SALES'
          }
        } else {
          this.$swal('กรุณาติดต่อผู้ดูแล', '', 'error')
          this.$router.push({path: '/sale/request'})
        }
      })
    },
    approve () {
      var me = this
      this.yearValue = moment().format('Y')
      this.weekValue = moment().format('W')
      this.weekdat = moment().week(this.weekValue).format('YYYY-MM-DD HH:mm')
      this.weekdate = moment().week(this.weekValue).weekday(3).set('hour', 14).set('minutes', 30).set('seconds', 0).format('YYYY-MM-DD HH:mm')
      if (this.weekdat > this.weekdate) {
            this.weekValue = this.weekValue
      } else {
            this.weekValue -= 1
            if(this.weekValue === 0){
              this.weekValue = 52
            }
      }
      console.log(this.yearValue)
      console.log(this.weekValue)
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

          var source = Encode.encode(JSON.stringify({yearValue: this.yearValue,weekValue: this.weekValue,id: Decode.decode(me.$route.query.idsaleforecast), apvid: me.userData['emp_no'], position: me.userData['position'], remark: me.remark}))
          me.axios.post(process.env.API + '/approve', {source: source}).then((response) => {
            if (response.data === 'success') {
              me.$swal('ดำเนินการเรียบร้อยแล้ว', '', 'success')
              if (this.userData.position === 'GROUPLEAD'){
                this.$router.push({path: '/sale/approve'})
              } else {
                this.$router.push({path: '/sale/request'})
              }
            } else {
              me.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
            }
          })
        }

      }).catch(this.$swal.noop)
    },
    checkState (val) {
      let item = ['SALES', 'TEAMLEAD', 'GROUPLEAD', 'HEAD OF SALES']
      for (var i = 0; i < item.length; i++) {
        if (item[i] === val) {
          return i
        }
      }
      return 0
    },
    reject () {
      var me = this
      this.$swal({
        title: 'คุณแน่ใจใช่ไหม ?',
        text: 'ต้องการที่จะ Reject ข้อมูล',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result) {

          var source = Encode.encode(JSON.stringify({id: Decode.decode(me.$route.query.idsaleforecast), position: me.userData['position'], rejid: me.userData['emp_no'], remark: me.remark}))
          this.axios.post(process.env.API + '/reject', {source: source}).then((response) => {
            if (response.data === 'success') {
              this.$swal('ดำเนินการเรียบร้อย', '', 'success')
              if (this.userData.position === 'GROUPLEAD'){
                this.$router.push({path: '/sale/approve'})
              } else {
                this.$router.push({path: '/sale/request'})
              }

            } else {
              this.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
            }
          })
        }
      }).catch(this.$swal.noop)
    },
    forward () {
      if (this.page === 'approve' || this.userData.position === 'GROUPLEAD') {
        this.$router.push({ path: '/sale/approve' })
      } else {
        this.$router.push({ path: '/sale/request' })
      }
    }
  }
}
</script>

<style>
.bgToolbar {
  background-color: #44BBA4 !important;
}
</style>
