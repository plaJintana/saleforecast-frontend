<template lang="html">
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="950">
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
                        <v-flex xs5><v-btn class="marginButton" :loading="isLoadingSearch" color="success" @click="searchPresale()"><v-icon>search</v-icon>ตรวจสอบ</v-btn></v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs10 offset-xs1 class="pr-3" v-else><v-layout><v-text-field color="green lighten-3" name="employeeCode" label="รหัสพนักงาน" v-model="employeeCode" type="text" :rules="[v => !!v || 'กรุณาใส่รหัสพนักงาน']" required disabled></v-text-field></v-layout></v-flex>
                    <v-flex xs5 offset-xs1 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="fname" label="ชื่อ" v-model="fname" type="text" :rules="[v => !!v || 'กรุณาใส่ชื่อพนักงาน']" required></v-text-field></v-flex>
                    <v-flex xs5 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="lname" label="นามสกุล" v-model="lname" type="text" :rules="[v => !!v || 'กรุณาใส่นามสกุลพนักงาน']" required></v-text-field></v-flex>
                    <v-flex xs5 offset-xs1 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="phone" label="เบอร์โทรศัพท์" v-model="phone" type="text" :rules="[v => !!v || 'กรุณาใส่เบอร์โทรศํพท์']" required></v-text-field></v-flex>
                    <v-flex xs5 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="email" label="E-mail" v-model="email" type="text" :rules="[v => !!v || 'กรุณาใส่ Email']" required></v-text-field></v-flex>
                    <v-flex xs5 offset-xs1 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="nname" label="ชื่อเล่น" v-model="nname" type="text" :rules="[v => !!v || 'กรุณาใส่ชื่อเล่น']" required></v-text-field></v-flex>
                    <v-flex xs11 offset-xs1 class="pr-3"><v-radio-group class="marginTextField" v-model="position" row><v-radio v-for="position in listPosition" class="p-r-3" :key="position" :label="position" :value="position"></v-radio></v-radio-group></v-flex>
                    <v-flex xs10 offset-xs1 class="pr-3" v-if="position !== 'HEAD OF SALES'">
                      <v-select :items="listGroup" v-model="group" label="กลุ่มงาน" item-text="name" autocomplete multiple max-height="400"></v-select>
                    </v-flex>
                    <!-- <v-flex xs10 offset-xs1 class="pr-3" v-if="position === 'NORMAL'">
                      <v-select :items="listGroup" v-model="group" label="กลุ่มงาน" item-text="name" multiple max-height="400"></v-select>
                    </v-flex> -->
                    <v-flex xs10 offset-xs1 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="remark" label="หมายเหตุ" v-model="remark" type="text" multi-line></v-text-field></v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-layout row wrap>
                    <v-flex xs4 offset-xs2 style="padding-left: 10px" v-if="state === 'add'"><v-btn :loading="isLoading" style="width: 90%" color="success" @click="addPresale()"><v-icon>assignment</v-icon>เพิ่ม</v-btn></v-flex>
                    <v-flex xs4 offset-xs2 style="padding-left: 10px" v-if="state === 'edit'" ><v-btn :loading="isLoading" style="width: 90%" color="success" @click="editPresale()"><v-icon>assignment</v-icon>แก้ไข</v-btn></v-flex>
                    <v-flex xs4><v-btn color="error" style="width: 90%" @click="clear()"><v-icon>cancel</v-icon>ล้าง</v-btn></v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-flex>
        </v-layout>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import { Encode, Decode } from '@/services'
