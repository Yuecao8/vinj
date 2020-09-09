// cssid 9902 视频专区 单列列表
<template>
  <div class="wrapper" v-wechat-title="this.title+'_视觉南京'">
    <header>
      <div class="list-header flexBox flexBox flexAlign grayBorder">
        <i class="backIcon" @click="goBack"></i>
        <div class="title">{{title}}</div>
      </div>
    </header>
    <div v-if="requested">
      <div class="video-container" v-if="list.length">
        <div class="video-item" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
          <img class="fullImg" :src="item.index_pic+'?imageView/0/h/211/w/375'" alt />
          <img src="../../assets/images/common/video_icon.png" alt class="icon alignCenter" />
          <div class="info flexBox flexAlign flexBetween">
            <p class="textEllipsis" style="width:80%;">{{item.title}}</p>
            <p class="duration">{{item.duration_format}}</p>
          </div>
        </div>
      </div>
      <img
        v-else
        class="no-data-img style1 pt15"
        src="../../assets/images/nodata/home_list.png"
        alt
      />
      <!-- 加载更多 -->
      <div
        v-if="hasMore"
        class="load-more flexBox flexAlign flexMiddle"
        @click="loadMore"
        style="margin-bottom:0.3rem;"
      >
        <img class="icon" src="../../assets/images/style/loadmore.png" alt />
        <p>加载更多</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'liststyle2',
  data () {
    return {
      offset: 0,
      count: 10,
      title: '',
      id: '',
      list: [],
      hasMore: true,
      requested: false
    }
  },
  methods: {
    getContent (id) {
      if (!this.hasMore) {
        Toast('没有更多了')
        return
      }
      const param = {
        column_id: id,
        offset: this.offset,
        count: this.count
      }
      this.$api.getContent(param).then(res => {
        if (res.data.length) {
          if (!this.title) this.title = res.data[0].column_name
          this.list = this.list.concat(res.data)
          if (res.data.length < this.count) {
            this.hasMore = false
          }
          this.requested = true
        } else {
          Toast('没有更多了')
          this.requested = true
          this.hasMore = false
        }
      })
    },
    loadMore () {
      this.offset += 10
      this.getContent(this.id)
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getContent(this.id)
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  .video-container {
    .video-item {
      display: block;
      width: 100%;
      height: 2.11rem;
      margin-bottom: 0.1rem;
      position: relative;
      .icon {
        width: 0.4rem;
        height: 0.4rem;
      }
      .info {
        width: 100%;
        height: 0.46rem;
        position: absolute;
        bottom: 0;
        padding: 0 0.15rem;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        font-size: 0.16rem;
        .duration {
          font-size: 0.13rem;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
