<template lang="html">
  <div class="p-t-1-5">
    <v-container>
      <div class="">
      <!-- <v-layout row wrap> -->
        <v-flex xs4 md4 lg4 class="headerFont"><h1>จัดการข้อมูลสายงาน</h1></v-flex>
        <v-flex xs12 sm8 class="p-t-1-5 p-b-2"><v-btn color="info" @click="addLineGroupSale()">เพิ่ม GroupSale</v-btn></v-flex>
        <v-flex xs12 md12 lg12>
          <v-card>
            <v-card-text>
              <v-data-table
              v-bind:headers="header"
              :items="allgroup"
              item-key="name"
              >
              <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded" style="background-color=#ffffcc">
                  <td class="text-xs-center"><h4>{{props.item.name}}</h4></td>
                  <td class="text-xs-center"><h4>{{ props.item.create_date }}</h4></td>
                  <td class="text-xs-center">
                    <v-btn  @click.stop="addSaleGroup(props.item.id, props.item.name)" fat flab icon><v-icon color="info" medium>note_add</v-icon></v-btn>
                    <v-btn  @click.stop="editSaleLineGroup(props.item.id, props.item.name)" fat flab icon><v-icon color="success" medium>edit</v-icon></v-btn>
                    <v-btn  @click.stop="deleteSaleLineGroup(props.item.id, props.item.name)" fat flab icon><v-icon color="error" medium>delete</v-icon></v-btn>
                  </td>
                  <td class="text-xs-right">
                    <v-icon v-if="props.expanded">expand_less</v-icon>
                    <v-icon v-else>expand_more</v-icon>
                  </td>
                </tr>
              </template>
              <template slot="expand" slot-scope="props">
                <v-data-table
                v-bind:headers="headersalegroup"
                :items="props.item.salegroup"
                hide-actions
                class="elevation-1"
                >
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                    <span>
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props" class="centerDiv" style="background-color: #ffff66">
                  <td class="text-xs-center" style="padding-left: 20px !important;">{{props.item.name}}</td>
                  <td class="text-xs-center">{{props.item.create_date}}</td>
                  <td class="text-xs-center">
                    <v-btn small fab flat @click="changeLineGroupSale(props.item.id,props.item.name)" icon><v-icon medium color="info">exit_to_app</v-icon></v-btn>
                    <v-btn small fab flat @click="editSaleGroup(props.item.name, props.item.id)" icon><v-icon medium color="success">edit</v-icon></v-btn>
                    <v-btn small fab flat @click="deleleteGroupSale(props.item.name, props.item.id)" icon><v-icon medium color="error">delete</v-icon></v-btn>
                  </td>
                </template>
              </v-data-table>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  <!-- </v-layout> -->
  <addLineGroup ref="addlinegroup" @success="reload"/>
  <addSaleGroup ref="addsalegroup" @success="reload"/>
  <editSaleLineGroup ref="editsalegroupline" @success="reload"/>
  <editSaleGroup ref="editsalegroup" @success="reload"/>
  <changeLineGroupSale ref='changeLineGroup' @success="reload"/>
</div>
</v-container>
</div>
</template>
<script>
import {Decode, Encode} from '@/services'
import addLineGroup from '@/components/index/admin/manage/sale/addLineGroupSale'
import addSaleGroup from '@/components/index/admin/manage/sale/addSaleGroup'
import editSaleLineGroup from '@/components/index/admin/manage/sale/editSaleLineGroup'
import editSaleGroup from '@/components/index/admin/manage/sale/editSaleGroup'
import changeLineGroupSale from '@/components/index/admin/manage/sale/changeLineGroupSale'
export default {
  data () {
    return {
      allgroup: [],
      header: [
        {'text': 'สายงาน', sortable: false, align: 'center'},
        {'text': 'สร้างเมื่อ', sortable: false, align: 'center'},
        {'text': 'จัดการ', sortable: false, align: 'center'},
        {'text': '', width: '1%', sortable: false}
      ],
      headersalegroup: [
        {'text': 'กลุ่มงาน', sortable: false, align: 'center'},
        {'text': 'สร้างเมื่อ', sortable: false, align: 'center'},
        {'text': 'จัดการ', sortable: false, align: 'center'}
      ],
      admin: ''
    }
  },
  components: {
    addLineGroup,
    addSaleGroup,
    editSaleLineGroup,
    editSaleGroup,
    changeLineGroupSale
  },
  methods: {
    getAllGroup () {
      this.axios.post(process.env.API + '/getAllGroup').then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.allgroup = result.data
        } else {
          console.log('ไม่สามารถดึงข้อมูลได้')
        }
      })
    },
    addLineGroupSale () {
      var admin = Encode.encode(JSON.stringify({admin: this.admin['emp_no']}))
      this.$refs.addlinegroup.openDialog(admin)
    },
    addSaleGroup (idgroupline, salegroupline) {
      var data = Encode.encode(JSON.stringify({idgroupline: idgroupline, salegroupline: salegroupline, admin: this.admin['emp_no']}))
      this.$refs.addsalegroup.openDialog(data)
    },
    editSaleLineGroup (idgroupline, salegroupline) {
      var data = Encode.encode(JSON.stringify({idgroupline: idgroupline, salegroupline: salegroupline, admin: this.admin['emp_no']}))
      this.$refs.editsalegroupline.openDialog(data)
    },
    editSaleGroup (salegroup, idgroup) {
      var data = Encode.encode(JSON.stringify({salegroup: salegroup, idgroup: idgroup, admin: this.admin['emp_no']}))
      this.$refs.editsalegroup.openDialog(data)
    },
    deleteSaleLineGroup (idgroupline, salegroupline) {
      this.$swal({
        title: 'โปรดตรวจสอบ!!',
        text: 'คุณต้องการลบสายงาน' + '    ' + salegroupline + 'ใช่หรือไม่?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result) {
          var source = Encode.encode(JSON.stringify({idgroupline: idgroupline, requestEMP: this.admin['emp_no']}))
          this.axios.post(process.env.API + '/deleteSaleLineGroup', {source: source}).then((response) => {
            if (response.data === 'success') {
              this.$swal('ดำเนินการเรียบร้อย', '', 'success')
              this.getAllGroup()
            } else {
              this.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
            }
          })
        }
      })
    },
    deleleteGroupSale (salegroup, idgroup) {
      this.$swal({
        title: 'โปรดตรวจสอบ!!',
        text: 'คุณต้องการลบกลุ่มงาน' + '    ' + salegroup + 'ใช่หรือไม่?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result) {
          var source = Encode.encode(JSON.stringify({idgroup: idgroup, requestEMP: this.admin['emp_no']}))
          this.axios.post(process.env.API + '/deleteSaleGroup', {source: source}).then((response) => {
            if (response.data === 'success') {
              this.$swal('ดำเนินการเรียบร้อย', '', 'success')
              this.getAllGroup()
            } else {
              this.$swal('ดำเนินการไม่สำเร็จ', '', 'error')
            }
          })
        }
      })
    },
    changeLineGroupSale (id, name) {
      var data = Encode.encode(JSON.stringify({id: id, name: name, admin: this.admin['emp_no']}))
      this.$refs.changeLineGroup.openDialog(data)
    },
    reload () {
      this.getAllGroup()
    }
  },
  created () {
    this.getAllGroup()
    if (this.$cookies.isKey('information')) {
      this.admin = JSON.parse(Decode.decode(this.$cookies.get('information')))
    }
  }
}
</script>

<style>

</style>
