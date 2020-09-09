// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style/reset.css'
import './assets/style/global.css'
import './assets/style/common.scss'
import 'mint-ui/lib/style.css'
import './assets/js/rem.js'
import Mint from 'mint-ui'
import { mixin } from './lib/utils'
import * as api from './lib/api'
// 设置title
import VueWechatTitle from 'vue-wechat-title'
// 图片渐进式
import progressive from 'progressive-image/dist/vue'
// 懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(progressive, {
  removePreview: true,
  scale: false,
  lazyClass: 'lazy'
})
Vue.use(VueLazyload, {
  // error: './static/error.png',
  loading: './assets/logo.png'
})
Vue.use(VueWechatTitle)
Vue.mixin(mixin)
Vue.use(Mint)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  api,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
