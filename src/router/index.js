import Vue from 'vue'
import Router from 'vue-router'

const index = r => require.ensure([], () => r(require('@/views/index')), 'index'),
  home = r => require.ensure([], () => r(require('@/views/home')), 'home'),
  moveList = r => require.ensure([], () => r(require('@/views/home/move_list')), 'move_list'),
  live = r => require.ensure([], () => r(require('@/views/live')), 'live'),
  books = r => require.ensure([], () => r(require('@/views/books')), 'books'),
  user = r => require.ensure([], () => r(require('@/views/user')), 'user'),
  detail = r => require.ensure([], () => r(require('@/views/detail')), 'detail')

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
    },
    {
      path: '/moveList',
      name: 'moveList',
      component: moveList,
      meta: {
        keepAlive: true
      }
    }
  ]
})
