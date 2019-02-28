<template>
  <v-layout row wrap>
    <v-flex xs8 offset-xs2>
      <v-dialog v-model="editsalegroup" max-width="700">
        <v-card>
          <v-card-title class="centerDiv"><h3>แก้ไขกลุ่มงาน</h3></v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs8 offset-xs2><v-text-field label="กลุ่มงาน" v-model="salegroup"></v-text-field></v-flex>
              <v-flex xs8 offset-xs2><v-text-field label="เพิ่มเติม" v-model="remark" textarea></v-text-field></v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-layout row wrap>
              <v-flex xs2 offset-xs4>
                <v-btn @click="editSaleGroup()" :loading="isLoading" color="success">แก้ไข</v-btn>
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
import {Decode, Encode} from '@/services'
export default {
  data () {
    return {
      editsalegroup: false,
      salegroup: '',
      remark: '',
      idgroup: '',
      admin: '',
      rawdata: '',
      isLoading: false
    }
  },
  methods: {
    openDialog (data) {
      this.editsalegroup = true
      this.rawdata = JSON.parse(Decode.decode(data))
      this.salegroup = JSON.parse(Decode.decode(data)).salegroup
      this.idgroup = JSON.parse(Decode.decode(data)).idgroup
      this.admin = JSON.parse(Decode.decode(data)).admin
    },
    editSaleGroup () {
      this.isLoading = true
      if (this.rawdata.salegroup === this.salegroup && this.remark === '') {
        this.editsalegroup = false
        this.isLoading = true
      } else {
        var source = Encode.encode(JSON.stringify({salegroup: this.salegroup, idgroup: this.idgroup, requestEMP: this.admin, remark: this.remark}))
        this.axios.post(process.env.API + '/editSaleGroup', {source: source}).then((response) => {
          if (response.data === 'success') {
            this.$swal('แก้ไขสำเร็จ', '', 'success')
            this.$emit('success')
            this.cancel()
            this.isLoading = false
          } else {
            this.$swal('แก้ไขไม่สำเร็จ', '', 'error')
            this.cancel()
            this.isLoading = false
          }
        })
      }
    },
    cancel () {
      this.editsalegroup = false
    }
  }
}
</script>
