<template lang="html">
  <div>
    <v-card style="box-shadow: none;">
      <v-card-title class="border-bottom-head mr-3 ml-3" height="50px" >
        <h2 class="font-head pl-20 pt-3">Summary</h2>
      </v-card-title>
      <v-card-text class="mt-2">
        <v-flex xs12 sm12 md12 lg12 class="pb-0 mb-0">
          <v-layout row wrap spacing>
            <v-flex md1 lg1><v-subheader class="fontSize">Revunue</v-subheader></v-flex>
            <v-flex md2 lg2 class="text-lg-center">
              <v-text-field class="inputTextCenter" v-model="revenueShow" readonly :disabled="(userInfo.type_user === 'PRESALE')"></v-text-field>
            </v-flex>
            <v-flex md1 lg1 class="pl-3"><v-subheader class="fontSize">Baht./Month</v-subheader></v-flex>
          </v-layout>
          <v-layout row wrap spacing>
            <v-flex md2 lg2><v-subheader class="fontSize">Remark :</v-subheader></v-flex>
            <v-flex md12 lg12><v-text-field v-model="remark" class="paddingTextArea" textarea :disabled="(userInfo.type_user === 'PRESALE')"></v-text-field></v-flex>
          </v-layout>
        </v-flex>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { Encode, Decode } from '@/services'
export default {
  data () {
    return {
      revenue: '',
      remark: '',
      revenueShow: '',
      userInfo: {},
      check: ''
    }
  },
  methods: {
    clear () {
      this.revenue = ''
      this.revenueShow = ''
      this.remark = ''
    },
    setRevenue (val) {
      val = val.toString().replace(/,/g, '')
      var parts = val.toString().split('.')
      parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      if (this.userInfo.type_user === 'PRESALE') {
        this.revenue = parts.join('.')
      } else {
        this.revenueShow = parts.join('.')
        this.revenue = parts.join('.')
      }
    },
    getValue () {
      return {revenue: this.revenue, remark: this.remark, revenueShow: this.revenueShow}
    },
    setValue (source) {
      // console.log(1111111111111111111111155555555555555)
      // console.log(source)
      source.revenue = source.revenue.toString().replace(/,/g, '')
      var partsRevenue = source.revenue.toString().split('.')
      partsRevenue[0] = partsRevenue[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.remark = source.remark
      this.userInfo = this.userData()
      if (this.userInfo.type_user === 'PRESALE') {
        this.revenueShow = partsRevenue.join('.')
      }
    },
    userData () {
      if (this.$cookies.isKey('information')) {
        return JSON.parse(Decode.decode(this.$cookies.get('information')))
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="css">
.inputTextCenter input {
  text-align: center !important;
  padding-right: 12px;
}
.paddingTextArea div {
  padding-top: 0.5em !important;
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
