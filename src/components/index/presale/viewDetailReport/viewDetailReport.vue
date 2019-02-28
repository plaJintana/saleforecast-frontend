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
            <saleInfo class="m-t-1" ref="SaleInfo"/>
            <customer class="m-t-1" ref="Customer"/>
            <documents class="m-t-1" ref="Documents"/>
            <service class="m-t-1" ref="Service"/>
            <summarys class="m-t-1" ref="Summary"/>
            <v-form v-model="valid" ref="form" lazy-validation v-if="state === 'request' && userData.position === 'PRESALES' && statepresale !== 'APPROVE' || userData.position === 'TEAMLEAD' && statusPresale !== '0' && state === 'request' && statepresale !== 'APPROVE'">
              <v-flex xs12 sm12 md12 lg12>
                <v-layout row wrap spacing>
                  <v-flex xs8 offset-xs2 lg2 class="m-t-1"><v-subheader class="fontSize">Pre-Sale Order status <span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
                  <v-flex xs2 class="m-t-1"><v-select :items="listOrderPresaleStatus" v-model="OrderPresaleStatus" item-value="id" item-text="name" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" required></v-select></v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs8 offset-xs2 class="m-t-1"><v-text-field textarea label="Remark of approve/reject" v-model="remark" request></v-text-field></v-flex>
            </v-form>
          </v-card-text>
          <v-card-actions v-if="state === 'request' && statepresale !== 'APPROVE'">
            <v-layout row wrap v-if="userData.position !== 'PRESALES' && userData.position !== 'GROUPLEAD' && userData.position !== 'HEAD OF SALES' ">
              <v-flex xs2 class="centerDiv m-b-2" offset-xs5><v-btn outline round color="teal" dark class="fontSize widthfull" @click="checkapprove()"><v-icon left>mdi-checkbox-marked-circle</v-icon> Approve</v-btn></v-flex>
              <!-- <v-flex xs2 class="m-b-2"><v-btn color="error" @click="reject()"><v-icon left>mdi-close-circle</v-icon> Reject</v-btn></v-flex> -->
            </v-layout>
            <v-layout row wrap v-if="userData.position === 'PRESALES'">
              <v-flex xs2 class="center" offset-xs5><v-btn outline round color="teal" dark class="fontSize widthfull" @click="addstatus()"><v-icon left>mdi-checkbox-marked-circle</v-icon> SEND</v-btn></v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import service from '@/components/index/presale/viewDetailReport/service'
