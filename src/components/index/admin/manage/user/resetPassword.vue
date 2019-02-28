<template>
  <v-dialog v-model="dialogReset" max-width="700">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title class="centerDiv"><h1 style="padding-top:20px;">Reset Password</h1></v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs8 offset-xs2>
                <v-text-field label="new password" v-model="password" :rules="passwordRules" type="password" prepend-icon="lock"></v-text-field>
              </v-flex>
              <v-flex xs2></v-flex>
              <v-flex xs8 offset-xs2>
                <v-text-field label="re-password" v-model="repassword" :rules="repasswordRules" type="password" prepend-icon="replay"></v-text-field>
              </v-flex>
              <v-flex xs2></v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-layout row>
              <v-flex xs3>
              </v-flex>
              <v-flex xs6 class="centerDiv" style="padding-bottom: 20px;">
                <v-btn color="success" :loading="isLoading" @click="resetPassword()">รีเซต</v-btn>
                <v-btn color="warning" @click="clear()">ล้าง</v-btn>
                <v-btn color="error" @click="close()">ปิด</v-btn>
              </v-flex>
              <v-flex xs3>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>

<script>
import {Decode, Encode} from '@/services'
export default {
  data () {
    return {
      dialogReset: false,
      password: '',
      repassword: '',
      emp_no: '',
      emp_request: '',
      isLoading: false,
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
    openDialog (data) {
      this.emp_request = JSON.parse(Decode.decode(data)).emp_request
      this.emp_no = JSON.parse(Decode.decode(data)).emp_no
      this.dialogReset = true
    },
    resetPassword () {
      this.isLoading = true
      var source = Encode.encode(JSON.stringify({emp_no: this.emp_no, password: this.password, emp_request: this.emp_request}))
      this.axios.post(process.env.API + '/resetPassword', {source: source}).then((response) => {
        if (response.data === 'success') {
          this.$swal('แก้ไขพาสเวิร์ดสำเร็จ', '', 'success')
          this.dialogReset = false
          this.isLoading = false
        } else {
          this.$swal('แก้ไขไม่สำเร็จ', '', 'error')
          this.isLoading = false
        }
      })
    },
    clear () {
      this.password = ''
      this.repassword = ''
    },
    close () {
      this.dialogReset = false
    }
  }
}
</script>
