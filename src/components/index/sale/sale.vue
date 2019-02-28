<template lang="html">
  <div class="">
    <navbar @urlSelect="navBarToPage"/>
    <createReport v-if="checkUrl('createReport')" :state="stateReport" ref="createReport"/>
    <request v-if="checkUrl('request')" @editSaleforecast="editSaleforecast"/>
    <pending v-if="checkUrl('pending')"/>
    <approve v-if="checkUrl('approve')" @editSaleforecast="updateSaleforecast" @rejectSaleforecast="rejectSaleforecast"/>
    <reject v-if="checkUrl('reject')" @rejectSaleforecast="rejectSaleforecast"/>
    <exportReport v-if="checkUrl('exportReport')" />
  </div>
</template>

<script>
import navbar from '@/components/index/sale/navbar'
import createReport from '@/components/index/sale/report/createReport'
import pending from '@/components/index/sale/pending'
import reject from '@/components/index/sale/reject'
import approve from '@/components/index/sale/approve'
import request from '@/components/index/sale/request'
import exportReport from '@/components/index/sale/export/exportReport'
import { Decode } from '@/services'
export default {
  components: {
    navbar,
    createReport,
    request,
    pending,
    reject,
    exportReport,
    approve
  },
  data () {
    return {
      stateReport: 'add',
      subVPItems: [{text: 'Approve', url: 'approve'}, {text: 'Request', url: 'request'}],
      subNormalItems: [{text: 'Pending', url: 'pending'}, {text: 'Reject', url: 'reject'}, {text: 'Approve', url: 'approve'}, {text: 'Request', url: 'request'}],
      items: [{text: 'Create Document', url: 'createReport'}, {text: 'Export Report', url: 'exportReport'}]
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
    checkUrl (url) {
      if (url === this.$route.params.id) {
        if (this.userType === 'SALE') {
          if (this.isInFindSubItems(url) || this.isInFindItems(url)) {
            return true
          } else {
            return false
          }
        } else {
          this.toPage('/')
          return false
        }
      }
      return false
    },
    toPage (url) {
      this.$router.push('/sale/' + url)
    },
    async navBarToPage (url) {
      this.stateReport = 'add'
      if (url === 'createReport') {
        await this.toPage('createReport')
        await this.$nextTick(() => {
          this.$refs.createReport.clear()
        })
      } else {
        this.toPage(url)
      }
    },
    async editSaleforecast (val) {
      this.stateReport = 'edit'
      await this.toPage('createReport')
      await this.$nextTick(() => {
        this.$refs.createReport.editSaleforecastReport(val)
      })
    },
    async updateSaleforecast (val) {
      this.stateReport = 'update'
      await this.toPage('createReport')
      await this.$nextTick(() => {
        this.$refs.createReport.editSaleforecastReport(val)
      })
    },
    async rejectSaleforecast (val) {
      this.stateReport = 'reject'
      await this.toPage('createReport')
      await this.$nextTick(() => {
        this.$refs.createReport.rejectSaleforecastReport(val)
      })
    },
    isInFindSubItems (url) {
      var item = []
      if (this.userData.position === 'SALES') {
        item = this.subNormalItems
      } else if (this.userData.position === 'TEAMLEAD' || this.userData.position === 'GROUPLEAD') {
        item = this.subVPItems
      }
      for (var i in item) {
        if (item[i]['url'] === url) {
          return true
        }
      }
      return false
    },
    isInFindItems (url) {
      for (var i in this.items) {
        if (this.items[i]['url'] === url) {
          return true
        }
      }
      return false
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
