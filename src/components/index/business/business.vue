<template lang="html">
  <div class="">
    <navbar @urlSelect="toPage"/>
    <remark v-if="checkUrl('remark')"/>
    <getBusiness v-if="checkUrl('getBusiness')" :data="data"/>
    <cutoff v-if="checkUrl('cutoff')" @nonEdit="sendDataNonEdit"/>
    <exportReport v-if="checkUrl('exportReport')"/>
    <!-- <request v-if="checkUrl('request')" />
    <approve v-if="checkUrl('approve')"/>
    <reject v-if="checkUrl('reject')"/>
    <exportReport v-if="checkUrl('exportReport')"/> -->
  </div>
</template>

<script>
import navbar from '@/components/index/business/navbar'
import remark from '@/components/index/business/remark'
import exportReport from '@/components/index/business/export/exportReport'
import getBusiness from '@/components/index/business/getBusiness'
import cutoff from '@/components/index/business/cutoff'
import { Decode } from '@/services'
export default {
  components: {
    navbar,
    remark,
    exportReport,
    getBusiness,
    cutoff
  },
  data () {
    return {
      data: ''
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
    sendDataNonEdit (nonEdit) {
      this.data = nonEdit
    },
    toPage (url) {
      this.$router.push('/business/' + url)
    },
    checkUrl (url) {
      if (url === this.$route.params.id) {
        if (this.userType === 'BUSINESS') {
          return true
        } else {
          this.toPage('/')
          return false
        }
      }
      return false
    }
  }
}
</script>

<style lang="css">
</style>
