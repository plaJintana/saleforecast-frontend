<template>
  <!-- <v-card flat> -->
  <!-- <v-container fluid> -->
  <!-- <v-layout row child-flex wrap> -->
  <div>
    <v-toolbar>
      <v-btn icon @click.stop="forward">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>รายละเอียดของ Sale</v-toolbar-title>
    </v-toolbar>
    <v-layout>
      <v-card class="widthfull">
        <v-card-title class="titleVcard" primary-title>
          <v-layout>
            <v-flex class="headerSale" xs10 offset-xs2>
              <v-layout>
                <v-flex xs12>
                  <h1> {{ employeeCode }}  {{fname}} {{lname}} </h1>
                  <span class="grey--text">อีเมล์ : {{ email }}, เบอร์โทรศัพท์ : {{ phone }}</span>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-container class="containerVcard" fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs 10 offset-xs2>
              <h3> รายละเอียดงาน </h3>
              <v-layout row wrap>
                <v-flex xs11><div class="textPosition">ตำแหน่งปัจจุบัน: {{position}}</div></v-flex>
                <v-flex xs11><div class="textPosition"><v-layout><v-flex xs2>สายงาน: {{groupline_name}} </v-flex><v-flex xs2>กลุ่ม: {{group_name}}</v-flex></v-layout></div></v-flex>
                <v-flex xs11 v-if="position === 'NORMAL'"><div class="textPosition">ผู้บังคับบัญชากลุ่มงาน: {{vp_name}}</div></v-flex>
                <v-flex xs11 v-if="position === 'NORMAL' || position === 'VP'"><div class="textPosition">ผู้บังคับบัญชาสายงาน: {{vp_group_name}}</div></v-flex>
                <v-flex xs11 v-if="position === 'NORMAL' || position === 'VP' || position === 'VP-GROUP'"><div class="textPosition">ผู้บังคับบัญชาสูงสุด: {{header_name}}</div></v-flex>
              </v-layout>
              <h3 class="titleHistorySale"> ประวัติการจัดการ sale </h3>
              <v-layout row wrap>
                <v-flex xs10>
                  <v-data-table :pagination.sync="paginationHistoryManage" :headers="headerHistoryManage" :items="historyManage" class="elevation-1">
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
                    <template slot="items" slot-scope="props">
                      <td class="tdList">{{ props.index + 1 }}</td>
                      <td class="tdList" align="center">{{ convertDateTime(props.item.create_date) }}</td>
                      <td class="tdList" align="center">{{ props.item.caselog }}</td>
                      <td class="tdList" align="center">{{ props.item.fname }} {{ props.item.lname }}</td>
                      <td class="tdList" align="center">{{ props.item.request_state }}</td>
                    </template>
                  </v-data-table>
                </v-flex>
              </v-layout>
              <h3 class="titleHistorySale"> ประวัติตำแหน่ง</h3>
              <v-layout row wrap>
                <v-flex xs10>
                  <v-data-table :pagination.sync="paginationHistoryPosition" :headers="headerHistoryPosition" :items="historyPosition" class="elevation-1">
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
                    <template slot="items" slot-scope="props">
                      <td class="tdList">{{ props.index + 1 }}</td>
                      <td class="tdList" align="center">{{ convertDateTime(props.item.create_date) }}</td>
                      <td class="tdList" align="center">{{ props.item.caselog }}</td>
                      <td class="tdList" align="center">{{ props.item.fname }} {{ props.item.lname }}</td>
                      <td class="tdList" align="center">{{ props.item.request_state }}</td>
                    </template>
                  </v-data-table>
                </v-flex>
              </v-layout>
              <h3 class="titleHistorySale"> ประวัติกลุ่มงาน </h3>
              <v-layout row wrap>
                <v-flex xs10>
                  <v-data-table :pagination.sync="paginationHistoryGroup" :headers="headerHistoryGroup" :items="historyGroup" class="elevation-1">
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
                    <template slot="items" slot-scope="props">
                      <td class="tdList">{{ props.index + 1 }}</td>
                      <td class="tdList" align="center">{{ convertDateTime(props.item.create_date) }}</td>
                      <td class="tdList" align="center">{{ props.item.caselog }}</td>
                      <td class="tdList" align="center">{{ props.item.groupline_name }}</td>
                      <td class="tdList" align="center">{{ props.item.group_name }}</td>
                      <td class="tdList" align="center">{{ props.item.fname }} {{ props.item.lname }}</td>
                      <td class="tdList" align="center">{{ props.item.request_state }}</td>
                    </template>
                  </v-data-table>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-layout>
  </div>
  <!-- </v-layout> -->
  <!-- </v-container> -->
  <!-- </v-card> -->
