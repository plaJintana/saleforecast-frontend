<template>
  <div class="p-t-1-5">
    <v-container>
      <div class="">
        <v-flex xs4 md4 lg4 class="headerFont"><h1>จัดการข้อมูล Presales</h1></v-flex>
        <v-layout row wrap>
          <v-flex xs12 sm8 class="p-t-1-5 p-b-1-5"><v-btn color="info" @click="addPresale()">เพิ่ม Presales</v-btn></v-flex>
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
              <!-- <v-btn color="blue darken-1" small @click="viewDetailSale(props.item)" flat fab><v-icon medium>assignment_ind</v-icon></v-btn> -->
              <v-btn color="green" small @click="editPresale(props.item)" flat fab><v-icon medium>edit</v-icon></v-btn>
              <v-btn color="red" small @click="deletePresale(props.item)" flat fab><v-icon medium>delete</v-icon></v-btn>
            </td>
          </template>
        </v-data-table>
      </div>
      <addPresale ref="addPresale" @editPresaleSuccsess="getPresale" @addPresaleSuccsess="getPresale"/>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash'
import addPresale from '@/components/index/admin/manage/presale/addPresale'
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
    addPresale
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
    this.getPresale()
  },
  methods: {
    getPresale () {
      this.axios.post(process.env.API + '/listPresales').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listUser = result.data
        } else {
          this.listUser = []
        }
      })
    },
    deletePresale (val) {
      var me = this
      console.log(val)
      this.$swal({
        title: 'แน่ใจไหม ?',
        text: 'ลบคุณ ' + val.fname + ' ' + val.lname,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result) {
          var source = Encode.encode(JSON.stringify({'emp_no': val.emp_no, 'id': val.id, 'groupline_id': val.groupline_id, 'group_id': val.group_id, 'group_name': val.group_name, 'position': val.position, 'create_by': me.userData.emp_no}))
          me.axios.post(process.env.API + '/deletePresale', {source: source}).then((response) => {
            if (response.data === 'success') {
              this.getPresale()
              me.$swal('ลบ Presale สำเร็จ', '', 'success')
            } else {
              me.$swal('ไม่สามารถลบ Presale ได้', '', 'error')
            }
          })
        }
      }).catch(me.$swal.noop)
    },
    addPresale () {
      this.$refs.addPresale.open()
    },
    editPresale (user) {
      this.$refs.addPresale.edit(user)
    }
    // viewDetailSale (sale) {
    //   this.$router.push({ path: '/viewDetailSale', 'query': { 'emp_no': sale.emp_no } })
    // },
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
