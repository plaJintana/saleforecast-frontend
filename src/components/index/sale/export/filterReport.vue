<template lang="html">
  <div class="">
    <v-card style="box-shadow: none;">
      <v-card-text>
        <div>
          <v-flex xs12 sm12 md12 lg12>
            <div v-if="this.userData.position === 'HEAD OF SALES'  ">


              <v-layout row wrap spacing >
                <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Type report : </v-subheader></v-flex>
                <v-flex xs6 sm6 md3 lg3><v-select :items="typeReport" v-model="valueType" item-text="text" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" required></v-select></v-flex>
              </v-layout>
            </div>
            <div v-if="this.userData.position === 'SALES'  ||  this.userData.position === 'TEAMLEAD'  ">


              <v-layout row wrap spacing >
                <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Type report : </v-subheader></v-flex>
                <v-flex xs6 sm56 md3 lg3><v-select :items="typeReportSALES" v-model="valueType" item-text="text" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select></v-flex>
              </v-layout>
            </div>
            <div v-if="this.userData.position === 'GROUPLEAD'    ">


              <v-layout row wrap spacing >
                <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Type report : </v-subheader></v-flex>
                <v-flex xs6 sm6 md3 lg3><v-select :items="typeReportGROUPL" v-model="valueType" item-text="text" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select></v-flex>
              </v-layout>
            </div>

          </v-flex>
          <div v-if="valueType !== null ">
            <div v-if=" valueType.type === 'Week report'">
              <v-flex xs12 sm12 md12 lg12>
                <v-layout row wrap spacing>
                  <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Week No. : </v-subheader></v-flex>
                  <v-flex xs6 sm6 md3 lg2><v-select :items="weekYear" v-model="valueWeek" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select></v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm12 md12 lg12>
                <v-layout row wrap spacing>
                  <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Year no. : </v-subheader></v-flex>
                  <v-flex xs6 sm6 md3 lg2><v-select :items="yearAll" v-model="valueYear" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select></v-flex>
                </v-layout>
                <!-- <v-layout row wrap spacing>
                  <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Year To. : </v-subheader></v-flex>
                  <v-flex xs6 sm6 md3 lg2><v-select :items="yearAllTo" v-model="valueYearTo" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select></v-flex>
                </v-layout> -->
              </v-flex>
            </div>
            <!-- <div v-if=" valueType === 'Week report'">
            <v-flex xs12 sm12 md12 lg12>
            <v-layout row wrap spacing>
            <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Date From : </v-subheader></v-flex>
            <v-flex xs6 sm6 md3 lg2><v-select :items="month" v-model="valueMonth" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" required></v-select></v-flex>
          </v-layout>
        </v-flex>
      </div> -->




      <div v-if=" valueType.text === 'Summary Growth' && this.userData.position !== 'HEAD OF SALES'">
        <v-flex xs12 sm12 md12 lg12>
          <v-layout row wrap spacing>
            <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Month From : </v-subheader></v-flex>
            <v-flex xs6 sm6 md3 lg2><v-select :items="month" v-model="valueMonth" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select></v-flex>
          </v-layout>
        </v-flex>
      </div>

      <div v-if=" valueType.type === 'Week'">
        <v-flex xs12 sm12 md12 lg12>
          <v-layout row wrap spacing>
            <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Month From : </v-subheader></v-flex>
            <v-flex xs6 sm6 md3 lg2><v-select :items="month" v-model="valueMonth" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select></v-flex>
            <v-flex xs5 sm5 md2 lg2 pl-5><v-subheader class="fontSize">Year no. : </v-subheader></v-flex>
            <v-flex xs6 sm6 md3 lg2><v-select :items="yearAll" v-model="valueYear" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select></v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12>
          <v-layout row wrap spacing>
            <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Month To : </v-subheader></v-flex>
            <v-flex xs6 sm6 md3 lg2><v-select :items="month1" v-model="valueMonth1" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select></v-flex>
            <v-flex xs5 sm5 md2 lg2 pl-5><v-subheader class="fontSize">Year To. : </v-subheader></v-flex>
            <v-flex xs6 sm6 md3 lg2><v-select :items="yearAllTo" v-model="valueYearTo" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select></v-flex>
          </v-layout>
        </v-flex>
        <!-- <v-flex xs12 sm12 md12 lg12>
        <v-layout row wrap spacing>
        <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Year no. : </v-subheader></v-flex>
        <v-flex xs6 sm6 md3 lg2><v-select :items="yearAll" v-model="valueYear" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select></v-flex>
      </v-layout>
      <v-layout row wrap spacing>
      <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Year To. : </v-subheader></v-flex>
      <v-flex xs6 sm6 md3 lg2><v-select :items="yearAllTo" v-model="valueYearTo" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" autocomplete required></v-select></v-flex>
    </v-layout>
  </v-flex> -->
  </div>





  <div v-if=" valueType.text === 'Summary Growth' && this.userData.position !== 'HEAD OF SALES'">
    <v-flex xs12 sm12 md12 lg12>
      <v-layout row wrap spacing>
        <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Month To : </v-subheader></v-flex>
        <v-flex xs6 sm6 md3 lg2><v-select :items="month1" v-model="valueMonth1" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" allow-overflow="true" required></v-select></v-flex>
      </v-layout>
    </v-flex>
  </div>
  <div v-if=" valueType.text === 'Summary Growth' && this.userData.position !== 'HEAD OF SALES'">
    <v-flex xs12 sm12 md12 lg12>
      <v-layout row wrap spacing>
        <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Week No. : </v-subheader></v-flex>
        <v-flex xs6 sm6 md3 lg2><v-select :items="weekYear" v-model="valueWeek" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" allow-overflow="true" required></v-select></v-flex>
      </v-layout>
    </v-flex>
  </div>
  <!-- <div v-if="valueType.type === 'Weekow'">
  <v-flex xs12 sm12 md12 lg12>
  <v-layout row wrap spacing>
  <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Quarter No. : </v-subheader></v-flex>
  <v-flex xs6 sm6 md3 lg2><v-select :items="Quarter" v-model="valueQuarter" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" required></v-select></v-flex>
