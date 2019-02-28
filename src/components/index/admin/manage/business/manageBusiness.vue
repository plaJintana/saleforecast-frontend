<template>
  <div class="p-t-1-5">
    <v-container>
      <div class="">
        <v-flex xs5 md5 lg5 class="headerFont"><h1>จัดการข้อมูล Business Development</h1></v-flex>
        <v-layout row wrap>
          <!-- <v-btn color="primary" dark @click.stop="dialog3 = true">Open Dialog 3</v-btn> -->
          <v-flex xs12 sm8 class="p-t-1-5 p-b-1-5"><v-btn color="info" @click="openAddBusiness()">เพิ่ม BD</v-btn></v-flex>
          <v-flex xs12 md4 class="p-t-1 p-b-1-5"><v-text-field label="Search" v-model="searchTxt" append-icon="search"></v-text-field></v-flex>
        <!-- <v-dialog v-model="addBusiness" max-width="800">
          <v-flex xs12 md12 class="centerDiv">
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-card style="padding-bottom: 4em;width: 100%;">
                <v-card class="marginTextField" style="padding-top:4em;">
          <v-card>
          <h2><center>{{messageBusiness}}</center></h2>



          <v-layout row wrap>
            <v-flex xs10 offset-xs1 class="pr-3" v-if="state === 'add'">
              <v-layout row wrap>
                <v-flex xs6><v-text-field color="green lighten-3" name="employeeCode" label="รหัสพนักงาน" v-model="employeeCode" type="text" :rules="[v => !!v || 'กรุณาใส่รหัสพนักงาน']" required></v-text-field></v-flex>
                <v-spacer></v-spacer>
                <v-flex xs5><v-btn class="marginButton"  color="success" @click=""><v-icon>search</v-icon>ตรวจสอบ</v-btn></v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs10 offset-xs1 class="pr-3" v-else><v-layout><v-text-field color="green lighten-3" name="employeeCode" label="รหัสพนักงาน" v-model="employeeCode" type="text" :rules="[v => !!v || 'กรุณาใส่รหัสพนักงาน']" required ></v-text-field></v-layout></v-flex>
            <v-flex xs5 offset-xs1 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="fname" label="ชื่อ" v-model="fname" type="text" :rules="[v => !!v || 'กรุณาใส่ชื่อพนักงาน']" required></v-text-field></v-flex>
            <v-flex xs5 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="lname" label="นามสกุล" v-model="lname" type="text" :rules="[v => !!v || 'กรุณาใส่นามสกุลพนักงาน']" required></v-text-field></v-flex>
            <v-flex xs5 offset-xs1 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="phone" label="เบอร์โทรศัพท์" v-model="phone" type="text" :rules="[v => !!v || 'กรุณาใส่เบอร์โทรศํพท์']" required></v-text-field></v-flex>
            <v-flex xs5 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="email" label="E-mail" v-model="email" type="text" :rules="[v => !!v || 'กรุณาใส่ Email']" required></v-text-field></v-flex>
            <v-flex xs11 offset-xs1 class="pr-3"><v-radio-group class="marginTextField" v-model="position" row><v-radio v-for="position in listPosition" class="p-r-3" :key="position" :label="position" :value="position"></v-radio></v-radio-group></v-flex>
            <v-flex xs10 offset-xs1 class="pr-3">
              <v-select
                :items="states"
                v-model="groupBusiness"
                label="Select"
                multiple
                chips
                hint="โปรดเลือกฝ่าย"
                persistent-hint
              ></v-select>
            </v-flex>

            <v-flex xs10 offset-xs1 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="remark" label="หมายเหตุ" v-model="remark" type="text" multi-line></v-text-field></v-flex>
          </v-layout>
        </v-card>
          </v-card>
          <v-card-actions>
            <v-layout row wrap>
              <v-flex xs4 offset-xs2 style="padding-left: 10px"><v-btn :loading="isLoading" style="width: 90%" color="success" @click=""><v-icon>assignment</v-icon>เพิ่ม</v-btn></v-flex>
              <v-flex xs4 offset-xs2 style="padding-left: 10px" v-if="state === 'edit'" ><v-btn :loading="isLoading" style="width: 90%" color="success" @click="editPresale()"><v-icon>assignment</v-icon>แก้ไข</v-btn></v-flex>
              <v-flex xs4><v-btn color="error" style="width: 90%" @click="clear()"><v-icon>cancel</v-icon>ล้าง</v-btn></v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
        </v-form>
        </v-flex>
        </v-dialog> -->
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
              <v-btn color="green" small @click="editBusiness(props.item)" flat fab><v-icon medium>edit</v-icon></v-btn>
              <v-btn color="red" small @click="deleteBusiness(props.item)" flat fab><v-icon medium>delete</v-icon></v-btn>
            </td>
          </template>
        </v-data-table>
      </div>
      <addBusiness ref="addBusiness" @addBusinessSuccsess="businessSuccsess"/>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash'
import addBusiness from '@/components/index/admin/manage/business/addBusiness'
import { Encode, Decode } from '@/services'
export default {
  data () {
    return {
      pagination: {sortBy: 'id', descending: true},
      messageBusiness: 'เพิ่ม Business',
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
      listUser: [],
      addBusiness: false,
      notifications: false,
      sound: true,
      state: 'add',
      widgets: false,
      e6: [],
      groupBusiness: [],
      states: ['programmer']
    }
  },
  components: {
    addBusiness
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
    this.getBusiness()
  },
  methods: {
    businessSuccsess () {
      this.getBusiness()
    },
    getBusiness () {
      this.axios.post(process.env.API + '/listBusiness').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listUser = result.data
          // console.log(this.listUser)
        } else {
          this.listUser = []
        }
      })
    },
    deleteBusiness (val) {
      var me = this
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
          var source = Encode.encode(JSON.stringify({'emp_no': val.emp_no, 'create_by': me.userData.emp_no}))
          me.axios.post(process.env.API + '/deleteBusiness', {source: source}).then((response) => {
            // console.log(response.data)
            if (response.data === 'success') {
              this.getBusiness()
              me.$swal('ลบ Sale สำเร็จ', '', 'success')
            } else {
              me.$swal('ไม่สามารถลบ Sale ได้', '', 'error')
            }
          })
        }
      }).catch(me.$swal.noop)
    },
    openAddBusiness () {
      this.$refs.addBusiness.open()
    },
    editBusiness (user) {
      this.$refs.addBusiness.edit(user)
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
