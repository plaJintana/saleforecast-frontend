<template lang="html">
  <v-layout row wrap>
    <v-flex xs8 offset-xs2>
      <v-dialog v-model="addlinegroupsale" max-width="700">
        <v-card>
          <v-card-title class="centerDiv"><h3>เพิ่มสายงาน</h3></v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs8 offset-xs2><v-text-field require label="ชื่อสายงาน" v-model="nameLineGroup"></v-text-field></v-flex>
              <v-flex xs8 offset-xs2><v-text-field textarea label="รายละเอียด" v-model="remark"></v-text-field></v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-layout row wrap>
              <v-flex xs2 offset-xs4>
                <v-btn @click="addLineGroup()" :loading="isLoading" color="success">เพิ่มสายงาน</v-btn>
              </v-flex>
              <v-flex xs1>
                <v-btn @click="cancel()" color="error">ยกเลิก</v-btn>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import {Encode, Decode} from '@/services'
export default {
  data () {
    return {
      addlinegroupsale: false,
      nameLineGroup: '',
      remark: '',
      isLoading: false,
      admin: ''
    }
  },
  methods: {
    addLineGroup () {
      this.isLoading = true
      var source = Encode.encode(JSON.stringify({name: this.nameLineGroup, remark: this.remark, request_emp: this.admin}))
      this.axios.post(process.env.API + '/addLineGroup', {source: source}).then((response) => {
        if (response.data === 'success') {
          this.isLoading = false
          this.$swal('เพิ่มสายงานสำเร็จ', '', 'success')
          this.$emit('success')
          this.nameLineGroup = ''
          this.remark = ''
          this.addlinegroupsale = false
        } else {
          this.isLoading = false
          this.addlinegroupsale = false
          this.nameLineGroup = ''
          this.remark = ''
          this.$swal('เพิ่มสายงานไม่สำเร็จ', '', 'error')
        }
      })
    },
    openDialog (data) {
      this.admin = JSON.parse(Decode.decode(data)).admin
      this.addlinegroupsale = true
    },
    cancel () {
      this.nameLineGroup = ''
      this.remark = ''
      this.addlinegroupsale = false
    }
  }
}
</script>
