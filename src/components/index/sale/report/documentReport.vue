<template lang="html">
  <div>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-card style="box-shadow: none;">
        <v-card-title class="border-bottom-head mr-3 ml-3" height="50px" >
          <h2 class="pl-20 font-head" >Forecast Information</h2>
        </v-card-title>
        <v-card-text class="">
          <v-flex xs12 sm12 md12 lg12>
            <v-layout row wrap spacing>
              <v-flex xs12 sm6 md2 lg2><v-subheader class="fontSize">วันเริ่มสัญญา<span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
              <v-flex xs12 sm6 md3 lg2>
                <v-menu ref="menuStart" lazy :close-on-content-click="false" v-model="menuStart" transition="scale-transition" offset-y full-width :nudge-right="40" min-width="290px" :disabled="(userInfo.type_user === 'PRESALE')">
                  <v-text-field slot="activator" label="" v-model="dateShow"prepend-icon="event" :rules="[v => !!v || 'กรุณาเลือกวัน']" required readonly :disabled="(userInfo.type_user === 'PRESALE')"></v-text-field>
                  <v-date-picker ref="picker" v-model="dateStart" @change="save" locale="en-EN"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6 md3 lg3 ><v-subheader class="infoDiv">SO type <span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
              <v-flex xs12 sm6 md3 lg3 ><v-select :items="listSOtype" v-model="SOtype" item-text="name" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" required :disabled="(userInfo.type_user === 'PRESALE')"></v-select></v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12>
            <v-layout row wrap spacing>
              <v-flex xs12 sm6 md2 lg2><v-subheader class="fontSize">Sales Order Status <span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
              <v-flex xs12 sm6 md3 lg2><v-select :items="listOrderStatus" :filter="customFilter" v-model="orderStatus" item-text="name" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" required :disabled="(userInfo.type_user === 'PRESALE')"></v-select></v-flex>
              <v-flex xs12 sm6 md3 lg3><v-subheader class="infoDiv">Forecast grade <span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
              <v-flex xs12 sm6 md3 lg3><v-select :items="listGrade" v-model="grade" item-text="name" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" required :disabled="(userInfo.type_user === 'PRESALE')"></v-select></v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12>
            <v-layout row wrap spacing>
              <v-flex xs12 sm6 md2 lg2><v-subheader class="fontSize">Result</v-subheader></v-flex>
              <v-flex xs12 sm6 md3 lg2><v-select :items="listResult" v-model="itemResult" item-text="name" :disabled="(userInfo.type_user === 'PRESALE')"></v-select></v-flex>
            </v-layout>
          </v-flex>
          <v-layout row wrap spacing>
            <v-flex xs12 md2 lg2><v-subheader class="fontSize">Result remark</v-subheader></v-flex>
            <v-flex xs12 md4 lg5><v-select v-model="resultRemark" :items="listResultRemark" item-text="name" multiple :disabled="(userInfo.type_user === 'PRESALE')"></v-select></v-flex>
          </v-layout>
          <v-layout row wrap spacing>
            <v-flex md2 lg2 v-if="chkOther"><v-subheader class="fontSize">Other</v-subheader></v-flex>
            <v-flex md3 lg2 v-if="chkOther"><v-text-field v-model="resultRemarkOther" :disabled="(userInfo.type_user === 'PRESALE')"></v-text-field></v-flex>
          </v-layout>
          <v-flex xs12 sm12 md12 lg12>
            <v-layout row wrap spacing-info>
              <v-flex xs12 sm6 md2 lg2><v-subheader class="fontSize">รหัส Presales <span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
              <v-flex xs12 sm6 md2 lg2><v-select :rules="requiredRules" :items="listPresale" :filter="customPresaleFilter" v-model="presale" item-text="emp_no" required xautocomplete dense :disabled="(userInfo.type_user === 'PRESALE')"></v-select></v-flex>
              <v-flex xs12 sm6 md4 lg3><v-subheader class="infoDiv">ชื่อ-นามสกุล Presales</v-subheader></v-flex>
              <v-flex xs12 sm6 md2 lg2><v-select :rules="requiredRules" :items="listPresale" :filter="customPresaleFilter2" v-model="presale" item-text="fname" required autocomplete dense :disabled="(userInfo.type_user === 'PRESALE')"></v-select></v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12>
            <v-layout row wrap spacing>
              <v-flex xs12 sm6 md2 lg2><v-subheader class="fontSize">ชื่อเล่น Presales</v-subheader></v-flex>
              <v-flex xs12 sm6 md2 lg2><v-select :rules="requiredRules" :items="listPresale" :filter="customPresaleFilter3" v-model="presale" item-text="nname" required autocomplete dense :disabled="(userInfo.type_user === 'PRESALE')"></v-select></v-flex>
              <v-flex xs12 sm6 md4 lg3><v-subheader class="infoDiv">เบอร์ติดต่อ Presales</v-subheader></v-flex>
              <v-flex xs12 sm6 md2 lg2><v-text-field class="fontSize" v-model="presale_phone" readonly :disabled="(userInfo.type_user === 'PRESALE')"></v-text-field></v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-card-text>
  </v-card>
