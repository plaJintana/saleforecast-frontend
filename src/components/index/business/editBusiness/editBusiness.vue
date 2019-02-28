<template>
  <div>
    <v-toolbar class="bgToolbar">
      <v-btn dark icon @click.stop="forward()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title><h3 style="color:white;">Report</h3></v-toolbar-title>
    </v-toolbar>


    <v-layout row wrap v-if="this.see === 'see'">
      <v-flex xs12>
        <v-card class="m-t-1 m-l-1 m-r-1 m-b-1">
          <v-card-text>
            <saleInfo class="m-t-1" ref="SaleInfo"/>
            <customer class="m-t-1" ref="Customer"/>
            <documents class="m-t-1" ref="Documents"/>
            <service class="m-t-1" ref="Service"/>
            <summarys class="m-t-1" ref="Summary"/>
            <!-- <v-form v-model="valid" ref="form" lazy-validation v-if="state === ''"> -->
            <!-- </v-form> -->
          </v-card-text>
          <v-card style="box-shadow: none;" v-if="this.userData.position === 'BDLEAD' && this.state_BDLEAD === ''">
            <v-card-text>
              <div>
                <v-card-actions>
                  <v-layout row wrap>
                    <v-layout row wrap spacing>
                      <v-flex xs1></v-flex>
                      <v-flex xs1><v-subheader class="fontSize">Status : </v-subheader></v-flex>
                      <v-flex xs2><v-select :items="status" v-model="valuestatus" item-text="text" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select></v-flex>
                      <v-flex xs8></v-flex>
                      <v-flex xs1></v-flex>
                      <v-flex xs1><v-subheader class="fontSize">Remark : </v-subheader></v-flex>
                      <v-flex xs6 ><v-text-field textarea label="Remark of approve/reject" v-model="remark" request></v-text-field></v-flex>
                    </v-layout>
                  </v-layout>
                </v-card-actions>
              </div>
            </v-card-text>
          </v-card>


          <v-card-actions>
            <v-layout row wrap v-if="this.userData.position === 'BDLEAD' && this.state_BDLEAD === '' ">
              <v-flex xs2 class="centerDiv m-b-2" offset-xs5><v-btn outline round color="teal" dark class="fontSize widthfull" @click="checkapproveBD()"><v-icon left>mdi-checkbox-marked-circle</v-icon>Approve</v-btn></v-flex>
              <!-- <v-flex xs2 class="m-b-2"><v-btn color="error" @click="reject()"><v-icon left>mdi-close-circle</v-icon> Reject</v-btn></v-flex> -->
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>


    </v-layout>





    <v-layout row wrap v-if="this.see === ''">
      <v-flex xs12>
        <v-card class="m-t-1 m-l-1 m-r-1 m-b-1">
          <v-card-text>
            <saleInfo class="m-t-1" ref="SaleInfo"/>
            <customer class="m-t-1" ref="Customer"/>
            <documents class="m-t-1" ref="Documents"/>
            <service class="m-t-1" ref="Service"/>
            <summarys class="m-t-1" ref="Summary"/>
            <!-- <v-form v-model="valid" ref="form" lazy-validation v-if="state === ''"> -->

            <!-- </v-form> -->
          </v-card-text>
          <v-card style="box-shadow: none;" v-if="this.userData.position === 'HEAD OF BD'">
            <v-card-text>
              <div>
                <v-card-actions>
                  <v-layout row wrap>
                    <v-layout row wrap spacing>
                      <v-flex xs1></v-flex>
                      <v-flex xs1><v-subheader class="fontSize">Status : </v-subheader></v-flex>
                      <v-flex xs2><v-select :items="status" v-model="valuestatus" item-text="text" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" required></v-select></v-flex>
                      <v-flex xs8></v-flex>
                      <v-flex xs1></v-flex>
                      <v-flex xs1><v-subheader class="fontSize">Remark : </v-subheader></v-flex>
                      <v-flex xs6 ><v-text-field textarea label="Remark of approve/reject" v-model="remark" request></v-text-field></v-flex>
                    </v-layout>
                  </v-layout>
                </v-card-actions>
              </div>
            </v-card-text>
          </v-card>

          <v-card style="box-shadow: none;">
            <v-card-text>
              <div>
                <v-card-actions>
                  <v-layout row wrap v-if="userData.position === 'BD' && po === '1'">
                    <v-layout row wrap spacing>
                      <v-flex xs1></v-flex>
                      <v-flex xs1><v-subheader class="fontSize">Status : </v-subheader></v-flex>
                      <v-flex xs2><v-select :items="status" v-model="valuestatus" item-text="text" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" required></v-select></v-flex>
                      <v-flex xs8></v-flex>
                      <v-flex xs1></v-flex>
                      <v-flex xs1><v-subheader class="fontSize">Remark : </v-subheader></v-flex>
                      <v-flex xs6 ><v-text-field textarea label="Remark of approve/reject" v-model="remark" request></v-text-field></v-flex>
                    </v-layout>
                  </v-layout>
                </v-card-actions>
              </div>
            </v-card-text>
          </v-card>

          <v-card-actions>
            <v-layout row wrap v-if="this.userData.position === 'BD' && po === '1'">
              <v-flex xs2 class="centerDiv m-b-2" offset-xs5><v-btn outline round color="teal" dark class="fontSize widthfull"  @click="approve()"><v-icon left>mdi-checkbox-marked-circle</v-icon> ยืนยัน</v-btn></v-flex>
              <!-- <v-flex xs2 class="m-b-2"><v-btn color="error" @click="reject()"><v-icon left>mdi-close-circle</v-icon> Reject</v-btn></v-flex> -->
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

  </div>
