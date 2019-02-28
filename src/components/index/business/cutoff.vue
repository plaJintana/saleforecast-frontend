<template lang="html">
  <div class="p-t-1-5">
    <v-container>
      <div>
        <h1 class="headerFont">CutOff Time</h1>
        <div class="athiti">
          <div class="">
            <v-card style="box-shadow: none;">
              <v-card-text>
                <div>
                  <div v-if="this.userData.position === 'HEAD OF BD'">
                    <v-flex xs12 sm12 md12 lg12>
                      <v-layout row wrap spacing >
                        <v-flex xs5 sm5 md2 lg2><v-subheader class="fontSize">Type cutoff : </v-subheader></v-flex>
                        <v-flex xs6 sm6 md3 lg3><v-select :items="typecutoffBD" v-model="valueType" item-text="text" :rules="[v => !!v || 'กรุณาเลือกข้อมูล']" required></v-select></v-flex>
                      </v-layout>
                    </v-flex>
                  </div>

                  <!-- <div v-if="valueType === null ">

                </div> -->
                <div v-if="valueType !== null">

                  <div  v-if="valueType.type === 'By date' ">
                    <v-flex xs12 sm12 md12 lg12 class="m-t-1-5">
                      <v-layout row wrap spacing >
                        <v-flex xs5 sm5 md2 lg2></v-subheader></v-flex>
                        <v-flex xs6 sm6 md3 lg3 >
                          <v-datetime-picker
                          label="Select Datetime"
                          v-model="datetime">
                        </v-datetime-picker>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </div>
                <div  v-if="valueType.type === 'Now'">
                  <v-flex xs12 sm12 md12 lg12 class="m-t-1-5">
                    <v-layout row wrap spacing >
                      <v-flex xs5 sm5 md1 lg2 >
                        <v-btn color="blue-grey" class="white--text paddingButtom" @click="cutofftime(1)">
                          <!-- <v-icon left dark>get_app</v-icon> -->
                          Cut Now
                          <!-- <v-icon right dark>get_app</v-icon> -->
                        </v-btn>
                        <iframe ref="iframDownload" style="display:none;"></iframe>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </div>

                <div v-if="valueType.type === 'By date'">
                  <v-flex xs12 sm12 md12 lg12 class="m-t-1-5">
                    <v-layout row wrap spacing >
                      <v-flex xs5 sm5 md1 lg2 >
                        <v-btn color="blue-grey" class="white--text paddingButtom" @click="cutofftime(2)" >
                          <!-- <v-icon left dark>get_app</v-icon> -->
                          Cut this time
                          <!-- <v-icon right dark>get_app</v-icon> -->
                        </v-btn>
                        <iframe ref="iframDownload" style="display:none;"></iframe>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </div>

                <div  v-if="valueType.type === 'Edit'">
                  <v-flex xs12 sm12 md12 lg12 class="m-t-1-5">
                    <v-layout row wrap spacing >
                      <v-flex xs5 sm5 md1 lg2 >
                        <v-btn color="blue-grey" class="white--text paddingButtom" @click="nonEdit()">Non Edit</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</v-container>
</div>
</template>

