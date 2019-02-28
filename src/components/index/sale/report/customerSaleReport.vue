<template lang="html">
  <div>
    <v-form v-model="valid" ref="form" lazy-validation v-if="this.userData.position === 'SALES'">
      <v-card style="box-shadow: none;">
        <v-card-title class="border-bottom-head ml-3" height="50px" >
          <h2 class="font-head pl-20 pt-3" >Customer Information</h2>
        </v-card-title>
        <v-card-text class="">
          <!-- <v-flex xs12 sm12 md12 lg12>
          <v-layout row wrap spacing>
          <v-flex xs6 sm6 md2 lg2 d-fle>
          <v-subheader>ประเภทลูกค้า<span style="color: red;">&nbsp;*</span></v-subheader>
        </v-flex>
        <v-flex xs6 sm6 md2 lg2>
        <v-select :items="typeCustomer" :rules="requiredRules" required autocomplete></v-select>
      </v-flex>
      <v-flex xs6 sm6 md2 lg2 pl-5>
      <v-subheader>ประเภทธุรกิจ<span style="color: red;">&nbsp;</span></v-subheader>
    </v-flex>
    <v-flex xs6 sm6 md6 lg6>
    <v-text-field  single-line ></v-text-field>
  </v-flex>
</v-layout>
</v-flex>  -->
<v-flex xs12 sm12 md12 lg12>
  <v-layout row wrap spacing>
    <v-flex xs12 sm6 md2 lg2><v-subheader class="fontSize">ชื่อโปรเจค <span style="color: red;"></span></v-subheader></v-flex>
    <v-flex xs12 sm6 md2 lg2>
      <v-text-field v-model="projectName":disabled="(userInfo.type_user === 'PRESALE')" ></v-text-field>
    </v-flex>
  </v-layout>
</v-flex>
<v-flex xs12 sm12 md12 lg12>
  <v-layout row wrap spacing>
    <!-- <pre>{{listStates}}</pre> -->
    <v-flex xs12 sm6 md2 lg2><v-subheader class="fontSize">รหัสลูกค้า <span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
    <v-flex xs12 sm6 md2 lg2>
      <v-select :items="listStates" :filter="customFilter" v-model="custid" item-text="Cust_ID" autocomplete :rules="requiredRules" required :disabled="(userInfo.type_user === 'PRESALE')"></v-select>
    </v-flex>
    <v-flex xs12 sm6 md2 lg2><v-subheader class="infoDiv">ชื่อบริษัท <span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
    <v-flex xs12 sm6 md6 lg6>
      <v-select :items="listStates" v-model="custname" item-text="Cust_Name" autocomplete :rules="requiredRules" required ></v-select>
    </v-flex>
  </v-layout>
</v-flex>
<v-flex xs12 sm12 md12 lg12>
  <v-layout row wrap spacing v-for="item,indexContact in listContact" :key="indexContact">
    <v-flex xs12 sm6 md2 lg2>
      <v-subheader class="fontSize">ผู้ติดต่อ
        <v-btn v-show="indexContact !== 0" outline fab color="pink" style="width:1.8em;height:1.8em;" @click="cutListContact(indexContact)">
          <v-icon>remove_circle</v-icon>
        </v-btn>
        <v-btn v-show="indexContact === (listContact.length - 1)" outline fab color="green" style="width:1.8em;height:1.8em;" @click="addListContact()">
          <v-icon>add_circle</v-icon>
        </v-btn>
      </v-subheader>
    </v-flex>
    <v-flex xs12 sm6 md2 lg2 v-if="indexContact === 0"><v-text-field  required v-model="item.name" :disabled="(userInfo.type_user === 'PRESALE')"></v-text-field></v-flex>
    <v-flex xs12 sm6 md2 lg2 v-else><v-text-field v-model="item.name" :disabled="(userInfo.type_user === 'PRESALE')"></v-text-field></v-flex>
    <v-flex xs12 sm6 md2 lg2 ><v-subheader class="infoDiv">ตำแหน่ง </v-subheader></v-flex>
    <v-flex xs12 sm6 md2 lg2 v-if="indexContact === 0"><v-text-field  v-model="item.position" :disabled="(userInfo.type_user === 'PRESALE')"></v-text-field></v-flex>
    <v-flex xs12 sm6 md2 lg2 v-else><v-text-field v-model="item.position" :disabled="(userInfo.type_user === 'PRESALE')"></v-text-field ></v-flex>
      <v-flex xs12 sm6 md2 lg2><v-subheader class="infoDiv">เบอร์โทร </v-subheader></v-flex>
      <v-flex xs12 sm6 md2 lg2 v-if="indexContact === 0"><v-text-field  v-model="item.telephone" :disabled="(userInfo.type_user === 'PRESALE')"></v-text-field></v-flex>
      <v-flex xs12 sm6 md2 lg2 v-else><v-text-field v-model="item.telephone" :disabled="(userInfo.type_user === 'PRESALE')"></v-text-field></v-flex>
    </v-layout>
  </v-flex>