</template>
<script>
import navbar from '@/components/index/business/navbar'
import service from '@/components/index/business/editBusiness/service'
import customer from '@/components/index/business/editBusiness/customer'
import saleInfo from '@/components/index/business/editBusiness/saleInfo'
import summarys from '@/components/index/business/editBusiness/summary'
import documents from '@/components/index/business/editBusiness/documents'
import {Decode, Encode} from '@/services'
export default {
  components: {
    navbar,
    customer,
    saleInfo,
    service,
    summarys,
    documents
  },
  data () {
    return {
      serviceReport: [],
      saleReport: [],
      contact: [],
      saleforecast: [],
      totalcost: 0,
      user: [],
      remark: '',
      state: '',
      see: '',
      valid: false,
      idsaleforecast: 0,
      status: [],
      valuestatus: [],
      status_bd:'',
      remark_bd:'',
      proid: '',
      po: 0,
      state_BDLEAD: ''
    }
  },
  created () {
    if (this.$route.query.idsaleforecast && this.userData.position === 'BD') {
      this.proid = Decode.decode(this.$route.query.productid)
      this.idsaleforecast = Decode.decode(this.$route.query.idsaleforecast)
      this.state = Decode.decode(this.$route.query.t)
      this.po = Decode.decode(this.$route.query.po)
      this.getReportDataPresale(this.idsaleforecast,this.proid)
      this.getStatus()

      this.see = Decode.decode(this.$route.query.see)
      // console.log(this.idsaleforecast)
    } else {
      console.log(this.po)
      // this.proid = Decode.decode(this.$route.query.productid)
      this.idsaleforecast = Decode.decode(this.$route.query.idsaleforecast)
      this.state = Decode.decode(this.$route.query.t)
      this.getReportDataPresale(this.idsaleforecast,this.proid)
      this.getStatus()

      // console.log(this.idsaleforecast)

      // console.log(this.proid)
      this.see = Decode.decode(this.$route.query.see)
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
    checkapproveBD () {
      console.log(this.userData.position)
      if (this.userData.position === 'BDLEAD') {
        this.approveBDTeamLead()
      }
    },
    open () {
      this.getStatus()
      // this.clear()
      // this.valuestatus = 'NORMAL'
    },
    approveBD () {
      // console.log(this.idsaleforecast)
      var me = this
      this.$swal({
        title: 'ต้องการที่จะทำรายการใช่ไหม ?',
        // text: 'ต้องการที่จะทำรายการ',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {

        if (result) {
          // console.log(this.valuestatus)
          // console.log(this.idsaleforecast)
          var source = Encode.encode(JSON.stringify({id: this.idsaleforecast, emp_no: this.userData.emp_no }))
          this.axios.post(process.env.API + '/approveBD', {source: source}).then((response) => {
            var result = JSON.parse(Decode.decode(response.data))
            // console.log(result.statuss)
            if (result.statuss === 'success') {
              me.$router.push({path: '/business/getBusiness'})
              // this.ch = 1
              // this.getReportApprovePresale(this.ch)
              me.$swal('ดำเนินการเรียบร้อยแล้ว', '', 'success')


            } else {
              me.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
            }
          })
        }
      }).catch(this.$swal.noop)
    },
    getReportDataPresale (id,proID) {
      // console.log(proID)
      // console.log(id)
      var source = Encode.encode(JSON.stringify({id: id, position: this.userData.position, emp_no: this.userData.emp_no, proid: proID}))
      this.axios.post(process.env.API + '/editReportDataBD', {source: source}).then((response) => {
        // console.log(Decode.decode(response.data))
        var result = JSON.parse(Decode.decode(response.data))

        if (result.status === 'success') {
          this.state_BDLEAD = result.BDLEAD[0].state_bdlead
          this.serviceReport = result.service
          this.saleforecast = result.saleforecast
          this.saleReport = result.saleinfo
          this.contact = result.contact
          this.valuestatus = this.serviceReport[0].status_bd
          // console.log(this.valuestatus)
          this.remark = this.serviceReport[0].remark_bd
          let customer = {project_name: this.saleforecast[0].project_name, cust_ID: this.saleforecast[0].cust_ID, cust_name: this.saleforecast[0].cust_name, contact: result.contact}
          this.$refs.Customer.setValue(customer)
          this.$refs.Service.setValue(this.serviceReport, this.userData, this.state_BDLEAD)
          this.$refs.SaleInfo.setValue(this.saleReport)
          console.log(this.saleReport)
          this.$refs.Documents.setValue(this.saleReport)
          // console.log(this.saleReport)
          // console.log(result.service.status_bd)
          // console.log(this.serviceReport[0].bdproductid)
          if(this.see === 'see'){
            this.status_bd = result.service[0].status_bd
            this.remark_bd = result.service[0].remark_bd
          }
          for (var i = 0; i < this.serviceReport.length; i++) {
            this.totalcost = this.totalcost + this.serviceReport[i].cost
          }
          this.$refs.Summary.setRevenueTotal(this.totalcost)
          this.$refs.Summary.setValue(this.saleReport)
        } else {
          this.$swal('กรุณาติดต่อผู้ดูแล', '', 'error')
          this.$router.push({path: '/business/remark'})
        }
      })
    },
    approve () {
      var me = this
      this.$swal({
        title: 'ต้องการที่จะทำรายการใช่ไหม ?',
        // text: 'ต้องการที่จะทำรายการ',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result) {
          console.log(this.valuestatus)
          var source = Encode.encode(JSON.stringify({id: me.idsaleforecast, emp_no: this.userData.emp_no, remark: me.remark ,status : this.valuestatus, service: this.serviceReport}))
          this.axios.post(process.env.API + '/addStatusBDD', {source: source}).then((response) => {
            var result = JSON.parse(Decode.decode(response.data))
            // console.log(result.statuss)
            if (result.statuss === 'success') {
              if (this.userData.position === 'BDLEAD' ) {
                this.approveBD()
              } else {
                me.$swal('ดำเนินการเรียบร้อยแล้ว', '', 'success')
                me.$router.push({path: '/business/remark'})
              }
            } else {
              me.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
            }
          })
        }
      }).catch(this.$swal.noop)
    },
    approveBDTeamLead () {
      var me = this
      var source = Encode.encode(JSON.stringify({id: me.idsaleforecast, emp_no: this.userData.emp_no, remark: me.remark ,status : this.valuestatus,service: this.serviceReport}))
      this.axios.post(process.env.API + '/addStatusBDD', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        // console.log(result.statuss)
        if (result.statuss === 'success') {
          if (this.userData.position === 'BDLEAD' ) {
            this.approveBD()
          } else {
            me.$swal('ดำเนินการเรียบร้อยแล้ว', '', 'success')
            me.$router.push({path: '/business/remark'})
          }
        } else {
          me.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
        }
      })
    },
    async  getStatus (val) {
      this.status = []
      this.valuestatus = []
      // console.log(result.data[0].id)
      // var source = Encode.encode(JSON.stringify({ 'id': val })
      await this.axios.post(process.env.API + '/getStatusBD').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.statuss === 'success') {
          for (var i = 0; i < result.data.length; i++) {
            this.status.push(result.data[i].name)
            this.valuestatus.push(result.data[i].id)
          }
        }
      })
    },
    reject () {
      console.log(this.userData['emp_no'])
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
          var source = Encode.encode(JSON.stringify({id: me.idsaleforecast, position: me.userData['position'], emp_no: me.userData['emp_no'], remark: me.remark}))
          me.axios.post(process.env.API + '/rejectPresale', {source: source}).then((response) => {
            if (response.data === 'success') {
              me.$swal('ดำเนินการเรียบร้อย', '', 'success')
              me.router.push({path: '/presale/reject'})
            } else if (response.data === 'fail') {
              me.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
            }
          })
        }
      }).catch(this.$swal.noop)
    },
    forward () {
      // if (this.state === 'request') {
      //   this.$router.push({ path: '/presale/request' })
      // } else if (this.state === 'approve') {
      //   this.$router.push({ path: '/presale/approve' })
      // } else if (this.state === 'reject') {
      //   this.$router.push({ path: '/presale/reject' })
      // }
      if(this.see === 'see'){
        this.$router.push({ path: '/business/getBusiness' })
      }else{
        this.$router.push({ path: '/business/remark' })
      }
    }
  }
}
</script>

<style>
.bgToolbar {
  background-color: #44BBA4 !important;
}

.blockHeader {
  background: #f3f4f5;
  padding: .78571429rem 1rem;
  box-shadow: none;
  border: 1px solid #d4d4d5;
  border-radius: .28571429rem;
  font-weight: 500;
  margin: 1em 0em 1em 0em;
}
</style>
