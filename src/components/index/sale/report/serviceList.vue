<template lang="html">
  <div>
    <v-card style="box-shadow: none;">
      <v-card-title class="border-bottom-head mr-3 ml-3" height="50px" >
        <h2 class="font-head pl-20 pt-3">Service List</h2>
      </v-card-title>
      <v-card-text class="">
        <v-flex xs12 sm12 md12 lg12 class="pb-4">
          <v-layout row wrap spacing>
            <v-flex xs12 sm12 md12 lg12><v-subheader class="fontSize">กรุณาเลือก BD<span style="color: red;">&nbsp;*</span></v-subheader></v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md12 lg12>
          <v-expansion-panel expand>
            <v-expansion-panel-content v-for="service,i in listallservice" v-model="service.selected" :key="service.name">
              <div slot="header" @click="service.selected=!service.selected">
                {{service.name}}
              </div>
              <v-card class="m-l-2">
                <v-card-title class="p-b-0 p-t-0">
                  <v-layout wrap>
                    <table class="widthfull">
                      <v-flex xs12><tr class="centerDiv m-t-1 textColor" style="background-color:#003D5B;">
                        <v-layout row wrap>
                          <v-flex xs2 class="centerDiv"><th>Service</th></v-flex>
                          <v-flex xs2 class="centerDiv"><th>Item</th></v-flex>
                          <v-flex xs2 class="centerDiv"><th>Itemcode</th></v-flex>
                          <v-flex xs2 class="centerDiv"><th>Type</th></v-flex>
                          <v-flex xs1 class="centerDiv"><th>Consult</th></v-flex>
                          <v-flex xs2 class="centerDiv"><th>Revenue</th></v-flex>
                          <v-flex xs1 class="centerDiv" style="background-color:white;"></v-flex>
                        </v-layout>
                      </tr>
                    </v-flex>
                  </table>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <!-- <v-container grid-list-md> -->
                <v-layout>
                  <table class="widthfull">
                    <div v-for="serviceadd,index in productlistservice">
                      <tr v-if="serviceadd.listService.length === 0">
                        <th colspan="12" class="noData">No data available</th>
                      </tr>
                      <v-flex xs12><tr v-for="serviceitem, index in serviceadd.listService" v-if="serviceadd.id === service.id" class="centerDiv">
                        <v-layout>
                          <v-flex xs2 class="centerDiv" v-if="serviceitem.bd_name === 'Trading' || serviceitem.bd_name === 'Other Products' || serviceitem.bd_name === 'Center'"><td>{{serviceitem.textService}}</td></v-flex>
                          <v-flex xs2 class="centerDiv" v-else><td>{{serviceitem.serviceName}}</td></v-flex>
                          <v-flex xs2 class="centerDiv" v-if="serviceitem.bd_name === 'Trading' || serviceitem.bd_name === 'Other Products' || serviceitem.bd_name === 'Center'"><td>{{serviceitem.textItem}}</td></v-flex>
                          <v-flex xs2 class="centerDiv" v-else><td>{{serviceitem.itemName}}</td></v-flex>
                          <v-flex xs2 class="centerDiv" v-if="serviceitem.bd_name === 'Trading' || serviceitem.bd_name === 'Other Products' || serviceitem.bd_name === 'Center'"><td>{{serviceitem.textItemCode}}</td></v-flex>
                          <v-flex xs2 class="centerDiv" v-else><td>{{serviceitem.itemCode}}</td></v-flex>
                          <v-flex xs2 class="centerDiv"><td>{{serviceitem.typeName}}</td></v-flex>
                          <v-flex xs1 class="centerDiv"><td>{{serviceitem.consult}}</td></v-flex>
                          <v-flex xs2 class="centerDiv"><td>{{serviceitem.revenueShow}}</td></v-flex>
                        </v-layout>
                      </tr>
                    </v-flex>
                  </div>
                </table>
              </v-layout>
              <v-layout>
                <v-flex offset-xs11 style="padding-bottom: 10px;"><v-btn dark style="margin-left: 20px;" small color="green"@click.stop="opendialogadditem(service)" fab><v-icon>add</v-icon></v-btn></v-flex>
                <!-- <v-flex><v-btn small color="green"@click.stop="opendialogadditem(service.id)">ADD</v-btn></v-flex> -->
              </v-layout>
              <!-- </v-container> -->
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-card-text>
  <dialogService ref="dialogService" @successSetService="setService"/>
