<template>
  <div class="list">
    <div class="filter-head">
      <div class="head">
        <mu-appbar :title="title">
          <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goback" />
          <mu-icon-button icon="search" slot="right" @click="openSearch" />
        </mu-appbar>
      </div>
      <div class="fliter">
        <mu-tabs class="tabs" :value="activeTab">
          <mu-tab value="tab1" title="形式" @click="tabClick('tab1')" />
          <mu-tab value="tab2" title="地区" @click="tabClick('tab2')" />
          <mu-tab value="tab3" title="类型" @click="tabClick('tab3')" />
          <mu-tab value="tab4" title="特色" @click="tabClick('tab4')" />
        </mu-tabs>
        <div class="f-item p-box" v-if="filterOn">
          <transition-group name="fade" mode="out-in">
            <div class="tab" v-if="activeTab === 'tab1'" :key="1">
              <mu-row gutter>
                <mu-col width="30">
                  <div v-for="(item,index) in acts" :keys="index" @click="actsName(index)" :class="typeIndex == index ? 'i-type active':'i-type'">
                    {{item.type}}
                  </div>
                </mu-col>
                <mu-col width="70" class="i-name">
                  <span v-for="(name,i) in activeActs" :keys="i" @click="searchName(name,true)" :class="title == name ? 'active':''">{{name}}</span>
                </mu-col>
              </mu-row>
            </div>
            <div class="tab i-name" v-if="activeTab === 'tab2'" :key="2">
              <div class="scroll">
                <span v-for="(name,i) in area" :keys="i" @click="searchName(name)" :class="title == name ? 'active':''">{{name}}</span>
              </div>
            </div>
            <div class="tab i-name" v-if="activeTab === 'tab3'" :key="3">
              <div class="scroll">
                <span v-for="(name,i) in types" :keys="i" @click="searchName(name)" :class="title == name ? 'active':''">{{name}}</span>
              </div>
            </div>
            <div class="tab i-name" v-if="activeTab === 'tab4'" :key="4">
              <div class="scroll">
                <span v-for="(name,i) in features" :keys="i" @click="searchName(name)" :class="title == name ? 'active':''">{{name}}</span>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
    <div class="content">
      <v-homeList :homeListArr="listData"></v-homeList>
      <mu-infinite-scroll :scroller="scroller" :loading="loadingData" @load="loadMore" />
    </div>
    <div class="text-center">
      <mu-toast class="toast" v-if="toast" :message="toastStr" @close="hideToast" />
    </div>
    <transition name="slid">
      <div class="search" v-if="searchStatus">
        <div class="bar">
          <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="searchStatus = false" />
          <mu-auto-complete hintText="今天你想搜点啥～" v-model="value" @input="handleInput" :dataSource="dataSource" @change="handlechange" />
          <mu-icon-button class="srch-btn" icon="search" slot="right" @click="handlechange(value)" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { searchUrl, getUrlData } from '@/utils'
