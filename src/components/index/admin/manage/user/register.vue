<template>
  <v-dialog v-model="dialogregist" max-width="700">
    <div class="">
      <v-layout row wrap>
        <v-flex xs12 >
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-card style="padding-bottom: 2em;width: 100%;
            min-height: 400px;"  class="centerDiv">
            <v-card-title class="centerDiv">
              <h1>ลงทะเบียน</h1>
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs7 md6 offset-xs2><v-text-field label="รหัสพนักงาน" required :rules="code" v-model="employeeCode"></v-text-field></v-flex><v-flex xs2 class="centerDiv"><v-btn color="warning" @click="searchUser()" :loading="isLoading"><v-icon small>search</v-icon>ตรวจสอบ</v-btn></v-flex><v-flex xs2></v-flex>
                <v-flex xs10 md4 offset-xs2 class="pr-3"><v-text-field label="ชื่อ" required :rules="nameRules"  v-model="name"></v-text-field></v-flex>
                <v-flex xs10 md4 class="margin-register"><v-text-field label="นามสกุล" required :rules="nameRules"  v-model="lastname"></v-text-field></v-flex><v-flex xs2></v-flex>
                <v-flex xs10 md4 offset-xs2 class="pr-3"><v-text-field label="E-mail" required :rules="emailRules"  v-model="email"></v-text-field></v-flex>
                <v-flex xs10 md4 class="margin-register"><v-text-field label="เบอร์" required :rules="phoneRules" v-model="phone"></v-text-field></v-flex><v-flex xs2></v-flex>
                <v-flex xs10 md4 offset-xs2 class="pr-3"v-if="this.flagDivision"><v-text-field label="แผนก" require v-model="department" ></v-text-field></v-flex>
                <v-flex xs10 md4 offset-xs2 v-else><v-select :items="allDivision" required label="แผนก" v-model="department" autocomplete item-text="name"></v-select></v-flex>
                <v-flex xs10 md4 class="pr-3"  v-if="this.flagPosition || this.flagInsert"><v-text-field label="ส่วนงาน" v-model="section" autocomplete ></v-text-field></v-flex>
                <v-flex xs10 md4 v-if="this.flagPosition"><v-select :items="allPosition"  label="ตำแหน่ง" autocomplete v-model="position"item-text="name" ></v-select></v-flex>
                <v-flex xs10 md4 offset-xs2 class="pr-3" v-else-if="this.flagInsert"><v-text-field label="ตำแหน่ง" v-model="position" ></v-text-field></v-flex>
                <v-flex xs10 md4 class="margin-register"><v-select v-if="type === 'manageAdmin'" :items="allPermission" label="ระดับการใช้งาน" v-model="permission" item-text="name" item-value="value"></v-select>
                  <v-select v-if="type === 'manageUser'":items="allPermissionUser" label="ระดับการใช้งาน" v-model="permission" item-text="name" item-value="value"></v-select></v-flex>
                  <v-flex xs10 md8 offset-xs2 class="pr-3" v-if="type === 'manageAdmin'" ><v-select :items="allAdminType" label="ส่วนงานที่ดูแล" v-model="adminType" item-text="name" item-value="value"></v-select></v-flex>
                  <v-flex xs10 md4 offset-xs2 class="pr-3"><v-text-field type="password" :rules="passwordRules" required v-model="password"  label="password"></v-text-field></v-flex>
                  <v-flex xs10 md4 class="margin-register"><v-text-field type="password" :rules="repasswordRules" required v-model="repassword"  label="re-enter"></v-text-field></v-flex><v-flex xs2></v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-layout row wrap>
                  <v-flex xs4 offset-xs2 style="padding-left: 10px"><v-btn style="width: 90%" @click="register()" dark color="success"><v-icon>assignment</v-icon>ลงทะเบียน</v-btn></v-flex>
                  <v-flex xs4><v-btn style="width: 90%" @click="close()" dark color="error"><v-icon>cancel</v-icon>ยกเลิก</v-btn></v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-flex>
      </v-layout>
    </div>
  </v-dialog>
