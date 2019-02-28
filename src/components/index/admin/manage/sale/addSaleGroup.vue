<template>
  <v-layout row wrap>
    <v-flex xs8 offset-xs2>
      <v-dialog  v-model="addgroupsale" max-width="700">
        <v-card>
          <v-card-title class="centerDiv"><h3>เพิ่มกลุ่มงาน</h3></v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs8 offset-xs2><v-text-field v-model="salegroupline" label="สายงาน" disabled required></v-text-field></v-flex>
              <v-flex xs8 offset-xs2><v-text-field v-model="salegroup" label="กลุ่มงาน" required></v-text-field></v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-layout row wrap>
              <v-flex xs2 offset-xs4>
                <v-btn @click="addSaleGroup()" :loading="isLoading" color="success">เพิ่มกลุ่มงาน</v-btn>
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
      addgroupsale: false,
      salegroupline: '',
      salegroup: '',
      isLoading: false,
      idgroupline: '',
      admin: ''
    }
  },
  methods: {
    openDialog (data) {
      this.addgroupsale = true
      this.idgroupline = JSON.parse(Decode.decode(data)).idgroupline
      this.salegroupline = JSON.parse(Decode.decode(data)).salegroupline
      this.admin = JSON.parse(Decode.decode(data)).admin
    },
    addSaleGroup () {
      this.isLoading = true
      var source = Encode.encode(JSON.stringify({idgroupline: this.idgroupline, salegroup: this.salegroup, requestEMP: this.admin}))
      this.axios.post(process.env.API + '/addSaleGroup', {source: source}).then((response) => {
        if (response.data === 'success') {
          this.$swal('เพิ่มกลุ่มงานสำเร็จ', '', 'success')
          this.$emit('success')
          this.cancel()
          this.isLoading = false
        } else {
          this.$swal('เพิ่มกลุ่มงานไม่สำเร็จ', '', 'error')
          this.cancel()
          this.isLoading = false
        }
      })
    },
    cancel () {
      this.addgroupsale = false
      this.salegroup = ''
      this.salegroupline = ''
      this.idgroupline = ''
    }
  }
}
</script>