</v-form>
</div>
</template>

<script>
// import _ from 'lodash'
import moment from 'moment'
import { Encode, Decode } from '@/services'
export default {
  data () {
    return {
      chkOther: false,
      checkbox: false,
      menuStart: false,
      dateShow: null,
      listSOtype: [],
      SOtype: null,
      listOrderStatus: [],
      orderStatus: null,
      listResult: [],
      itemResult: null,
      listGrade: [],
      grade: null,
      listResultRemark: [],
      resultRemark: [],
      itemResultRemark: [],
      resultRemarkList: [],
      listPresale: [],
      presale: null,
      presale_emp: '',
      presale_name: '',
      presale_phone: '',
      valid: false,
      resultRemarkOther: null,
      dateStart: null,
      userInfo: {},
      customFilter (item, queryText, itemText) {
        const hasValue = val => val != null ? val : ''
        const text = hasValue(item.Cust_ID)
        const query = hasValue(queryText)
        return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      },
      customPresaleFilter (item, queryText, itemText) {
        const hasValue = val => val != null ? val : ''
        const text = hasValue(item.emp_no)
        const query = hasValue(queryText)
        return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      },
      customPresaleFilter2 (item, queryText, itemText) {
        const hasValue = val => val != null ? val : ''
        const text = hasValue(item.fname)
        const query = hasValue(queryText)
        return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      },
      customPresaleFilter3 (item, queryText, itemText) {
        const hasValue = val => val != null ? val : ''
        const text = hasValue(item.nname)
        const query = hasValue(queryText)
        return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      },
      requiredRules: [
        v => !!v || 'กรุณาใส่ข้อมูล'
      ]
    }
  },
  created () {
    this.getSOType()
    this.getOrderStatus()
    this.getResult()
    this.getForecastGrade()
    this.getPresale()
  },
  watch: {
    resultRemarkOther (val) {
      for (var i = 0; i < this.resultRemark.length; i++) {
        if (this.resultRemark[i].name === 'Other') {
          // console.log(this.resultRemark[i].remark)
          this.resultRemark[i].remark = val
        }
      }
    },
    resultRemark () {
      this.chkOther = this.checkOther()
    },
    dateStart (val) {
      if (val !== null) {
        this.dateShow = this.formatDate(this.dateStart)
      }
    },
    menuStart (val) {
      if (val !== null) {
        val && this.$nextTick(() => (this.$refs.picker.activePicker = 'DAY'))
      }
    },
    itemResult (val) {
      if (val !== null) {
        this.getResultRemark(val.id)
      }
    },
    presale (val) {
      if (val !== null) {
        this.presale_emp = val.emp_no
        this.presale_name = val.fname + ' ' + val.lname
        this.presale_phone = val.phone
      }
    }
  },
  methods: {
    checkOther () {
      for (var i = 0; i < this.resultRemark.length; i++) {
        if (this.resultRemark[i].name === 'Other') {
          return true
        }
      }
      return false
    },
    clear () {
      this.$refs.form.reset()
      this.menuStart = false
      this.dateShow = null
      this.SOtype = null
      this.listSOtype = []
      this.orderStatus = null
      this.itemResult = null
      this.grade = null
      this.listResultRemark = []
      this.listResult = []
      this.resultRemark = []
      this.presale = null
      this.presale_emp = ''
      this.presale_name = ''
      this.presale_phone = ''
      this.valid = false
      this.dateStart = null
      this.valid = false
      this.getSOType()
      this.getOrderStatus()
      this.getResult()
      this.getPresale()
      this.getForecastGrade()
    },
    async setValue (source) {
      this.dateStart = source.date_proceed
      this.SOtype = this.searchSOType(source.so_type)
      this.orderStatus = this.searchOrderStatus(source.order_status)
      this.grade = this.searchForecastGrade(source.forecast_grade)
      this.itemResult = await this.searchResult(source.result)
      this.presale = await this.searchPresale(source.presale_ID)
      this.userInfo = this.userData()
      // console.log(2222222222222)
      // this.presale_name = source['presale_name']
      // this.presale_phone = source['presale_phone']
      if (this.itemResult !== null) {
        await this.getResultRemark(this.itemResult.id)
        if (source.resultRemark !== null) {
          this.resultRemark = await this.searchResultRemark(source.resultRemark)
          if (this.resultRemark === 'Other') {
            this.resultRemarkOther = await this.searchResultRemarkOther(source.result_remark_other)
          } else {
            this.resultRemarkOther = '-'
          }
        } else {
          this.resultRemark = '-'
        }
      }
    },
    userData () {
      if (this.$cookies.isKey('information')) {
        return JSON.parse(Decode.decode(this.$cookies.get('information')))
      } else {
        return ''
      }
    },
    searchResultRemarkOther (val) {
      var remarkOther = val.split(',')
      for (var i = 0; i < remarkOther.length; i++) {
        if (remarkOther[i]) {
          return remarkOther[i]
        }
      }
    },
    getSOType () {
      this.axios.post(process.env.API + '/getSOType').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listSOtype = result.SOType
        } else {
          this.listSOtype = []
        }
      }, () => {
        this.listSOtype = []
      })
    },
    searchSOType (val) {
      for (var i in this.listSOtype) {
        if (this.listSOtype[i]['id'] === parseInt(val)) {
          return this.listSOtype[i]
        }
      }
      return []
    },
    async getPresale () {
      await this.axios.post(process.env.API + '/listPresale').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listPresale = result.data
          return result.data
        } else {
          this.listPresale = []
          return []
        }
      })
    },
    async searchResultRemark (val) {
      // console.log(val)
      var remark = val.split(',')
      var result = []
      for (var j = 0; j < remark.length; j++) {
        for (var i in this.listResultRemark) {
          if (this.listResultRemark[i]['id'] === parseInt(remark[j])) {
            await result.push(this.listResultRemark[i])
          }
        }
      }
      return result
    },
    searchOrderStatus (val) {
      for (var i in this.listOrderStatus) {
        if (this.listOrderStatus[i]['id'] === parseInt(val)) {
          return this.listOrderStatus[i]
        }
      }
      return []
    },
    searchForecastGrade (val) {
      for (var i in this.listGrade) {
        if (this.listGrade[i]['id'] === parseInt(val)) {
          return this.listGrade[i]
        }
      }
      return []
    },
    searchResult (val) {
      for (var i in this.listResult) {
        if (this.listResult[i]['id'] === parseInt(val)) {
          return this.listResult[i]
        }
      }
      return null
    },
    searchPresale (val) {
      for (var i in this.listPresale) {
        if (this.listPresale[i].emp_no === val) {
          return this.listPresale[i]
        }
      }
      return null
    },
    getValue () {
      if (this.$refs.form.validate()) {
        if (this.itemResult === null) {
          this.itemResult = {id: 0}
        }
        return {dateProceed: this.dateStart, SOtype: this.SOtype, orderStatus: this.orderStatus, grade: this.grade, itemResult: this.itemResult, resultRemark: this.resultRemark, presale_emp: this.presale_emp}
      } else {
        return false
      }
    },
    getOrderStatus () {
      this.axios.post(process.env.API + '/getOrderStatus').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listOrderStatus = result.orderStatus
        } else {
          this.listOrderStatus = []
        }
      }, () => {
        this.listOrderStatus = []
      })
    },
    async getResultRemark (val) {
      var source = Encode.encode(JSON.stringify({resultId: val}))
      await this.axios.post(process.env.API + '/getResultRemark', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listResultRemark = result.data
        } else {
          this.listResultRemark = []
        }
      }, () => {
        this.listResultRemark = []
      })
    },
    getResult () {
      this.axios.post(process.env.API + '/getResult').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listResult = result.result
        } else {
          this.listResult = []
        }
      }, () => {
        this.listResult = []
      })
    },
    getForecastGrade () {
      this.axios.post(process.env.API + '/getForecastGrade').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listGrade = result.grade
        } else {
          this.listGrade = []
        }
      }, () => {
        this.listGrade = []
      })
    },
    // formatDate (date) {
    //   if (!date) return null
    //   const [year, month, day] = date.split('-')
    //   return `${month}/${day}/${year}`
    // },
    formatDate (createAt) {
      if (!createAt) return null
      moment.locale('en')
      var someDate = new Date(createAt)
      return moment(someDate).format('LL')
    },
    save (date) {
      this.$refs.menuStart.save(date)
    }
  }
}
</script>

<style scoped="" lang="css">

.infoDiv {
  padding: 0 0 0 48px !important;
}
@media only screen and (max-width: 600px) {
  .infoDiv {
    padding: 0px !important;
  }
}
@media only screen and (max-width: 812px) {
  .infoDiv {
    padding: 0px !important;
  }
}
.width-list {
  min-width: 500px !important;
}
.padding-menu {
  margin-right: -10px !important;
}
/* .menu__content {
min-width: 500px !important;
} */
.list__tile__title {
  width: 48% !important;
}
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
  padding: 0;
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
.spacing-info{
  margin-top: 0px;
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
