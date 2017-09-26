<template>
  <div id="app">
    <transition name="bounce" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="bounce" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: .8rem;
  color: rgb(51, 51, 51);
  font-family: 'Hiragino Sans GB', 'Microsoft Yahei UI', 'Microsoft Yahei', 微软雅黑, 'Segoe UI', Tahoma, 宋体b8b体, SimSun, sans-serif;
}

.router-link-active {
  display: block;
  width: 100%;
  span,
  i {
    color: #009688;
  }
}

.bounce-enterr-active  {
  animation: bounce-in .5s;
}

.bounce-leave-active {
  animation: bounce-out .5s;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
  }
  /*   50% {
    opacity: .1;
  } */
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
  /*   50% {
    opacity: .3;
  } */
  100% {
    opacity: .1;
    -webkit-transform: translate(0, 30px);
    transform: translate(0, 30px);
  }
}

</style>
