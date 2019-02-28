<template>
  <v-layout row wrap>
    <v-flex xs8 offset-xs2>
      <v-dialog v-model="editsalelinegroup" max-width="700">
        <v-card>
          <v-card-title class="centerDiv"><h3>แก้ไขชื่อสายงาน</h3></v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs8 offset-xs2><v-text-field label="สายงาน" v-model="saleGroupLine"></v-text-field></v-flex>
              <v-flex xs8 offset-xs2><v-text-field label="เพิ่มเติม" textarea v-model="remark"></v-text-field></v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-layout row wrap>
              <v-flex xs2 offset-xs4>
                <v-btn @click="editSaleGroupLine()" :loading="isLoading" color="success">แก้ไข</v-btn>
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
      editsalelinegroup: false,
      saleGroupLine: '',
      idlinegroup: '',
      admin: '',
      remark: '',
      isLoading: false,
      rawdata: ''
    }
  },
  methods: {
    openDialog (data) {
      this.editsalelinegroup = true
      this.rawdata = JSON.parse(Decode.decode(data))
      this.admin = JSON.parse(Decode.decode(data)).admin
      this.saleGroupLine = JSON.parse(Decode.decode(data)).salegroupline
      this.idlinegroup = JSON.parse(Decode.decode(data)).idgroupline
    },
    editSaleGroupLine () {
      this.isLoading = true
      if (this.rawdata.salegroupline === this.saleGroupLine && this.remark === '') {
        this.isLoading = false
        this.editsalelinegroup = false
      } else {
        var source = Encode.encode(JSON.stringify({idlinegroup: this.idlinegroup, salegroupline: this.saleGroupLine, requestEMP: this.admin, remark: this.remark}))
        this.axios.post(process.env.API + '/editLineSaleGroup', {source: source}).then((response) => {
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
      this.editsalelinegroup = false
    }
  }
}
</script>
