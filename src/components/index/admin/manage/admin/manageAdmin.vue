<template>
  <div class="p-t-1-5">
    <v-container>
      <div class="">
        <!-- <v-layout row wrap></v-layout> -->
        <v-flex xs3 md3 lg3 class="headerFont"><h1>จัดการข้อมูล Admin</h1></v-flex>
        <v-layout row wrap>
          <!-- style="padding-bottom: 12px;padd -->
          <v-flex xs12 sm8 class="p-t-1-5 p-b-1-5"><v-btn color="info" @click="openRegister()">เพิ่ม Admin</v-btn></v-flex>
          <v-flex xs12 md4 class="p-t-1 p-b-1-5"><v-text-field label="ค้นหา" v-model="searchTxt" append-icon="search"></v-text-field></v-flex>
        </v-layout>
        <!-- <v-flex xs12 md12 lg12 style="padding-left: 20px; padding-right: 20px"> -->
        <v-data-table :headers="header" :items="filterBySearchBox" class="elevation-1">
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
          <template slot="items" slot-scope="props" class="centerDiv">
            <td class="tdListUser">{{ props.index + 1 }}</td>
            <td class="tdListUser" align="left">{{ props.item.emp_no }}</td>
            <td class="tdListUser" align="left">{{ props.item.fname }} {{ props.item.lname }}</td>
            <td class="tdListUser" align="left">{{ props.item.email }}</td>
            <td class="tdListUser" align="left">{{ props.item.emp_division }}</td>
            <td class="text-xs-center">
              <v-btn color="blue darken-1" small @click="resetPassword(props.item)" flat fab icon><v-icon medium>loop</v-icon></v-btn>
              <v-btn color="green" small @click="editUser(props.item)" flat fab icon><v-icon medium>edit</v-icon></v-btn>
              <v-btn color="red" small @click="deleteUser(props.item)" flat fab icon><v-icon medium>delete</v-icon></v-btn>
            </td>
          </template>
        </v-data-table>
        <!-- </v-flex> -->
        <register ref="register" @success="refresh"/>
        <editUser ref="edit" @success="refresh"/>
        <resetPassword ref="reset" />
      </div>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash'
import {Decode, Encode} from '@/services'
import register from '@/components/index/admin/manage/user/register'
import editUser from '@/components/index/admin/manage/user/editUser'
import resetPassword from '@/components/index/admin/manage/user/resetPassword'
export default {
  data () {
    return {
      header: [
        { text: '#', value: 'name', 'class': 'thListUser' },
        { text: 'รหัสพนักงาน', align: 'left', 'class': 'thListUser' },
        { text: 'ชื่อ-นามสกุล', align: 'left', 'class': 'thListNameUser' },
        { text: 'อีเมลล์', align: 'left', 'class': 'thListNameUser' },
        { text: 'แผนก', align: 'left', 'class': 'thListNameUser' },
        { text: 'จัดการ', align: 'center' }
      ],
      user: [],
      fname: '',
      regist: '',
      admin: '',
      searchTxt: ''
    }
  },
  computed: {
    filterBySearchBox () {
      var searchTxt = this.searchTxt
      return _.filter(this.user, function (o) {
        return o['emp_no'].indexOf(searchTxt.trim()) !== -1 || o['lname'].indexOf(searchTxt.trim()) !== -1 || o['fname'].indexOf(searchTxt.trim()) !== -1 || o['email'].indexOf(searchTxt.trim()) !== -1 || o['emp_division'].indexOf(searchTxt.trim()) !== -1
      })
    }
  },
  components: {
    register,
    editUser,
    resetPassword
  },
  methods: {
    getUser () {
      this.axios.post(process.env.API + '/getAllAdmin').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.user = result.data
        }
      })
    },
    openRegister () {
      this.$refs.register.openDialog('manageAdmin')
    },
    refresh () {
      this.getUser()
    },
    editUser (items) {
      var data = Encode.encode(JSON.stringify({code: items.emp_no, name: items.fname, lastname: items.lname, email: items.email, phone: items.phone, division: items.emp_division, section: items.section, position: items.emp_position}))
      this.$refs.edit.fillData(data)
    },
    deleteUser (items) {
      this.$swal({
        title: 'แน่ใจไหม ?',
        text: 'ลบคุณ ' + items.fname + ' ' + items.lname,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result) {
          var source = Encode.encode(JSON.stringify({'id': items.emp_no, 'emp_request': this.admin['emp_no']}))
          this.axios.post(process.env.API + '/deleteUser', {source: source}).then((response) => {
            if (response.data === 'success') {
              this.$swal('ดำเนินการเรียบร้อย', '', 'success')
              this.getUser()
            } else {
              this.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
            }
          })
        }
      })
    },
    resetPassword (val) {
      var data = Encode.encode(JSON.stringify({emp_no: val.emp_no, emp_request: this.admin['emp_no']}))
      this.$refs.reset.openDialog(data)
    }
  },
  created () {
    this.getUser()
    if (this.$cookies.isKey('information')) {
      this.admin = JSON.parse(Decode.decode(this.$cookies.get('information')))
    }
  }
}
</script>
<style lang="css">
.tdListUser {
  padding: 0 12px 0 24px !important;
}
.thListUser {
  padding: 0 30px 0 12px !important;
}
.thListNameUser {
  padding: 0 50px 0 22px !important;
}
</style>
