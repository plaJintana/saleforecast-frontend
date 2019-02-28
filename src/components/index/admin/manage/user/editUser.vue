<template>
  <div>
    <v-dialog v-model="edit" max-width="700">
      <v-card style="padding-bottom: 20px">
        <v-card-title class="centerDiv">
          <h2>แก้ไข</h2>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs8 offset-xs2><v-text-field disabled v-model="code"></v-text-field></v-flex>
            <v-flex xs8 offset-xs2><v-text-field label="ชื่อ" v-model="name"></v-text-field></v-flex>
            <v-flex xs8 offset-xs2><v-text-field label="นามสกุล" v-model="lastname"></v-text-field></v-flex>
            <v-flex xs8 offset-xs2><v-text-field label="E-mail" v-model="email"></v-text-field></v-flex>
            <v-flex xs8 offset-xs2><v-text-field label="เบอร์โทรศัพท์" v-model="phone"></v-text-field></v-flex>
            <v-flex xs8 offset-xs2><v-text-field label="แผนก" v-model="division"></v-text-field></v-flex>
            <v-flex xs8 offset-xs2><v-text-field label="ส่วนงาน" v-model="section"></v-text-field></v-flex>
            <v-flex xs8 offset-xs2><v-text-field label="ตำแหน่ง" v-model="position"></v-text-field></v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap>
            <v-flex xs2 offset-xs4>
              <v-btn @click="editUser()" color="success">แก้ไข</v-btn>
            </v-flex>
            <v-flex xs1>
              <v-btn @click="cancel()" color="error">ยกเลิก</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {Decode, Encode} from '@/services'
export default {
  data () {
    return {
      code: '',
      name: '',
      lastname: '',
      email: '',
      phone: '',
      division: '',
      section: '',
      position: '',
      edit: false,
      admin: '',
      raw_data: ''
    }
  },
  methods: {
    editUser () {
      if (this.name !== this.raw_data.name || this.lastname !== this.raw_data.lastname || this.email !== this.raw_data.email || this.phone !== this.raw_data.phone || this.division !== this.raw_data.division || this.section !== this.raw_data.section || this.position !== this.raw_data.position) {
        var source = Encode.encode(JSON.stringify({'id': this.code, 'name': this.name, 'lastname': this.lastname, 'email': this.email, 'phone': this.phone, 'division': this.division, 'section': this.section, 'position': this.position, 'emp_request': this.admin['emp_no']}))
        this.axios.post(process.env.API + '/editUser', {source: source}).then((response) => {
          if (response.data === 'success') {
            this.$swal('อัพเดทเรียบร้อย', '', 'success')
            this.edit = false
            this.$emit('success')
          } else {
            this.$swal('อัพเดทไม่สำเร็จ', '', 'error')
          }
        })
      } else {
        this.edit = false
      }
    },
    cancel () {
      this.edit = false
    },
    fillData (data) {
      this.edit = true
      this.raw_data = JSON.parse(Decode.decode(data))
      this.code = this.raw_data.code
      this.name = this.raw_data.name
      this.lastname = this.raw_data.lastname
      this.email = this.raw_data.email
      this.phone = this.raw_data.phone
      this.division = this.raw_data.division
      this.section = this.raw_data.section
      this.position = this.raw_data.position
    }
  },
  created () {
    if (this.$cookies.isKey('information')) {
      this.admin = JSON.parse(Decode.decode(this.$cookies.get('information')))
    }
  }
}
</script>