</v-card>
</div>
</template>

<script>
import {Decode} from '@/services'
import dialogService from '@/components/index/sale/report/dialogService'
export default {
  data () {
    return {
      productlistservice: [],
      listallservice: [],
      listbditem: [],
      listselectitem: []
    }
  },
  components: {
    dialogService
  },
  created () {
    this.clear()
  },
  methods: {
    clear () {
      this.productlistservice = []
      this.getservice()
    },
    setValue (source) {
      let sl = source.serviceList.slice()
      for (var i = 0; i < sl.length; i++) {
        let lt = []
        let bdId = sl[i]['ID_BD']
        lt.push({bd_name: sl[i]['bdinfoname'], idService: sl[i]['product_no'], serviceName: sl[i]['bdprodname'], idItem: sl[i]['item_no'], itemName: sl[i]['proditemname'], itemCode: sl[i]['itemCode'], revenue: sl[i]['cost'], revenueShow: this.convertFormatRevenue(sl[i]['cost']), typeID: sl[i]['service_type'], typeName: sl[i]['service_type_name'], consult: sl[i]['consult'], textItem: sl[i]['item_name'], textItemCode: sl[i]['item_code'], textService: sl[i]['product_name']})
        sl.splice(i, 1)
        i = i - 1
        for (var j = 0; j < sl.length; j++) {
          if (bdId === sl[j]['ID_BD']) {
            lt.push({bd_name: sl[j]['bdinfoname'], idService: sl[j]['product_no'], serviceName: sl[j]['bdprodname'], idItem: sl[j]['item_no'], itemName: sl[j]['proditemname'], itemCode: sl[j]['itemCode'], revenue: sl[j]['cost'], revenueShow: this.convertFormatRevenue(sl[j]['cost']), typeID: sl[j]['service_type'], typeName: sl[j]['service_type_name'], consult: sl[j]['consult'], textItem: sl[j]['item_name'], textItemCode: sl[j]['item_code'], textService: sl[j]['product_name']})
            sl.splice(j, 1)
            j = j - 1
          }
        }
        for (var k = 0; k < this.listallservice.length; k++) {
          if (bdId.toString() === this.listallservice[k].id.toString()) {
            this.listallservice[k].selected = true
          }
        }
        this.setService(lt, bdId)
      }
      this.totalRevenue()
    },
    async getservice () {
      await this.axios.post(process.env.API + '/getallservice').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listallservice = result.servicebd
        } else {
          this.listallservice = []
          this.panel = []
        }
      }, () => {
        this.listallservice = []
        this.panel = []
      })
    },
    opendialogadditem (val) {
      let listService = this.searchListService(val.id)
      this.$refs.dialogService.open(val.id, val.name, listService)
    },
    searchListService (val) {
      let service = []
      for (var i in this.productlistservice) {
        if (this.productlistservice[i]['id'] === val) {
          service = this.productlistservice[i]['listService'].slice()
          return service
        }
      }
      return []
    },
    getValue () {
      let service = []
      if (this.productlistservice.length > 0) {
        service = this.productlistservice.slice()
        return service
      } else {
        return false
      }
    },
    setService (listService, id) {
      let service = listService.slice()
      if (this.productlistservice.length === 0) {
        this.productlistservice.push({id: id, listService: service})
        return this.totalRevenue()
      }
      for (var i = 0; i < this.productlistservice.length; i++) {
        if (this.productlistservice[i].id === id) {
          if (service.length === 0) {
            this.productlistservice.splice(i, 1)
          } else {
            this.productlistservice[i].listService = service
          }
          return this.totalRevenue()
        }
      }
      this.productlistservice.push({id: id, listService: service})
      return this.totalRevenue()
    },
    totalRevenue () {
      var revenue = 0
      // console.log(this.productlistservice)
      for (var i = 0; i < this.productlistservice.length; i++) {
        for (var j = 0; j < this.productlistservice[i].listService.length; j++) {
          revenue = revenue + parseFloat(this.productlistservice[i].listService[j].revenue)
          // console.log(revenue)
        }
      }
        this.$emit('revenueTotal', revenue)
    },
    convertFormatRevenue (val) {
      var parts = val.toString().split('.')
      parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
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
.textColor {
  color: white;
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
