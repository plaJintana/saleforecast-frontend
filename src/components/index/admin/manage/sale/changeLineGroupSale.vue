<template>
  <v-layout row wrap>
    <v-flex xs8 offset-xs2>
      <v-dialog v-model="changelinegroup" max-width="700">
        <v-card>
          <v-card-title><h3>ย้ายสายงาน</h3></v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs8 offset-xs2><v-text-field label="กลุ่มงาน" disabled v-model="groupSale"></v-text-field></v-flex>
              <v-flex xs8 offset-xs2><v-text-field label="สายงาน" disabled v-model="oldGroupSaleLine"></v-text-field></v-flex>
              <v-flex xs8 offset-xs2>
                <v-select
                :items="allGroupSaleLine"
                label="สายงานใหม่"
                autocomplete
                v-model="idNewGroupSaleLine"
                v-if = "allGroupSaleLine.name !== oldGroupSaleLine"
                item-text="name"
                item-value="id"
                >
              </v-select></v-flex>
              <v-flex xs8 offset-xs2><v-text-field textarea label="เนื่องจาก" v-model="remark" ></v-text-field></v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-layout row wrap>
              <v-flex xs2 offset-xs4>
                <v-btn @click="changeLineGroup()" :loading="isLoading" color="success">ย้ายกลุ่มงาน</v-btn>
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
      changelinegroup: false,
      groupSale: '',
      oldGroupSaleLine: '',
      allGroupSaleLine: [],
      idNewGroupSaleLine: '',
      idOldGroupSaleLine: '',
      idGroupSale: '',
      remark: '',
      isLoading: false,
      admin: ''
    }
  },
  methods: {
    openDialog (data) {
      this.changelinegroup = true
      var rawdata = JSON.parse(Decode.decode(data))
      this.idGroupSale = rawdata.id
      this.groupSale = rawdata.name
      this.admin = rawdata.admin
      this.getGroupSaleLine(rawdata.id)
    },
    getGroupSaleLine (id) {
      var source = Encode.encode(JSON.stringify({'id': id}))
      this.axios.post(process.env.API + '/getLineGroupSale', { source: source }).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.oldGroupSaleLine = result.data[0].name
          this.idOldGroupSaleLine = result.data[0].id
          this.getAllGroupSaleLine(this.idOldGroupSaleLine)
        } else {
          console.log('ข้อมูลดึงมาไม่สำเร็จ')
        }
      })
    },
    getAllGroupSaleLine (id) {
      var source = Encode.encode(JSON.stringify({'id': id}))
      this.axios.post(process.env.API + '/getLineGroupSale', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.allGroupSaleLine = result.data
        } else {
          console.log('ข้อมูลดึงมาไม่สำเร็จ')
        }
      })
    },
    changeLineGroup () {
      this.isLoading = true
      var source = Encode.encode(JSON.stringify({idgroup: this.idGroupSale, idnewgroupline: this.idNewGroupSaleLine, idoldgroupline: this.idOldGroupSaleLine, requestEMP: this.admin, remark: this.remark}))
      this.axios.post(process.env.API + '/changeLineGroup', {source: source}).then((response) => {
        if (response.data === 'success') {
          this.$swal('ย้ายสายงานเรียบร้อยแล้ว', '', 'success')
          this.isLoading = false
          this.changelinegroup = false
          this.$emit('success')
        } else {
          this.$swal('ย้ายไม่สำเร็จ', '', 'error')
          this.isLoading = false
        }
      })
    },
    cancel () {
      this.idGroupSale = ''
      this.groupSale = ''
      this.admin = ''
      this.idNewGroupSaleLine = ''
      this.changelinegroup = false
    }
  }
}
</script>
