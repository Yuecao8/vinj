import Vue from 'vue'
import axios from 'axios'
// import qs from 'qs';
const token = window.localStorage.getItem('access_token')
// const formDataConfig = {
//   headers: {
//     'Content-Type': 'multipart/form-data'
//   }
// }
// axios.interceptors.request.use((config) => {
//   if(config.method  === 'post' && config.data.constructor !== FormData){
//     config.data = qs.stringify(config.data);
//   }
//   return config;
// },(error) =>{
//   return Promise.reject(error);
// });
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// axios.defaults.headers.post['http-x-h5-version'] = 1;
// axios.defaults.headers.post['x-client-version'] = 1314;

const baseUrl = 'http://mapi2.dev.hoge.cn/api/v1/'
const baseUrl2 = 'http://plus-middle-end.dev.hoge.cn/api/'

// const baseUrl = 'http://mapi.plus.vinj.cn/api/v1/'
// const baseUrl2 = 'http://middle-api.plus.vinj.cn/api/'

/* 栏目列表数据 */
export const getColumnContent = (params) => axios.get(`${baseUrl}column_contents.php`, { params })
/* 栏目内容 */
export const getContent = (params) => axios.get(`${baseUrl}contents.php`, { params })
/* 详情 */
export const getDetail = (id) => axios.get(`${baseUrl}item.php?id=${id}`)
/* 图集详情 */
export const getGalleryDetail = (id) => axios.get(`${baseUrl2}gallery/detail/${id}`)
/* 图集图片列表 */
export const getGalleryPhotos = (id, page, count) => axios.get(`${baseUrl2}gallery/photos/${id}?page=${page}&per_num=${count}`)
/* 首页轮播图 */
export const getHomeSwiperList = (page, count) => axios.get(`${baseUrl2}publish/newest_photos?page=${page}&per_num=${count}`)
/* 摄影师列表 */
export const getMemberList = () => axios.get(`${baseUrl}members.php`)
/* 搜索 */
export const getSearchList = (keyword) => axios.get(`${baseUrl}search_list.php?search_text=${keyword}`)
/* 注册 */
export const register = (param) => axios.post(`${baseUrl2}member/register`, param)
/* 获取验证码 */
export const getPhoneCode = (phone, type) => axios.get(`${baseUrl2}member/sendCode?member_name=${phone}&type=${type}`)
/* 登录 */
export const login = (param) => axios.post(`${baseUrl2}member/login`, param)
/* 忘记密码 */
export const forgotPwd = (phone) => axios.get(`${baseUrl2}member/forgotPwd?member_name=${phone}`)
/* 重置密码 */
export const resetPwd = (param) => axios.post(`${baseUrl2}member/resetPwd`, param)
/* 获取自己数据统计 */
export const getMyData = (token) => axios.get(`${baseUrl2}member/works/data?access_token=${token}`)
/* 获取自己用户信息 */
export const getMyInfo = (token) => axios.get(`${baseUrl2}member/info?access_token=${token}`)
/* 获取他人用户信息 */
export const getUserInfo = (id) => axios.get(`${baseUrl2}member/getOthersInfo?author_id=${id}`)
/* 获取用户作品-图集 */
export const getUserGallery = (params) => axios.get(`${baseUrl2}gallery/personal/publish`, {params})
/* 添加收藏 */
export const addCollection = (params) => axios.post(`${baseUrl2}member/collect/add`, params)
/* 取消收藏 */
export const delCollection = (params) => axios.post(`${baseUrl2}member/collect/del`, params)
/* 判断是否收藏 */
export const getCollectionStatus = (params) => axios.get(`${baseUrl2}member/collect/is_collect`, {params})
/* 获取我的收藏 */
export const getMyCollection = (params) => axios.get(`${baseUrl2}member/collect/my`, {params})
/* 获取他人收藏 */
export const getOthersCollection = (params) => axios.get(`${baseUrl2}member/collect/others`, {params})
/* 获取他人作品 */
export const getOthersWork = (params) => axios.get(`${baseUrl2}gallery/others/photos`, {params})
/* 获取用户参与的活动 */
export const getUserActivityList = (token) => axios.get(`${baseUrl2}activity/list?access_token=${token}`)
/* 获取用户参与的评分活动 */
export const getUserCommitteeList = (token) => axios.get(`${baseUrl2}activity/committeeList?access_token=${token}`)
/* 获取活动作品列表 */
export const getActivityDetailList = (params) => axios.get(`${baseUrl2}activity/detail`, {params})
/* 获取活动作品详情 */
export const getActivityDetail = (params) => axios.get(`${baseUrl2}activity/details`, {params})
/* 更新个人用户信息 */
export const updateMyInfo = (param) => axios.post(`${baseUrl2}member/updateInfo`, param)
/* 获取地区列表 */
export const getAreaList = (type, fid) => axios.get(`${baseUrl2}member/location?type=${type}&fid=${fid}&access_token=${token}`)
/* 创建图集 */
export const createGallery = (param) => axios.post(`${baseUrl2}gallery/create`, param)
/* 封面上传 */
export const uploadCover = (param, formDataConfig) => axios.post(`${baseUrl2}gallery/cover/upload`, param, formDataConfig)
Vue.mixin({
  beforeCreate () {
    const options = this.$options
    if (options.api) {
      this.$api = options.api
    } else if (options.parent && options.parent.$api) {
      this.$api = options.parent.$api
    }
  }
})
