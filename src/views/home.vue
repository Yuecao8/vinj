<template>
  <div class="home">
    <div class="main main-home" v-if="ifComplete === 3">
      <!-- 顶部 -->
      <div class="top flexBox flexAlign flexBetween">
        <i class="searchIcon search" @click="goToPage('search')"></i>
        <img class="logo alignCenter" src="../assets/vinj_Logo.png" alt />
      </div>
      <!-- 导航 -->
      <div class="nav-bar-container" v-if="navList.length > 1">
        <div class="nav-bar">
          <div
            class="nav-item"
            :class="{'active':index === navSelected}"
            v-for="(item,index) in navList"
            :key="index"
            @click="goList(item.name,item.id,item.cssid)"
          >{{item.name}}</div>
        </div>
      </div>
      <div class="top-img" v-if="navList.length > 1">
        <img class="fullImg" src="../assets/images/home/banner.png" alt />
        <!-- <p class="alignCenter top-text">捕获瞬间之美 邂逅最美南京</p> -->
      </div>
      <!-- 最新图片 轮播 -->
      <div class="imgs-wrapper diff-bg">
        <home-title :title="'最新图片'"></home-title>
        <swiper :options="swiperOption" ref="mySwiper" v-if="slideList.length">
          <swiper-slide v-for="(item,index) in slideList" :key="index" @click="goDetail(item)">
            <img class="swiper-img fullImg" :src="item.index_pic+'?imageView/0/h/193/w/343'" alt />
            <p class="swiper-text">{{item.title}}</p>
          </swiper-slide>
        </swiper>
        <img v-else class="no-data-img style1" src="../assets/images/nodata/home_list.png" alt />
      </div>
      <!-- 活动 -->
      <!-- <div class="event">event</div> -->
      <!-- 新闻图片 -->
      <div class="imgs-wrapper">
        <home-title :title="'新闻图片'" :data="newsData"></home-title>
        <div class="big-img-box">
          <img
            v-if="newsData.data[0]"
            class="big-img"
            :src="newsData.data[0].index_pic+'?imageView/0/h/220/w/345'"
            @click="goDetail(newsData.data[0])"
            alt
          />
          <p class="title">{{newsData.data[0].title}}</p>
        </div>
        <home-list :list="newsData.data.slice(1,5)" v-if="newsData.data.length"></home-list>
        <img
          v-if="!newsData.data.length"
          class="no-data-img style1"
          src="../assets/images/nodata/home_list.png"
          alt
        />
      </div>
      <!-- 专题图片 -->
      <div class="imgs-wrapper diff-bg">
        <home-title :title="'专题图片'" :data="topicData"></home-title>
        <home-list :list="topicData.data" v-if="topicData.data.length"></home-list>
        <img
          v-if="!topicData.data.length"
          class="no-data-img style1"
          src="../assets/images/nodata/home_list.png"
          alt
        />
      </div>
      <!-- 航拍频道 -->
      <div class="imgs-wrapper">
        <home-title :title="'航拍频道'" :data="hangpaiData"></home-title>
        <div
          class="long-item"
          v-for="(item,index) in hangpaiData.data.slice(0,2)"
          :key="index"
          @click="goDetail(item)"
        >
          <img
            class="long-img"
            :class="{'mb12':index === 0}"
            :src="item.index_pic+'?imageView/0/h/122/w/345'"
            alt
          />
          <div class="long-info flexBox flexBetween flexAlign">
            <div class="long-title">{{item.title}}</div>
            <div class="long-title author" v-if="item.author !== ''">作者：{{item.author}}</div>
          </div>
        </div>
        <img
          v-if="!hangpaiData.data.length"
          class="no-data-img style2"
          src="../assets/images/nodata/home_hangpai.png"
          alt
        />
      </div>
      <!-- 视频专区 -->
      <div class="imgs-wrapper" style="background-color:#223C41;">
        <home-title :title="'视频专区'" :type="1" :data="videoData"></home-title>
        <div class="video-list" v-if="videoData.data.length">
          <div
            class="video-item"
            v-for="(item,index) in videoData.data"
            :key="index"
            @click="goDetail(item)"
          >
            <img class="video-img fullImg" :src="item.index_pic+'?imageView/0/h/219/w/300'" alt />
            <img class="video-icon alignCenter" src="../assets/images/common/video_icon.png" alt />
            <div class="video-info flexBox flexBetween flexAlign">
              <p class="video-title textEllipsis" style="width:80%;">{{item.title}}</p>
              <p class="video-title video-duration">{{item.duration_format}}</p>
            </div>
          </div>
        </div>
        <img v-else class="no-data-img style1" src="../assets/images/nodata/home_list.png" alt />
      </div>
      <!-- 活动摄影 -->
      <div class="imgs-wrapper diff-bg">
        <home-title :title="'活动摄影'" :data="eventData"></home-title>
        <home-list :list="eventData.data" :type="'event'" v-if="eventData.data.length"></home-list>
        <img v-else class="no-data-img style1" src="../assets/images/nodata/home_list.png" alt />
      </div>
      <!-- 摄影之家 -->
      <div class="imgs-wrapper diff-bg" style="padding-top:0;">
        <home-title :title="'摄影之家'" :data="sheyingData"></home-title>
        <div class="user-list" v-if="memberList.length">
          <div
            class="user-item"
            v-for="(item,index) in memberList"
            :key="index"
          >
            <img
              v-if="item.avatar !== ''"
              class="avatar"
              :src="item.avatar+'?imageView/0/h/60/w/60'"
              alt
            />
            <img v-else class="avatar" src="../assets/images/my/avatar.png" alt />
            <p class="user-name">{{item.nick_name}}</p>
            <div class="user-border"></div>
          </div>
        </div>
        <img v-else class="no-data-img style1" src="../assets/images/nodata/home_list.png" alt />
      </div>
    </div>
    <!-- 底部tab -->
    <div class="tab-bar flexBox">
      <div class="tab-bar-item flexBox flexAlign flexMiddle flexColumn">
        <i class="homeIconActive"></i>
        <p class="tab-text active">首页</p>
      </div>
      <div class="tab-bar-item flexBox flexAlign flexMiddle flexColumn" @click="goToPage('homemy')">
        <i class="myIcon"></i>
        <p class="tab-text">我的</p>
      </div>
      <i class="publishIcon alignCenter" @click="goContribute"></i>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import homeTitle from '../components/home/homeTitle'
