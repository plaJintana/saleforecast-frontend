<template lang="html">
  <div class="">
    <navbar @urlSelect="navBarToPage"/>
    <manageUser v-if="checkUrl('manageUser')"/>
    <manageSale v-if="checkUrl('manageSale')"/>
    <managePresale v-if="checkUrl('managePresale')"/>
    <manageGroupSale v-if="checkUrl('manageGroupSale')"/>
    <manageBusiness v-if="checkUrl('manageBusiness')"/>
    <manageAdmin v-if="checkUrl('manageAdmin')"/>
    <exportReport v-if="checkUrl('exportReport')"/>
  </div>
</template>

<script>
import manageAdmin from '@/components/index/admin/manage/admin/manageAdmin'
import manageSale from '@/components/index/admin/manage/sale/manageSale'
import manageUser from '@/components/index/admin/manage/user/manageUser'
import manageGroupSale from '@/components/index/admin/manage/sale/manageGroupSale'
import managePresale from '@/components/index/admin/manage/presale/managePresale'
import manageBusiness from '@/components/index/admin/manage/business/manageBusiness'
import exportReport from '@/components/index/admin/export/exportReport'
import navbar from '@/components/index/admin/navbar'
import { Decode } from '@/services'
export default {
  components: {
    navbar,
    manageSale,
    manageUser,
    manageGroupSale,
    managePresale,
    manageBusiness,
    manageAdmin,
    exportReport
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
  data () {
    return {
      adminItems: [{text: 'Admin', url: 'manageAdmin'}, {text: 'User', url: 'manageUser'}, {text: 'Sale', url: 'manageSale'}, {text: 'Group Sale', url: 'manageGroupSale'}, {text: 'Presale', url: 'managePresale'}, {text: 'Business', url: 'manageBusiness'}, {text: 'Export Report', url: 'exportReport'}]
    }
  },
  methods: {
    checkUrl (url) {
      if (url === this.$route.params.id) {
        if (this.userType === 'admin' && this.isInFindAdminItems(url)) {
          return true
        } else {
          this.toPage('/')
          return false
        }
      }
      return false
    },
    toPage (url) {
      this.$router.push('/admin/' + url)
    },
    navBarToPage (url) {
      this.toPage(url)
    },
    isInFindAdminItems (url) {
      for (var i in this.adminItems) {
        if (this.adminItems[i]['url'] === url) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="css">
</style>
