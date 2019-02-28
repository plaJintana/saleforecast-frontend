<template lang="html">
  <div class="">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1 class="centerDiv bgHeadTitle"><h2 style="color:white;">ข้อมูล Sale</h2></v-flex>
      <v-flex xs10 offset-xs1 class="borderRadius bgBody">
        <v-layout row wrap class="m-b-2">
          <v-flex xs11 class="m-t-1-5" offset-xs1>Sale</v-flex>
          <v-flex xs10 offset-xs1><v-divider></v-divider></v-flex>
          <v-flex sm12 xs12 md12 class="m-t-1">
            <v-layout row wrap>
              <v-flex sm1 xs1 md1 offset-xs2>รหัสพนักงาน:</v-flex>
              <v-flex sm2 xs2 md2 offset-xs1>{{sale_ID}}</v-flex>
              <v-flex sm2 xs2 md2>ชื่อ-นามสกุล:</v-flex>
              <v-flex sm2 xs2 md2>{{sale_fname + '  ' + sale_lname}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex sm12 xs12 md12 class="m-t-2">
            <v-layout row wrap>
              <v-flex sm1 xs1 md1 offset-xs2>โทรศัพท์:</v-flex>
              <v-flex sm2 xs2 md2 offset-xs1>{{sale_phone}}</v-flex>
              <v-flex sm1 xs1 md1>Email:</v-flex>
              <v-flex sm3 xs3 md3 offset-xs1>{{sale_email}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs11 class="m-t-1-5" offset-xs1>Presale</v-flex>
          <v-flex xs10 offset-xs1><v-divider></v-divider></v-flex>
          <v-flex sm12 xs12 md12>
            <v-layout row wrap class="m-t-1">
              <v-flex sm1 xs1 md1 offset-xs2>รหัสพนักงาน:</v-flex>
              <v-flex sm2 xs2 md2 offset-xs1>{{presale_ID}}</v-flex>
              <v-flex sm2 xs2 md2>ชื่อ-นามสกุล:</v-flex>
              <v-flex sm2 xs2 md2>{{presale_fname + '  ' + presale_lname}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex sm12 xs12 md12>
            <v-layout row wrap class="m-t-1">
              <v-flex sm1 xs1 md1 offset-xs2>โทรศัพท์:</v-flex>
              <v-flex sm2 xs2 md2 offset-xs1>{{presale_phone}}</v-flex>
              <v-flex sm1 xs1 md1>Email:</v-flex>
              <v-flex sm3 xs3 md3 offset-xs1>{{presale_email}}</v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sale_fname: '',
      sale_lname: '',
      sale_ID: '',
      sale_phone: '',
      sale_email: '',
      presale_ID: '',
      presale_fname: '',
      presale_lname: '',
      presale_phone: '',
      presale_email: ''
    }
  },
  methods: {
    setValue (source) {
      console.log(source)
      console.log('========MM=========')
      this.sale_ID = source[0]['sale_ID']
      this.sale_fname = source[0]['fname']
      this.sale_lname = source[0]['lname']
      this.sale_phone = source[0]['phone']
      this.sale_email = source[0]['email']
      this.presale_ID = source[0]['presale_ID']
      this.presale_fname = source[0]['presale_fname']
      this.presale_lname = source[0]['presale_lname']
      this.presale_phone = source[0]['presale_phone']
      this.presale_email = source[0]['presale_email']
    }
  }
}
</script>

<style>
.bgHeadTitle {
  background-color: #99D5C9 !important;
}
.bgBody {
  background-color: #f2f2f2 !important;
}
.borderTitle {
  border-style: solid;
  border-width: 1px;
}
.borderRadius {
  border-radius: 0 0 12px 12px;
}
</style>
