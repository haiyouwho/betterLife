<template>
  <div class="list">
    <div class="fix-head" :style="{background:fliterBG}">
      <div class="head">
        <mu-appbar title="找影视">
          <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goback" />
          <mu-icon-button icon="search" slot="right" />
        </mu-appbar>
      </div>
      <div class="fliter">
        <mu-tabs class="tabs" :value="activeTab">
          <mu-tab value="tab1" title="形式" @click="tabClick('tab1')" />
          <mu-tab value="tab2" title="地区" @click="tabClick('tab2')" />
          <mu-tab value="tab3" title="类型" @click="tabClick('tab3')" />
          <mu-tab value="tab4" title="特色" @click="tabClick('tab4')" />
        </mu-tabs>
        <div class="f-item p-box">
          <transition-group mode="out-in">
            <div class="tab" v-if="activeTab === 'tab1'" :key="1">
              <p>这是第一个 tab</p>
              <p>这是第一个 tab</p>
              <p>这是第一个 tab</p>
              <p>这是第一个 tab</p>
            </div>
            <div class="tab" v-if="activeTab === 'tab2'" :key="2">
              <p>
                这是第二个 tab
              </p>
            </div>
            <div class="tab" v-if="activeTab === 'tab3'" :key="3">
              <p>
                这是第三个 tab
              </p>
            </div>
            <div class="tab" v-if="activeTab === 'tab4'" :key="4">
              <p>
                这是第4个 tab
              </p>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flterOn: false,
      activeTab: ''
    }
  },
  computed: {
    fliterBG: function() {
      console.log(this.flterOn)
      return this.flterOn ? 'rgba(0,0,0,.5)' : '#FFF'
    }
  },
  methods: {
    goback() {
      this.$router.goback()
    },
    tabClick(val) {
      console.log(val === this.activeTab, 'tabClick')
      if (val === this.activeTab) {
        this.flterOn = false
        this.activeTab = ''
      } else {
        this.flterOn = true
        this.activeTab = val
      }
    }
  }
}

</script>
<style lang="scss" scoped>
@import "../../style/mixin";

.fix-head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: #fff;
}

.head {
  height: 2rem;
}

.tabs {
  height: 2rem;
}

.f-item {
  background: #fff;
}

.f-item.no-border {
  @include no-border();
}

</style>
