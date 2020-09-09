// cssid 9901 四季金陵
<template>
  <div class="wrapper" v-wechat-title="this.title+'_视觉南京'" >
    <header>
      <div class="list-header flexBox flexBox flexAlign grayBorder">
        <i class="backIcon" @click="goBack"></i>
        <div class="title">{{title}}</div>
      </div>
    </header>
    <div v-if="requested">
      <div class="season-container" v-if="list.length">
        <img class="top-img" :src="list[0].index_pic+'?imageView/0/h/193/w/375'" @click="goDetail(list[0])" alt />
        <div class="bottom-img">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item,index) in list.slice(1,4)" :key="index" @click.native="goDetail(item)">
              <img class="swiper-img fullImg" :src="item.index_pic+'?imageView/0/h/193/w/343'" alt />
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <img v-else class="no-data-img style1 pt15" src="../../assets/images/nodata/home_list.png" alt="">
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'liststyle1',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      title: '',
      id: '',
      requested: false,
      list: [],
      swiperOption: {
        direction: 'horizontal',
        observer: true,
        observeParents: true,
        loop: true,
        autoplay: {
          autoplay: true,
          delay: 5000
        },
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 5
      }
    }
  },
  methods: {
    getContent (id) {
      this.$api.getContent({column_id: id}).then(res => {
        if (res.status === 200 && res.data.length) {
          this.title = res.data[0].column_name
          this.list = res.data
          this.requested = true
        }
      })
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
  .season-container {
    .top-img {
      width: 100%;
      height: 1.93rem;
    }
    .bottom-img {
      width: 3.45rem;
      height: 3.8rem;
      display: block;
      margin: 0.15rem auto;
      /deep/ {
        .swiper-container {
          height: 3.8rem;
          .swiper-wrapper {
            align-items: center;
          }
          .swiper-slide {
            width: 3rem;
            height: 3.45rem;
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
            // background: url('../assets/images/home/swiper_mask.png') no-repeat 100% 100%;
          }
        }
      }
    }
  }
}
</style>