</template>
<script>
import {Encode, Decode} from '@/services'
export default {
  data () {
    return {
      adminType: '',
      type: '',
      employeeCode: '',
      name: '',
      phone: '',
      email: '',
      lastname: '',
      valid: false,
      allDivision: [],
      department: '',
      allPosition: [],
      allAdminType: [
        {name: 'ADMIN', value: 'ADMIN'},
        {name: 'SALE', value: 'SALE'},
        {name: 'PRESALE', value: 'PRESALE'},
        {name: 'BUSINESS Development', value: 'BUSINESS'}
      ],
      allPermission: [
        {name: 'Admin', value: '1'},
        {name: 'User', value: '0'}
      ],
      allPermissionUser: [
        {name: 'User', value: '0'}
      ],
      position: '',
      password: '',
      repassword: '',
      flagPosition: false,
      flagDivision: false,
      flagInsert: false,
      dialogregist: false,
      user: '',
      isLoading: false,
      section: '',
      permission: '',
      code: [
        v => !!v || 'กรุณากรอกข้อมูล',
        v => (!!v && v.length === 5) || 'โปรดกรอกรหัสพนักงาน 5 หลัก',
        v => /^([0-9])+$/.test(v) || 'กรุณาใส่เป็นตัวเลขเท่านั้น'
      ],
      nameRules: [
        v => !!v || 'กรุณากรอกข้อมูล',
        v => /^([ก-๏A-z ])+$/.test(v) || 'กรุณากรอกภาษาไทยหรืออังกฤษเท่านั้น'
      ],
      phoneRules: [
        v => !!v || 'กรุณากรอกข้อมูล',
        v => /^([0-9])+$/.test(v) || 'กรุณาใส่เป็นตัวเลขเท่านั้น'
      ],
      emailRules: [
        v => !!v || 'กรุณากรอกข้อมูล',
        v => !!v || 'กรุณาใส่อีเมล์',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'รูปแบบอีเมล์ไม่ถูกต้อง'
      ],
      passwordRules: [
        v => !!v || 'กรุณากรอกข้อมูล',
        v => !!v || 'กรุณาใส่รหัสผ่าน',
        v => /^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,})+$/.test(v) || 'รหัสผ่านต้องมีตัวเลขหรือตัวอักษรภาษาอังกฤษตัวใหญ่หรือตัวอักษรภาษาอังกฤษตัวเล็ก อย่างน้อย 1 ตัว ความยาวอย่างน้อย 8'
      ],
      repasswordRules: [
        v => !!v || 'กรุณากรอกข้อมูล',
        v => !!v || 'กรุณาใส่รหัสผ่านซ้ำ',
        v => v === this.password || 'กรุณาใส่รหัสผ่านให้ตรงกัน'
      ]
    }
  },
  methods: {
    register () {
      if (this.type === 'manageUser') {
        this.adminType = ''
      }
      var department
      if (this.flagDivision) {
        department = this.department
      } else {
        department = this.department['name']
      }
      var source = Encode.encode(JSON.stringify({employeecode: this.employeeCode, fname: this.name, lname: this.lastname, phone: this.phone, department: department, section: this.section, position: this.position, create_by: this.user['emp_no'], email: this.email, type: this.adminType, password: this.password, permission: this.permission}))
      this.axios.post(process.env.API + '/register', {source: source}).then((response) => {
        if (response.data === 'success') {
          this.$swal('ลงทะเบียนสำเร็จ', '', 'success')
          this.$emit('success')
          this.close()
        } else if (response.data === 'user already exsist') {
          this.$swal('บัญชีผู้ใช้นี้ถูกใช้แล้ว', '', 'error')
          this.clear()
        } else {
          this.$swal('ลงทะเบียนไม่สำเร็จ', '', 'error')
          this.clear()
        }
      })
    },
    clear () {
      this.employeeCode = ''
      this.name = ''
      this.lastname = ''
      this.phone = ''
      this.department = ''
      this.position = ''
      this.section = ''
      this.email = ''
      this.password = ''
      this.permission = ''
      this.repassword = ''
      this.flagInsert = false
      this.flagDivision = false
      this.flagPosition = false
      this.$refs.form.reset()
    },
    getDivision () {
      this.axios.post(process.env.API + '/getDivision').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.allDivision = result.data
        } else {
          console.log('ไม่สามารถเรียกแผนกได้')
        }
      })
    },
    getPosition () {
      var source = Encode.encode(JSON.stringify({'id': this.department['id']}))
      this.axios.post(process.env.API + '/getPosition', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.flagPosition = true
          this.allPosition = result.data
        } else {
          console.log('ไม่สามารถเรียกตำแหน่งได้')
        }
      })
    },
    searchUser () {
      this.isLoading = true
      var source = Encode.encode(JSON.stringify({id: this.employeeCode}))
      this.axios.post(process.env.API + '/getUser', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.flagDivision = true
          this.flagInsert = true
          this.isLoading = false
          var fullname = result.data[0].thainame.split(' ')
          this.lastname = fullname.pop()
          this.name = fullname.pop()
          this.phone = result.data[0].phonenumber.replace(/ /g, '')
          this.department = result.data[0].orgname
          this.section = result.data[0].section
          this.email = result.data[0].email
          this.position = result.data[0].positionname
        } else {
          this.$swal('ไม่มีข้อมูลพนักงาน', '', 'error')
          this.isLoading = false
        }
      })
    },
    openDialog (val) {
      this.type = val
      this.dialogregist = true
    },
    close () {
      this.dialogregist = false
      this.clear()
    }
  },
  created () {
    this.getDivision()
    if (this.$cookies.isKey('information')) {
      this.user = JSON.parse(Decode.decode(this.$cookies.get('information')))
    }
  },
  watch: {
    department: function (val) {
      if (val !== null) {
        if (!this.flagDivision) {
          this.getPosition()
        }
      }
    }
  }
}
</script>
<style lang="css">
.list__tile__title {
  min-width: 100% !important;
}
</style>
