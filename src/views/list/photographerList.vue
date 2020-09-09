/* 摄影师列表 */
<template>
  <div class="style3">
    <header>
      <div class="list-header flexBox flexBox flexAlign grayBorder">
        <i class="backIcon" @click="goBack"></i>
        <div class="title">摄影之家</div>
      </div>
    </header>
    <!-- 导航栏 -->
    <div class="nav-bar-container" v-if="navList.length > 1">
      <div class="nav-bar">
        <div
          class="nav-item"
          :class="{'active':index === navSelected}"
          v-for="(item,index) in navList"
          :key="index"
          @click="goList(item)"
        >{{item.name}}</div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list-container">
      <div class="container p15" v-for="(item,index) in navList.slice(1,navList.length)" :key="index">
        <div class="item-box" :class="{'mt30':index > 0}">
          <div class="column-name flexBox flexBetween flexAlign mb10" @click="goList(item)">
            <div class="flexBox flexAlign">
              <div class="title">{{item.name}}</div>
            </div>
            <i class="moreIcon"></i>
          </div>
          <div class="flexBox flexBetween flexWrap">
            <div
              class="user-item"
              :class="{'mb5':index < 4 }"
              v-for="(item,index) in item.data"
              :key="index"
              @click="goDetail(item)"
            >
              <img class="avatar" :src="item.index_pic+'?imageView/0/h/60/w/60'" alt />
              <p class="user-name">{{item.title}}</p>
              <div class="user-border"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 加载更多 -->
      <!-- <div class="load-more flexBox flexAlign flexMiddle" @click="loadMore">
        <img class="icon" src="../../assets/images/style/loadmore.png" alt />
        <p>加载更多</p>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'photographerList',
  data () {
    return {
      navSelected: 0,
      navList: [
        { name: '全部' }
      ],
      data: [
        {
          name: '签约摄影师',
          list: [
            {
              src:
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
              name: '尔语嫣'
            },
            {
              src:
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
              name: '尔语嫣'
            },
            {
              src:
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
              name: '尔语嫣'
            },
            {
              src:
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
              name: '尔语嫣'
            },
            {
              src:
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
              name: '尔语嫣'
            },
            {
              src:
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
              name: '尔语嫣'
            }
          ]
        },
        {
          name: '签约摄影师',
          list: [
            {
              src:
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
              name: '尔语嫣'
            },
            {
              src:
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
              name: '尔语嫣'
            },
            {
              src:
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
              name: '尔语嫣'
            },
            {
              src:
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
              name: '尔语嫣'
            },
            {
              src:
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
              name: '尔语嫣'
            },
            {
              src:
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
              name: '尔语嫣'
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 去列表页
    goList (item) {
      if (!item.id) return
      this.$router.push({
        path: '/liststyle5',
        query: { title: item.name, id: item.id }
      })
    },
    // 获取内容
    getData () {
      this.$api.getColumnContent({fid: 7}).then(res => {
        this.navList = this.navList.concat(res.data)
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang='scss' scoped>
.style3 {
  background: #fff;
  .list-container {
    background-color: #f8f8f8;
    min-height: 6rem;
    padding-bottom: 0.3rem;
    padding-top: 0.3rem;
    .item-box {
      &.mt30 {
        margin-top: 0.3rem;
      }
      .column-name {
        font-size: 0.18rem;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(61, 61, 61, 1);
      }
      .user-item {
        display: inline-block;
        width: 1.1rem;
        height: 1.3rem;
        background-color: #fff;
        margin-right: 0.05rem;
        padding-top: 0.2rem;
        &.mb5 {
          margin-bottom: 0.05rem;
        }
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
          background-color: #70d0fe;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
