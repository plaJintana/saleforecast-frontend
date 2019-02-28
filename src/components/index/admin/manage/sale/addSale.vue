<template lang="html">
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="850">
        <v-layout>
          <v-flex xs12 md12 class="centerDiv">
            <v-form v-model="valid" ref="form" lazy-validation>
            <v-card style="padding-bottom: 4em;width: 100%;">
              <v-card-text class="marginTextField" style="padding-top:4em;">
                <h2><center>{{messageSale}}</center></h2>
                <v-layout row wrap>
                  <v-flex xs10 offset-xs1 class="pr-3" v-if="state === 'add'">
                    <v-layout row wrap>
                      <v-flex xs6><v-text-field color="green lighten-3" name="employeeCode" label="รหัสพนักงาน" v-model="employeeCode" type="text" :rules="[v => !!v || 'กรุณาใส่รหัสพนักงาน']" required></v-text-field></v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs5><v-btn class="marginButton" :loading="isLoadingSearch" color="success" @click="searchSale()"><v-icon>search</v-icon>ตรวจสอบ</v-btn></v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs10 offset-xs1 class="pr-3" v-else><v-layout><v-text-field color="green lighten-3" name="employeeCode" label="รหัสพนักงาน" v-model="employeeCode" type="text" :rules="[v => !!v || 'กรุณาใส่รหัสพนักงาน']" required disabled></v-text-field></v-layout></v-flex>
                  <v-flex xs5 offset-xs1 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="fname" label="ชื่อ" v-model="fname" type="text" :rules="[v => !!v || 'กรุณาใส่ชื่อพนักงาน']" required></v-text-field></v-flex>
                  <v-flex xs5 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="lname" label="นามสกุล" v-model="lname" type="text" :rules="[v => !!v || 'กรุณาใส่นามสกุลพนักงาน']" required></v-text-field></v-flex>
                  <v-flex xs5 offset-xs1 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="phone" label="เบอร์โทรศัพท์" v-model="phone" type="text" :rules="[v => !!v || 'กรุณาใส่เบอร์โทรศํพท์']" required></v-text-field></v-flex>
                  <v-flex xs5 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="email" label="E-mail" v-model="email" type="text" :rules="[v => !!v || 'กรุณาใส่ Email']" required></v-text-field></v-flex>
                  <v-flex xs5 offset-xs1 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="nname" label="ชื่อเล่น" v-model="nname" type="text" :rules="[v => !!v || 'กรุณาชื่อเล่น']" required></v-text-field></v-flex>
                  <v-flex xs10 offset-xs1 class="pr-3"><v-radio-group class="marginTextField" v-model="position" row><v-radio v-for="position in listPosition" :key="position" :label="position" :value="position"></v-radio></v-radio-group></v-flex>
                  <v-flex xs10 v-if="position !== 'HEAD OF SALES'" offset-xs1 class="pr-3"><v-select class="marginTextField" :items="listLineGroup" v-model="lineGroup" label="สายงาน" item-text="name" single-line></v-select></v-flex>
                  <v-flex xs10 v-if="position !== 'HEAD OF SALES' && position !== 'GROUPLEAD'" offset-xs1 class="pr-3"><v-select class="marginTextField" :items="listGroup" :rules="[v => (requiredGroup) || 'กรุณาเลือกกลุ่ม']" v-model="group" label="กลุ่ม" item-text="name" single-line></v-select></v-flex>
                  <v-flex xs10 offset-xs1 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="remark" label="หมายเหตุ" v-model="remark" type="text" multi-line></v-text-field></v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-layout row wrap>
                  <!-- <v-flex class="marginTextField">
                  <div class="centerDiv"> -->
                    <v-flex xs4 offset-xs2 style="padding-left: 10px" v-if="state === 'add'"><v-btn :loading="isLoading" style="width: 90%" color="success" @click="addSale()"><v-icon>assignment</v-icon>เพิ่ม</v-btn></v-flex>
                    <v-flex xs4 offset-xs2 style="padding-left: 10px" v-if="state === 'edit'" ><v-btn :loading="isLoading" style="width: 90%" color="success" @click="editSale()"><v-icon>assignment</v-icon>แก้ไข</v-btn></v-flex>
                    <v-flex xs4><v-btn color="error" style="width: 90%" @click="clear()"><v-icon>cancel</v-icon>ล้าง</v-btn></v-flex>
                  <!-- </div>
                  </v-flex> -->
                </v-layout>
              </v-card-actions>
            </v-card>
            </v-form>
          </v-flex>
          <!-- <v-flex md2></v-flex> -->
        </v-layout>
      </v-dialog>
    </v-layout>
    <!-- <snack ref="snack" /> -->
  </div>
