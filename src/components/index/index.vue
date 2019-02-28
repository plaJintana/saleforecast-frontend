<template>
  <div>
      <!-- <admin v-if="userType === 'admin'"/> -->
      <!-- <navbar @urlSelect="navBarToPage"/>

      <CreateReport v-if="checkUrl('createReport')" :state="stateReport" ref="createReport"/>
      <request v-if="checkUrl('request')" @editSaleforecast="editSaleforecast"/>
      <pending v-if="checkUrl('pending')" />
      <approve v-if="checkUrl('approve')" />
      <reject v-if="checkUrl('reject')" @rejectSaleforecast="rejectSaleforecast"/>
      <ManageUser v-if="checkUrl('manageUser')"/>
      <listSale v-if="checkUrl('manageSale')"/>
      <ManagePresale v-if="checkUrl('managePresale')"/>
      <ManageGroupSale v-if="checkUrl('manageGroupSale')"/> -->
      <!-- <presale v-if="userType === 'PRESALE'"/> -->
  </div>
</template>

<script>
// import navbar from '@/components/index/navbar'
// import CreateReport from '@/components/Report/createReport'
// import listSale from '@/components/SA/listSale'
// import ManageUser from '@/components/SA/manageUser'
// import ManageGroupSale from '@/components/SA/ManageGroupSale'
// import ManagePresale from '@/components/SA/managePresale'
// import pending from '@/components/index/pending'
// import reject from '@/components/index/reject'
// import approve from '@/components/index/approve'
// import request from '@/components/index/request'
import presale from '@/components/index/presale/presale'
import admin from '@/components/index/admin/admin'
import { Decode } from '@/services'
export default {
  data () {
    return {
    //   stateReport: 'add',
    //   subVPItems: [{text: 'Approve', url: 'approve'}],
    //   subNormalItems: [{text: 'Pending', url: 'pending'}, {text: 'Reject', url: 'reject'}, {text: 'Approve', url: 'approve'}, {text: 'Request', url: 'request'}],
    //   items: [{text: 'Create Document', url: 'createReport'}],
    //   adminItems: [{text: 'User', url: 'manageUser'}, {text: 'Sale', url: 'manageSale'}, {text: 'Group Sale', url: 'manageGroupSale'}, {text: 'Presale', url: 'managePresale'}]
    }
  },
  created () {

  },
  components: {
    presale,
    admin
  },
  // created () {
  // },
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
  }
  // methods: {
  //   checkUrl (url) {
  //     if (url === this.$route.params.id) {
  //       if (this.userType === 'admin' && this.isInFindAdminItems(url)) {
  //         return true
  //       } else if (this.userType === 'SALE' || this.userType === 'admin') {
  //         if (this.isInFindSubItems(url) || this.isInFindItems(url)) {
  //           return true
  //         } else {
  //           return false
  //         }
  //       } else {
  //         this.toPage('/')
  //         return false
  //       }
  //     }
  //     return false
  //   },
  //   toPage (url) {
  //     this.$router.push('/account/' + url)
  //   },
  //   async navBarToPage (url) {
  //     this.stateReport = 'add'
  //     if (url === 'createReport') {
  //       await this.toPage('createReport')
  //       await this.$nextTick(() => {
  //         this.$refs.createReport.clear()
  //       })
  //     } else {
  //       this.toPage(url)
  //     }
  //   },
  //   async editSaleforecast (val) {
  //     this.stateReport = 'edit'
  //     await this.toPage('createReport')
  //     await this.$nextTick(() => {
  //       this.$refs.createReport.editSaleforecastReport(val)
  //     })
  //   },
  //   async rejectSaleforecast (val) {
  //     this.stateReport = 'reject'
  //     await this.toPage('createReport')
  //     await this.$nextTick(() => {
  //       this.$refs.createReport.rejectSaleforecastReport(val)
  //     })
  //   },
  //   isInFindSubItems (url) {
  //     var item = []
  //     if (this.userData.position === 'NORMAL') {
  //       item = this.subNormalItems
  //     } else if (this.userData.position === 'VP' || this.userData.position === 'VP-GROUP') {
  //       item = this.subVPItems
  //     }
  //     for (var i in item) {
  //       if (item[i]['url'] === url) {
  //         return true
  //       }
  //     }
  //     return false
  //   },
  //   isInFindItems (url) {
  //     for (var i in this.items) {
  //       if (this.items[i]['url'] === url) {
  //         return true
  //       }
  //     }
  //     return false
  //   },
  //   isInFindAdminItems (url) {
  //     for (var i in this.adminItems) {
  //       if (this.adminItems[i]['url'] === url) {
  //         return true
  //       }
  //     }
  //     return false
  //   }
  // }
}
</script>