import customer from '@/components/index/presale/viewDetailReport/customer'
import saleInfo from '@/components/index/presale/viewDetailReport/saleInfo'
import documents from '@/components/index/presale/viewDetailReport/documents'
import summarys from '@/components/index/presale/viewDetailReport/summary'
import {Decode, Encode} from '@/services'
export default {
  components: {
    customer,
    service,
    documents,
    saleInfo,
    summarys
  },
  data () {
    return {
      check: '',
      serviceReport: [],
      saleReport: [],
      contact: [],
      saleforecast: [],
      totalcost: 0,
      user: [],
      remark: '',
      state: '',
      valid: false,
      listOrderPresaleStatus: [],
      OrderPresaleStatus: null,
      idsaleforecast: 0,
      statepresale: '',
      statusPresale: ''
    }
  },
  created () {
    if (this.$route.query.idsaleforecast) {
      this.idsaleforecast = Decode.decode(this.$route.query.idsaleforecast)
      this.state = Decode.decode(this.$route.query.t)
      this.getPresaleTeam(this.idsaleforecast)
      this.getReportDataPresale(this.idsaleforecast)
      this.getOrderStatusPresale()
    }
    if (this.type_user === 'PRESALE' && this.position === 'TEAMLEAD') {
      this.getPresaleTeam()
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
    getPresaleTeam (id) {
      console.log(id)
      var source = Encode.encode(JSON.stringify({id: id}))
      this.axios.post(process.env.API + '/sendPresale', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.statusPresale = result.source[0].order_presale_status
          if (this.statusPresale !== '0') {
            this.OrderPresaleStatus = this.statusPresale
            this.remark = result.source[0].presale_remark
          }
        } else {
          this.$swal('กรุณาติดต่อผู้ดูแล', '', 'error')
          this.$router.push({path: '/presale/request'})
        }
      })
    },
    getReportDataPresale (id) {
      var source = Encode.encode(JSON.stringify({id: id, position: this.userData.position, emp_no: this.userData.emp_no}))
      this.axios.post(process.env.API + '/getReportDataPresale', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.statepresale = result.state[0].state_presale
          // console.log(result.state[0].state_presale)
          // console.log(this.statepresale)
          this.serviceReport = result.service
          this.saleforecast = result.saleforecast
          this.saleReport = result.saleinfo
          this.contact = result.contact
          let customer = {project_name: this.saleforecast[0].project_name, cust_ID: this.saleforecast[0].cust_ID, cust_name: this.saleforecast[0].cust_name, contact: result.contact}
          this.$refs.Customer.setValue(customer)
          this.$refs.Service.setValue(this.serviceReport)
          this.$refs.SaleInfo.setValue(this.saleReport)
          this.$refs.Documents.setValue(this.saleReport)
          this.$refs.Summary.setValue(this.saleReport)
          for (var i = 0; i < this.serviceReport.length; i++) {
            this.totalcost = this.totalcost + this.serviceReport[i].cost
          }
          this.$refs.Summary.setRevenueTotal(this.totalcost)
        } else {
          this.$swal('กรุณาติดต่อผู้ดูแล', '', 'error')
          this.$router.push({path: '/presale/request'})
        }
      })
    },
    getOrderStatusPresale () {
      this.axios.post(process.env.API + '/getOrderStatusPresale').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listOrderPresaleStatus = result.orderPresaleStatus
        } else {
          this.listOrderPresaleStatus = []
        }
      }, () => {
        this.listOrderPresaleStatus = []
      })
    },
    checkapprove () {
      if (this.userData.position === 'TEAMLEAD') {
        this.check = this.addstatus()
      }
    },
    approve () {
      // if(this.OrderPresaleStatus == null){
      //   this.$swal('กรุณากรอกข้อมูลให้ครบถ้วน', '', 'error')
      // }
      // else{
      if (this.userData.position !== 'TEAMLEAD') {
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
            var source = Encode.encode(JSON.stringify({id: me.idsaleforecast, emp_no: this.userData.emp_no}))
            me.axios.post(process.env.API + '/approvePresale', {source: source}).then((response) => {
              if (response.data === 'success') {
                me.$swal('ดำเนินการเรียบร้อยแล้ว', '', 'success')
                me.$router.push({path: '/presale/request'})
              } else {
                me.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
              }
            })
          }
        }).catch(this.$swal.noop)
      } else {
        var me = this
        var source = Encode.encode(JSON.stringify({id: me.idsaleforecast, emp_no: this.userData.emp_no}))
        me.axios.post(process.env.API + '/approvePresale', {source: source}).then((response) => {
          if (response.data === 'success') {
            me.$swal('ดำเนินการเรียบร้อยแล้ว', '', 'success')
            me.$router.push({path: '/presale/request'})
          } else {
            me.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
          }
        })
      }
      // }
    },
    addstatus () {
      if (this.OrderPresaleStatus == null) {
        this.$swal('กรุณากรอกข้อมูลให้ครบถ้วน', '', 'error')
      } else {
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
            var source = Encode.encode(JSON.stringify({id: me.idsaleforecast, emp_no: this.userData.emp_no, remark: me.remark, orderPresaleStatus: this.OrderPresaleStatus}))
            me.axios.post(process.env.API + '/addStatuspresale', {source: source}).then((response) => {
              this.check = response.data
              if (response.data === 'success') {
                if (this.userData.position === 'TEAMLEAD') {
                  this.approve()
                } else {
                  me.$swal('ดำเนินการเรียบร้อยแล้ว', '', 'success')
                  me.$router.push({path: '/presale/request'})
                }
              } else {
                me.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
              }
            })
          }
        }).catch(this.$swal.noop)
      }
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
      if (this.state === 'request') {
        this.$router.push({ path: '/presale/request' })
      } else if (this.state === 'approve') {
        this.$router.push({ path: '/presale/approve' })
      } else if (this.state === 'reject') {
        this.$router.push({ path: '/presale/reject' })
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