import homeList from '@com/common/home_list'
export default {
  data() {
    return {
      filterOn: false, //头部筛选栏显隐
      activeTab: '', //正激活的tab
      activeActs: [], //tab-形式-激活数组
      typeIndex: 0, //tab-形式-激活index
      title: '找影视', //标题
      toast: false, //提示显隐
      toastStr: '请稍后，正在拼命加载...', //提示信息
      listData: [], //补全数组
      searchStatus: false, //搜索显隐
      dataSource: [], //补全数组
      value: '', //搜索值，不可自定义参数
      start: 0, //计数开始
      count: 10, //每次多加载10条
      total: 0, //当前搜索数据总数
      loadingData: false, //是否获取数据中
      scroller: window, //监听滚动对象
      acts: [{ //tab数组
          'type': '电视剧',
          'names': ['吴秀波', '胡歌', '张靓颖', '林更新']
        },
        {
          'type': '综艺',
          'names': ['黄渤', '黄磊', '孙红雷', '何炅']
        },
        {
          'type': '小鲜肉',
          'names': ['吴亦凡', '鹿晗', 'TFboys']
        },
        {
          'type': '脱口秀',
          'names': ['汪涵', '田源', '欧弟']
        }
      ],
      area: ['全部', '大陆', '美国', '香港', '台湾', '日本', '韩国', '德国', '泰国', '意大利', '英国', '法国', '俄罗斯'],
      types: ['全部', '剧情', '爱情', '喜剧', '科幻', '动作', '悬疑', '犯罪', '恐怖', '青春', '励志', '文艺', '战争'],
      features: ['全部', '经典', '豆瓣高分', '冷门佳片', '自定义标签']
    }
  },
  components: { 'v-homeList': homeList },
  // computed: {
  //   fliterBG: function() {
  //     return this.filterOn ? '#FFF' : '#FFF'
  //   }
  // },
  created() {
    this.searchName('全部')
  },
  mounted() {
    this.init()
  },
  methods: {
    init() { //初始化
      this.filterOn = this.activeTab == '' ? false : true
      this.activeActs = this.acts[0].names
    },
    goback() { //返回上一页
      this.$router.goback()
    },
    showToast(str = this.toastStr, time = 1500) { //提示信息
      this.toast = true
      this.toastStr = str
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => { this.toast = false }, time)
    },
    hideToast() { //隐藏提示
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    openSearch() { //打开搜索
      this.searchStatus = true
      this.filterOn = false
    },
    handlechange(val) { //点击提示搜索内容时
      this.searchName(val)
      this.searchStatus = false
    },
    handleInput(val) { //搜索提示
      this.dataSource = [
        val,
        val + val,
        val + val + val
      ]
    },
    tabClick(val) { //tab栏开关
      if (val === this.activeTab) {
        this.filterOn = !this.filterOn
      } else {
        this.filterOn = true
        this.activeTab = val
      }
    },
    actsName(index) { //正显示的子tab
      this.typeIndex = index
      this.activeActs = this.acts[index].names
    },
    loadMore() {
      let url = searchUrl({ 'name': this.title }, this.start)
      this.start += this.count
      this.getSearchData(url)
    },
    searchName(str, byType) { //搜索 name优先
      let url = byType ? searchUrl({ 'type': str }) : searchUrl({ 'name': str })
      this.title = str
      this.filterOn = false
      this.searchUrl = url
      this.start = 0
      this.getSearchData(url, true)
    },
    getSearchData(url, reset) {
      if (this.start > this.total) {
        this.showToast('没有更多了哟～')
        return false
      }
      if (this.loadingData) {
        this.showToast()
      } else {
        this.loadingData = true
        getUrlData(this, url, (data) => {
          this.total = data.total
          this.loadingData = false
          this.listData = reset ? data.subjects : this.listData.concat(data.subjects)
          this.start += this.count
        })
      }
    }
  }
}

</script>
<style lang="scss" scoped>
@import "../../style/mixin";
.list {
  position: relative;
}

.filter-head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  background: transparent;
}

.head {
  height: 2rem;
}

.tabs {
  height: 2rem;
}

.f-item {
  max-height: 10rem;
  border-radius: 0 0 2rem 2rem;
  background: rgba(0, 0, 0, .8);
  overflow-y: auto;
  .i-type {
    margin: .25rem 0;
    padding: .1rem 0;
    color: #fff;
    &.active {
      color: $base-act;
      @include bor-active($border-act, 10px);
    }
  }
  .i-name span {
    margin: .25rem;
    padding: .1rem .5rem;
    border: 1px solid $base-act-l;
    border-radius: 4px;
    float: left;
    font-size: $text-xs-a;
    color: $ft-light;
    &.active {
      background: $base-act;
      color: #fff;
    }
  }
  .scroll {
    width: 300%;
    padding: 0 .5rem;
    white-space: nowrap;
  }
}

::-webkit-scrollbar {
  display: none;
}

.f-item.no-border {
  @include no-border();
}

.content {
  padding-top: 4.4rem;
}

.toast {
  bottom: 1rem;
  width: 60%;
  left: 50%;
  margin-left: -30%;
}

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

.slid-enter-active {
  animation: slid-in .6s;
}

.slid-leave-active {
  animation: slid-out .6s;
}

@keyframes slid-in {
  0% {
    opacity: 0;
    -webkit-transform: translate(0, 800px);
    transform: translate(0, 800px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}

@keyframes slid-out {
  0% {
    opacity: 1;
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;
    -webkit-transform: translate(0, 800px);
    transform: translate(0, 800px);
  }
}

</style>
