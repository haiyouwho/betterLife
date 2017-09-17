<template>
  <div>
    <div class="index-box">
      <transition name="bounce" mode="out-in">
        <router-view></router-view>
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
      bottomNav: 'home'
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
      setTimeout(() => {
        console.log('setTimeout handleChange:',val)
        this.bottomNav = val
      }, 500)
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
