<template>
  <div class="search">
    <div class="top">
      <div class="search-box flexBox flexAlign flexBetween">
        <div class="search-bg flexBox flexAlign">
          <img class="icon" src="../assets/images/search/search_icon.png" alt />
          <form action="" @submit.prevent="getSearchList">
            <input type="search" ref="search" placeholder="请输入搜索内容" v-model="searchVal" autofocus/>
          </form>
          <img
            v-if="searchVal"
            class="close-icon"
            @click="clearInput"
            src="../assets/images/search/close_icon.png"
            alt
          />
        </div>
        <p @click="goBack">取消</p>
      </div>
    </div>
    <div class="p15 flexBox flexBetween flexWrap" style="padding-top:0.15rem;margin-top:0.72rem;" v-if="requested">
      <div class="img-item mb10" v-for="(img,index) in list" :key="index" @click="goDetail(img)">
        <img v-if="img.index_pic.host" :src="img.index_pic.host+img.index_pic.dir+img.index_pic.filepath+img.index_pic.filename+'?imageView/0/h/100/w/168'" alt />
        <img v-else class="fullImg" src="../assets/images/nodata/list_small.png" alt="">
        <div class="img-info">
          <p v-mark class="title textEllipsis">{{img.title}}</p>
          <p class="date">{{img.updated_at.substring(0,10)}}</p>
        </div>
      </div>
      <img v-if="!list.length" class="no-data-img style1" src="../assets/images/nodata/home_list.png" alt="">
    </div>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui'
export default {
  name: 'search',
  data () {
    return {
      searchVal: '',
      list: [],
      requested: false
    }
  },
  methods: {
    clearInput () {
      this.searchVal = ''
    },
    getSearchList () {
      this.$refs.search.blur()
      this.requested = false
      Indicator.open('搜索中')
      this.$api.getSearchList(this.searchVal).then(res => {
        this.list = []
        if (res.data.length) {
          setTimeout(() => {
            Indicator.close()
            this.list = res.data
            this.requested = true
          }, 300)
        } else if (res.data.length === 0) {
          setTimeout(() => {
            Indicator.close()
            this.requested = true
          }, 300)
        }
      })
    }
  },
  directives: {
    // 搜索匹配高亮关键词
    mark: {
      inserted: function (el, binding, vnode) {
        if (
          el.innerText
            .toLowerCase()
            .indexOf(vnode.context.searchVal.toLowerCase()) > -1
        ) {
          let valLeft = el.innerText.slice(
            0,
            el.innerText
              .toLowerCase()
              .indexOf(vnode.context.searchVal.toLowerCase())
          )
          let valMark = el.innerText.slice(
            el.innerText
              .toLowerCase()
              .indexOf(vnode.context.searchVal.toLowerCase()),
            el.innerText
              .toLowerCase()
              .indexOf(vnode.context.searchVal.toLowerCase()) +
              vnode.context.searchVal.length
          )
          let valRight = el.innerText.substr(
            el.innerText
              .toLowerCase()
              .indexOf(vnode.context.searchVal.toLowerCase()) +
              vnode.context.searchVal.length
          )
          el.innerHTML = `${valLeft}<span style="color:red">${valMark}</span>${valRight}`
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.search {
  width: 100%;
  min-height: 100%;
  background: rgba(248, 248, 248, 1);
  .top {
    background-color: #fff;
    height: 0.72rem;
    padding: 0.2rem 0.12rem 0 0.1rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .search-box {
      height: 100%;
      .search-bg {
        width: 3.1rem;
        height: 0.34rem;
        background: rgba(248, 248, 248, 1);
        border-radius: 0.17rem;
        padding-left: 0.11rem;
        .icon {
          width: 0.16rem;
          height: 0.16rem;
          margin-right: 0.11rem;
        }
        .close-icon {
          width: 0.14rem;
          height: 0.14rem;
        }
        input {
          width: 2.48rem;
          height: 0.24rem;
          background: rgba(248, 248, 248, 1);
          font-size: 0.14rem;
          color: #333333;
          outline: none;
          border: 0;
          &::-webkit-input-placeholder {
            color: #b5b5b5;
            font-size: 0.14rem;
            height: normal;
            padding-top: 0.02rem;
            // transform: translate(0, 0.01rem);
          }
        }
      }
      p {
        font-size: 0.16rem;
        color: #dd2f3c;
      }
    }
  }
}
</style>