export default {
  data () {
    return {
      messageSale: 'เพิ่ม Presale',
      dialog: false,
      employeeCode: '',
      user_id: '',
      fname: '',
      phone: '',
      email: '',
      lname: '',
      nname: '',
      remark: '',
      // lineGroup: { id: 0, name: '' },
      // listLineGroup: [],
      isLoading: false,
      isLoadingSearch: false,
      listGroup: [],
      group: [],
      // group: { id: 0, name: '' },
      // group_id: '',
      valid: false,
      listPosition: ['PRESALES', 'TEAMLEAD', 'GROUPLEAD', 'HEAD OF SALES'],
      position: 'PRESALES',
      state: 'add',
      information: '',
      presale: ''
      // requiredGroup: true
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
      this.position = 'PRESALES'
      this.messageSale = 'เพิ่ม Presales'
      this.state = 'add'
      this.dialog = true
      this.getGroupSaleTotal()
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
      // this.lineGroup = { id: 0, name: '' }
      // this.group = { id: 0, name: '' }
      this.group = []
      // this.group_id = ''
    },
    async edit (val) {
      await this.clear()
      await this.getPresale(val.emp_no)
      await this.getGroupSaleTotal()
      if (this.presale === false) {
        this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
      }
      this.user_id = this.presale.data.id
      // this.lineGroup = this.searchItemLineGroup(val.groupline_id)
      this.messageSale = 'แก้ไข Presales'
      this.state = 'edit'
      this.dialog = true
      // this.information = val
      this.employeeCode = this.presale.data.emp_no
      this.fname = this.presale.data.fname
      this.lname = this.presale.data.lname
      this.nname = this.presale.data.nname
      this.phone = this.presale.data.phone
      this.email = this.presale.data.email
      this.group = this.searchItemGroup(this.presale.group)
      // console.log(this.presale.group)

      this.position = this.presale.data.position
    },
    hide () {
      this.clear()
      this.dialog = false
    },
    searchItemGroup (val) {
      var group = []

      for (var i in val) {
        for (var j in this.listGroup) {
          if (val[i].id === this.listGroup[j].id) {
            group.push(this.listGroup[j])
            console.log(this.group)
          }
        }
      }
      if (group.length === 0) {
        group = []
      }
      // else if (group.length === 1){
      //   group.push(this.listGroup[num])
      // }
      return group
    },
    // getLineGroupSale () {
    //   this.axios.post(process.env.API + '/getLineGroupSale').then((response) => {
    //     var result = JSON.parse(Decode.decode(response.data))
    //     if (result.status === 'success') {
    //       this.listLineGroup = [{ id: 0, name: '' }]
    //       for (var i = 0; i < result.data.length; i++) {
    //         this.listLineGroup.push(result.data[i])
    //       }
    //     } else {
    //       this.listLineGroup = [{ id: 0, name: 'สายงาน' }]
    //     }
    //   })
    // },
    async getPresale (val) {
      var source = Encode.encode(JSON.stringify({'emp_no': val}))
      await this.axios.post(process.env.API + '/getPresale', { source: source }).then(async (response) => {
        var result = JSON.parse(Decode.decode(response.data))
        console.log(result)
        if (result.status === 'success') {
          this.presale = await result
          // console.log(result.group)
        } else {
          this.presale = false
        }
      }, () => {
        this.presale = false
      })
    },
    async getGroupSaleTotal (val) {
      this.listGroup = []
      // var source = Encode.encode(JSON.stringify({ 'id': val })
      await this.axios.post(process.env.API + '/getGroupSaleTotal').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        console.log(result)
        if (result.status === 'success') {
          for (var i = 0; i < result.data.length; i++) {
            this.listGroup.push({ id: result.data[i].id, name: result.data[i].name })
          }
        }
      })
    },
    searchPresale () {
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
          this.phone = result.data[0].phonenumber.replace(/ /g, '')
          this.email = result.data[0].email
          this.nname = result.data[0].nicknameth
          this.isLoadingSearch = false
        } else {
          this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
          this.isLoadingSearch = false
        }
      })
    },
    addPresale () {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        if (this.remark === null) {
          this.remark = ''
        }
        var source = Encode.encode(JSON.stringify({'emp_no': this.employeeCode, 'fname': this.fname, 'lname': this.lname, 'nname': this.nname, 'phone': this.phone, 'email': this.email, 'position': this.position, 'group': this.group, 'remark': this.remark, 'create_by': this.userData.emp_no}))
        this.axios.post(process.env.API + '/addPresale', { source: source }).then((response) => {
          var result = response.data
          if (result === 'success') {
            this.$emit('addPresaleSuccsess')
            this.$swal('เพิ่ม Presales สำเร็จ', '', 'success')
            this.isLoading = false
            this.$emit('addPresaleSuccsess')
            this.hide()
          } else if (result === 'Presale Duplicate') {
            this.$swal('มี Presales คนนี้อยู่ในระบบอยู่แล้ว', '', 'error')
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
    editPresale () {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        console.log(this.position)
        var source = Encode.encode(JSON.stringify({'emp_no': this.employeeCode, 'fname': this.fname, 'lname': this.lname, 'nname': this.nname, 'phone': this.phone, 'email': this.email, 'position': this.position, 'group': this.group, 'remark': this.remark, 'create_by': this.userData.emp_no}))
        // var source = Encode.encode(JSON.stringify({'id': this.user_id, 'emp_no': this.employeeCode, 'fname': this.fname, 'lname': this.lname, 'phone': this.phone, 'email': this.email, 'position': this.position, 'remark': this.remark, 'create_by': this.userData.emp_no})
        this.axios.post(process.env.API + '/editPresale', { source: source }).then((response) => {
          var result = response.data
          console.log(result)
          if (result === 'success') {
            this.$emit('editPresaleSuccsess')
            this.$swal('แก้ไข Presales สำเร็จ', '', 'success')
            this.isLoading = false
            this.hide()
          } else if (result === 'Presale Duplicate') {
            this.$swal('มี Presales คนนี้อยู่ในระบบอยู่แล้ว', '', 'error')
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