</v-layout>
</v-flex>
</div> -->
<div v-if="valueType.type === 'Quarter' ">

</div>
<div v-if=" valueType.text === 'Summary Growth' || valueType.type === 'Quarter'">
  <v-flex xs12 sm12 md12 lg12>
    <v-layout row wrap spacing>
      <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Year no. : </v-subheader></v-flex>
      <v-flex xs6 sm6 md3 lg2><v-select :items="yearAll" v-model="valueYear" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" required></v-select></v-flex>
    </v-layout>
  </v-flex>
</div>

</div>
<div v-else-if="valueType === null">
  <!-- <v-flex xs12 sm12 md12 lg12>
  <v-layout row wrap spacing>
  <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">โปรดเลือก : </v-subheader></v-flex>
  <v-flex xs6 sm6 md3 lg2><v-select :items="weekYear" v-model="valueWeek" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" required></v-select></v-flex>
</v-layout>
</v-flex> -->
</div>
<!-- <div v-else>
<v-flex xs12 sm12 md12 lg12>
<v-layout row wrap spacing>
<v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">{{valueType.type}} : </v-subheader></v-flex>
<v-flex xs6 sm6 md3 lg2><v-select :items="weekYear" v-model="valueWeek" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" required></v-select></v-flex>
</v-layout>
</v-flex>
</div> -->

<v-flex xs12 sm12 md12 lg12 class="m-t-1-5">
  <v-layout row wrap spacing>
    <v-flex xs5 sm5 md1 lg2 >
      <v-btn color="blue-grey" class="white--text paddingButtom" @click = "downloadReport()" >
        <v-icon left dark>get_app</v-icon>
        Download
        <!-- <v-icon right dark>get_app</v-icon> -->


      </v-btn>
      <iframe ref="iframDownload" style="display:none;"></iframe>
    </v-flex>
  </v-layout>
</v-flex>
</div>
</v-card-text>
</v-card>
</div>
</template>

