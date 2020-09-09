<template>
  <div class="info-box">
    <p class="title" v-if="type === 'img' && data.photo_count">{{`${data.title}（共${data.photo_count}张）`}}</p>
    <p class="title" v-else>{{data.title}}</p>
    <div class="icon-box flexBox flexAlign">
      <i class="viewIcon"></i>
      <p class="number">{{data.click_num !== '' ? data.click_num : 0}}</p>
      <i class="praiseIcon" style="margin-right:0;"></i>
      <p class="number">{{data.praise_num !== '' ? data.praise_num : 0}}</p>
      <i class="downloadIcon"></i>
      <p class="number">{{data.downloads !== '' ? data.downloads : 0}}</p>
    </div>
    <!-- 图集有详情 -->
    <div v-if="type === 'img'" class="detail-icon-box flexBox flexAlign" @click="goImgPreview">
      <p>详情</p>
      <i class="moreIcon"></i>
    </div>
    <!-- 标签 -->
    <div class="tag-box flexBox flexWrap" v-if="data.keywords != ''">
      <p class="tag-item" v-if="!tagList.length">{{data.keywords}}</p>
      <p class="tag-item" v-else v-for="(item,index) in tagList" :key="index">{{item}}</p>
    </div>
    <p class="detail" v-if="data.brief !== ''">{{data.brief}}</p>
  </div>
</template>

<script>
export default {
  name: 'detailMainInfo',
  props: ['data', 'type', 'id', 'count'],
  data () {
    return {
      tagList: []
    }
  },
  methods: {
    goImgPreview () {
      this.$router.push({path: '/imgpreview', query: {id: this.id, count: this.count}})
    }
  },
  created () {
    if (this.data.keywords.indexOf(',') !== -1) {
      this.tagList = this.data.keywords.split(',')
    }
  }
}
</script>

<style lang='scss' scoped>
.info-box {
  padding: 0.15rem;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  position: relative;
  .detail-icon-box {
    font-size: 0.14rem;
    color: #a6a6a6;
    position: absolute;
    top: 0.25rem;
    right: 0.14rem;
    p {
      margin-right: 0.05rem;
    }
  }
  .tag-box {
    margin: 0.2rem 0 0.12rem;
  }
  p {
    &.title {
      font-size: 0.18rem;
      font-weight: 500;
      color: #333;
      margin-bottom: 0.14rem;
    }
    &.number {
      margin-left: 0.02rem;
      margin-right: 0.2rem;
      font-size: 0.13rem;
      color: #a6a6a6;
    }
    &.tag-item {
      background: rgba(242, 242, 242, 1);
      border-radius: 2px;
      padding: 0.04rem 0.08rem;
      font-size: 0.14rem;
      color: #666;
      margin-right: 0.08rem;
    }
    &.detail {
      font-size: 0.15rem;
      color: rgba(51, 51, 51, 1);
      line-height: 0.21rem;
      text-align: justify;
      margin-top: 0.1rem;
    }
  }
}
</style>
