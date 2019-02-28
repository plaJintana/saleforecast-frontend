<template>
  <div class="p-t-1-5">
    <v-container>
      <div class="">
        <v-flex xs3 md3 lg3 class="headerFont"><h1>จัดการข้อมูล Sales</h1></v-flex>
        <v-layout row wrap>
          <v-flex xs12 sm8 class="p-t-1-5 p-b-1-5"><v-btn color="info" @click="addSale()">เพิ่ม Sales</v-btn></v-flex>
          <v-flex xs12 md4 class="p-t-1 p-b-1-5"><v-text-field label="Search" v-model="searchTxt" append-icon="search"></v-text-field></v-flex>
        </v-layout>
        <v-data-table :headers="headers" :items="filterBySearchBox" v-bind:pagination.sync="pagination" class="elevation-1">
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
            <td class="tdListSale" align="left">{{ props.item.emp_no }}</td>
            <td class="tdListSale" align="left">{{ props.item.fname }} {{ props.item.lname }}</td>
            <td class="tdListSale" align="left">{{ props.item.email }}</td>
            <td class="tdListSale" align="left">{{ props.item.phone }}</td>
            <td class="text-xs-center tdListSale">
              <v-btn color="blue darken-1" small @click="viewDetailSale(props.item)" flat fab><v-icon medium>assignment_ind</v-icon></v-btn>
              <v-btn color="green" small @click="editSale(props.item)" flat fab><v-icon medium>edit</v-icon></v-btn>
              <v-btn color="red" small @click="deleteSale(props.item)" flat fab><v-icon medium>delete</v-icon></v-btn>
            </td>
          </template>
        </v-data-table>
      </div>
      <addSale ref="addSale" @addSaleSuccsess="getUserSale" @editSaleSuccsess="getUserSale"/>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash'
import addSale from '@/components/index/admin/manage/sale/addSale'
import { Encode, Decode } from '@/services'
export default {
  data () {
    return {
      pagination: {sortBy: 'id', descending: true},
      searchTxt: '',
      company: '',
      headers: [
        { text: '#', value: 'no', align: 'left', 'class': 'thListSale' },
        { text: 'รหัสพนักงาน', value: 'emp_no', align: 'left', 'class': 'thListSale' },
        { text: 'ชื่อ-นามสกุล', value: 'name', align: 'left', 'class': 'thListNameSale' },
        { text: 'อีเมล', value: 'email', align: 'left', 'class': 'thListNameSale' },
        { text: 'เบอร์โทรศํพท์', value: 'position', align: 'left', 'class': 'thListNameSale' },
        // { text: 'กลุ่ม', value: 'group', align: 'center', 'class': 'thListSale' },
        // { text: 'ตำแหน่ง', value: 'position', align: 'center', 'class': 'thListSale' },
        { text: 'จัดการ', value: 'action', align: 'center', 'class': 'thListSale' }
      ],
      listUser: []
    }
  },
  components: {
    addSale
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
      return _.filter(this.listUser, function (o) {
        return o['emp_no'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['email'].indexOf(searchTxt.trim()) !== -1 || o['phone'].indexOf(searchTxt.trim()) !== -1
      })
    }
  },
  created () {
    this.getUserSale()
  },
  methods: {
    getUserSale () {
      this.axios.post(process.env.API + '/listSales').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listUser = result.list_sale
        } else {
          this.listUser = []
        }
      })
    },
    deleteSale (sale) {
      var me = this
      this.$swal({
        title: 'แน่ใจไหม ?',
        text: 'ลบคุณ ' + sale.fname + ' ' + sale.lname,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result) {
          var source = Encode.encode(JSON.stringify({'emp_no': sale.emp_no, 'id': sale.id, 'groupline_id': sale.groupline_id, 'group_id': sale.group_id, 'group_name': sale.group_name, 'position': sale.position, 'create_by': me.userData.emp_no}))
          me.axios.post(process.env.API + '/deleteSale', {source: source}).then((response) => {
            if (response.data === 'success') {
              this.getUserSale()
              me.$swal('ลบ Sale สำเร็จ', '', 'success')
            } else {
              me.$swal('ไม่สามารถลบ Sale ได้', '', 'error')
            }
          })
        }
      }).catch(me.$swal.noop)
    },
    addSale () {
      this.$refs.addSale.open()
    },
    editSale (user) {
      this.$refs.addSale.edit(user)
    },
    viewDetailSale (sale) {
      this.$router.push({ path: '/viewDetailSale', 'query': { 'emp_no': sale.emp_no } })
    },
    promoteSuccess (result) {
      if (result) {
        this.getUserCompany()
        this.$refs.snack.showSnack('เพิ่มผู้ดูแลสำเร็จ')
      } else {
        this.$swal({ title: 'เพิ่มผู้ดูแลไม่สำเร็จ', type: 'error' })
      }
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
</style>
