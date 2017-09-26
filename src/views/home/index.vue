<template>
  <div class="wrap" ref="home_box">
    <!-- head -->
    <mu-appbar title="Better-Life">
      <mu-icon-button icon="menu" slot="left" />
      <mu-icon-button icon="search" slot="right" />
    </mu-appbar>
    <bannerHead :bannerImgArr="bannerImgArr"></bannerHead>
    <!-- 搜索&收藏 -->
    <div class="content">
      <div class="collection m-t">
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo">
            <mu-row class="item">
              <mu-col width="30">
                <mu-icon-button icon="search" />
              </mu-col>
              <mu-col width="60" class="text-sm">
                <router-link to="/moveList">
                  <p>今天搜点啥~</p>
                  <p class="text-xs">科幻/悬疑/喜剧</p>
                </router-link> 
              </mu-col>
              <mu-col width="10">
                <p class="arrow b-r"></p>
              </mu-col>
            </mu-row>
          </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo">
            <mu-row class="item">
              <mu-col width="30">
                <mu-icon-button icon="favorite_border" />
              </mu-col>
              <mu-col width="60">
                <p>我的收藏</p>
                <p class="text-xs">全部<span class="c-r m-l">0</span></p>
              </mu-col>
              <mu-col width="10"></mu-col>
            </mu-row>
          </mu-flexbox-item>
        </mu-flexbox>
      </div>
      <!-- 热映 -->
      <div class="list-title clearfix">
        <span class="pull-left text-md m-l-sm">正在热映</span>
        <span class="pull-right text-sm">全部<strong class="m-l-xs m-r-xs c-base">{{hotTotal}}</strong> > </span>
      </div>
      <sliderView :imgArr="bannerImgArr"></sliderView>
      <!-- tab -->
      <tableList></tableList>
      <!-- 列表 -->
      <div class="list-title clearfix">
        <span class="pull-left text-md m-l-sm">即将上映</span>
        <span class="pull-right text-sm">全部<strong class="m-l-xs m-r-xs c-base">{{commingTotal}}</strong> > </span>
      </div>
      <homeList :homeListArr="listCommingList"></homeList>
    </div>
  </div>
</template>
<script>
import bannerHead from '@com/sliders/banner'
import sliderView from '@com/sliders/sliders_view_auto'
import tableList from '@com/common/table'
import homeList from '@com/common/home_list'
import { hotUrl, commingUrl, getUrlData, dealDou, getScrollTop, setScrollTop } from '@/utils'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      bannerImgArr: [],
      searchStatus: false,
      hotTotal: 0,
      commingTotal: 0,
      listCommingList: [],
    }
  },
  components: { bannerHead, sliderView, tableList, homeList },
  created() {
    let urlHot = hotUrl(),
    urlComming = commingUrl(0, 10)
    this.getData(urlHot, (arr, total) => {
      this.bannerImgArr = arr
      this.hotTotal = total
    })
    this.getData(urlComming, (arr, total) => {
      this.listCommingList = arr
      this.commingTotal = total
    })
  },
  computed: mapState([
    'homeScroll'// 映射 this.homeScroll 为 store.state.homeScroll
    ]),
  activated() {//创建的时候滚动到上次的位置
    setScrollTop(this.homeScroll)
  },
  deactivated() {//销毁的时候记录滚动位置
    this.setScroll(getScrollTop())
  },
  beforeDestroy(){
    setScrollTop(0)
  },
  methods: {
    ...mapMutations([
      'setScroll', // 映射 this.setScroll() 为 this.$store.commit('setScroll')
      'getScroll'
      ]),
    getData(url, callback) { //获取数据
      let me = this
      getUrlData(me, url, function(data) {
        let arr = [],
        total = ''
        arr = dealDou(data)
        total = typeof(data.total) == 'undefined' ? data.subjects.length : data.total
        callback(arr, total)
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.content {
  padding: 0 .5rem;
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

.list-title {
  box-sizing: border-box;
  margin: 10px 0;
  line-height: 1.35rem;
  border-left: 2px solid #ef5350;
}

.in-hot {
  width: 100%;
  height: 8rem;
  overflow-y: hidden;
  overflow-x: auto;
}


.in-hot ul {
  width: 500%;
}

.in-hot ul li {
  position: relative;
  float: left;
  width: 20%;
  img {
    width: 95%;
  }
  .text {
    position: absolute;
    right: 1.5rem;
    top: 5.5rem;
    line-height: 1.5rem;
    margin: .5rem;
    padding: 0 .25rem;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    border-radius: .5rem;
    font-size: .6rem;
  }
  .label {
    position: absolute;
    left: 1.3rem;
    top: 0rem;
    line-height: 1rem;
    margin: .5rem;
    padding: 0 .25rem;
    background: rgba(250, 250, 250, .5);
    border-radius: .5rem;
    font-size: .6rem;
  }
}

.collection {
  padding: .25rem 0;
  border-radius: 10px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  .item {
    color: #555;
    line-height: 1.2rem;
  }
  .arrow {
    height: 1.5rem;
    margin-top: .5rem;
    color: #999;
  }
  .b-r {
    border-right: 1px solid #ddd;
  }
}

</style>
