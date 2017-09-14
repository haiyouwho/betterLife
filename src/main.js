// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import jsonp from 'jsonp'
Vue.prototype.jsonp = jsonp

import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body)
    }, false)
}

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css' // 使用 teal 主题
import '@ass/iconfont/material-icons.css' // 使用 teal 主题
Vue.use(MuseUI)

import '@/assets/css/reset.css'
import '@/assets/css/swiper-3.4.2.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

import { setGlobalfontSize } from '@/utils'
setGlobalfontSize()

Vue.config.productionTip = false

/* eslint-disable no-new */ 
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
