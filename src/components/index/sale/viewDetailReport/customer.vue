<template lang="html">
  <div class="">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1 class="centerDiv bgHeadTitle"><h2 style="color:white;">ข้อมูลลูกค้า</h2></v-flex>
      <v-flex xs10 offset-xs1 class="borderRadius bgBody">
        <v-layout row wrap class="m-b-2">
          <v-flex xs12 class="m-t-2">
            <v-layout row wrap>
              <v-flex xs1 offset-xs1>ชื่อโปรเจค:</v-flex>
              <v-flex xs2>{{projectName}}</v-flex>
              <v-flex xs1 >รหัสลูกค้า:</v-flex>
              <v-flex xs2>{{cust_ID}}</v-flex>
              <v-flex xs1>ชื่อลูกค้า:</v-flex>
              <v-flex xs3>{{cust_name}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs11 offset-xs1 class="m-t-2">ผู้ติดต่อ:</v-flex>
          <v-flex xs12 v-for="items,number in contact" :key="number">
            <v-layout row wrap class="centerDiv">
              <v-flex xs12 class="m-t-1">
                <v-layout row wrap>
                  <v-flex xs2 md2 offset-xs1>{{number + 1}}. ชื่อ-นามสกุล:</v-flex>
                  <v-flex xs2>{{items.name}}</v-flex>
                  <v-flex xs1>ตำแหน่ง:</v-flex>
                  <v-flex xs2>{{items.position}}</v-flex>
                  <v-flex xs1>โทรศัพท์:</v-flex>
                  <v-flex xs2>{{items.phone}}</v-flex>
                </v-layout>
              </v-flex>
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
      cust_ID: '',
      cust_name: '',
      contact: null,
      projectName: ''
    }
  },
  methods: {
    setValue (source) {
      console.log(source)
      this.projectName = source.project_name
      if (source.cust_ID.toString() === '0') {
        this.cust_ID = '-'
      } else {
        this.cust_ID = source.cust_ID
      }
      this.cust_name = source.cust_name
      this.contact = source.contact
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
