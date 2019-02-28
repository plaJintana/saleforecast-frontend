<template lang="html">
  <div>
    <div class="athiti">
      <v-layout row wrap>
        <v-card class="widthfull  m-t-1 m-l-1 m-r-1">
          <v-card-title style="background-color:#2E5EAA;">
            <v-btn dark icon @click.stop="forward()"><v-icon>arrow_back</v-icon></v-btn>
            <v-flex xs10 sm12 md12 lg12 class="centerDiv"><h1 style="color:white;">{{title}}</h1></v-flex>
          </v-card-title>
        </v-card>
        <v-card v-if="state === 'reject'" class="widthfull  m-t-1 m-l-1 m-r-1">
          <v-card-text  class="centerDiv">
            <v-flex xs11 md11 lg11><remarkReject ref="remarkReject"/></v-flex>
            <v-flex xs11 md11 lg11><remarkRejectPresale ref="remarkRejectPresale"/></v-flex>
          </v-card-text>
        </v-card>
        <v-card class="widthfull  m-t-1 m-l-1 m-r-1">
          <v-card-text  class="centerDiv">
            <v-flex xs11 md11 lg11><documentReport ref="documentReport"/></v-flex>
          </v-card-text>
        </v-card>
        <v-card class="widthfull  m-t-1 m-l-1 m-r-1">
          <v-card-text class="centerDiv">
            <v-flex xs11 md11 lg11><customerSaleReport ref="customerSaleReport" :state="state"/></v-flex>
          </v-card-text>
        </v-card>
        <v-card class="widthfull  m-t-1 m-l-1 m-r-1">
          <v-card-text class="centerDiv">
            <v-flex xs11 md11 lg11><serviceList ref="serviceList" @revenueTotal="setRevenueTotal"/></v-flex>
          </v-card-text>
        </v-card>
        <v-card class="widthfull m-t-1 m-l-1 m-r-1">
          <v-card-text class="centerDiv">
            <v-flex xs11 md11 lg11><summaryReport ref="summaryReport"/></v-flex>
          </v-card-text>
          <v-card-actions style="box-shadow: none;">
            <v-flex xs12 sm12 md12 lg12>
              <v-layout row wrap spacing>
                <v-flex xs12 sm12 md2 lg2 offset-md3>
                  <v-btn outline round color="teal" dark class="fontSize widthfull" :loading="isLoading" @click="submitReport()">Submit</v-btn>
                </v-flex>
                <v-flex xs12 sm12 md2 lg2 offset-md1>
                  <v-btn round style="background-color: #F5F5F5"class="fontSize widthfull"  @click="cancel()">cancel</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-layout>
    </div>
  </div>
</template>

