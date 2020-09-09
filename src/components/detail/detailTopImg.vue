<template>
  <div class="top">
    <img class="fullImg" :src="imgUrl+'?imageView/0/h/250/w/375'" alt />
    <img class="back" @click="goBack" src="../../assets/images/detail/back.png" alt />
    <div v-if="type === 'img'">
      <img
        class="collect"
        v-if="!ifCollected"
        @click="addCollect"
        src="../../assets/images/detail/collect.png"
        alt
      />
      <img
        class="collect"
        v-else
        @click="delCollect"
        src="../../assets/images/detail/collected.png"
        alt
      />
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'detailTopImg',
  props: ['imgUrl', 'type', 'id', 'title', 'collected'],
  data () {
    return {
      ifCollected: false
    }
  },
  watch: {
    collected (val) {
      this.ifCollected = val
    }
  },
  methods: {
    // 添加收藏
    addCollect () {
      const param = {
        access_token: this.getToken(),
        origin_id: this.id,
        title: this.title,
        index_pic: this.imgUrl,
        type: 1
      }
      this.$api.addCollection(param).then(res => {
        if (res.data.ErrorText) Toast(res.data.ErrorText)
        if (res.data.ErrorCode === 0 && res.data.data.uuid) {
          this.ifCollected = true
          Toast('收藏成功')
        }
      })
    },
    // 取消收藏
    delCollect () {
      const param = {
        access_token: this.getToken(),
        origin_id: this.id,
        type: 1
      }
      this.$api.delCollection(param).then(res => {
        if (res.data.ErrorText) Toast(res.data.ErrorText)
        if (res.data.ErrorCode === 0 && res.data.data === 'success') {
          this.ifCollected = false
          Toast('取消收藏成功')
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.top {
  height: 2.5rem;
  position: relative;
  .back {
    width: 0.11rem;
    height: 0.19rem;
    position: absolute;
    top: 0.33rem;
    left: 0.15rem;
  }
  .collect {
    width: 0.19rem;
    height: 0.19rem;
    position: absolute;
    top: 0.34rem;
    right: 0.14rem;
  }
}
</style>
