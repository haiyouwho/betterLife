<template>
  <div class="wrap">
    <div class="footer">
      <p>正在努力上线中。。。</p>
      <mu-paper>
        <mu-bottom-nav value="live" shift>
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

    }
  }
}

</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
}

</style>
