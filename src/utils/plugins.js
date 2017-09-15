import Vue from 'vue'
import App from '@/App'


//reset 重置文件 全局基本样式
import '@/assets/css/reset.css'

//jsonp 获取数据
import jsonp from 'jsonp'
Vue.prototype.jsonp = jsonp

//FastClick 消除移动端点击延迟
import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body)
    }, false)
}

//MuseUI 消除移动端点击延迟
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css' // 使用 teal 主题
import '@ass/iconfont/material-icons.css' // 使用 teal 主题
Vue.use(MuseUI)

// swiper vue插件
import '@/assets/css/swiper-3.4.2.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

// VueScroller vue插件
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)


// VueLazyload vue插件
import VueLazyload from 'vue-lazyload'
import errImg from '@/assets/images/error.jpg'
import loadingImg from '@/assets/images/loading.gif'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errImg,
  loading: loadingImg,
  attempt: 1
}) 