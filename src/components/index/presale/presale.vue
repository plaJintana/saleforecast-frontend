<template lang="html">
  <div class="">
    <navbar @urlSelect="navBarToPage"/>
    <request v-if="checkUrl('request')" @editSaleforecast="editSaleforecast"/>
    <!-- <approve v-if="checkUrl('approve')"/> -->
    <reject v-if="checkUrl('reject')"/>
    <exportReport v-if="checkUrl('exportReport')"/>
    <createReport v-if="checkUrl('createReport')" :state="stateReport" ref="createReport"/>
  </div>
</template>

<script>
import navbar from '@/components/index/presale/navbar'
import approve from '@/components/index/presale/approve'
import request from '@/components/index/presale/request'
import reject from '@/components/index/presale/reject'
import exportReport from '@/components/index/presale/export/exportReport'
import createReport from '@/components/index/sale/report/createReport'
import { Decode } from '@/services'
export default {
  data () {
    return {
      subPresaleItem: [{text: 'Request', url: 'request'}, {text: 'Reject', url: 'reject'}, {text: 'Export Report', url: 'exportReport'}, {text: 'Create Document', url: 'createReport'}]
    }
  },
  components: {
    createReport,
    navbar,
    request,
    approve,
    reject,
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
  methods: {
    async editSaleforecast (val) {
      this.stateReport = 'edit'
      await this.toPage('createReport')
      await this.$nextTick(() => {
        this.$refs.createReport.editSaleforecastReport(val)
      })
    },
    checkUrl (url) {
      if (url === this.$route.params.id) {
        if (this.userType === 'PRESALE') {
          if (this.isInFindItems(url)) {
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
      this.$router.push('/presale/' + url)
    },
    isInFindSubItems (url) {
      var item = []
      for (var i in item) {
        if (item[i]['url'] === url) {
          return true
        }
      }
      return false
    },
    isInFindItems (url) {
      for (var i in this.subPresaleItem) {
        if (this.subPresaleItem[i]['url'] === url) {
          return true
        }
      }
      return false
    },
    navBarToPage (url) {
      this.toPage(url)
    }
  }
}
</script>

<style lang="css">
</style>