<script>
import { Encode, Decode } from '@/services'
import moment from 'moment'
export default {
  data () {
    return {
      typeReport: [
        // { type: 'Quarter', text: 'Quarter' },
        { type: 'Week', text: 'Week' },
        // { type: 'Weekow', text: 'Summary Growth' },
        { type: 'Week report', text: 'Based Sales Report' }
      ],
      typeReportSALES: [
        { type: 'Week', text: 'Week' }
        // ,{ type: 'Week report', text: 'Week report' }
      ],
      typeReportGROUPL: [
        { type: 'Week', text: 'Week' }
      ],
      valueQuarter: null,
      Quarter: null,
      valueType: null,
      month: [
        {text: 'January', value: 1, type: 'January'},
        {text: 'Febuary', value: 2, type: 'January'},
        {text: 'March', value: 3, type: 'January'},
        {text: 'April', value: 4, type: 'January'},
        {text: 'May', value: 5, type: 'January'},
        {text: 'June', value: 6, type: 'January'},
        {text: 'July', value: 7, type: 'January'},
        {text: 'August', value: 8, type: 'January'},
        {text: 'September', value: 9, type: 'January'},
        {text: 'October', value: 10, type: 'January'},
        {text: 'November', value: 11, type: 'January'},
        {text: 'December', value: 12, type: 'January'}
      ],
      month1: [
        {text: 'January', value: 1},
        {text: 'Febuary', value: 2},
        {text: 'March', value: 3},
        {text: 'April', value: 4},
        {text: 'May', value: 5},
        {text: 'June', value: 6},
        {text: 'July', value: 7},
        {text: 'August', value: 8},
        {text: 'September', value: 9},
        {text: 'October', value: 10},
        {text: 'November', value: 11},
        {text: 'December', value: 12}
      ],
      valueYear: null,
      weekYear: null,
      yearAll: null,
      valueYearTo: null,
      yearAllTo: null,
      QWtype: null,
      link: null,
      filename: null,
      valueMonth: null,
      valueMonth1: null,
      date: null,
      date2: null,
      menu2: false,
      menu: false

    }
  },
  created () {
    this.getYear()
    this.getWeek()
    this.getQuarter()
  },
  computed: {
    userData () {
      if (this.$cookies.isKey('information')) {
        return JSON.parse(Decode.decode(this.$cookies.get('information')))
      } else {
        return ''
      }
    },
    userType () {
      if (this.$cookies.isKey('usertype')) {
        return Decode.decode(this.$cookies.get('usertype')).replace(/"/g, '')
      } else {
        return ''
      }
    }
  },
  methods: {
    downloadReport () {


      // this.week1 = moment().format('W')

      this.userData.type_user = 'SALE'
      if (this.valueType.type === 'Week' ) {
        console.log(this.userData)
        if (this.valueMonth === null || this.valueMonth1 === null) {
          this.$swal('กรุณาเลือกเดือน', '', 'error')
        } else if (this.valueYear === null || this.valueYearTo === null) {
          this.$swal('กรุณาเลือกปี', '', 'error')
        } else {

          // kk
          // console.log(this.week1)
          //
          // console.log(this.valueMonth.type)
          //
          // console.log(this.weekdate)
          this.dateFrom = moment().set('year', this.valueYear).set( 'month', this.valueMonth-1).startOf('month').format('YYYY-MM-DD HH:mm:ss')
          this.dateTo = moment().set('year', this.valueYearTo).set( 'month', this.valueMonth1-1).endOf('month').format('YYYY-MM-DD HH:mm:ss')
          console.log('************')
          console.log(this.dateFrom)
          console.log(this.dateTo)
          console.log('************')
          if (this.valueMonth > this.valueMonth1 && this.valueYear >= this.valueYearTo) {
            this.$swal('กรุณาเลือกเดือนใหม่อีกครั้ง', '', 'error')
          } else {
            // console.log(this.datefrom)
            // console.log(this.dateto)
            // console.log(this.dateto)
            // console.log(this.datefrom)'week': this.valueWeek,
            var source = Encode.encode(JSON.stringify({dateFrom: this.dateFrom, dateTo: this.dateTo, 'userData': this.userData, 'valueYear': this.valueYear, 'valueType': this.valueType.type, 'valueMonth': this.valueMonth, 'valueMonth1':this.valueMonth1}))
            this.axios.post(process.env.API + '/generateExcelWeekBusiness', {source: source}).then((response) => {
              var result = JSON.parse(Decode.decode(response.data))
              console.log(result.status)
              if (result.status === 'success') {
                // console.log('2222222')
                this.listReport = result
                this.fileName = result.fileName
                this.link = process.env.API + '/downloadBDexcel/' + this.fileName
                this.$refs.iframDownload.src = this.link
                // console.log(this.listReport)
                // this.$swal('เพิ่ม file สำเร็จ', '', 'success')
              } else if (result.status === 'fail') {
                this.$swal('ไม่มีข้อมูล', '', 'error')
              }
            })
          }
        }
      } else if(this.valueType.type === 'Quarter') {

        if (this.yearAll === null) {
          this.$swal('โปรดกรอกข้อมูลให้ครบ', '', 'error')
        }
        // console.log(this.valueType.type)
        // console.log(this.valueYear)
        // this.datefrom = "null"
        // this.dateto = "null"
        // this.valueWeek = this.valueQuarter
        // this.datefrom = moment().week(this.valueWeek).weekday(1).set('year', this.valueYear).format('YYYY-MM-DD')
        // this.dateto = moment().week(this.valueWeek).weekday(7).set('year', this.valueYear).format('YYYY-MM-DD')

        var source = Encode.encode(JSON.stringify({'userData': this.userData, emp_no: this.userData.emp_no,'valueYear': this.valueYear, 'valueType': this.valueType.type}))
        this.axios.post(process.env.API + '/generateExcelWeekBusiness', {source: source}).then((response) => {
          var result = JSON.parse(Decode.decode(response.data))
          console.log(result)
          if (result.status === 'success') {
            console.log(result.status)
            // result.status = 'querySelector(wertyuiop)'
            this.listReport = result
            this.fileName = result.fileName
            this.link = process.env.API + '/downloadBDexcel/' + this.fileName
            this.$refs.iframDownload.src = this.link
            // window.location.reload()
          } else if (result.status === 'fail') {
            this.$swal('ไม่มีข้อมูล', '', 'error')
          }
        })
      }else if(this.valueType.type === 'Weekow') {
        console.log(this.valueType.type)
        // if (this.valueWeek === null || this.valueYear === null || this.valueMonth === null || this.valueMonth1 === null){
        if ( this.valueYear === null) {
          // console.log(this.valueQuarter)
          this.$swal('โปรดกรอกข้อมูลให้ครบ', '', 'error')
        } else {
          if (this.userData.position == 'HEAD OF SALES') {
            var deltaMonth = this.valueMonth1 - this.valueMonth
            // console.log(deltaMonth)
            // console.log(this.valueWeek)
            if (this.userData.position == 'HEAD OF SALES') {
              var source = Encode.encode(JSON.stringify({year: this.valueYear.toString(), position: this.userData.position, emp_no: this.userData.emp_no, groupline: this.userData.groupline_id, group_id: this.userData.group_id}))
              // console.log(111111555)
              // console.log('testttt')
              this.axios.post(process.env.API + '/exportReport', {source: source}).then((response) => {
                // console.log(response.data)
                this.fileName = response.data.fileName
                // console.log(this.fileName[1])
                this.link = process.env.API + '/downloadReport/' + this.fileName[1]
                this.$refs.iframDownload.src = this.link
              })
            }

          } else {
            var valueWeek2 = this.valueWeek - 1
            var valueWeek3 = this.valueWeek - 2
            var valueWeek4 = this.valueWeek - 3
            var typeWeek = 0
            var year = this.valueYear
            this.datefrom = moment().week(this.valueWeek).weekday(1).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 1).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
            this.dateto = moment().week(this.valueWeek).weekday(7).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 0).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
            if (valueWeek4 === -2){
              typeWeek = 1
              year = this.valueYear-1
              this.datefrom2 = moment().week(52).weekday(1).set('year', year).set( 'hour', 11).set( 'minutes', 1).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.dateto2 = moment().week(52).weekday(7).set('year', year).set( 'hour', 11).set('date', 31).set( 'minutes', 0).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.datefrom3 = moment().week(51).weekday(1).set('year', year).set( 'hour', 11).set( 'minutes', 1).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.dateto3 = moment().week(51).weekday(7).set('year', year).set( 'hour', 11).set( 'minutes', 0).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.datefrom4 = moment().week(50).weekday(1).set('year', year).set( 'hour', 11).set( 'minutes', 1).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.dateto4 = moment().week(50).weekday(7).set('year', year).set( 'hour', 11).set( 'minutes', 0).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              // console.log(dateto4)
            } else if (valueWeek4 === -1) {
              typeWeek = 2
              year = this.valueYear-1
              this.datefrom2 = moment().week(valueWeek2).weekday(1).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 1).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.dateto2 = moment().week(valueWeek2).weekday(7).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 0).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.datefrom3 = moment().week(52).weekday(1).set('year', year).set( 'hour', 11).set( 'minutes', 1).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.dateto3 = moment().week(52).weekday(7).set('year', year).set( 'hour', 11).set( 'minutes', 0).set('date', 31).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.datefrom4 = moment().week(51).weekday(1).set('year', year).set( 'hour', 11).set( 'minutes', 1).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.dateto4 = moment().week(51).weekday(7).set('year', year).set( 'hour', 11).set( 'minutes', 0).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')

              // console.log(222)
            } else if (valueWeek4 === 0) {
              typeWeek = 3
              year = this.valueYear-1
              this.datefrom2 = moment().week(valueWeek2).weekday(1).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 1).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.dateto2 = moment().week(valueWeek2).weekday(7).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 0).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.datefrom3 = moment().week(valueWeek3).weekday(1).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 1).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.dateto3 = moment().week(valueWeek3).weekday(7).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 0).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.datefrom4 = moment().week(52).weekday(1).set('year', year).set( 'hour', 11).set( 'minutes', 1).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')
              this.dateto4 = moment().week(52).weekday(7).set('year', year).set( 'hour', 11).set( 'minutes', 0).set('date', 31).set( 'seconds', 0).format('YYYY-MM-DD HH:mm:ss')

            } else {
              this.datefrom2 = moment().week(valueWeek2).weekday(1).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 1).format('YYYY-MM-DD HH:mm:ss')
              this.dateto2 = moment().week(valueWeek2).weekday(7).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 0).format('YYYY-MM-DD HH:mm:ss')
              this.datefrom3 = moment().week(valueWeek3).weekday(1).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 1).format('YYYY-MM-DD HH:mm:ss')
              this.dateto3 = moment().week(valueWeek3).weekday(7).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 0).format('YYYY-MM-DD HH:mm:ss')
              this.datefrom4 = moment().week(valueWeek4).weekday(1).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 1).format('YYYY-MM-DD HH:mm:ss')
              this.dateto4 = moment().week(valueWeek4).weekday(7).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 0).format('YYYY-MM-DD HH:mm:ss')
            }
            if (this.valueMonth > this.valueMonth1) {
              this.$swal('กรุณาเลือกเดือนใหม่อีกครั้ง', '', 'error')
            } else {
              var source = Encode.encode(JSON.stringify({userData: this.userData, datefrom:this.datefrom,dateto:this.dateto,datefrom2:this.datefrom2,dateto2:this.dateto2,datefrom3:this.datefrom3,dateto3:this.dateto3,datefrom4:this.datefrom4,dateto4:this.dateto4,valueMonth: this.valueMonth,valueMonth1: this.valueMonth1,'week': this.valueWeek, 'valueYear': this.valueYear, 'valueType': this.valueType.type}))

              this.axios.post(process.env.API + '/generateExcelWeekOW', {source: source}).then((response) => {
                var result = JSON.parse(Decode.decode(response.data))
                console.log(result.status)
                if (result.status === 'success') {
                  // console.log('2222222')
                  this.listReport = result
                  this.fileName = result.fileName
                  this.link = process.env.API + '/downloadBDexcel/' + this.fileName
                  this.$refs.iframDownload.src = this.link
                  // console.log(this.listReport)
                  // this.$swal('เพิ่ม file สำเร็จ', '', 'success')
                } else if (result.status === 'fail'){
                  this.$swal('ไม่มีข้อมูล', '', 'error')
                }
              })
            }
          }
          // console.log(this.valueQuarter)

        }
      } else if (this.valueType.type === 'Week report') {
        this.datefrom = moment().week(this.valueWeek).weekday(1).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 1).format('YYYY-MM-DD')
        this.dateto = moment().week(this.valueWeek).weekday(7).set('year', this.valueYear).set( 'hour', 11).set( 'minutes', 0).format('YYYY-MM-DD')
        var source = Encode.encode(JSON.stringify({weekValue: this.valueWeek,year: this.valueYear.toString(), position: this.userData.position, emp_no: this.userData.emp_no, groupline: this.userData.groupline_id, group_id: this.userData.group_id, date_from: this.datefrom, date_to: this.dateto}))
        this.axios.post(process.env.API + '/exportReport', {source: source}).then((response) => {
          // console.log(response.data)
          this.fileName = response.data.fileName
          // console.log(this.fileName[1])
          this.link = process.env.API + '/downloadReport/' + this.fileName[1]
          this.$refs.iframDownload.src = this.link
        })
      }
    },
    getQuarter () {
      this.Quarter = []
      for (var i = 1; i <= 4; i++) {
        this.Quarter.push(i)
      }
    },
    getWeek () {
      // if (this.valueType.type == "Week"){
      this.weekYear = []
      for (var i = 1; i <= moment().weeksInYear(); i++) {
        this.weekYear.push(i)
      }
      // }else{
      //
      // }
    },
    getYear () {
      this.yearAll = []
      this.yearAllTo = []
      for (var i = moment().get('year') - 10; i <= moment().get('year'); i++) {
        this.yearAll.push(i + 2)
        this.yearAllTo.push(i + 2)
      }
      this.valueYear = moment().get('year')
      this.valueYearTo = moment().get('year')
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
.paddingButtom {
  margin: 0 0px 0 0px !important;
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
