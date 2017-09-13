import Vue from 'vue'
import Router from 'vue-router'


import index from '@/views/index'
import home from '@/views/home'
import live from '@/views/live'
import books from '@/views/books'
import user from '@/views/user'
import detail from '@/views/detail'

Router.prototype.goback = function() {
  this.isBack = true
  window.history.go(-1)
}


Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
      path: '/',
      name: '/',
      component: index,
      redirect: '/home',
      children: [{
          path: 'home',
          name: 'home',
          component: home,
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'live',
          name: 'live',
          component: live
        },
        {
          path: 'books',
          name: 'books',
          component: books
        },
        {
          path: 'user',
          name: 'user',
          component: user
        }
      ]
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    }
  ]
})
