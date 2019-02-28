<template lang="html">
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="800">
        <v-layout>
          <v-flex xs12 md12 class="centerDiv">
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-card style="padding-bottom: 4em;width: 100%;">
                <v-card-text class="marginTextField" style="padding-top:4em;">
                  <h2><center>{{messageBusiness}}</center></h2>
                  <v-layout row wrap>
                    <v-flex xs10 offset-xs1 class="pr-3" v-if="state === 'add'">
                      <v-layout row wrap>
                        <v-flex xs6><v-text-field color="green lighten-3" name="employeeCode" label="รหัสพนักงาน" v-model="employeeCode" type="text" :rules="[v => !!v || 'กรุณาใส่รหัสพนักงาน']" required></v-text-field></v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs5><v-btn class="marginButton" :loading="isLoadingSearch" color="success" @click="searchBusiness()"><v-icon>search</v-icon>ตรวจสอบ</v-btn></v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs10 offset-xs1 class="pr-3" v-else><v-layout><v-text-field color="green lighten-3" name="employeeCode" label="รหัสพนักงาน" v-model="employeeCode" type="text" :rules="[v => !!v || 'กรุณาใส่รหัสพนักงาน']" required disabled></v-text-field></v-layout></v-flex>
                    <v-flex xs5 offset-xs1 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="fname" label="ชื่อ" v-model="fname" type="text" :rules="[v => !!v || 'กรุณาใส่ชื่อพนักงาน']" required></v-text-field></v-flex>
                    <v-flex xs5 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="lname" label="นามสกุล" v-model="lname" type="text" :rules="[v => !!v || 'กรุณาใส่นามสกุลพนักงาน']" required></v-text-field></v-flex>
                    <v-flex xs5 offset-xs1 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="phone" label="เบอร์โทรศัพท์" v-model="phone" type="text" :rules="[v => !!v || 'กรุณาใส่เบอร์โทรศํพท์']" required></v-text-field></v-flex>
                    <v-flex xs5 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="email" label="E-mail" v-model="email" type="text" :rules="[v => !!v || 'กรุณาใส่ Email']" required></v-text-field></v-flex>
                    <v-flex xs5 offset-xs1 class="pr-3"><v-text-field class="marginTextField" color="green lighten-3" name="nname" label="ชื่อเล่น" v-model="nname" type="text" :rules="[v => !!v || 'กรุณาใส่ชื่อเล่น']" required></v-text-field></v-flex>
                    <v-flex xs11 offset-xs1 class="pr-3"><v-radio-group class="marginTextField" v-model="position" row><v-radio v-for="position, indexPosition in listPosition" class="p-r-3" :key="indexPosition" :label="position" :value="position"></v-radio></v-radio-group></v-flex>
                    <v-flex xs10 offset-xs1 class="pr-3"><v-select :items="statesBusiness" type="text" v-model="addGroupBusiness" label="โปรดเลือกฝ่าย" multiple chips autocomplete item-text="name"></v-select></v-flex></v-layout>
                  </v-card-text>
                  <v-card-actions>
                    <v-layout row wrap>
                      <v-flex xs4 offset-xs2 style="padding-left: 10px" v-if="state === 'add'"><v-btn :loading="isLoading" style="width: 90%" color="success" @click="addBusiness()"><v-icon>assignment</v-icon>เพิ่ม</v-btn></v-flex>
                      <v-flex xs4 offset-xs2 style="padding-left: 10px" v-if="state === 'edit'" ><v-btn :loading="isLoading" style="width: 90%" color="success" @click="editBusiness()"><v-icon>assignment</v-icon>แก้ไข</v-btn></v-flex>
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
        messageBusiness: 'เพิ่ม Business',
        dialog: false,
        employeeCode: '',
        user_id: '',
        fname: '',
        phone: '',
        email: '',
        lname: '',
        remark: '',
        addGroupBusiness: '',
        // lineGroup: { id: 0, name: '' },
        // listLineGroup: [],
        isLoading: false,
        isLoadingSearch: false,
        listGroup: [],
        group: [],
        nname: '',
        // group: { id: 0, name: '' },
        // group_id: '',
        valid: false,
        // listPosition: ['NORMAL'],
        // position: 'NORMAL',
        state: '',
        information: '',
        Business: '',
        listPosition: ['BD', 'BDLEAD', 'HEAD OF BD'],
        position: 'BD',
        groupBusiness: [],
        statesBusiness: []
        // requiredGroup: true
      }
    },
    created () {
      this.getBD()
    },
    watch: {
      addGroupBusiness (val) {
        // console.log(val)
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
        this.position
        this.messageBusiness = 'เพิ่ม Business'
        this.state = 'add'
        this.dialog = true
        // this.getGroupBusinessTotal()
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
        // this.lineGroup = { id: 0, name: '' }
        // this.group = { id: 0, name: '' }
        this.group = []
        // this.group_id = ''
      },
      getBD () {
        this.axios.post(process.env.API + '/getBusiness').then((response) => {
          var result = JSON.parse(Decode.decode(response.data))
          // console.log(result)
          // arr(result)
          this.statesBusiness = result.data

        })
      },
      async edit (val) {
        // console.log('1230')
        await this.clear()
        await this.getBusiness(val.emp_no)
        // await this.getGroupBusinessTotal()
        if (this.Business === false) {
          this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
        }
        this.user_id = this.Business.data.id
        // this.lineGroup = this.searchItemLineGroup(val.groupline_id)
        this.messageBusiness = 'แก้ไข Business'
        this.state = 'edit'
        this.dialog = true
        // this.information = val
        this.employeeCode = this.Business.data.emp_no
        this.fname = this.Business.data.fname
        this.lname = this.Business.data.lname
        this.phone = this.Business.data.phone
        this.email = this.Business.data.email
        this.nname = this.Business.data.nname
        // console.log(this.Business.bd)
        this.addGroupBusiness = this.searchItemBD(this.Business.bd)
        console.log(this.groupBusiness)
        this.position = this.Business.data.position
        // console.log(this.Business.data)
      },
      hide () {
        this.clear()
        this.dialog = false
      },
      searchItemBD (val) {
        var groupbd = []
        var groupbdTeam = {}
        // for (var i = 0; i < this.groupBusiness.length; i++) {
        if (val.length !== 0) {
          for (var i = 0; i < val.length; i++) {
            groupbdTeam = { id: '', name: '' }
            groupbdTeam['id'] = parseInt(val[i].id)
            groupbdTeam['name'] = val[i].name
            groupbd.push(groupbdTeam)
          }
        } else {
          groupbd = []
        }
        return groupbd
      },
      async getGroupBD (val) {
        var source = Encode.encode(JSON.stringify({ 'id': val }))
        await this.axios.post(process.env.API + '/getGroupBD', { source: source }).then((response) => {
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
      async getBusiness (val) {
        var source = Encode.encode(JSON.stringify({'emp_no': val}))
        await this.axios.post(process.env.API + '/getBusinesss', { source: source }).then(async (response) => {
          var result = JSON.parse(Decode.decode(response.data))
          if (result.status === 'success') {
            this.Business = await result
            // console.log('123')
          } else {
            this.Business = false
          }
        }, () => {
          this.Business = false
        })
      },
      // async getGroupBusinessTotal (val) {
      //   this.listGroup = []
      //   // var source = Encode.encode(JSON.stringify({ 'id': val })
      //   await this.axios.post(process.env.API + '/getGroupBusinessTotal').then((response) => {
      //     var result = JSON.parse(Decode.decode(response.data))
      //     if (result.status === 'success') {
      //       for (var i = 0; i < result.data.length; i++) {
      //         this.listGroup.push({ id: result.data[i].id, name: result.data[i].name })
      //       }
      //     }
      //   })
      // },
      searchBusiness () {
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
            this.isLoadingSearch = false
          } else {
            this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
            this.isLoadingSearch = false
          }
        })
      },
      addBusiness () {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          if (this.remark === null) {
            this.remark = ''
          }
          console.log(this.addGroupBusiness)
          var source = Encode.encode(JSON.stringify({'nname': this.nname,'emp_no': this.employeeCode, 'fname': this.fname, 'lname': this.lname, 'phone': this.phone, 'email': this.email, 'position': this.position, 'groupBusiness': this.addGroupBusiness, 'group': this.group, 'remark': this.remark, 'create_by': this.userData.emp_no}))
          this.axios.post(process.env.API + '/insertBD', { source: source }).then((response) => {
            var result = response.data
            console.log(result)
            if (result === 'success') {
              this.$emit('addBusinessSuccsess')
              this.$swal('เพิ่ม Business สำเร็จ', '', 'success')
              this.isLoading = false
              this.$emit('addBusinessSuccsess')
              this.hide()
            } else if (result === 'Business Duplicate') {
              this.$swal('มี Business คนนี้อยู่ในระบบอยู่แล้ว', '', 'error')
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
      editBusiness () {
        // console.log(this.groupBusiness)
        // if (this.groupBusiness === null || this.groupBusiness.name === '') {
        //   this.$swal('กรุณาเลือกฝ่าย!!!!', '', 'warning')
        //   this.isLoading = false
        //   return
        //
        // } else {

        // console.log(this.position)
        if (this.$refs.form.validate()) {
          this.isLoading = true
          var source = Encode.encode(JSON.stringify({'nname': this.nname,'emp_no': this.employeeCode, 'fname': this.fname, 'lname': this.lname, 'phone': this.phone, 'email': this.email, 'position': this.position, 'groupBusiness': this.addGroupBusiness, 'remark': this.remark, 'create_by': this.userData.emp_no}))
          // var source = Encode.encode(JSON.stringify({'id': this.user_id, 'emp_no': this.employeeCode, 'fname': this.fname, 'lname': this.lname, 'phone': this.phone, 'email': this.email, 'position': this.position, 'remark': this.remark, 'create_by': this.userData.emp_no})
          this.axios.post(process.env.API + '/editBusiness', { source: source }).then((response) => {
            var result = response.data
            // console.log("yuoooo")
            // console.log(response.data.status)
            // console.log("yuoooo")
            if (response.data.status === 'success') {
              this.$emit('editBusinessSuccsess')
              this.$swal('แก้ไข Business สำเร็จ', '', 'success')
              this.isLoading = false
              this.hide()
            } else if (result === 'Business Duplicate') {
              this.$swal('มี Business คนนี้อยู่ในระบบอยู่แล้ว', '', 'error')
              this.isLoading = false
            } else {
              this.$swal('กรุณาติดต่อผู้ดูแลระบบ1', '', 'error')
              this.isLoading = false
            }
          }, () => {
            this.$swal('กรุณาติดต่อผู้ดูแลระบบ2', '', 'error')
            this.isLoading = false
          })
        }
        // }
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
