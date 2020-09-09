<template>
  <div class="wrapper" v-wechat-title="'活动详情_视觉南京'">
    <detail-top-img :imgUrl="detail.index_pic_url+'?imageView/0/h/250/w/375'"></detail-top-img>
    <!-- tab -->
    <div class="nav flexBox">
      <div class="nav-item" :class="{'active':selectedIndex === 0}" @click="changeIndex(0)">
        <p>活动详情</p>
      </div>
      <div class="nav-item" :class="{'active':selectedIndex === 1}" @click="changeIndex(1)">
        <p>优秀作品</p>
      </div>
    </div>
    <!-- 活动详情 -->
    <div class="main" v-if="selectedIndex === 0 && detail.id">
      <p class="title">{{detail.title}}</p>
      <div v-if="detail.brief">
        <p class="title sub">活动介绍</p>
        <p class="detail">{{detail.brief}}</p>
      </div>
      <div>
        <p class="title sub">活动时间</p>
        <p class="detail">
          {{`${detail.start_time.substring(0,10)} 至 ${detail.end_time.substring(0,10)}`}}
        </p>
      </div>
    </div>
    <!-- 优秀作品 -->
    <div class="main2" v-if="selectedIndex === 1 && listRequested">
      <div class="img-box flexBox flexBetween flexWrap">
        <div
          class="img-list-item"
          :class="{'mt5':index > 1}"
          v-for="(item,index) in list"
          :key="index"
          @click="goDetail(item)"
        >
          <img class="fullImg" :src="item.index_pic+'?imageView/0/h/112/w/170'" alt />
          <p class="title">{{item.title}}</p>
        </div>
        <img
            v-if="!list.length"
            class="no-data-img style1"
            src="../../assets/images/nodata/home_list.png"
            alt
          />
      </div>
    </div>
    <!-- 投稿按钮 -->
    <div class="tougao">
      <div class="button" @click="goContribute">我要投稿</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import detailTopImg from '../../components/detail/detailTopImg'
export default {
  name: 'eventDetail',
  components: { detailTopImg },
  data () {
    return {
      id: '',
      page: 1,
      count: 10,
      selectedIndex: 0,
      detail: {},
      list: [],
      listRequested: false
    }
  },
  methods: {
    changeIndex (i) {
      this.selectedIndex = i
      this.selectedIndex === 1 && this.getList(this.id)
    },
    getDetail (id) {
      const param = {
        access_token: this.getToken(),
        activity_id: this.id
      }
      this.$api.getActivityDetail(param).then(res => {
        if (res.data.ErrorCode === 0) {
          this.detail = res.data.data
        }
      })
    },
    getList (id) {
      if (this.listRequested) return
      const param = {
        page: this.page,
        per_num: this.count,
        activity_id: id,
        status: 3
      }
      this.$api.getActivityDetailList(param).then(res => {
        if (res.data.ErrorCode === 0) {
          this.list = res.data.data.data
          this.listRequested = true
        }
      })
    },
    goContribute () {
      this.$router.push({
        path: '/contribute',
        query: { id: this.$route.query.id }
      })
    },
    goDetail (item) {
      this.$api.getGalleryDetail(item.id).then(res => {
        if (res.data.ErrorText) {
          Toast(res.data.ErrorText)
        } else {
          this.$router.push({ path: '/imgdetail', query: { id: item.id } })
        }
      })
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getDetail(this.id)
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  .nav {
    height: 0.46rem;
    border-bottom: 1px solid #eaeaea;
    .nav-item {
      width: 50%;
      height: 0.46rem;
      text-align: center;
      line-height: 0.46rem;
      font-size: 0.16rem;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      &.active {
        color: rgba(221, 47, 60, 1);
      }
    }
  }
  .main {
    padding: 0.33rem 0.15rem 0.28rem;
    p {
      font-family: SourceHanSansCN;
      color: rgba(51, 51, 51, 1);
      &.mt28 {
        margin-top: 0.28rem;
      }
      &.title {
        font-size: 0.18rem;
        font-weight: bold;
      }
      &.sub {
        font-size: 0.15rem;
        margin: 0.28rem 0 0.13rem;
      }
      &.detail {
        font-size: 0.15rem;
        font-weight: 400;
        line-height: 0.24rem;
        text-align: justify;
      }
    }
  }
  .main2 {
    padding: 0.15rem;
    .img-list-item {
      position: relative;
      width: 1.7rem;
      height: 1.12rem;
      &.mt5 {
        margin-top: 0.05rem;
      }
    }
    .title {
      box-sizing: border-box;
      width: 100%;
      height: 0.28rem;
      line-height: 0.28rem;
      position: absolute;
      bottom: 0;
      padding-left: 0.09rem;
      font-size: 0.12rem;
      color: #fff;
      background-color: rgba(0,0,0,0.1);
    }
  }
  .tougao {
    padding: 0.15rem;
    background: rgba(248, 248, 248, 1);
    .button {
      display: block;
      background: rgba(221, 47, 60, 1);
      border-radius: 3px;
      height: 0.38rem;
      line-height: 0.38rem;
      text-align: center;
      font-size: 0.16rem;
      color: #fff;
    }
  }
}
</style>
