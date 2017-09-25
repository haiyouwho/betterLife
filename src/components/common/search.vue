<template>
  <div class="search">
    <div class="bar">
      <mu-icon-button icon="keyboard_arrow_left" slot="left" />
      <mu-auto-complete hintText="今天你想搜点啥～" @input="handleInput" :dataSource="dataSource" @change="handlechange" />
      <mu-icon-button class="srch-btn" icon="search" slot="right" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataSource: []
    }
  },
  methods: {
    handlechange(val) {
      console.log(`you choose ${val}`)
    },
    handleInput(val) {
      this.dataSource = [
        val,
        val + val,
        val + val + val
      ]
    }
  }
}

</script>
<style lang="scss" scoped>
@import "../../style/mixin";
.search {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #fff;
  .bar {
    .srch-btn {
      color: $base-act;
    }
  }
  .mu-auto-complete {
    vertical-align: top;
    margin-top: 2px;
  }
}

</style>