</v-card-text>
</v-card>
<v-card style="box-shadow: none;">
  <v-card-title class="border-bottom-head mr-3 ml-3" height="50px">
    <h2 class="font-head pl-20 pt-3">Sale Information</h2>
    <!-- {{saleInfo}} -->
  </v-card-title>
  <v-card-text class="">
    <v-flex xs12 sm12 md12 lg12>
      <v-layout row wrap spacing>
        <v-flex xs12 sm6 md2 lg2><v-subheader class="fontSize">รหัสผู้ขาย<span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
        <v-flex xs12 sm6 md2 lg2><v-select :rules="requiredRules":items="listSale" :filter="customSaleFilter" v-model="saleInfo" item-text="emp_no" required autocomplete dense :disabled="userData.position === 'SALES'"></v-select></v-flex>
        <v-flex xs12 sm6 md2 lg2><v-subheader class="infoDiv">ชื่อ-นามสกุล Sales</v-subheader></v-flex>
        <v-flex xs12 sm6 md6 lg6><v-text-field v-model="fullname" readonly :disabled="userData.position === 'SALES'" :rules="requiredRules" required></v-text-field></v-flex>
        <v-flex xs12 sm6 md2 lg2><v-subheader class="fontSize">ชื่อเล่น Sales<span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
        <v-flex xs12 sm6 md2 lg2><v-select :rules="requiredRules" :items="listSale" :filter="customSaleFilter2" v-model="saleInfo" item-text="nname" required autocomplete dense :disabled="userData.position === 'SALES'"></v-select></v-flex>
      </v-layout>
    </v-flex>
  </v-card-text>
</v-card>
</v-form>



<v-form v-model="valid" ref="form" lazy-validation v-if="this.userData.position === 'GROUPLEAD' || this.userData.position === 'TEAMLEAD' || this.userData.position === 'PRESALES' ">
  <v-card style="box-shadow: none;">
    <v-card-title class="border-bottom-head mr-3 ml-3" height="50px" >
      <h2 class="font-head pl-20 pt-3" >Customer Information</h2>
    </v-card-title>
    <v-card-text class="">
      <!-- <v-flex xs12 sm12 md12 lg12>
      <v-layout row wrap spacing>
      <v-flex xs6 sm6 md2 lg2 d-fle>
      <v-subheader>ประเภทลูกค้า<span style="color: red;">&nbsp;*</span></v-subheader>
    </v-flex>
    <v-flex xs6 sm6 md2 lg2>
    <v-select :items="typeCustomer" :rules="requiredRules" required autocomplete></v-select>
  </v-flex>
  <v-flex xs6 sm6 md2 lg2 pl-5>
  <v-subheader>ประเภทธุรกิจ<span style="color: red;">&nbsp;</span></v-subheader>