</template>

<script>
import { Encode, Decode } from '@/services'
export default {
  created () {
    this.getLineGroupSale()
  },
  watch: {
    lineGroup: async function (val) {
      if (val !== null) {
        await this.getGroupSale(val.id)
        if (this.group_id !== '') {
          this.group = await this.searchItemGroup(this.group_id)
        }
      }
      if (val.id === 0) {
        this.requiredGroup = true
      } else {
        this.requiredGroup = false
      }
    },
    group: function (val) {
      if (val !== null) {
        if (val.id !== 0) {
          this.requiredGroup = true
        } else if (this.lineGroup.id !== 0) {
          this.requiredGroup = false
        }
      }
    },
    group_id: function (val) {
      this.group = this.searchItemGroup(this.group_id)
    }
  },
  data () {
    return {
      messageSale: 'จัดการ Sales',
      dialog: false,
      employeeCode: '',
      user_id: '',
      fname: '',
      phone: '',
      email: '',
      lname: '',
      nname: '',
      remark: '',
      lineGroup: [],
      listLineGroup: [],
      isLoading: false,
      isLoadingSearch: false,
      listGroup: [],
      group: [],
      group_id: '',
      valid: false,
      listPosition: ['SALES', 'TEAMLEAD', 'GROUPLEAD', 'HEAD OF SALES'],
      position: 'SALES',
      state: 'add',
      information: '',
      requiredGroup: true
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
  methods: {
    open () {
      this.clear()
      this.position = 'SALES'
      this.messageSale = 'เพิ่ม Sales'
      this.state = 'add'
      this.dialog = true
      this.getLineGroupSale()
    },
    clear () {
      this.$refs.form.reset()
      this.employeeCode = ''
      this.user_id = ''
      this.fname = ''
      this.phone = ''
      this.email = ''
      this.lname = ''
      this.remark = ''
      this.nname = ''
      this.lineGroup = []
      this.group = []
      this.group_id = ''
    },
    edit (val) {
      this.user_id = val.id
      this.lineGroup = this.searchItemLineGroup(val.groupline_id)
      this.messageSale = 'แก้ไข Sale'
      this.state = 'edit'
      this.dialog = true
      this.information = val
      this.employeeCode = val.emp_no
      this.fname = val.fname
      this.lname = val.lname
      this.nname = val.nname
      this.phone = val.phone
      this.email = val.email
      this.group_id = val.group_id
      this.position = val.position
      console.log(val.groupline_id)
    },
    hide () {
      this.clear()
      this.dialog = false
    },
    searchItemLineGroup (val) {
      for (var i in this.listLineGroup) {
        if (this.listLineGroup[i]['id'] === val) {
          return this.listLineGroup[i]
        }
      }
      return { id: 0, name: '' }
    },
    searchItemGroup (val) {
      for (var i in this.listGroup) {
        if (this.listGroup[i]['id'] === val) {
          return this.listGroup[i]
        }
      }
      return { id: 0, name: '' }
    },
    getLineGroupSale () {
      var source = Encode.encode(JSON.stringify({'id': 0}))
      this.axios.post(process.env.API + '/getLineGroupSale', { source: source }).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listLineGroup = [{ id: 0, name: '' }]
          for (var i = 0; i < result.data.length; i++) {
            this.listLineGroup.push(result.data[i])
          }
        } else {
          this.listLineGroup = [{ id: 0, name: 'สายงาน' }]
        }
      })
    },
    async getGroupSale (val) {
      var source = Encode.encode(JSON.stringify({ 'id': val }))
      await this.axios.post(process.env.API + '/getGroupSale', { source: source }).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.listGroup = [{ id: 0, name: '' }]
          for (var i = 0; i < result.data.length; i++) {
            this.listGroup.push(result.data[i])
          }
        } else {
          this.listGroup = [{ id: 0, name: '' }]
        }
      })
    },
    searchSale () {
      if (this.employeeCode === null || this.employeeCode === '') {
        this.isLoading = false
        this.$swal('กรุณากรอก รหัสพนักงาน', '', 'warning')
        return
      }
      this.isLoadingSearch = true
      var source = Encode.encode(JSON.stringify({'id': this.employeeCode}))
      this.axios.post(process.env.API + '/getUser', { source: source }).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          var fullname = result.data[0].thainame.split(' ')
          this.lname = fullname.pop()
          this.fname = fullname.pop()
          this.nname = result.data[0].nicknameth
          this.phone = result.data[0].phonenumber.replace(/ /g, '')
          this.email = result.data[0].email
          this.isLoadingSearch = false
        } else {
          this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
          this.isLoadingSearch = false
        }
      })
    },
    addSale () {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        if (this.remark === null) {
          this.remark = ''
        }
        if (this.position === 'HEAD OF SALES') {
          this.group = { id: 0, name: '' }
          this.lineGroup = { id: 0, name: '' }
        }
        if (this.position === 'GROUPLEAD') {
          this.group = { id: 0, name: '' }
        }
        var source = Encode.encode(JSON.stringify({'emp_no': this.employeeCode, 'fname': this.fname, 'lname': this.lname, 'nname': this.nname, 'phone': this.phone, 'email': this.email, 'group_id': this.group.id, 'groupline_id': this.lineGroup.id, 'position': this.position, 'remark': this.remark, 'create_by': this.userData.emp_no}))
        this.axios.post(process.env.API + '/addSale', { source: source }).then((response) => {
          var result = response.data
          if (result === 'success') {
            this.$emit('addSaleSuccsess')
            this.$swal('เพิ่ม Sale สำเร็จ', '', 'success')
            this.isLoading = false
            this.hide()
          } else if (result === 'Sale Duplicate') {
            this.$swal('มี Sale คนนี้อยู่ในระบบอยู่แล้ว', '', 'error')
            this.isLoading = false
          } else {
            this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
            this.isLoading = false
          }
        }, () => {
          this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
          this.isLoading = false
        })
      }
    },
    editSale () {
      if (this.$refs.form.validate()) {
        if (this.group === null) {
          this.group = { id: 0, name: '' }
        }
        if (this.lineGroup === null) {
          this.lineGroup = { id: 0, name: '' }
        }
        if (this.position === 'HEAD OF SALES') {
          this.group = { id: 0, name: '' }
          this.lineGroup = { id: 0, name: '' }
        }
        if (this.position === 'GROUPLEAD') {
          this.group = { id: 0, name: '' }
        }
        this.isLoading = true
        var source = Encode.encode(JSON.stringify({'id': this.user_id, 'emp_no': this.employeeCode, 'fname': this.fname, 'lname': this.lname, 'nname': this.nname, 'phone': this.phone, 'email': this.email, 'group_id': this.group.id, 'groupline_id': this.lineGroup.id, 'position': this.position, 'remark': this.remark, 'create_by': this.userData.emp_no}))
        this.axios.post(process.env.API + '/editSale', { source: source }).then((response) => {
          var result = response.data
          if (result === 'success') {
            this.$emit('editSaleSuccsess')
            this.$swal('แก้ไข Sale สำเร็จ', '', 'success')
            this.isLoading = false
            this.hide()
          } else if (result === 'Sale Duplicate') {
            this.$swal('มี Sale คนนี้อยู่ในระบบอยู่แล้ว', '', 'error')
            this.isLoading = false
          } else {
            this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
            this.isLoading = false
          }
        }, () => {
          this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
          this.isLoading = false
        })
      }
    }
  }
}
</script>

<style lang="css">
.marginButton {
  margin-top: 15px !important;
}
.marginTextField {
  margin-top: -10px !important;
}
</style>
