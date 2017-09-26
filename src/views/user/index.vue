<template>
  <div class="user-center">
    <mu-appbar title="我的" class="head">
      <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goback" />
      <mu-icon-menu icon="settings" slot="right" :autoWidth="true">
        <mu-menu-item title="个人资料" />
        <mu-menu-item title="切换账号" />
        <mu-menu-item title="退出登录" />
      </mu-icon-menu>
    </mu-appbar>
    <router-link :to="loginHref">
      <mu-row class="m-t-lg user-info">
        <mu-col width="30">
          <div class="user-photo"><img :src="userPhoto"></div>
        </mu-col>
        <mu-col width="70" class="text-left">登陆/注册</mu-col>
      </mu-row>
    </router-link>
    <div class="m-t-lg menu-bar">
      <mu-tabs class="menu-bg" lineClass="lineClass" :value="activeTab" @change="handleTabChange">
        <mu-tab :class="activeTab == 1 ? 'active' : ''" value="1" icon="pets" title="最近足迹" />
        <mu-tab :class="activeTab == 2 ? 'active' : ''" value="2" icon="favorite" title="我的收藏" />
        <mu-tab :class="activeTab == 3 ? 'active' : ''" value="3" icon="touch_app" title="热门搜索" />
      </mu-tabs>
    </div>
    <div class="tab-content">
    </div>
    <div class="footer">
      <mu-paper>
        <mu-bottom-nav value="user" shift>
          <mu-bottom-nav-item to="home" value="home" title="Home" icon="lightbulb_outline" />
          <mu-bottom-nav-item to="live" value="live" title="Live" icon="video_library" />
          <mu-bottom-nav-item to="books" value="books" title="Books" icon="books" />
          <mu-bottom-nav-item to="user" value="user" title="User" icon="face" />
        </mu-bottom-nav>
      </mu-paper>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginHref: '/login',
      userPhoto: 'static/images/nobody-bg.png',
      activeTab: '1',
      'menu_arr': [
        [{
          'name': '喜欢',
          'img_src': 'static/images/user-menu-01.png'
        }, {
          'name': '书籍',
          'img_src': 'static/images/user-menu-02.png'
        }, {
          'name': '音乐',
          'img_src': 'static/images/user-menu-03.png'
        }, {
          'name': '聊天',
          'img_src': 'static/images/user-menu-04.png'
        }],
        [{
          'name': '记事',
          'img_src': 'static/images/user-menu-05.png'
        }, {
          'name': '电影',
          'img_src': 'static/images/user-menu-06.png'
        }, {
          'name': '相册',
          'img_src': 'static/images/user-menu-07.png'
        }, {
          'name': '钱包',
          'img_src': 'static/images/user-menu-08.png'
        }]
      ]
    }
  },
  methods: {
    goback() {
      this.$router.goback()
    },
    handleTabChange(val) {
      this.activeTab = val
      console.log(val)
    }
  }
}

</script>
<style lang="scss" scoped>
@import "../../style/mixin";
.user-center {
  text-align: center;
  color: #555;
}

.user-info {
  text-align: center;
  img {
    max-width: 1.2rem;
  }
  color:#333;
}

.menu-bar {
  padding: 0 .5rem;
  color: #333;
  .menu-bg {
    background: $base-act-l;
    border-radius: .5rem;
  }
  .active {
    color: $base-act-d;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
}

</style>