<script>
import { Encode, Decode } from '@/services'
import moment from 'moment'
export default {
  data () {
    return {
      typecutoffBD: [{text: 'By Now',type: 'Now'}, {text: 'Non Edit',type: 'Edit'}],
      datetime: null,
      valueType: null,
      dateNow: '',
      week: '',
      datefromDB: ''
    }
  },
  computed: {
    userData () {
      if (this.$cookies.isKey('information')) {
        return JSON.parse(Decode.decode(this.$cookies.get('information')))
      } else {
        return ''
      }
    },
    userType () {
      if (this.$cookies.isKey('usertype')) {
        return Decode.decode(this.$cookies.get('usertype')).replace(/"/g, '')
      } else {
        return ''
      }
    }
  },
  methods: {
    nonEdit () {
      this.insertEdit()
      this.$socket.emit('addNoti', 'nonEdit')
    },
    insertEdit () {
      this.axios.post(process.env.API + '/insertEdit').then((response) => {
        var result = response.data
        if (response = 'success') {
          this.$swal('Complete', '', 'success')
        }
      })
    },
    cutofftime(val) {
      if (val === 2) {
        // this.$swal('โปรดเลือกวันที่ต้องการ', '', 'error')
        // if (this.datetime) {
        //   this.week = moment().format('W')
        //   this.datetime = moment(this.datetime).format('YYYY-MM-DD HH:mm:ss')
        //   // console.log(this.datetime)
        //
        //   var source = Encode.encode(JSON.stringify({ 'emp_no': this.userData.emp_no }))
        //   this.axios.post(process.env.API + '/getTimecutoff', {source: source}).then((response) => {
        //     var result = JSON.parse(Decode.decode(response.data))
        //     // console.log(result.status)
        //     if (result.status === 'success') {
        //       this.datefromDB = result.data[0].date_time_cutoff
        //       console.log(this.datetime)
        //       console.log(this.datefromDB)
        //       if (this.datefromDB < this.datetime) {
        //         var source = Encode.encode(JSON.stringify({ 'emp_no': this.userData.emp_no , 'val': val ,'datetime': this.datetime , 'week': this.week}))
        //         this.axios.post(process.env.API + '/insertTimecutoff', {source: source}).then((response) => {
        //           var result = JSON.parse(Decode.decode(response.data))
        //           // console.log(result.status)
        //           if (result.status === 'success') {
        //             // this.$socket.emit('addNoti', '')
        //             this.$swal('cutoff เรียบร้อย', '', 'success')
        //           } else if (result.status === 'fail'){
        //             this.$swal('ไม่มีข้อมูล', '', 'error')
        //           }
        //         })
        //       } else {
        //         this.$swal('โปรดเลือกเวลาใหม่อีกครั้ง', '', 'error')
        //       }
        //     } else if (result.status === 'fail'){
        //       this.$swal('ไม่มีข้อมูล', '', 'error')
        //     }
        //   })
        // } else {
        //   this.$swal('โปรดเลือกวันที่ต้องการ', '', 'error')
        // }
      } else if (val === 1) {
        console.log(val)
        console.log(this.userData.emp_no )
        this.week = moment().format('W')
        this.dateNow = moment().format('YYYY-MM-DD HH:mm:ss')
        var source = Encode.encode(JSON.stringify({ 'emp_no': this.userData.emp_no , 'val': val ,'datetime': this.dateNow , 'week': this.week}))
        this.axios.post(process.env.API + '/getTimecutoff', {source: source}).then((response) => {
          var result = JSON.parse(Decode.decode(response.data))
          if (result.status === 'success') {
            this.datefromDB = result.data[0].date_time_cutoff
            if (this.datefromDB < this.dateNow) {
              var source = Encode.encode(JSON.stringify({ 'emp_no': this.userData.emp_no , 'val': val ,'datetime': this.dateNow , 'week': this.week}))
              this.axios.post(process.env.API + '/insertTimecutoff', {source: source}).then((response) => {
                var result = JSON.parse(Decode.decode(response.data))
                console.log(result.status)
                // console.log(result.status)
                if (result.status === 'success') {
                  this.$swal('cutoff เรียบร้อย', '', 'success')
                } else if (result.status === 'fail') {
                  this.$swal('cutoff ไม่สำเร็จ', '', 'error')
                }
              })
            } else {
              this.$swal('โปรดเลือกเวลาใหม่อีกครั้ง', '', 'error')
            }
          } else if (result.status === 'fail') {
            this.$swal('ไม่มีข้อมูล', '', 'error')
          }
        })
      }
    }
  }
}
</script>

<style lang="css">
</style>
