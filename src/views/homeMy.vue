<template>
  <div class="my-wrapper">
    <div v-if="token && myInfo.id">
      <!-- 顶部 个人资料 -->
      <div class="my-top">
        <img class="setting" @click="logout" src="../assets/images/my/quit.png" />
        <div class="my-info flexBox">
          <img
            v-if="myInfo.avatar !== ''"
            class="avatar"
            :src="myInfo.avatar+'?imageView/0/h/84/w/84'"
            alt
          />
          <img v-else class="avatar" src="../assets/images/my/avatar.png" alt />
          <div class="my-box">
            <div class="my-name-box flexBox">
              <p class="my-name" v-if="myInfo.nick_name">{{myInfo.nick_name}}</p>
              <img
                v-if="myInfo.extension && myInfo.extension.gender.value === '男'"
                class="gender-icon"
                src="../assets/images/my/male.png"
                alt
              />
              <img
                v-if="myInfo.extension && myInfo.extension.gender.value === '女'"
                class="gender-icon"
                src="../assets/images/my/female.png"
                alt
              />
            </div>
            <div class="become" v-if="myInfo.group_id !== 2" @click="become">成为签约摄影师</div>
          </div>
        </div>
        <div class="my-number-box flexBox">
          <div class="my-number-item flexBox flexMiddle flexColumn">
            <p class="number-text">{{userData.works}}</p>
            <div class="flexBox flexAlign">
              <img src="../assets/images/my/number_icon1.png" alt class="number-icon" />
              <p class="number-sub-text">作品</p>
            </div>
          </div>
          <div class="my-number-item flexBox flexMiddle flexColumn">
            <p class="number-text">{{userData.clicks}}</p>
            <div class="flexBox flexAlign">
              <img src="../assets/images/my/number_icon2.png" alt class="number-icon" />
              <p class="number-sub-text">访客</p>
            </div>
          </div>
          <!-- <div class="my-number-item flexBox flexMiddle flexColumn">
            <p class="number-text">25</p>
            <div class="flexBox flexAlign">
              <img src="../assets/images/my/number_icon3.png" alt class="number-icon" />
              <p class="number-sub-text">收藏</p>
            </div>
          </div>-->
        </div>
      </div>
      <!-- tab -->
      <div class="nav flexBox">
        <div
          class="nav-item"
          v-for="(item,index) in tabList"
          :key="index"
          @click="changeTab(index)"
        >
          <div class="nav-text" :class="{'active':index === currentTab}">{{item}}</div>
          <div class="nav-border" v-if="index === currentTab"></div>
        </div>
      </div>
      <!-- 作品 -->
      <div class="main" v-if="currentTab === 0">
        <!-- 选择类型切换 -->
        <div class="count-box flexBox flexAlign">
          <!-- <div class="flex-item" :class="{'active':currentWork === 0}" @click="changeWork(0)">全部·36</div> -->
          <div
            class="flex-item"
            :class="{'active':currentWork === 0}"
            @click="changeWork(0)"
          >图片·{{publishImgCount1+publishImgCount2}}</div>
          <div class="flex-item" :class="{'active':currentWork === 1}" @click="changeWork(1)">视频·0</div>
        </div>
        <!-- 图片列表 -->
        <div v-if="currentWork === 0">
          <div class="divider"></div>
          <!-- 我要投稿 -->
          <div class="contribute flexBox flexAlign" @click="wantContribute">
            <img class="icon" src="../assets/images/my/contribute_icon.png" alt />
            <div class="text">我要投稿</div>
            <i class="moreIcon"></i>
          </div>
          <div class="divider"></div>
          <!-- 签约投稿 -->
          <div class="work-contribute-box">
            <router-link
              class="work-contribute-title flexBox flexAlign flexBetween p15"
              to="/mypublishlist"
            >
              <p class="text">签约投稿·{{publishImgCount1}}</p>
              <i class="moreIcon"></i>
            </router-link>
            <!-- <img-list :list="imgList" :type="0"></img-list> -->
          </div>
          <div class="divider"></div>
          <!-- 活动投稿 -->
          <div class="work-contribute-box">
            <router-link
              class="work-contribute-title flexBox flexAlign flexBetween p15"
              to="/mypublishlist?type=activity"
            >
              <p class="text">活动投稿·{{publishImgCount2}}</p>
              <i class="moreIcon"></i>
            </router-link>
            <!-- <img-list :list="imgList" :type="1"></img-list> -->
          </div>
          <div class="divider"></div>
        </div>
        <!-- 视频列表 -->
        <div v-if="currentWork === 1" class="p15">
          <img class="fullImg" src="../assets/images/nodata/home_updated.png" alt />
        </div>
      </div>
      <!-- 活动 -->
      <div class="main" v-if="currentTab === 1 && activityRequested">
        <!-- 选择类型切换 -->
        <div class="count-box flexBox flexAlign">
          <div
            class="flex-item"
            :class="{'active':currentActivity === 0}"
            @click="changeEvent(0)"
          >参与活动·{{myActivityCount}}</div>
          <div
            class="flex-item"
            :class="{'active':currentActivity === 1}"
            @click="changeEvent(1)"
          >评分活动·{{myRateActivityCount}}</div>
        </div>
        <!-- 参与活动列表 -->
        <div v-if="currentActivity === 0">
          <div v-for="(item,index) in myActivityList" :key="index">
            <div class="divider"></div>
            <div class="event-item" @click="goEventDetail(item.id)">
              <img :src="item.index_pic+'?imageView/0/h/200/w/345'" alt />
              <p class="title">&lt;{{item.title}}&gt;</p>
              <p class="brief">{{item.brief}}</p>
              <div class="info-box">
                <p>活动时间</p>
                <p
                  class="detail"
                >{{item.start_time.substring(5,16)}} 至 {{item.end_time.substring(5,16)}}</p>
                <p style="margin-top:0.15rem;">操作</p>
                <p class="detail">详情</p>
              </div>
              <div class="detail-box flexBox" @click.stop="goEventList(item.id)">
                <p>活动稿件</p>
                <img class="icon" src="../assets/images/my/my_detail_icon.png" alt />
              </div>
            </div>
          </div>
          <img
            v-if="!myActivityList.length"
            class="no-data-img style1"
            src="../assets/images/nodata/home_list.png"
            alt
          />
        </div>
        <!-- 评分活动列表 -->
        <div v-if="currentActivity === 1">
          <div v-for="(item,index) in myRateActivityList" :key="index">
            <div class="divider"></div>
            <div class="event-item" @click="goEventDetail(item.id,type)">
              <img :src="item.index_pic+'?imageView/0/h/200/w/345'" alt />
              <p class="title">&lt;{{item.title}}&gt;</p>
              <p class="brief">{{item.brief}}</p>
              <div class="info-box">
                <p>活动时间</p>
                <p
                  class="detail"
                >{{item.start_time.substring(5,16)}} 至 {{item.end_time.substring(5,16)}}</p>
                <p style="margin-top:0.15rem;">操作</p>
                <p class="detail">详情</p>
              </div>
              <div class="detail-box flexBox" @click.stop="goEventList(item.id,'rate')">
                <p>活动稿件</p>
                <img class="icon" src="../assets/images/my/my_detail_icon.png" alt />
              </div>
            </div>
          </div>
          <img
            v-if="!myRateActivityList.length"
            class="no-data-img style1"
            src="../assets/images/nodata/home_list.png"
            alt
          />
        </div>
      </div>
      <!-- 收藏 -->
      <div class="main" v-if="currentTab === 2 && collectionRequested">
        <!-- 选择类型切换 -->
        <div class="count-box flexBox flexAlign">
          <!-- <div
            class="flex-item"
            :class="{'active':currentCollection === 0}"
            @click="changeCollection(0)"
          >全部·36</div>-->
          <div
            class="flex-item"
            :class="{'active':currentCollection === 0}"
            @click="changeCollection(0)"
          >图片·{{collectionImgList.length}}</div>
          <div
            class="flex-item"
            :class="{'active':currentCollection === 1}"
            @click="changeCollection(1)"
          >视频·{{collectionVideoList.length}}</div>
        </div>
        <div class="divider"></div>
        <!-- 图片列表 -->
        <div
          class="img-box flexBox flexBetween flexWrap"
          v-if="currentCollection === 0"
          style="padding:0.15rem;"
        >
          <div
            class="img-item"
            v-for="(item,index) in collectionImgList"
            :key="index"
            @click="goImgDetail(item)"
          >
            <img
              style="width:100%;height:100%;"
              :src="item.index_pic+'?imageView/0/h/100/w/170'"
              alt
            />
            <div
              class="img-info flexBox flexAlign flexBetween"
              style="background:rgba(0, 0, 0, 0.1);"
            >
              <p class="textEllipsis">{{item.title}}</p>
            </div>
          </div>
          <!-- 加载更多 -->
          <div
            v-if="collectionImgList.length && collectionImgHasMore"
            class="load-more flexBox flexAlign flexMiddle"
            @click="getMoreCollectionImgList"
            style="padding:0.15rem 0 0;margin-top:0;width:100%;"
          >
            <img class="icon" src="../assets/images/style/loadmore.png" alt />
            <p>加载更多</p>
          </div>
          <img
            v-if="!collectionImgList.length"
            class="no-data-img style1"
            src="../assets/images/nodata/home_list.png"
            alt
          />
        </div>
        <!-- 视频列表 -->
        <div
          class="img-box flexBox flexBetween flexWrap"
          v-if="currentCollection === 1"
          style="padding:0.15rem;"
        >
          <div
            class="img-item"
            v-for="(item,index) in collectionVideoList"
            :key="index"
            @click="goVideoDetail(item)"
          >
            <img
              style="width:100%;height:100%;"
              :src="item.extends.cover_url+'?imageView/0/h/100/w/170'"
              alt
            />
            <div
              class="img-info flexBox flexAlign flexBetween"
              style="background:rgba(0, 0, 0, 0.1);"
            >
              <p class="textEllipsis">{{item.extends.title}}</p>
              <p>{{item.extends.time}}</p>
            </div>
            <img class="video-icon alignCenter" src="../assets/images/common/video_icon.png" alt />
          </div>
          <img
            v-if="!collectionVideoList.length"
            class="no-data-img style1"
            src="../assets/images/nodata/home_list.png"
            alt
          />
        </div>
        <div class="divider"></div>
      </div>
      <!-- 资料 -->
      <div class="main" v-if="currentTab === 3">
        <!-- 基本信息 -->
        <div class="info-box p15">
          <div class="info-title flexBox">
            <div class="info-border"></div>
            <p class="text">基本信息</p>
          </div>
          <div class="info-item-box grayBorder">
            <div class="info-item flexBox">
              <p class="left">
                用户名
                <i></i>
              </p>
              <p class="right">{{myInfo.nick_name}}</p>
              <span class="required">*</span>
            </div>
            <div class="info-item flexBox" @click="genderVisible = true">
              <p class="left">
                性别
                <i></i>
              </p>
              <p class="right" v-if="gender">{{gender}}</p>
              <span class="required">*</span>
              <i class="moreIcon"></i>
            </div>
            <div class="info-item flexBox" @click="areaVisible = true">
              <p class="left">
                所在地
                <i></i>
              </p>
              <p class="right">{{`${prov}-${city}`}}</p>
              <span class="required">*</span>
              <i class="moreIcon"></i>
            </div>
            <div class="info-item flexBox" @click="showBrief">
              <p class="left">
                简介
                <i></i>
              </p>
              <i class="moreIcon"></i>
              <p class="right textEllipsis">{{brief}}</p>
            </div>
          </div>
        </div>
        <!-- 联系方式 -->
        <div class="info-box p15 b0">
          <div class="info-title flexBox">
            <div class="info-border"></div>
            <p class="text">联系方式</p>
          </div>
          <div class="info-item-box">
            <div class="info-item flexBox">
              <p class="left">
                QQ
                <i></i>
              </p>
              <input type="text" placeholder="请输入您的QQ" v-model="qqAcount" />
              <!-- <img class="lockIcon" src="../assets/images/my/lock_icon.png" alt /> -->
            </div>
            <div class="info-item flexBox">
              <p class="left">
                微信
                <i></i>
              </p>
              <input type="text" placeholder="请输入您的号" v-model="weChatAcount" />
              <!-- <img class="lockIcon" src="../assets/images/my/lock_icon.png" alt /> -->
            </div>
          </div>
        </div>
        <!-- 保存 -->
        <div class="confirm-box">
          <div class="button alignCenter" @click="saveInfo">保存</div>
        </div>
      </div>
    </div>
    <!-- 底部tab -->
    <div class="tab-bar flexBox">
      <div class="tab-bar-item flexBox flexAlign flexMiddle flexColumn" @click="goHome">
        <i class="homeIcon"></i>
        <p class="tab-text">首页</p>
      </div>
      <div class="tab-bar-item flexBox flexAlign flexMiddle flexColumn">
        <i class="myIconActive"></i>
        <p class="tab-text active">我的</p>
      </div>
      <i class="publishIcon alignCenter" @click="goContribute"></i>
    </div>
    <!-- 性别选择框 -->
    <mt-popup v-model="genderVisible" position="bottom">
      <div class="picker-head flexBox">
        <p class="item" @click="genderVisible = false">取消</p>
        <p class="item" @click="chooseGender">确认</p>
      </div>
      <mt-picker :slots="genderSlots" style="width:3.75rem;" ref="sex-picker"></mt-picker>
    </mt-popup>
    <!-- 地区选择框 -->
    <mt-popup v-model="areaVisible" position="bottom">
      <div class="picker-head flexBox">
        <p class="item" @click="areaVisible = false">取消</p>
        <p class="item" @click="chooseArea">确认</p>
      </div>
      <mt-picker
        :slots="areaSlots"
        value-key="name"
        @change="onAreaChange"
        style="width:3.75rem;"
        ref="area-picker"
      ></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import imgList from '../components/home/homeMyImgList'
