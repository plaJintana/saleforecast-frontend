<template lang="html">
  <div class="">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1 class="centerDiv bgHeadTitle"><h2 style="color:white;">ข้อมูล Sale</h2></v-flex>
      <v-flex xs10 offset-xs1 class="borderRadius bgBody">
        <v-layout row wrap class="m-b-2">
          <v-flex xs11 class="m-t-1-5" offset-xs1>Sale</v-flex>
          <v-flex xs10 offset-xs1><v-divider></v-divider></v-flex>
          <v-flex xs12 class="m-t-1">
            <v-layout row wrap>
              <v-flex xs1 offset-xs2>รหัสพนักงาน:</v-flex>
              <v-flex xs2 offset-xs1>{{sale_ID}}</v-flex>
              <v-flex xs2>ชื่อ-นามสกุล:</v-flex>
              <v-flex xs2>{{sale_fname + '  ' + sale_lname}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 class="m-t-1">
            <v-layout row wrap>
              <v-flex xs1 offset-xs2>โทรศัพท์:</v-flex>
              <v-flex xs3 offset-xs1>{{sale_phone}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs11 class="m-t-1-5" offset-xs1>Presale</v-flex>
          <v-flex xs10 offset-xs1><v-divider></v-divider></v-flex>
          <v-flex xs12>
            <v-layout row wrap class="m-t-1">
              <v-flex xs1 offset-xs2>รหัสพนักงาน:</v-flex>
              <v-flex xs2 offset-xs1>{{presale_ID}}</v-flex>
              <v-flex xs2>ชื่อ-นามสกุล:</v-flex>
              <v-flex xs2>{{presale_name}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap class="m-t-1">
              <v-flex xs1 offset-xs2>โทรศัพท์:</v-flex>
              <v-flex xs2 offset-xs1>{{presale_phone}}</v-flex>
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
      presale_ID: '',
      presale_name: '',
      presale_phone: ''
    }
  },
  methods: {
    setValue (source) {
      this.sale_ID = source.sale_ID
      this.sale_fname = source.fname
      this.sale_lname = source.lname
      this.sale_phone = source.phone
      this.presale_ID = source.presale_ID
      this.presale_name = source.presale_fname + ' ' + source.presale_lname
      this.presale_phone = source.presale_phone
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