</template>

<script>
import { Encode, Decode } from '@/services'
import moment from 'moment'
export default {
  data () {
    return {
      employeeCode: '',
      fname: '',
      lname: '',
      phone: '',
      email: '',
      position: '',
      group_name: '',
      groupline_name: '',
      vp_name: '',
      vp_group_name: '',
      header_name: '',
      headerHistoryManage: [
        { text: '#', value: 'no', align: 'left', 'class': 'thListSale' },
        { text: 'วันที่', value: 'date', align: 'center' },
        { text: 'จัดการ', value: 'manage', align: 'center' },
        { text: 'ผู้ดูแล', value: 'admin', align: 'center' },
        { text: 'สถานะ', value: 'status', align: 'center' }
      ],
      historyManage: [],
      paginationHistoryManage: {
        sortBy: 'create_date',
        'descending': true
      },
      headerHistoryPosition: [
        { text: '#', value: 'no', align: 'left', 'class': 'thListSale' },
        { text: 'วันที่', value: 'date', align: 'center' },
        { text: 'จัดการ', value: 'manage', align: 'center' },
        { text: 'ผู้ดูแล', value: 'admin', align: 'center' },
        { text: 'สถานะ', value: 'status', align: 'center' }
      ],
      historyPosition: [],
      paginationHistoryPosition: {
        sortBy: 'create_date',
        'descending': true
      },
      headerHistoryGroup: [
        { text: '#', value: 'no', align: 'left', 'class': 'thListSale' },
        { text: 'วันที่', value: 'date', align: 'center' },
        { text: 'จัดการ', value: 'manage', align: 'center' },
        { text: 'สายงาน', value: 'groupline', align: 'center' },
        { text: 'กลุ่มงาน', value: 'group', align: 'center' },
        { text: 'ผู้ดูแล', value: 'admin', align: 'center' },
        { text: 'สถานะ', value: 'status', align: 'center' }
      ],
      historyGroup: [],
      paginationHistoryGroup: {
        sortBy: 'create_date',
        'descending': true
      }
    }
  },
  created () {
    if (this.$route.query.emp_no) {
      this.getUserSale(this.$route.query.emp_no)
    } else {
      this.$router.push({ path: '/admin/manageSale' })
    }
  },
  methods: {
    getUserSale (val) {
      var source = Encode.encode(JSON.stringify({ 'emp_no': val }))
      this.axios.post(process.env.API + '/getSale', { source: source }).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status === 'success') {
          this.employeeCode = result.sale.emp_no
          this.fname = result.sale.fname
          this.lname = result.sale.lname
          this.phone = result.sale.phone
          this.email = result.sale.email
          this.position = result.sale.position
          this.vp_name = result.vp_name
          this.vp_group_name = result.vp_group_name
          this.header_name = result.header_name
          this.historyManage = result.log_history.slice()
          this.historyPosition = result.log_position.slice()
          this.historyGroup = result.log_group.slice()
          if (result.sale.group_name !== null) {
            this.group_name = result.sale.group_name
          } else {
            this.group_name = 'None'
          }
          if (result.sale.groupline_name !== null) {
            this.groupline_name = result.sale.groupline_name
          } else {
            this.groupline_name = 'None'
          }
        } else {
          this.$swal('กรุณาติดต่อผู้ดูแลระบบ', '', 'error')
        }
      })
    },
    convertDateTime (val) {
      moment.locale('th')
      var someDate = new Date(val)
      return moment(someDate).add(7, 'hours').format('lll')
      // console.log(moment(someDate).format('lll'))
    },
    forward () {
      this.$router.push({ path: '/admin/manageSale' })
    }
  }
}
</script>

<style lang="css">
.headerSale {
  padding-top: 20px;
}
.titleVcard {
  padding-bottom: 8px;
}
.containerVcard {
  padding-top: 8px;
}
.textPosition {
  padding-left: 36px;
}
.tdList {
  padding: 0 12px 0 24px !important;
}
.thList {
  padding: 0 12px 0 12px !important;
}
.titleHistorySale {
  padding-top: 14px;
  padding-bottom: 14px;
}
</style>
