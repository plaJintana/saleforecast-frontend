<!-- <template lang="html">
  <div class="">
    <v-container>
      <div class="">
        <h1 class="headerFont">List Saleforecast</h1>
        <v-layout row wrap>
          <v-flex xs12 sm8>
          </v-flex>
          <v-flex offset-sm8 offset-xs8 xs12 md4>
            <v-text-field label="Search" v-model="searchTxt" append-icon="search"></v-text-field>
          </v-flex>
        </v-layout>
        <v-data-table :headers="headers" :items="filterBySearchBox" class="elevation-1">
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
          <template slot="items" slot-scope="props">
            <td class="tdListSale">{{ props.index + 1 }}</td>
            <td align="left">{{ props.item.cust_name }}</td>
            <td align="left">{{ props.item.sale_fname }} {{ props.item.sale_lname }}</td>
            <td class="tdListSale">{{ props.item.presale_name }}</td>
            <td class="tdListSale" align="left">{{ props.item.SO_name }}</td>
            <td class="tdListSale" align="left">{{ props.item.grade_name }}</td>
            <td class="tdListSale" align="center"></td>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash'
import { Decode, Encode } from '@/services'
export default {
  created () {
    this.listReportSaleforecast()
  },
  computed: {
    userData () {
      if (this.$cookies.isKey('information')) {
        return JSON.parse(Decode.decode(this.$cookies.get('information')))
      } else {
        return ''
      }
    },
    filterBySearchBox () {
      var searchTxt = this.searchTxt
      return _.filter(this.listReport, function (o) {
        return o['cust_name'].indexOf(searchTxt.trim()) !== -1
      })
    }
  },
  data () {
    return {
      listReport: [],
      searchTxt: '',
      headers: [
        { text: '#', value: 'no', align: 'left', 'class': 'thListSale' },
        { text: 'Customer name', value: 'custname', align: 'left' },
        { text: 'ชื่อ-นามสกุล sale', value: 'fullNameSale', align: 'left', 'class': 'thListNameSale' },
        { text: 'ชื่อ-นามสกุล presale', value: 'fullNamePresale', align: 'left', 'class': 'thListNameSale' },
        { text: 'SO Type', value: 'sotype', align: 'left', 'class': 'thListNameSale' },
        { text: 'Forecast Grade', value: 'forecastGrade', align: 'left', 'class': 'thListNameSale' },
        { text: 'จัดการ', value: 'action', align: 'center', 'class': 'thListSale' }
      ],
      listUser: []
    }
  },
  methods: {
    listReportSaleforecast () {
      var source = Encode.encode(JSON.stringify({ 'emp_no': this.userData.emp_no })
      this.axios.post(process.env.API + '/listReportSaleforecast', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listReport = result.data
          console.log(this.listReport)
        } else {
          this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
        }
      }, (response) => {
        this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
      })
    }
  }
}
</script>

<style lang="css">
.tdListSale {
  padding: 0 12px 0 24px !important;
}
.thListSale {
  padding: 0 30px 0 12px !important;
}
.thListNameSale {
  padding: 0 50px 0 22px !important;
}
</style> -->
<template>
  <div>
    <!-- <v-tabs fixed-tabs v-model="model" grow>
     <v-tab href="#tab-pending">pending</v-tab>
     <v-tab href="#tab-reject">reject</v-tab>
     <v-tab href="#tab-approve">Approve</v-tab>
    </v-tabs> -->
    <!-- <v-tabs-items v-model="model"> -->
      <!-- <v-tab-item id="tab-pending"> -->
      <navbar @urlSelect="toPage"/>
      <pending v-if="checkUrl('pending')" @editSaleforecast="editSaleforecast"/>
      <!-- </v-tab-item>
      <v-tab-item id="tab-reject"> -->
      <reject v-if="checkUrl('reject')"/>
      <!-- </v-tab-item>
      <v-tab-item id="tab-approve"> -->
        <!-- <approve v-if="checkUrl('approve')"/> -->
      <!-- </v-tab-item>
    </v-tabs-items> -->
  </div>
</template>

<script>
import navbar from '@/components/index/navbar'
import pending from '@/components/index/pending'
import reject from '@/components/index/reject'
import { Decode } from '@/services'
export default {
  data () {
    return {
      model: '',
      subItems: [{text: 'Pending', url: 'pending'}, {text: 'Reject', url: 'reject'}, {text: 'Approve', url: 'approve'}]
    }
  },
  create () {
    // if (this.$route.query.tab) {
    //   this.model = this.$route.query.tab
    // } else {
    //   this.model = 'tab-listUser'
    // }
  },
  components: {
    pending,
    reject,
    navbar
  },
  methods: {
    editSaleforecast (val) {
      this.$emit('editSaleforecast', val)
    },
    checkUrl (url) {
      if (url === this.$route.params.detail) {
        if (window.$cookies.isKey('usertype')) {
          var type = Decode.decode(window.$cookies.get('usertype')).replace(/"/g, '')
          if (this.isInFindSubItems(url)) {
            return true
          } else {
            this.toPage('/')
            return false
          }
        } else {
          return false
        }
      }
      return false
    },
    isInFindSubItems (url) {
      for (var i in this.subItems) {
        if (this.subItems[i]['url'] === url) {
          return true
        }
      }
      return false
    },
    toPage (url) {
      this.$router.push('/account/' + url)
    }
  }
}
</script>
