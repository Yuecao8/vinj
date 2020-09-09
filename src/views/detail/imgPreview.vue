<template>
  <div class="wrapper" v-wechat-title="'图集预览_视觉南京'" v-if="swiperList.length">
    <div class="top">
      <img class="back alignCenter" @click="goBack" src="../../assets/images/detail/back.png" alt />
      {{`${nowIndex}/${swiperList.length}`}}
    </div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item,index) in swiperList" :key="index">
        <img style="width:100%;" :src="item.photo_url" alt />
      </swiper-slide>
    </swiper>
    <p class="title textEllipsis">{{swiperList[nowIndex-1].brief}}</p>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "imgPreview",
  components: { swiper, swiperSlide },
  data() {
    const that = this;
    return {
      nowIndex: 1,
      swiperList: [],
      swiperOption: {
        direction: "horizontal",
        observer: true,
        observeParents: true,
        loop: true,
        autoplay: false,
        slidesPerView: "auto",
        centeredSlides: true,
        on: {
          slideChangeTransitionStart: function() {
            that.nowIndex = this.realIndex + 1;
          }
        }
      }
    };
  },
  methods: {
    getData(id,count) {
      this.$api.getGalleryPhotos(id, 1, count).then(res => {
        if (res.data.ErrorCode === 0) {
          this.swiperList = res.data.data.data;
        }
      });
    }
  },
  created() {
    this.getData(this.$route.query.id,this.$route.query.count);
  }
};
</script>

<style lang='scss' scoped>
.wrapper {
  height: 100%;
  background-color: #000;
  padding-top: 0.8rem;
  position: relative;
  .top {
    position: absolute;
    top: 0.3rem;
    left: 0;
    right: 0;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    font-size: 0.16rem;
    color: #fff;
    .back {
      width: 0.11rem;
      height: 0.19rem;
      position: absolute;
      top: 50%;
      left: 0.15rem;
    }
  }
  /deep/ {
    .swiper-container {
      position: absolute;
      top: 0.8rem;
      bottom: 0.65rem;
      left: 0;
      right: 0;
      .swiper-wrapper {
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
        .swiper-slide {
          height: auto;
        }
      }
    }
  }
  .title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.65rem;
    line-height: 0.65rem;
    padding: 0 0.15rem;
    color: #fff;
    font-size: 0.18rem;
  }
}
</style>