</v-flex>
<v-flex xs6 sm6 md6 lg6>
<v-text-field  single-line ></v-text-field>
</v-flex>
</v-layout>
</v-flex>  -->
<v-flex xs12 sm12 md12 lg12>
  <v-layout row wrap spacing>
    <v-flex xs6 sm6 md2 lg2><v-subheader class="fontSize">ชื่อโปรเจค <span style="color: red;"></span></v-subheader></v-flex>
    <v-flex xs6 sm6 md2 lg2>
      <v-text-field v-model="projectName" required :disabled="(userData.type_user !== 'SALE')"></v-text-field>
    </v-flex>
  </v-layout>
</v-flex>
<v-flex xs12 sm12 md12 lg12>
  <v-layout row wrap spacing>
    <v-flex xs6 sm6 md2 lg2><v-subheader class="fontSize">รหัสลูกค้า <span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
    <v-flex xs6 sm6 md2 lg2>
      <v-select :items="listStates" :filter="customFilter" v-model="custid" item-text="Cust_ID" autocomplete :disabled="(userData.type_user !== 'SALE') "></v-select>
    </v-flex>
    <v-flex xs12 sm12 md2 lg2 pl-5><v-subheader class="fontSize">ชื่อบริษัท <span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
    <v-flex xs12 sm12 md6 lg6>
      <v-select :items="listStates" v-model="custname" item-text="Cust_Name" autocomplete :rules="requiredRules" required :disabled="(userData.type_user !== 'SALE')"></v-select>
      <!-- <v-text-field v-model="custname" :rules="requiredRules" required :disabled="(state !== 'add')"></v-text-field> -->
    </v-flex>
  </v-layout>
</v-flex>
<v-flex xs12 sm12 md12 lg12>
  <v-layout row wrap spacing v-for="item,indexContact in listContact" :key="indexContact">
    <v-flex xs6 sm6 md2 lg2>
      <v-subheader class="fontSize">ผู้ติดต่อ <span style="color: red;" v-if="indexContact === 0"></span>
        <v-btn v-show="indexContact !== 0" outline fab color="pink" style="width:1.8em;height:1.8em;" @click="cutListContact(indexContact)">
          <v-icon>remove_circle</v-icon>
        </v-btn>
        <v-btn v-show="indexContact === (listContact.length - 1)" outline fab color="green" style="width:1.8em;height:1.8em;" @click="addListContact()">
          <v-icon>add_circle</v-icon>
        </v-btn>
      </v-subheader>
    </v-flex>
    <v-flex xs6 sm6 md2 lg2 v-if="indexContact === 0"><v-text-field  v-model="item.name" required :disabled="(userData.type_user !== 'SALE')"></v-text-field></v-flex>
    <v-flex xs6 sm6 md2 lg2 v-else><v-text-field v-model="item.name"></v-text-field></v-flex>
    <v-flex xs6 sm6 md2 lg2 pl-5><v-subheader class="fontSize">ตำแหน่ง</v-subheader></v-flex>
    <v-flex xs6 sm6 md2 lg2 v-if="indexContact === 0"><v-text-field required :disabled="(userData.type_user !== 'SALE')" v-model="item.position"></v-text-field></v-flex>
    <v-flex xs6 sm6 md2 lg2 v-else><v-text-field v-model="item.position"></v-text-field></v-flex>
    <v-flex xs6 sm6 md2 lg2 pl-5><v-subheader class="fontSize">เบอร์โทร <span v-if="indexContact === 0" style="color: red;">&nbsp;*</span></v-subheader></v-flex>
    <v-flex xs6 sm6 md2 lg2 v-if="indexContact === 0"><v-text-field required :disabled="(userData.type_user !== 'SALE')" v-model="item.telephone"></v-text-field></v-flex>
    <v-flex xs6 sm6 md2 lg2 v-else><v-text-field v-model="item.telephone"></v-text-field></v-flex>
  </v-layout>
