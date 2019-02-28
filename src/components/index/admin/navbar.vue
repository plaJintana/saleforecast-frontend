<template lang="html">
  <div class="fontSizeNavbar">
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
      <v-list v-if="this.userData.type_userAdmin === 'ADMIN'">
        <template v-for="item in itemsAdmin">
          <v-list-tile v-if="item.subItems.length === 0" @click="toPage(item.url)" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-group v-else :prepend-icon="item.icon" v-model="item.active" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(sub, i) in item.subItems" :key="i" @click="toPage(sub.url)">
              <v-list-tile-title>{{sub.text}}</v-list-tile-title>
            </v-list-tile>
          </v-list-group>
        </template>
      </v-list>
      <v-list v-if="this.userData.type_userAdmin === 'SALE'">
        <template v-for="item in itemsAdmin">
          <v-list-tile v-if="item.subItemsSales.length === 0" @click="toPage(item.url)" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-group v-else :prepend-icon="item.icon" v-model="item.active" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(sub, i) in item.subItemsSales" :key="i" @click="toPage(sub.url)">
              <v-list-tile-title>{{sub.text}}</v-list-tile-title>
            </v-list-tile>
          </v-list-group>
        </template>
      </v-list>
      <v-list v-if="this.userData.type_userAdmin === 'PRESALE'">
        <template v-for="item in itemsAdmin">
          <v-list-tile v-if="item.subItemsPresale.length === 0 && this.userData.type_user === 'PRESALE'" @click="toPage(item.url)" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-group v-else :prepend-icon="item.icon" v-model="item.active" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(sub, i) in item.subItemsPresale" :key="i" @click="toPage(sub.url)">
              <v-list-tile-title>{{sub.text}}</v-list-tile-title>
            </v-list-tile>
          </v-list-group>
        </template>
      </v-list>

      <v-list v-if="this.userData.type_userAdmin === 'BUSINESS'">
        <template v-for="item in itemsAdmin">
          <v-list-tile v-if="item.subItemsBD.length === 0 && this.userData.type_user === 'PRESALE'" @click="toPage(item.url)" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-group v-else :prepend-icon="item.icon" v-model="item.active" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(sub, i) in item.subItemsBD" :key="i" @click="toPage(sub.url)">
              <v-list-tile-title>{{sub.text}}</v-list-tile-title>
            </v-list-tile>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="bgToolbar" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
      <v-toolbar-title  class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-toolbar-title>
      <div class="logoDiv pr-5 pl-2 pointer" @click="toPage('/')">
        <h2>Salesforecast</h2>
      </div>
      <v-spacer></v-spacer>
      <div>
        <!-- <span dark class="username hidden-xs-only">{{userData.fname}} {{userData.lname}}</span>
        <v-btn dark small outline class="hidden-xs-only" @click="logout()">logout</v-btn>
        <v-btn dark icon class="hidden-sm-and-up" @click="logout()">
          <v-icon>exit_to_app</v-icon>
        </v-btn> -->
      </div>
      <v-menu offset-y>
        <v-btn
          slot="activator"
          flat
          class="arrow-drop-down"
        >
          <span dark class="username hidden-xs-only">{{userData.fname}} {{userData.lname}}<v-icon>keyboard_arrow_down</v-icon></span>
        </v-btn>

        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index" @click="checkclick(item.title)" >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <resetPassword ref="reset" />
  </div>
</template>

<script>
import resetPassword from '@/components/index/admin/manage/user/resetPassword'
import { Decode, Encode } from '@/services'
export default {
  components: {
    resetPassword
  },
  data () {
    return {
      items: [
        { title: 'Change password', url: '', icon: 'loop' },
        { title: 'Logout', url: '', icon: 'exit_to_app' }
      ],
      itemsAdmin: [
        {
          icon: 'perm_identity',
          text: 'User Management',
          url: 'manage',
          perrmission: 'admin',
          subItemsBD: [{text: 'User', url: 'manageUser'}, {text: 'Business Development', url: 'manageBusiness'}, {text: 'Export Report', url: 'exportReport'}],
          subItemsPresale: [{text: 'User', url: 'manageUser'}, {text: 'Presales', url: 'managePresale'}, {text: 'Export Report', url: 'exportReport'}],
          subItemsSales: [{text: 'User', url: 'manageUser'}, {text: 'Sales', url: 'manageSale'}, {text: 'Group Sales', url: 'manageGroupSale'}, {text: 'Export Report', url: 'exportReport'}],
          subItems: [{text: 'Admin', url: 'manageAdmin'}, {text: 'User', url: 'manageUser'}, {text: 'Sales', url: 'manageSale'}, {text: 'Group Sales', url: 'manageGroupSale'}, {text: 'Presales', url: 'managePresale'}, {text: 'Business Development', url: 'manageBusiness'}, {text: 'Export Report', url: 'exportReport'}]
        }
      ],
      drawer: false,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      dialog: false
    }
  },
  created () {
    console.log('=========PPP=')
    console.log(this.userData.type_user)
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
    toPage (url) {
      if (url === 'logout') {
        this.$cookies.remove('information', '/', process.env.DOMAIN)
        this.$cookies.remove('usertype', '/', process.env.DOMAIN)
        this.$router.push('/login')
      } else {
        this.$emit('urlSelect', url)
      }
    },
    resetPassword (val) {
      console.log(val)
      var data = Encode.encode(JSON.stringify({emp_no: val.emp_no, emp_request: val.emp_no}))
      this.$refs.reset.openDialog(data)
    },
    checkclick (val) {
      if (val === 'Logout') {
        this.logout()
      } else if (val === 'Change password') {
        this.resetPassword(this.userData)
      }
    },
    logout () {
      this.toPage('logout')
    }
  }
}
</script>
<style lang="css" scoped>
.fontSizeNavbar {
  font-size:  0.98em;
}
.logoDiv{
  border-radius: 1em;
}
.navbarLogo{
  width: 70px;
  height: auto;
}
.logoDiv{
  width: 250px;
}
.username{
  margin-right: 16px;
}
@media only screen and (max-width: 768px) {
  .logoDiv{
    width: 120px;
    height: 90%;
  }
}
@media only screen and (max-width: 640px) {
  .username{
    margin-right: 0;
  }
}
.bgToolbar {
  background-color: #44BBA4 !important;
}
</style>
