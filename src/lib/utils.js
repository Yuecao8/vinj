import { Toast } from 'mint-ui'
const mixin = {
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goToPage (link) {
      this.$router.push(`/${link}`)
    },
    // 去详情页
    goDetail (item) {
      const id = item.id
      const type = item.type
      // 图集
      if (type === 'gallery' || type === 'atlas') {
        this.$api.getGalleryDetail(item.origin_id).then(res => {
          if (res.data.ErrorText) {
            Toast(res.data.ErrorText)
          } else {
            this.$router.push({ path: '/imgdetail', query: { id: item.origin_id } })
          }
        })
      }
      type === 'video' && this.$router.push({path: '/videodetail', query: {id}})
      type === 'activity' && this.$router.push({path: '/eventdetail', query: {id: item.origin_id}})
      if (type === 'link') window.location.href = item.outlink
    },
    // 获取用户token
    getToken () {
      return window.localStorage.getItem('access_token')
    }
  }
}
export { mixin }
