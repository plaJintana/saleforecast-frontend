<template lang="html">
  <div class="fontSizeNavbar">
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
      <v-list>
        <template v-for="item in itemsBusiness">
          <v-list-tile v-if="item.subNormalItems.length === 0 && item.subItems.length === 0" @click="toPage(item.url)" :key="item.text">
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
            <div v-if="userData.position === 'BD'">
              <v-list-tile v-for="(sub, i) in item.subNormalItems" :key="i" @click="toPage(sub.url)">
                <v-list-tile-title>{{sub.text}}</v-list-tile-title>
              </v-list-tile>
            </div>
            <div v-else-if="userData.position === 'HEAD OF BD'">
              <v-list-tile v-for="(sub, i) in item.subItemsHead" :key="i" @click="toPage(sub.url)">
                <v-list-tile-title>{{sub.text}}</v-list-tile-title>
              </v-list-tile>
            </div>
            <div v-else>
              <v-list-tile v-for="(sub, i) in item.subItems" :key="i" @click="toPage(sub.url)">
                <v-list-tile-title>{{sub.text}}</v-list-tile-title>
              </v-list-tile>
            </div>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="bgToolbar" dark app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed>
      <v-toolbar-title>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-toolbar-title>
      <div class="p-r-5 p-l-1 pointer" @click="toPage('/')">
        <h2>Salesforecast</h2>
      </div>
      <v-spacer></v-spacer>
      <div>
        <!-- <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn> -->
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

      itemsBusiness: [
        // {
        //   icon: 'assignment',
        //   text: 'Document Management',
        //   url: 'home',
        //   perrmission: '',
        //   active: true,
        //   subItems: [{text: 'Request', url: 'request'}, {text: 'Approve', url: 'approve'}, {text: 'Reject', url: 'reject'}],
        //   subNormalItems: []
        // },
        {
          icon: 'assignment',
          text: 'Document Management',
          url: 'home',
          perrmission: 'BD',
          active: true,
          subItems: [{text: 'Approve', url: 'getBusiness'}],
          subItemsHead: [{text: 'Approve', url: 'getBusiness'},{text: 'Week Cutoff', url: 'cutoff'}],
          subNormalItems: [{text: 'Request', url: 'remark'}]
        },
        {
          icon: 'get_app',
          text: 'Export Report',
          url: 'exportReport',
          permission: '',
          subItems: [],
          subNormalItems: []
        }
      ],
      items: [
        { title: 'Change password', url: '', icon: 'loop' },
        { title: 'Logout', url: '', icon: 'exit_to_app' }
      ],
      drawer: false,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      dialog: false
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
