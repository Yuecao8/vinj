// 个人作品列表页 图集
<template>
  <div class="wrapper" v-wechat-title="'我的作品_视觉南京'">
    <header>
      <div class="list-header flexBox flexBox flexAlign grayBorder">
        <i class="backIcon" @click="goBack"></i>
        <div class="title">{{type === 'activity' ? '活动投稿' : '签约投稿'}}</div>
      </div>
    </header>
    <div v-if="requested">
      <div v-if="list.length" class="flexBox flexBetween flexWrap p15" style="padding-top:0.15rem;">
        <div class="img-item" :class="{'mt10':index > 1}" v-for="(img,index) in list" :key="index" @click="goImgDetail(img.origin_id)">
          <img
            v-if="img.index_pic"
            :src="img.index_pic+'?imageView/0/h/100/w/168'"
            alt
          />
          <img v-else class="fullImg" src="../../assets/images/nodata/list_small.png" alt />
          <div class="img-info">
            <p class="title textEllipsis">{{img.title}}</p>
            <p class="date">{{img.created_at.substring(0,10)}}</p>
            <p class="status checking" v-if="img.status === 1">未审核</p>
            <p class="status checked" v-if="img.status === 2">已审核</p>
            <p class="status published" v-if="img.status === 3">已发布</p>
            <p class="status ban" v-if="img.status === 4">已打回</p>
          </div>
        </div>
      </div>
      <img v-else class="no-data-img style1 pt15" src="../../assets/images/nodata/home_list.png" alt />
      <!-- 加载更多 -->
      <div class="load-more flexBox flexAlign flexMiddle" @click="loadMore" v-if="hasMore">
        <img class="icon" src="../../assets/images/style/loadmore.png" alt />
        <p>加载更多</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'myPublishList',
  data () {
    return {
      type: '',
      page: 1,
      count: 10,
      list: [],
      hasMore: true,
      requested: false
    }
  },
  methods: {
    getContent () {
      if (!this.hasMore) {
        Toast('没有更多了')
        return
      }
      let param = {
        access_token: this.getToken(),
        page: this.page,
        per_num: this.count
      }
      if (this.type === 'activity') {
        param.act_id = 2
      } else {
        param.act_id = 1
      }
      this.$api.getUserGallery(param).then(res => {
        if (res.data.ErrorCode === 0) {
          if (res.data.data.data.length) {
            this.list = this.list.concat(res.data.data.data)
            if (res.data.data.data.length < this.count) {
              this.hasMore = false
            }
          } else {
            Toast('没有更多了')
            this.hasMore = false
          }
        }
        this.requested = true
      })
    },
    loadMore () {
      this.page++
      this.getContent()
    },
    goImgDetail (id) {
      this.$api.getGalleryDetail(id).then(res => {
        if (res.data.ErrorText) {
          Toast(res.data.ErrorText)
        } else {
          this.$router.push({ path: '/imgdetail', query: { id } })
        }
      })
      // this.$router.push({path: '/imgdetail', query: {id}})
    }
  },
  created () {
    this.type = this.$route.query.type
    this.getContent()
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  background-color: #f8f8f8;
  min-height: 100%;
  padding-bottom: 0.3rem;
  .mt10 {
    margin-top: 0.1rem;
  }
  .img-item{
    position: relative;
  }
}
</style>
