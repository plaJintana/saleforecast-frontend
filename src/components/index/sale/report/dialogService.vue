<template lang="html">
  <!-- <div> -->
  <v-dialog v-model="dialogadditem" persistent max-width="1200px">
    <v-card>
      <v-card-title>
        <span class="headline">{{service_name}}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout>
            <table style="width:100%;">
              <v-flex xs12><tr class="centerDiv textColor bgColor">
                <v-layout>
                  <v-flex xs2 class="centerDiv"><th>Service</th></v-flex>
                  <v-flex xs2 class="centerDiv" ><th>Item</th></v-flex>
                  <v-flex xs2 class="centerDiv"><th>Itemcode</th></v-flex>
                  <v-flex xs2 class="centerDiv"><th>Type</th></v-flex>
                  <v-flex xs1 class="centerDiv"><th>Consult</th></v-flex>
                  <v-flex xs2 class="centerDiv"><th>Revenue</th></v-flex>
                  <th></th>
                </v-layout>
              </tr>
            </v-flex>
          </table>
        </v-layout>
        <v-layout>
          <table style="width:100%;">
            <tr v-if="productitem.length === 0">
              <th colspan="12" class="noData">No data available</th>
            </tr>
            <v-flex xs12><tr v-for="item, index in productitem" class="centerDiv">
              <v-layout>
                <v-flex xs2 class="centerDiv" v-if="item.bd_name === 'Trading' || item.bd_name === 'Other Products' || item.bd_name === 'Center'"><td>{{item.textService}}</td></v-flex>
                <v-flex xs2 class="centerDiv" v-else><td>{{item.serviceName}}</td></v-flex>
                <v-flex xs2 class="centerDiv" v-if="item.bd_name === 'Trading' || item.bd_name === 'Other Products' || item.bd_name === 'Center'"><td>{{item.textItem}}</td></v-flex>
                <v-flex xs2 class="centerDiv" v-else><td>{{item.itemName}}</td></v-flex>
                <v-flex xs2 class="centerDiv" v-if="item.bd_name === 'Trading' || item.bd_name === 'Other Products' || item.bd_name === 'Center'"><td>{{item.textItemCode}}</td></v-flex>
                <v-flex xs2 class="centerDiv" v-else><td>{{item.itemCode}}</td></v-flex>
                <v-flex xs2 class="centerDiv"><td>{{item.typeName}}</td></v-flex>
                <v-flex xs1 class="centerDiv"><td>{{item.consult}}</td></v-flex>
                <v-flex xs2 class="centerDiv"><td>{{item.revenueShow}}</td></v-flex>
                <td style="text-align:right;">
                  <v-btn flat icon small color="info" @click="edititem(index)">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn flat icon small color="pink" @click="removeitem(index)">
                    <v-icon>delete_forever</v-icon>
                  </v-btn>
                </td>
              </v-layout>
            </tr>
          </v-flex>
        </table>
      </v-layout>
      <v-layout style="width:100%">
        <table style="width:100%;">
          <tr>
            <th class="headitemselect bl">Service items</th>
          </th>
        </tr>
        <div class="form-wrapper">
          <v-form ref="formadditem" v-model="valid" lazy-validation>
            <tr v-for="item, index in testitem" ref="formadditem" style="display: flex;">
              <v-layout>
                <v-flex xs5 class="centerDiv">
                  <td style="width: 100%;" v-if="service_name === 'Trading' || service_name === 'Other Products' || service_name === 'Center'">
                    <v-text-field label="Service *" :rules="[v => !!v || 'กรุณากรอก Service']" v-model="textService"></v-text-field>
                  </td>
                  <td style="width: 100%;" v-else>
                    <v-select
                    :items="listbdService"
                    :filter="customFilter"
                    v-model="selectproduct"
                    item-text="name"
                    label="Select Service"
                    single-line
                    autocomplete
                    dense
                    :rules="[v => !!(v.id) || 'กรุณาเลือก Select Service']"
                    style="height:79px"
                    required
                    >
                  </v-select>
                </td>
              </v-flex>
              <v-flex xs5 class="centerDiv">
                <td style="width: 100%;" v-if="service_name === 'Trading' || service_name === 'Other Products' || service_name === 'Center'">
                  <v-text-field label="Item *" :rules="[v => !!v || 'กรุณากรอก Select Item']" v-model="textItem"></v-text-field>
                </td>
                <td style="width: 100%;" v-else>
                  <v-select
                  :items="listselectitem"
                  :filter="customFilter"
                  v-model="selectitem"
                  item-text="name"
                  label="Select Item"
                  single-line
                  autocomplete
                  dense
                  required
                  :rules="[v => !!(v.id) || 'กรุณาเลือก Select Item']"
                  style="height:79px"
                  >
                </v-select>
              </td>
            </v-flex>
            <v-flex xs5 class="centerDiv">
              <td style="width: 100%;" v-if="service_name === 'Trading' || service_name === 'Other Products' || service_name === 'Center'">
                <v-text-field label="Itemcode" v-model="textItemCode" :rules="[v => !!v || 'กรุณากรอกข้อมูล']" required></v-text-field>
              </td>
              <td style="width: 100%;" v-else>
                <v-text-field label="Itemcode *" v-model="itemCode" readonly></v-text-field>
              </td>
            </v-flex>
            <v-flex xs5 class="centerDiv">
              <td style="width: 100%;">
                <v-select
                :items="listServiceType"
                :filter="customFilter"
                v-model="serviceType"
                item-text="name"
                label="Select Type *"
                single-line
                autocomplete
                dense
                :rules="[v => !!v || 'กรุณาเลือก Select Type']"
                style="height:79px"
                >
              </v-select>
            </td>
          </v-flex>
          <v-flex xs4 class="centerDiv">
            <td style="width: 100%;">
              <v-select
              :items="listConsult"
              v-model="consult"
              label="Select Consult *"
              single-line
              dense
              :rules="[v => !!v || 'กรุณาเลือก Select Consult']"
              style="height:79px"
              >
            </v-select>
          </td>
        </v-flex>
        <v-flex xs5 class="centerDiv">
          <td style="width: 100%;">
            <v-text-field label="Revenue " v-model="revenue" :rules="[v => !!v || 'กรุณากรอก Revenue', v => /^([0-9.,])+$/.test(v) || 'กรุณากรอกตัวเลข']" required></v-text-field>
          </td>
        </v-flex>
        <v-flex class="centerDiv">
          <td>
            <v-btn flat icon small color="green" @click="additemInfo()">
              <v-icon>add_circle</v-icon>
            </v-btn>
          </td>
        </v-flex>
      </v-layout>
    </tr>
  </v-form>
