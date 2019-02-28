<template>
  <v-app id="inspire">
    <v-content>
      <div class="centerHeight lineBg">
        <v-container class="widthfull">
          <v-layout row wrap>
            <v-flex xs6 sm6 md5 offset-sm1 offset-xs2 offset-md1>
              <div class="white--text welcomeDiv">
                <h1 class="welcometext">Salesforecast</h1>
                <h1 class="welcometext">Login</h1>
              </div>
            </v-flex>
            <v-flex xs6 sm4 md4>
              <v-card class="elevation-12 loginDiv" dark color="transparent">
                <v-card-text class="pb-0">
                  <v-form>
                    <v-text-field @keyup.enter="getLogin()" color="yellow darken-2" prepend-icon="person" name="username" label="username" v-model="username" type="text"></v-text-field>
                    <v-text-field @keyup.enter="getLogin()" color="yellow darken-2" prepend-icon="lock" name="password" label="password" id="password" v-model="password" type="password"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions class="pt-0" style="justify-content:center;">
                  <v-btn class="mb-2 mr-2" outline color="white" @click="getLogin()">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { Encode, Decode } from '@/services'
export default {
  data () {
    return {
      drawer: null,
      username: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    getLogin () {
      this.isLoading = true
      if (this.username.trim() === '') {
        this.isLoading = false
        this.$swal('กรุณากรอก Username', '', 'warning')
        return
      } else if (this.password.trim() === '') {
        this.isLoading = false
        this.$swal('กรุณากรอก Password', '', 'warning')
        return
      }
      $('input').blur()
      var source = Encode.encode(JSON.stringify({'username': this.username, 'password': this.password}))
      this.axios.post(process.env.API + '/userLogin', {source: source}).then((response) => {
        var result = JSON.parse(Decode.decode(response.data))
        if (result.status !== 'success') {
          this.$swal('กรุณาตรวจสอบ Username หรือ Password ของท่าน', '', 'warning')
          this.isLoading = false
        } else {

          this.isLoading = false
          this.$cookies.set('information', Encode.encode(JSON.stringify(result.info_user)), null, '/', process.env.DOMAIN)
          this.$cookies.set('usertype', Encode.encode(JSON.stringify(result.type_user)), null, '/', process.env.DOMAIN)
          if (result.type_user === 'PRESALE') {
            this.$router.push('/presale/request')
          } else if (result.type_user === 'SALE') {
            var TypeUser = JSON.parse(Decode.decode(this.$cookies.get('information')))
            if (TypeUser.position === 'HEAD OF SALES') {
              this.$router.push('/sale/exportReport')
            } else if(TypeUser.position === 'GROUPLEAD'){
              this.$router.push('/sale/approve')
            }else{
              this.$router.push('/sale/request')
            }
          } else if (result.type_user === 'BUSINESS'){
            var TypeUser = JSON.parse(Decode.decode(this.$cookies.get('information')))
            if(TypeUser.position === 'BD'){
              this.$router.push('/business/remark')
            }else {
              this.$router.push('/business/getBusiness')
            }
          }
          // this.$router.push('/account')
        }
      }, (response) => {
        this.isLoading = false
        this.$swal('ไม่สามารถเข้าสู่ระบบได้', 'กรุณาลองใหม่อีกครั้ง', 'error')
      })
    }
  }
}
</script>

<style scoped>
>>>.input-group__input {
  padding-left: 0em;
}
>>>.input-group {
  padding: 20px 0 0;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#inspire {
  background-image: url('/static/img/background/bg_login.jpg');
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.loginDiv{
  border-radius: 5px !important;
  box-shadow: none !important;
  margin-top: 0.5em;
}
.welcomeDiv{
  border-right: 3px solid #fff;
  margin-right: 2em;
  padding: 3.5em;
}
.welcometext{
  text-align: center;
  font-size: 40px;
}
.lineBg{
  background: #435267eb;
  padding: 5em 0;
}

@media only screen and (max-width: 1024px) {
  .loginDiv{
    border-radius: 5px !important;
    box-shadow: none !important;
    margin-top: 0.5em;
  }
  .welcomeDiv{
    border-right: 3px solid #fff;
    margin-right: 2em;
    padding: 5em 2em;
  }
  .welcometext{
    text-align: center;
    font-size: 28px;
  }
  .lineBg{
    padding: 5em 0;
  }
}
@media only screen and (max-width: 823px) {
  .container{
    padding: 1em;
  }
  .welcomeDiv{
    border-right: none;
    margin-right: 0;
    padding: 1em 1em 0 1em;
  }
  .welcometext{
    font-size: 24px;
  }
  .loginDiv{
    margin-top: 0;
    width: 250px;
  }
  .lineBg{
    padding: 0;
    margin: 0 2em;
  }
}
</style>
