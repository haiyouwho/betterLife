<template>
  <div>
    <div class="index-box">
      <transition name="bounce">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="bounce">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>
    <div class="footer">
      <mu-paper>
        <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
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
      bottomNav: 'home',
      bottomNavColor: 'home'
    }
  },
  methods: {
    handleChange(val) {
      this.bottomNav = val
    }
  }
}

</script>
<style lang="scss" scoped>
.index-box {
  width: 100%;
  height: 100%;
  padding-bottom: 2.5rem;
  overflow-x: hidden;
  overflow-y: auto;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.text-sma {
  font-size: 1rem;
}

.text-nor {
  font-size: 2rem;
}

.text-big {
  font-size: 3rem;
}

.router-link-active {
  display: block;
  width: 100%;
  span,
  i {
    color: #009688;
  }
}

.bounce-enter {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  animation: bounce-out .5s;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
  }
  50% {
    opacity: .1;
  }
  100% {
    opacity: 1;
  }
}

@keyframes bounce-out {
  0% {
    opacity: 1;
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  50% {
    opacity: .1;
  }
  100% {
    opacity: 0;
    -webkit-transform: translate(0, 30px);
    transform: translate(0, 30px);
  }
}

.appbar-search-field {
  color: #FFF;
  margin-bottom: 0;
  &.focus-state {
    color: #FFF;
  }
  .mu-text-field-hint {
    color: fade(#FFF, 54%);
  }
  .mu-text-field-input {
    color: #FFF;
  }
  .mu-text-field-focus-line {
    background-color: #FFF;
  }
}

</style>