<script>
import documentReport from '@/components/index/sale/report/documentReport'
import customerSaleReport from '@/components/index/sale/report/customerSaleReport'
import serviceList from '@/components/index/sale/report/serviceList'
import summaryReport from '@/components/index/sale/report/summaryReport'
import remarkReject from '@/components/index/sale/report/remarkReject'
import remarkRejectPresale from '@/components/index/sale/report/remarkRejectPresale'
import { Decode, Encode } from '@/services'
import moment from 'moment'
export default {
  props: {
    state: {
      default: '',
      type: String
    }
  },
  components: {
    documentReport,
    customerSaleReport,
    serviceList,
    summaryReport,
    remarkReject,
    remarkRejectPresale
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
  created () {
    this.dataOld = null
  },
  data () {
    return {
      isLoading: false,
      dataOld: null,
      dataNew: null,
      reportID: null,
      title: 'Create Forecast'
    }
  },
  methods: {
    submitReport () {
      this.isLoading = true
      var documentReport = this.$refs.documentReport.getValue()
      // var weekValue = moment().format('W')
      this.week1 = moment().format('W')
      this.weekdat = moment().week(this.week1).format('YYYY-MM-DD HH:mm')
      this.weekdate = moment().week(this.week1).weekday(1).set('hour', 13).set('minutes', 0).set('seconds', 0).format('YYYY-MM-DD HH:mm')
      // console.log(this.weekdat)

      // console.log(this.weekdate)
      if (this.weekdat > this.weekdate) {
        this.week1 = this.week1
      } else {
        this.week1 -= 1
      }
      // console.log(this.week1)
      var customerSaleReport = this.$refs.customerSaleReport.getValue()
      let serviceList = this.$refs.serviceList.getValue()
      var summaryReport = this.$refs.summaryReport.getValue()
      if (documentReport !== false && customerSaleReport !== false && serviceList !== false && summaryReport !== false) {
        var sourceDocumentReport = {dateProceed: documentReport.dateProceed, SOTypeId: documentReport.SOtype.id, orderStatusId: documentReport.orderStatus.id, gradeId: documentReport.grade.id, resultId: documentReport.itemResult.id, resultRemark: documentReport.resultRemark, presale_emp: documentReport.presale_emp}
        var sourceCustomerSaleReport = {projectName: customerSaleReport.projectName, custid: customerSaleReport.custid, custname: customerSaleReport.custname, listContact: customerSaleReport.listContact, saleEmp_no: customerSaleReport.saleInfo.emp_no}
        let sourceServiceList = {listService: serviceList.slice()}
        var sourceSummaryReport = {revenue: summaryReport.revenue, remark: summaryReport.remark}
        if (this.state === 'add') {
          // console.log(weekValue)
          var source = Encode.encode(JSON.stringify({weekValue: this.week1, sourceDocumentReport: sourceDocumentReport, sourceCustomerSaleReport: sourceCustomerSaleReport, sourceServiceList: sourceServiceList, sourceSummaryReport: sourceSummaryReport, create_by: this.userData.emp_no}))
          this.axios.post(process.env.API + '/insertsfc', { source: source }).then((response) => {
            var result = JSON.parse(Decode.decode(response.data))
            // console.log(result.status)
            // console.log(result)
            if (result.status === 'success') {
              this.isLoading = false
              this.$swal('สร้าง Report สำเร็จ', '', 'success')
              this.clear()
              this.isLoading = false
              this.$router.push({ path: '/viewDetailReport', 'query': { 'idsaleforecast': Encode.encode(result.id_sfc) } })
            } else {
              this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
              this.isLoading = false
            }
          }, (response) => {
            this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
            this.isLoading = false
          })
        } else if (this.state === 'edit' || this.state === 'reject' || this.state === 'update') {

          var weekValue = moment().format('W')
          this.dataNew = {sourceDocumentReport: sourceDocumentReport, sourceCustomerSaleReport: sourceCustomerSaleReport, sourceServiceList: sourceServiceList, sourceSummaryReport: sourceSummaryReport, create_by: this.userData.emp_no}
          if (JSON.stringify(this.dataNew) !== this.dataOld) {
            // console.log(sourceDocumentReport)
            // console.log(sourceCustomerSaleReport)
            // console.log(sourceServiceList)
            // console.log(sourceSummaryReport)
              // console.log(this.dataOld)
            var data = Encode.encode(JSON.stringify({weekValue: weekValue, reportId: this.reportID, dataNew: this.dataNew, dataOld: JSON.parse(this.dataOld), state: this.state}))
            this.axios.post(process.env.API + '/editsfc', { source: data }).then((response) => {
              var result = response.data
              if (result === 'success') {
                this.isLoading = false
                this.$swal('แก้ไข Report สำเร็จ', '', 'success')
                this.$router.push('/sale/request')
                this.isLoading = false
              } else {
                this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
                this.isLoading = false
              }
            }, () => {
              this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
              this.isLoading = false
            })
          } else {
            this.isLoading = false
          }
        }
      } else {
        this.$swal('กรุณากรอกข้อมูลให้ครบถ้วน', '', 'error')
        this.isLoading = false
      }
      this.isLoading = false
    },
    clear () {
      this.title = 'Create Document'
      this.reportID = 0
      this.$refs.documentReport.clear()
      this.$refs.customerSaleReport.clear()
      this.$refs.serviceList.clear()
      this.$refs.summaryReport.clear()
    },
    beforeEdit () {
      var documentReport = this.$refs.documentReport.getValue()
      var customerSaleReport = this.$refs.customerSaleReport.getValue()
      let serviceList = this.$refs.serviceList.getValue()
      var summaryReport = this.$refs.summaryReport.getValue()
      var sourceDocumentReport = {dateProceed: documentReport.dateProceed, SOTypeId: documentReport.SOtype.id, orderStatusId: documentReport.orderStatus.id, gradeId: documentReport.grade.id, resultId: documentReport.itemResult.id, resultRemark: documentReport.resultRemark, presale_emp: documentReport.presale_emp}
      var sourceCustomerSaleReport = {projectName: customerSaleReport.projectName, custid: customerSaleReport.custid, custname: customerSaleReport.custname, listContact: customerSaleReport.listContact, saleEmp_no: customerSaleReport.saleInfo.emp_no}
      let sourceServiceList = {listService: serviceList}
      var sourceSummaryReport = {revenue: summaryReport.revenue, remark: summaryReport.remark}
      this.dataOld = JSON.stringify({sourceDocumentReport: sourceDocumentReport, sourceCustomerSaleReport: sourceCustomerSaleReport, sourceServiceList: sourceServiceList, sourceSummaryReport: sourceSummaryReport, create_by: this.userData.emp_no})
    },
    async editSaleforecastReport (id) {
      this.title = 'Edit Document'
      this.reportID = id
      var userEmp = this.userData.emp_no
      // console.log();
      var source = Encode.encode(JSON.stringify({id: id, userEmp_no: userEmp, position: this.userData.position}))
      await this.axios.post(process.env.API + '/getReport', { source: source }).then(async (response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          await this.$refs.documentReport.setValue(result.source.sourceDocumentReport)
          await this.$refs.customerSaleReport.setValue(result.source.sourceCustomerSaleReport)
          await this.$refs.serviceList.setValue(result.source.sourceServiceList)
          await this.$refs.summaryReport.setValue(result.source.sourceSummaryReport)
          await this.$nextTick(() => {
            this.beforeEdit()
          })
        } else {
          this.$router.push('/sale/')
          this.$swal('กรุณาติดต่อผู้ดูแลระบบsale', '', 'error')
        }
      }, () => {
        this.$swal('กรุณาติดต่อผู้ดูแลระบบ2', '', 'error')
      })
    },
    forward () {
      if (this.state === 'request') {
        this.$router.push({ path: '/presale/request' })
      } else if (this.state === 'approve') {
        this.$router.push({ path: '/presale/approve' })
      } else {
        this.$router.push({ path: '/presale/request' })
      }
    },
    async rejectSaleforecastReport (id) {
      // console.log(22222222222222)
      this.title = 'Renewal Document'
      this.reportID = id
      var userEmp = this.userData.emp_no
      var source = Encode.encode(JSON.stringify({id: id, userEmp_no: userEmp}))
      await this.axios.post(process.env.API + '/getRejectReport', { source: source }).then(async (response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          // console.log(result)
          await this.$refs.remarkReject.setValue(result.source.rej_remark)
          await this.$refs.remarkRejectPresale.setValue(result.source.rej_presaleremark)
          await this.$refs.documentReport.setValue(result.source.sourceDocumentReport)
          await this.$refs.customerSaleReport.setValue(result.source.sourceCustomerSaleReport)
          await this.$refs.serviceList.setValue(result.source.sourceServiceList)
          await this.$refs.summaryReport.setValue(result.source.sourceSummaryReport)
          await this.$nextTick(() => {
            this.beforeEdit()
          })
        } else {
          this.$router.push('/sale/')
          this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
        }
      }, () => {
        this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
      })
    },
    setRevenueTotal (val) {
      this.$refs.summaryReport.setRevenue(val)
    },
    cancel () {
      this.$router.push('/sale/')
    }
  }
}
</script>