import { MessageBox, Toast } from 'mint-ui'
export default {
  name: 'homeMy',
  components: {
    imgList
  },
  data () {
    return {
      token: '',
      tabList: ['作品', '活动', '收藏', '资料'],
      currentTab: 0,
      userData: {},
      myInfo: {},
      // 作品
      currentWork: 0,
      imgList: [
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1050893341,2471506596&fm=26&gp=0.jpg'
      ],
      publishImgCount1: 0,
      publishImgCount2: 0,
      publishVideoCount: 0,
      // 活动
      currentActivity: 0,
      activityRequested: false,
      myActivityList: [],
      myActivityCount: '',
      myRateActivityList: [],
      myRateActivityCount: '',
      // 收藏
      currentCollection: 0,
      collectionRequested: false,
      collectionImgList: [],
      collectionImgOffset: 0,
      collectionImgHasMore: true,
      collectionVideoList: [],
      // 个人资料
      gender: '',
      brief: '',
      prov: '',
      city: '',
      qqAcount: '',
      weChatAcount: '',
      // 性别选择
      genderVisible: false,
      genderSlots: [
        {
          flex: 1,
          values: ['男', '女', '保密'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      // 地区选择
      areaVisible: false,
      areaSlots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot2'
        },
        {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }
      ]
    }
  },
  methods: {
    become () {
      MessageBox('提示', '请到视觉南京web端进行摄影师签约')
    },
    wantContribute () {
      if (window.localStorage.getItem('groupId') === '2') {
        this.$router.push('/contribute')
      } else {
        MessageBox('提示', '您还不是签约摄影师，请到视觉南京Web端签约后投稿')
      }
    },
    // 去首页
    goHome () {
      this.$router.push('/')
    },
    // 切换tab
    changeTab (index) {
      this.currentTab = index
      index === 1 && this.getMyActivityList()
      index === 2 && this.getCollection()
      index === 3 && this.getAreaList()
    },
    // 切换作品类型
    changeWork (index) {
      this.currentWork = index
    },
    // 切换活动类型
    changeEvent (index) {
      this.currentActivity = index
    },
    // 切换收藏类型
    changeCollection (index) {
      this.currentCollection = index
    },
    // 跳转活动列表
    goEventList (id, type = '') {
      this.$router.push({ path: '/eventlist', query: { id, type } })
    },
    // 跳转稿件详情页
    goEventDetail (id) {
      this.$router.push({ path: '/eventdetail', query: { id } })
    },
    // 获取作品数量
    getPublishCount () {
      // 图集 签约投稿
      const param1 = {
        access_token: this.token,
        act_id: 1
      }
      this.$api.getUserGallery(param1).then(res => {
        this.publishImgCount1 = res.data.data.total
      })
      // 图集 活动投稿
      const param2 = {
        access_token: this.token,
        act_id: 2
      }
      this.$api.getUserGallery(param2).then(res => {
        this.publishImgCount2 = res.data.data.total
      })
    },
    // 获取收藏列表
    getCollection () {
      if (this.collectionRequested) return
      // 图片
      let param1 = {
        access_token: this.getToken(),
        offset: 0,
        count: 20
      }
      this.$api.getMyCollection(param1).then(res => {
        if (res.data.ErrorCode === 0 && res.data.data.data) {
          if (res.data.data.data.length < 20) {
            this.collectionImgHasMore = false
          }
          this.collectionImgList = res.data.data.data
          this.collectionRequested = true
        }
      })
    },
    // 获取更多图片收藏
    getMoreCollectionImgList () {
      this.collectionImgOffset += 20
      let param = {
        access_token: this.getToken(),
        offset: this.collectionImgOffset,
        count: 20
      }
      this.$api.getMyCollection(param).then(res => {
        if (res.data.ErrorCode === 0) {
          if (res.data.data.data.length) {
            this.collectionImgList = this.collectionImgList.concat(
              res.data.data.data
            )
            if (res.data.data.data.length < 20) {
              this.collectionImgHasMore = false
            }
          } else {
            Toast('没有更多了')
            this.collectionImgHasMore = false
          }
        }
      })
    },
    // 获取活动列表
    getMyActivityList () {
      if (this.activityRequested) return
      const token = this.getToken()
      // 参与活动列表
      this.$api.getUserActivityList(token).then(res => {
        if (res.data.ErrorCode === 0) {
          this.myActivityList = res.data.data.data
          this.myActivityCount = res.data.data.total
        }
      })
      // 评分活动列表
      this.$api.getUserCommitteeList(token).then(res => {
        if (res.data.ErrorCode === 0) {
          this.myRateActivityList = res.data.data.data
          this.myRateActivityCount = res.data.data.total
          this.activityRequested = true
        }
      })
    },
    // 获取用户信息
    getMyInfo () {
      if (!this.token) {
        this.$router.push('/login')
      } else {
        this.$api.getMyInfo(this.token).then(res => {
          if (res.data.ErrorCode === 0 && res.data.data) {
            this.myInfo = res.data.data
            this.gender = this.myInfo.extension.gender.value
            this.brief = this.myInfo.brief
            this.qqAcount = this.myInfo.extension.qqnum.value
            this.weChatAcount = this.myInfo.extension.wechat.value
            this.prov = this.myInfo.extension.prov.value
            this.city = this.myInfo.extension.city.value
            // console.log(this.myInfo.extension.prov.value);
          }
        })
        this.getPublishCount()
        this.getMyData()
      }
    },
    // 获取个人数据
    getMyData () {
      this.$api.getMyData(this.token).then(res => {
        this.userData = res.data.data
      })
    },
    // 退出登录
    logout () {
      MessageBox.confirm('确定退出登录?').then(action => {
        if (action === 'confirm') {
          window.localStorage.removeItem('access_token')
          this.$router.push('/')
        }
      })
    },
    // 更新用户简介
    showBrief () {
      const that = this
      MessageBox.prompt('请输入个人简介').then(({ value, action }) => {
        if (action === 'confirm') {
          that.brief = value
        }
      })
    },
    // 获取省级列表
    getAreaList () {
      if (this.areaSlots[0].values.length) return
      this.$api.getAreaList('pro').then(res => {
        if (res.data.data.length) {
          this.areaSlots[0].values = res.data.data
        }
      })
    },
    // 获取城市列表
    area (id) {
      const that = this
      let promise = new Promise(function (resolve, reject) {
        that.$api
          .getAreaList('city', id)
          .then(res => {
            resolve(res.data.data)
          })
          .catch(error => {
            console.log(error)
          })
      })
      return promise
    },
    // 保存个人信息
    saveInfo () {
      let param = { access_token: this.token }
      // 性别
      if (this.gender) {
        if (this.gender === '男') {
          param.sex = 1
        }
        if (this.gender === '女') {
          param.sex = 2
        }
        if (this.gender === '保密') {
          param.sex = 3
        }
      }
      // 简介
      if (this.brief) {
        param.brief = this.brief
      }
      // qq
      if (this.qqAcount) {
        param.qq = this.qqAcount
      }
      // 微信
      if (this.weChatAcount) {
        param.wechat = this.weChatAcount
      }
      // 地区
      if (this.prov) {
        param.province = this.prov
      }
      if (this.city) {
        param.city = this.city
      }
      this.$api.updateMyInfo(param).then(res => {
        if (res.data.ErrorCode === 0) {
          Toast('保存成功！')
        }
      })
    },
    // 确认性别选择
    chooseGender () {
      this.gender = this.$refs['sex-picker'].getValues()[0]
      this.genderVisible = false
    },
    // 监听省份选择变动 同步请求接口
    onAreaChange (picker, values) {
      const that = this
      if (values[0]) {
        that.$api.getAreaList('city', values[0]['id']).then(res => {
          picker.setSlotValues(1, res.data.data)
        })
      }
    },
    // 确认地区选择
    chooseArea () {
      const res = this.$refs['area-picker'].getValues()
      this.prov = res[0].name
      this.city = res[1].name
      this.areaVisible = false
    },
    // 发布投稿
    goContribute () {
      const token = this.getToken()
      if (!token) {
        this.$router.push('/login')
      } else {
        if (window.localStorage.getItem('groupId') == 2) {
          this.$router.push('/contribute')
        } else {
          MessageBox('提示', '您还不是签约摄影师，请到视觉南京Web端签约后投稿')
        }
      }
    },
    // 去图集详情
    goImgDetail (item) {
      this.$api.getGalleryDetail(item.origin_id).then(res => {
        if (res.data.ErrorText) {
          Toast(res.data.ErrorText)
        } else {
          this.$router.push({ path: '/imgdetail', query: { id: item.origin_id } })
        }
      })
      // this.$router.push({ path: '/imgdetail', query: { id: item.origin_id } })
    },
    // 去视频详情
    goVideoDetail (item) {
      this.$router.push({
        path: '/videodetail',
        query: { id: item.origin_id }
      })
    }
  },
  created () {
    this.token = this.getToken()
    this.getMyInfo()
  }
}
</script>
<style lang='scss' scoped>
.my-wrapper {
  padding-bottom: 0.49rem;
  .my-top {
    height: 2.8rem;
    background-color: #1c3644;
    padding-top: 0.7rem;
    .setting {
      width: 0.17rem;
      height: 0.19rem;
      position: absolute;
      top: 0.34rem;
      right: 0.16rem;
    }
    .my-info {
      padding-left: 0.2rem;
      margin-bottom: 0.3rem;
      .avatar {
        width: 0.84rem;
        height: 0.84rem;
        border-radius: 50%;
        margin-right: 0.2rem;
      }
      .my-box {
        padding-top: 0.18rem;
        .my-name-box {
          .my-name {
            font-size: 0.2rem;
            font-family: SourceHanSansCN;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            margin-right: 0.1rem;
          }
          .gender-icon {
            width: 0.17rem;
            height: 0.17rem;
            margin-top: 0.03rem;
          }
        }
        .become {
          margin-top: 0.18rem;
          width: 0.94rem;
          height: 0.24rem;
          line-height: 0.24rem;
          text-align: center;
          background: #ccc;
          border-radius: 2px;
          color: #fff;
          font-size: 0.11rem;
        }
      }
    }
    .my-number-box {
      .my-number-item {
        width: 50%;
        .number-text {
          font-size: 0.24rem;
          font-family: ArialMT;
          color: rgba(255, 255, 255, 1);
          margin-bottom: 0.16rem;
        }
        .number-icon {
          width: 0.14rem;
          height: 0.14rem;
          margin-right: 0.04rem;
        }
        .number-sub-text {
          font-size: 0.14rem;
          font-family: SourceHanSansCN;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
  .nav {
    height: 0.44rem;
    margin-top: -0.1rem;
    background-color: #fff;
    border-radius: 8px 8px 0px 0px;
    border-bottom: 1px solid rgba(240, 240, 240, 1);
    padding-top: 0.08rem;
    .nav-item {
      width: 0.75rem;
      height: 0.34rem;
      line-height: 0.34rem;
      position: relative;
      .nav-text {
        text-align: center;
        font-size: 0.14rem;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        &.active {
          color: rgba(221, 47, 60, 1);
        }
      }
      .nav-border {
        width: 0.37rem;
        height: 0.02rem;
        background: rgba(221, 47, 60, 1);
        position: absolute;
        left: 50%;
        bottom: -0.02rem;
        transform: translate(-50%, -50%);
      }
    }
  }
  .main {
    .count-box {
      height: 0.38rem;
      padding-left: 0.1rem;
      .flex-item {
        height: 0.24rem;
        line-height: 0.24rem;
        padding: 0 0.1rem;
        text-align: center;
        font-size: 0.12rem;
        margin-right: 0.12rem;
        color: #999999;
        &.active {
          background: rgba(187, 187, 187, 0.2);
          border-radius: 0.16rem;
          color: #333333;
        }
      }
    }
    .img-box {
      .img-item {
        width: 1.7rem;
        height: 1.12rem;
        margin-bottom: 0.05rem;
        position: relative;
        .video-icon {
          width: 0.3rem;
          height: 0.3rem;
        }
        .img-info {
          width: 100%;
          height: 0.3rem;
          position: absolute;
          bottom: 0;
          padding: 0 0.1rem;
          p {
            font-size: 0.12rem;
            color: #fff;
          }
        }
        .img-info-two {
          width: 70%;
          position: absolute;
          bottom: 0;
          padding-bottom: 0.08rem;
          padding-left: 0.09rem;
          p {
            color: #fff;
            font-size: 0.12rem;
            &.sub-title {
              margin-top: 0.08rem;
              font-size: 0.1rem;
              color: rgba(255, 255, 255, 0.8);
            }
          }
        }
        .duration {
          position: absolute;
          right: 0.1rem;
          bottom: 0.08rem;
          font-size: 0.12rem;
          color: #fff;
        }
        .status {
          width: 0.38rem;
          height: 0.18rem;
          line-height: 0.18rem;
          text-align: center;
          font-size: 0.09rem;
          color: #fff;
          background: rgba(245, 166, 35, 1);
          border-radius: 0.12rem;
          position: absolute;
          top: 0.08rem;
          right: 0.12rem;
          &.checking {
            background: rgba(245, 166, 35, 1);
          }
          &.dahui {
            background-color: #d0021b;
          }
          &.checked {
            background-color: #41a856;
          }
          &.daitijiao {
            background-color: #3688ff;
          }
          &.pinfenzhong {
            background-color: #41a856;
          }
          &.yipinfen {
            background-color: #999999;
          }
        }
      }
    }
    .contribute {
      height: 0.38rem;
      background-color: #fff;
      padding-left: 0.17rem;
      .icon {
        width: 0.18rem;
        height: 0.15rem;
      }
      .text {
        font-size: 0.12rem;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        padding-left: 0.1rem;
        padding-right: 2.6rem;
      }
    }
    .work-contribute-box {
      .work-contribute-title {
        height: 0.4rem;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
        .text {
          font-size: 0.14rem;
          font-family: SourceHanSansCN;
          font-weight: 400;
          color: rgba(221, 47, 60, 1);
        }
      }
    }
    .event-item {
      padding: 0.15rem;
      position: relative;
      img {
        width: 100%;
        height: 2rem;
        margin-bottom: 0.1rem;
      }
      .title {
        width: 100%;
        font-size: 0.14rem;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .brief {
        font-size: 0.12rem;
        color: rgba(153, 153, 153, 1);
        padding-bottom: 0.15rem;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
      }
      .info-box {
        padding-top: 0.15rem;
        p {
          font-size: 0.12rem;
          color: rgba(153, 153, 153, 1);
          &.detail {
            margin-top: 0.06rem;
            color: #333333;
          }
        }
      }
      .detail-box {
        position: absolute;
        left: 0.7rem;
        bottom: 0.15rem;
        p {
          font-size: 0.12rem;
          color: rgba(77, 150, 255, 1);
          margin-right: 0.08rem;
        }
        .icon {
          width: 0.05rem;
          height: 0.09rem;
          margin-bottom: 0;
        }
      }
    }
    .info-box {
      padding-top: 0.2rem;
      .info-title {
        margin-bottom: 0.24rem;
        .info-border {
          width: 0.05rem;
          height: 0.15rem;
          background-color: rgb(219, 50, 65);
          margin-right: 0.1rem;
        }
        .text {
          font-size: 0.16rem;
          color: #333;
          font-weight: 500;
        }
      }
      .info-item {
        padding-left: 0.12rem;
        position: relative;
        margin-bottom: 0.24rem;
        p {
          font-size: 0.14rem;
          &.left {
            width: 0.42rem;
            height: 0.2rem;
            color: #888888;
            text-align: justify;
            margin-right: 0.25rem;
            i {
              display: inline-block;
              width: 100%;
            }
          }
          &.right {
            color: rgba(51, 51, 51, 1);
            width: 2.58rem;
          }
        }
        .required {
          position: absolute;
          font-size: 0.1rem;
          color: red;
          top: 0.06rem;
          left: 0.06rem;
          transform: translate(-50%, -50%);
        }
        .moreIcon {
          position: absolute;
          right: 0;
          top: 0;
        }
        .lockIcon {
          width: 0.12rem;
          height: 0.15rem;
          position: absolute;
          right: 0.05rem;
        }
        input {
          width: 2.58rem;
          height: 0.2rem;
          font-size: 0.14rem;
          color: rgba(51, 51, 51, 1);
          position: absolute;
          top: -0.06rem;
          left: 0.78rem;
          border: 0;
          &::-webkit-input-placeholder {
            color: #a6a6a6;
            font-size: 0.14rem;
          }
        }
      }
    }
    .confirm-box {
      height: 0.68rem;
      background-color: #e8e8e8;
      position: relative;
      .button {
        width: 3.45rem;
        height: 0.38rem;
        line-height: 0.38rem;
        text-align: center;
        font-size: 0.16rem;
        color: #fff;
        background: rgba(221, 47, 60, 1);
        border-radius: 3px;
      }
    }
  }
  .picker-head {
    height: 0.4rem;
    border: 1px solid #eaeaea;
    .item {
      text-align: center;
      width: 50%;
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.16rem;
      color: #636363;
    }
  }
}
</style>
