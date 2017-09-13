<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
}

</script>
<style>
body,
html {
  width: 100%;
  height: 100%;
}

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

</style>