</div>
</table>
</v-layout>
</v-container>
</v-card-text>
<v-card-actions>
  <v-spacer></v-spacer>
  <v-btn color="blue darken-1" flat @click="close()">Close</v-btn>
  <v-btn type="submit" form="check-login-form"color="blue darken-1" flat @click="saveService()">Save</v-btn>
</v-card-actions>
</v-card>
</v-dialog>
<!-- </div> -->
</template>

<script>
import {Decode, Encode} from '@/services'
export default {
  data () {
    return {
      service_id: '',
      service_name: '',
      dialogadditem: false,
      productitem: [],
      itemCode: '',
      listServiceType: [],
      serviceType: [],
      revenue: '',
      listConsult: ['YES', 'NO'],
      consult: '',
      valid: true,
      textService: '',
      textItemCode: '',
      textItem: '',
      dialogitem: {
        namedialog: '',
        countitemdialog: 0,
        idbd: 0
      },
      customFilter (item, queryText, itemText) {
        const hasValue = val => val != null ? val : ''
        const text = hasValue(item.name)
        const query = hasValue(queryText)
        return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1
      },
      requiredRules: [
        v => !!v || 'This field is required'
      ],
      listbdService: [],
      listselectitem: [],
      selectproduct: [],
      selectitem: [],
      testitem: [
        {
          idservice: '',
          nameservice: '',
          iditem: '',
          nameitem: '',
          itemCode: '',
          revenue: ''
        }
      ]
    }
  },
  watch: {
    selectproduct: function (val) {
      this.setSelectItem(val)
    },
    selectitem: function (val) {
      this.itemCode = val.itemCode
    },
    revenue (val) {
      val = val.toString().replace(/,/g, '')
      var parts = val.toString().split('.')
      parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.revenue = parts.join('.')
    }
  },
  methods: {
    open (bdproductid, servicename, listService) {
      this.dialogadditem = true
      this.service_id = bdproductid
      this.service_name = servicename
      this.productitem = listService.slice()
      this.opendialogadditem(bdproductid)
      this.getServiceType()
      this.clear()
      this.valid = true
      console.log(this.itemCode)
    },
    close () {
      this.dialogadditem = false
      this.clear()
    },
    setSelectItem (val) {
      this.listselectitem = val.list
    },
    edititem (index) {
      for (var i = 0; i < this.listbdService.length; i++) {
        if (this.listbdService[i].name === this.productitem[index].serviceName) {
          this.selectproduct = this.listbdService[i]
          for (var j = 0; j < this.listbdService[i].list.length; j++) {
            if (this.listbdService[i].list[j].name === this.productitem[index].itemName) {
              this.selectitem = this.listbdService[i].list[j]
            }
          }
        }
      }
      for (var k = 0; k < this.listServiceType.length; k++) {
        if (this.listServiceType[k].name === this.productitem[index].typeName) {
          this.serviceType = this.listServiceType[k]
        }
      }
      this.revenue = this.productitem[index].revenueShow
      this.consult = this.productitem[index].consult
      this.removeitem(index)
    },
    removeitem (index) {
      this.productitem.splice(index, 1)
    },
    saveService () {
      let product = this.productitem.slice()
      console.log(product)
      this.$emit('successSetService', product, this.service_id)
      this.clear()
      this.service_id = ''
      this.productitem = []
      this.dialogadditem = false
    },
    opendialogadditem (bdproductid) {
      var source = Encode.encode(JSON.stringify({ bdproductid: bdproductid }))
      this.axios.post(process.env.API + '/getbditem', { source: source }).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.idbd = bdproductid
          this.listbdService = result.resultproduct
          this.dialogadditem = true
        } else {
          this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
          this.dialogadditem = false
        }
      }, (response) => {
        this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
        this.dialogadditem = false
      })
    },
    getServiceType () {
      this.axios.post(process.env.API + '/getServiceType').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listServiceType = result.serviceType
        } else {
          this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
          this.dialogadditem = false
        }
      }, (response) => {
        this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
        this.dialogadditem = false
      })
    },
    additemInfo () {
      if (this.$refs.formadditem.validate()) {
        if (this.selectitem.length === 0) {
          this.selectitem = {id: 0, name: ''}
        }
        if (this.selectproduct.length === 0) {
          this.selectproduct = {id: this.listbdService[0]['id'], name: this.listbdService[0]['name']}
        }
        var revenueShow = this.revenue
        var revenue = this.revenue.toString().replace(/,/g, '')
        let oldService = this.productitem.slice()
        oldService.push({bd_name: this.service_name, idService: this.selectproduct.id, serviceName: this.selectproduct.name, idItem: this.selectitem.id, itemName: this.selectitem.name, itemCode: this.selectitem.itemCode, revenue: revenue, revenueShow: revenueShow, typeID: this.serviceType.id, typeName: this.serviceType.name, consult: this.consult, textItem: this.textItem, textItemCode: this.textItemCode, textService: this.textService})
        // console.log(oldService)
        this.productitem = oldService.slice()
        this.$refs.formadditem.reset()
        this.clear()
      } else {
        this.$swal('ข้อมูลไม่ครบถ้วน', 'กรุณากรอกข้อมูลให้ครบถ้วน', 'error')
      }
    },
    clear () {
      this.$refs.formadditem.reset()
      this.selectproduct = []
      this.selectitem = []
      this.revenue = ''
      this.textItem = ''
      this.listselectitem = []
    }
  }
}
</script>

<style lang="css">
.textColor {
  color: white;
}

.bgColor {
  background-color:#003D5B;
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