</v-flex>
</v-card-text>
</v-card>
<v-card style="box-shadow: none;">
  <v-card-title class="border-bottom-head mr-3 ml-3" height="50px">
    <h2 class="font-head pl-20 pt-3">Sale Information</h2>
  </v-card-title>
  <v-card-text class="">
    <v-flex xs12 sm12 md12 lg12>
      <v-layout row wrap spacing>
        <v-flex xs6 sm6 md2 lg2><v-subheader class="fontSize">รหัสผู้ขาย<span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
        <v-flex xs6 sm6 md2 lg2><v-select :rules="requiredRules" :items="listSale" :filter="customSaleFilter" v-model="saleInfo" item-text="emp_no" required autocomplete dense :disabled="userData.type_user !== 'SALE'"></v-select></v-flex>
        <v-flex xs6 sm6 md2 lg2 pl-3><v-subheader class="fontSize">ชื่อ-นามสกุล Sales</v-subheader></v-flex>
        <v-flex xs6 sm6 md6 lg6><v-text-field v-model="fullname" readonly :disabled="userData.type_user !== 'SALE'"></v-text-field></v-flex>
        <v-flex xs6 sm6 md2 lg2><v-subheader class="fontSize">ชื่อเล่น Sales<span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
        <v-flex xs6 sm6 md2 lg2><v-select :rules="requiredRules" :items="listSale" :filter="customSaleFilter2" v-model="saleInfo" item-text="nname" required autocomplete dense :disabled="userData.type_user !== 'SALE'"></v-select></v-flex>
      </v-layout>
    </v-flex>
  </v-card-text>
</v-card>
</v-form>
</div>
</template>

