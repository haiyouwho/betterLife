// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been se t in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import  '@/utils/plugins'
// 5sd5f

import { setGlobalfontSize } from '@/utils'
setGlobalfontSize()

Vue.config.productionTip = false

/* eslint-disable no-new */ 
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