<style lang="css">
table {
  border-collapse: collapse;
}

table, td, th {
  /* border: 1px solid black; */
}

th1 {
  background-color: #2586c4;
  color: white;
}

.bd-darkCyan {
  border: 1px solid #009688;
}
.bd-bbb {
  border: 1px solid #bbb;
}
.subheader{
  align-items: flex-end !important;
  padding: 0 0px 0 0px !important;
}

.br {
  border-bottom-right-radius: 8px !important;
  border-top-right-radius: 8px !important;
}

.bl {
  border-bottom-left-radius: 8px !important;
  border-top-left-radius: 8px !important;
}

.spacing{
  margin-top: -25px;
}

.mt-15{
  margin-top: -15px;
}

.titleHeight {
  height: 75px;
}

.tar {
  text-align: right;
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

.input-group__input {
  padding-left: 0.5em;
  font-size: 10px !important;
}

.input-group label {
  font-size: 15px !important;
}

.input-group--text-field input {
  font-size: 15px;
}

.twoline label {
  overflow: unset !important;
  line-height: 20px !important;
  white-space: unset !important;
}

.toolbar__title {
  white-space: unset;
  text-overflow: unset;
}
.primary{
  background-color: #5ebb2b !important;
}

a{
  text-decoration: none !important;
}

.input-group__input .input-group--text-field input.link{
  cursor: pointer;
}
.loading{
  height: 250px;
  justify-content: center;
  align-items: center;
  display: flex;
}
.cursor-pointer {
  cursor: pointer !important;
}
.border-bottom-head {
  /* border-bottom: 0.1em solid #202C39; */
}
.font-head {
  font-weight: 600;
  font-size:1.5em;
}
.nameService {
  background-color: #f2f2f2;
  padding: 0.8em;
  border-radius: 0.5em;
}
.noData {
  background: transparent;
  color: #aaa;
  font-weight: normal;
  text-align: center;
}

.headitem {
  background-color: #f2f2f2;
  color: black;
  font-weight: 600;
}

.headitemselect {
  background-color: #f2f2f2;
  color: black;
  font-weight: 600;
}
</style>