<script>
import { Decode } from '@/services'
export default {
  props: {
    state: {
      default: '',
      type: String
    }
  },
  created () {
    if (this.state === 'add') {
      this.getUserSale()
      this.contact()
      // this.getSale()
      this.getEmpNoCustomer()
    }
  },
  data () {
    return {
      custid: null,
      custname: '',
      userInfo: [],
      valid: false,
      listContact: [
        {
          name: '',
          position: '',
          telephone: ''
        }
      ],
      // typeCustomer: ['New Customer', 'Existing Customer'],
      listStates: [],
      listSale: [],
      saleInfo: null,
      fullname: '',
      projectName: '',
      customFilter (item, queryText, itemText) {
        const hasValue = val => val != null ? val : ''
        const text = hasValue(item.Cust_ID)
        const query = hasValue(queryText)
        return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      },
      customSaleFilter (item, queryText, itemText) {
        const hasValue = val => val != null ? val : ''
        const text = hasValue(item.emp_no)
        const query = hasValue(queryText)
        return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      },
      customSaleFilter2 (item, queryText, itemText) {
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
  computed: {
    userData () {
      if (this.$cookies.isKey('information')) {
        return JSON.parse(Decode.decode(this.$cookies.get('information')))
      } else {
        return ''
      }
    }
  },
  watch: {
    saleInfo (val) {
      if (val !== null) {
        var sale = this.searchItemSale(val.emp_no)
        this.fullname = sale.fname + ' ' + sale.lname
      } else {
        this.fullname = ''
      }
    },
    async custid (val) {
      if (val !== null) {
        this.custname = val
      }
    },
    async custname (val) {
      if (val !== null) {
        this.custid = val
      }
    }
  },
  methods: {
    clear () {
      this.$refs.form.reset()
      this.projectName = ''
      this.custid = null
      this.custname = ''
      this.valid = false
      this.listContact = [{name: '', position: '', telephone: ''}]
      this.saleInfo = null
      this.fullname = ''
      this.projectName = null
      // this.getSale()
      this.contact()
      this.getUserSale()
      this.getEmpNoCustomer()
    },
    contact () {
      this.listContact[0].name = '-'
      this.listContact[0].telephone = '-'
      this.listContact[0].position = '-'
    },
    getUserSale () {
      if (this.$cookies.isKey('information')) {
        this.userInfo = JSON.parse(Decode.decode(this.$cookies.get('information')))
        // console.log(this.userInfo.group_id)
        if (this.state === 'add') {
          this.searchSale(this.userInfo.emp_no)
        }
      } else {
        this.userInfo = ''
      }
    },
    async setValue (source) {
      this.projectName = source.project_name
      if (this.state === 'edit' || this.state === 'reject' || this.state === 'update') {
        await this.getEmpNoCustomer()
        await this.getSale()
        this.getUserSale()
      }
      if (parseInt(source.cust_ID) !== 0) {
        this.custid = this.searchCust(source.cust_ID)
        this.custname = this.custid
      } else {
        this.custname = await source.cust_name
      }
      if (source.listContact.length > 0) {
        this.listContact = this.setContact(source.listContact)
      }
      this.saleInfo = this.searchItemSale(source.sale_ID)
    },
    getValue () {
      // console.log(this.$refs.form.validate())
      if (this.$refs.form.validate()) {
        let contact = []
        if (this.listContact[0].name === '' && this.listContact[0].telephone === '' && this.listContact[0].position === '') {
          this.listContact[0].name = '-'
          this.listContact[0].telephone = '-'
          this.listContact[0].position = '-'
        } else {
          for (var i = 0; i < this.listContact.length; i++) {
            if (this.listContact[i].name !== '-' && this.listContact[i].telephone !== '-' && this.listContact[i].position !== '-') {
              this.listContact.splice(i, 1)
            }
          }
          contact = this.listContact.slice()
        }
        var cusId = 0
        if (this.custid !== null) {
          cusId = this.custid.Cust_ID
        }
        var Cust_Name = ''
        if (this.custname !== null) {
          Cust_Name = this.custname.Cust_Name
        }
        return {projectName: this.projectName, custid: cusId, custname: Cust_Name, listContact: contact, typeCustomer: this.typeCustomer, saleInfo: this.saleInfo}
      } else {
        return false
      }
    },
    cutListContact (index) {
      this.listContact.splice(index, 1)
    },
    addListContact () {
      this.listContact.push({name: '', position: '', telephone: ''})
    },
    async getSale () {
      await this.axios.post(process.env.API + '/listSaleInfo').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listSale = result.data
        } else {
          this.listSale = []
        }
      })
    },
    async getEmpNoCustomer () {
      await this.axios.post(process.env.API + '/getEmpNoCustomer').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listStates = result.data
        } else {
          this.listStates = []
        }
      })
    },
    setContact (val) {
      var contact = []
      if (val.length > 0) {
        for (var i in val) {
          contact.push({name: val[i]['name'], position: val[i]['position'], telephone: val[i]['phone']})
        }
        return contact
      }
    },
    searchCust (val) {
      for (var i in this.listStates) {
        if (this.listStates[i]['Cust_ID'] === val.toString()) {
          return this.listStates[i]
        }
      }
      return {}
    },
    searchItemSale (val) {
      for (var i in this.listSale) {
        if (this.listSale[i]['emp_no'] === val.toString()) {
          return this.listSale[i]
        }
      }
      return {}
    },
    searchSale (val) {
      var check = []
      this.axios.post(process.env.API + '/listSaleInfo').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listSale = result.data
          for (var i in this.listSale) {
            if (this.listSale[i]['emp_no'] === val) {
              this.saleInfo = this.listSale[i]
              // this.saleInfo = this.listSale[0].emp_no
            }
          }
          return {}
        } else {
          this.listSale = []
        }
      })
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
@media only screen and (max-width: 1024px) {
  .infoDiv {
    padding: 0px !important;
  }
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
  padding: 0 0px 0 0px;
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
