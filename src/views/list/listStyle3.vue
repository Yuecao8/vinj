// 摄影列表 双列列表 tab切换
<template>
  <div class="wrapper" v-if="requested" v-wechat-title="this.title+'_视觉南京'">
    <header>
      <div class="list-header flexBox flexBox flexAlign grayBorder">
        <i class="backIcon" @click="goBack"></i>
        <div class="title">{{title}}</div>
      </div>
    </header>
    <swiper v-if="swiperList.length" :list="swiperList" class="swiper"></swiper>
    <!-- 导航栏 -->
    <div class="nav-bar-container">
      <div class="nav-bar">
        <div
          class="nav-item"
          :class="{'active':index === navSelected}"
          v-for="(item,index) in navList"
          :key="index"
          @click="changeNav(index,item.id)"
        >{{item.name}}</div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list-container">
      <div class="container p15">
        <div class="flexBox flexBetween flexWrap">
          <div
            class="img-item"
            :class="{'mt10':index < 2}"
            v-for="(img,index) in list"
            :key="index"
            @click="goDetail(img)"
          >
            <img v-if="img.index_pic" :src="img.index_pic+'?imageView/0/h/100/w/168'" alt />
            <img v-else class="fullImg" src="../../assets/images/nodata/list_small.png" alt />
            <div class="img-info">
              <p class="title textEllipsis">{{img.title}}</p>
              <p class="date">{{img.publish_time.substring(0,10)}}</p>
            </div>
          </div>
          <img
            v-if="!list.length"
            class="no-data-img style1 pt15"
            src="../../assets/images/nodata/home_list.png"
            alt
          />
        </div>
      </div>
      <!-- 加载更多 -->
      <div class="load-more flexBox flexAlign flexMiddle" @click="loadMore" v-if="hasMore">
        <img class="icon" src="../../assets/images/style/loadmore.png" alt />
        <p>加载更多</p>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from '../../components/common/swiper'
import { Toast } from 'mint-ui'
export default {
  name: 'imgList2',
  components: {
    swiper
  },
  data () {
    return {
      offset: 0,
      count: 10,
      title: '',
      hasMore: true,
      navSelected: 0,
      currentId: null,
      swiperList: [
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg'
      ],
      navList: [{ name: '全部' }],
      list: [],
      requested: false
    }
  },
  methods: {
    changeNav (index, id) {
      this.hasMore = true
      this.list = []
      this.offset = 0
      this.navSelected = index
      this.currentId = id
      this.getContent(id)
    },
    // 获取轮播图
    getSwiperList (id) {
      this.$api.getColumnContent({ column_id: id }).then(res => {
        if (res.data.length) {
          this.swiperList = res.data[0].index_pics
          this.title = res.data[0].name
        }
      })
    },
    // 获取栏目列表
    getColumnList (fid) {
      this.$api.getColumnContent({ fid }).then(res => {
        if (res.status === 200 && res.data.length) {
          this.navList = this.navList.concat(res.data)
          this.currentId = this.navList[0].id
          this.getContent(this.navList[0].id)
        }
      })
    },
    // 获取内容列表
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
      this.getContent(this.currentId)
    }
  },
  created () {
    this.id = this.$route.query.id
    this.navList[0].id = this.id
    this.getColumnList(this.id)
    this.getSwiperList(this.id)
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  background: #fff;
  .list-container {
    background-color: #f8f8f8;
    min-height: 6rem;
    padding-bottom: 0.3rem;
    padding-top: 0.15rem;
    .mt10 {
      margin-top: 0.1rem;
    }
  }
}
</style>