import homeList from '../components/home/homeList'
export default {
  name: 'home',
  components: {
    homeTitle,
    homeList,
    swiper,
    swiperSlide
  },
  data () {
    return {
      ifComplete: 0,
      navSelected: 0,
      navList: [{ name: '首页' }],
      slideList: [],
      swiperOption: {
        direction: 'horizontal',
        observer: true,
        observeParents: true,
        loop: true,
        autoplay: {
          autoplay: true,
          delay: 3000
        },
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 5
      },
      newsData: { data: [] },
      topicData: { data: [] },
      hangpaiData: { data: [] },
      videoData: { data: [] },
      eventData: { data: [] },
      sheyingData: { data: [] },
      memberList: []
    }
  },
  methods: {
    // 获取展示列表
    getColumnContent () {
      const param = { fid: 0 }
      this.$api.getColumnContent(param).then(res => {
        if (res.status === 200 && res.data.length) {
          this.navList = this.navList.concat(res.data)
          this.navList.forEach(ele => {
            if (ele.name === '新闻图片') {
              this.newsData = ele
            }
            if (ele.name === '专题图片') {
              this.topicData = ele
            }
            if (ele.name === '航拍频道') {
              this.hangpaiData = ele
            }
            if (ele.name === '视频专区') {
              this.videoData = ele
            }
            if (ele.name === '活动摄影') {
              this.eventData = ele
            }
            if (ele.name === '摄影之家') {
              this.sheyingData = ele
            }
          })
          this.ifComplete += 1
          this.getSwiperList()
          this.getMemberList()
        }
      })
    },
    // 获取轮播图
    getSwiperList () {
      this.$api.getHomeSwiperList(1, 6).then(res => {
        if (res.data.data.length) {
          this.slideList = res.data.data
          this.ifComplete += 1
        }
      })
    },
    // 获取摄影师列表
    getMemberList () {
      this.$api.getMemberList().then(res => {
        if (res.status === 200 && res.data.data.length) {
          this.memberList = res.data.data
          this.ifComplete += 1
        }
      })
    },
    // 去列表详情页
    goList (title, id, cssid) {
      if (title === '首页') return
      cssid === 9901 &&
        this.$router.push({ path: '/liststyle1', query: { id } })
      cssid === 9903 &&
        this.$router.push({ path: '/liststyle3', query: { id } })
      cssid === 9904 &&
        this.$router.push({ path: '/photographerlist', query: { id } })
      cssid === 9905 &&
        this.$router.push({ path: '/liststyle5', query: { title, id } });
      (cssid === 9906 || cssid === 9907 || cssid === 9908 || cssid === 9910) &&
        this.$router.push({ path: '/liststyle6', query: { id } })
      cssid === 9909 &&
        this.$router.push({ path: '/liststyle2', query: { id } })
    },
    // 跳转我的
    goMy () {
      this.$router.push('/homemy')
    },
    // 发布投稿
    goContribute () {
      const token = this.getToken()
      if (!token) {
        this.$router.push('/login')
      } else {
        if (window.localStorage.getItem('groupId') === '2') {
          this.$router.push('/contribute')
        } else {
          MessageBox('提示', '还不是签约摄影师，请到视觉南京Web端签约后投稿')
        }
      }
    },
    // 去用户主页
    goUserDetail (id) {
      this.$router.push({ path: '/userdetail', query: { id } })
    }
  },
  created () {
    this.getColumnContent()
  }
}
</script>
<style lang='scss' scoped>
.home {
  height: 100%;
  .top {
    padding: 0 0.15rem;
    height: 0.65rem;
    position: relative;
    border-bottom: 1px solid #f7f5f5;
    .search {
      position: absolute;
      top: 0.22rem;
      right: 0.14rem;
    }
    .logo {
      width: 0.96rem;
      height: 0.3rem;
    }
  }
  .main {
    position: absolute;
    bottom: 0.49rem;
    left: 0;
    right: 0;
    top: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &.main-home {
      top: 0;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .top-img {
      height: 1.93rem;
      position: relative;
      background-color: #1c3644;
      .top-text {
        width: 100%;
        text-align: center;
        font-family: SourceHanSansCN;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        font-size: 0.2rem;
      }
    }
    .imgs-wrapper {
      padding: 0.3rem 0;
      &.diff-bg {
        background: #f8f8f8;
      }
      &.pb0 {
        padding-bottom: 0;
      }
      /deep/ {
        .swiper-container {
          height: 1.93rem;
          .swiper-wrapper {
            align-items: center;
          }
          .swiper-slide {
            width: 3.43rem;
            height: 1.93rem;
            background-color: #ccc;
            position: relative;
          }
          .swiper-slide-prev {
            height: 80% !important;
          }
          .swiper-slide-next {
            height: 80% !important;
          }
          .swiper-text {
            height: 0.46rem;
            line-height: 0.46rem;
            position: absolute;
            bottom: 0;
            font-size: 15px;
            font-family: SourceHanSansCN;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            width: 100%;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.1);
          }
        }
      }
      .big-img-box {
        position: relative;
        padding: 0 0.15rem;
        margin-bottom: 0.12rem;
        .big-img {
          width: 3.45rem;
          height: 2.2rem;
          // margin: 0 auto 0.12rem;
          display: block;
        }
        .title {
          box-sizing: border-box;
          padding-left: 0.1rem;
          width: 3.45rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: absolute;
          bottom: 0;
          height: 0.33rem;
          line-height: 0.33rem;
          font-size: 0.15rem;
          font-family: SourceHanSansCN;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          background: rgba(0, 0, 0, 0.1);
        }
      }
      .long-item {
        position: relative;
        .long-img {
          width: 3.45rem;
          height: 1.22rem;
          margin: 0 auto;
          display: block;
          &.mb12 {
            margin-bottom: 0.12rem;
          }
        }
        .long-info {
          padding: 0 0.1rem;
          width: 3.45rem;
          height: 0.32rem;
          position: absolute;
          bottom: 0;
          left: 0.15rem;
          background: rgba(0, 0, 0, 0.1);
          .long-title {
            font-size: 0.15rem;
            font-family: SourceHanSansCN;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            &.author {
              font-size: 0.12rem;
            }
          }
        }
      }
      .video-list {
        width: 100%;
        height: 2.19rem;
        padding-left: 0.15rem;
        white-space: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        .video-item {
          display: inline-block;
          width: 3rem;
          height: 2.19rem;
          margin-right: 0.1rem;
          position: relative;
          .video-icon {
            width: 0.4rem;
            height: 0.4rem;
          }
          .video-info {
            height: 0.46rem;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 0 0.1rem;
            background: rgba(0, 0, 0, 0.1);
            .video-title {
              font-size: 0.15rem;
              font-family: SourceHanSansCN;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              .video-duration {
                font-size: 0.13rem;
                font-weight: 400;
              }
            }
          }
        }
      }
      .user-list {
        height: 1.3rem;
        padding-left: 0.17rem;
        white-space: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        .user-item {
          display: inline-block;
          width: 1.1rem;
          height: 1.3rem;
          background-color: #fff;
          margin-right: 0.05rem;
          padding-top: 0.2rem;
          .avatar {
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            margin: 0 auto 0.1rem;
            display: block;
          }
          .user-name {
            font-size: 0.14rem;
            font-family: SourceHanSansCN;
            font-weight: 400;
            text-align: center;
            margin-bottom: 0.05rem;
          }
          .user-border {
            width: 0.22rem;
            height: 0.03rem;
            background-color: #e2313d;
            margin: 0 auto;
          }
        }
      }
    }
    .event {
      height: 0.48rem;
      border: 1px solid #ccc;
    }
  }
}
</style>
