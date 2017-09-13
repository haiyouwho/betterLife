<template>
  <div class="wrap">
    <mu-appbar title="Better-Life">
      <mu-icon-button icon="menu" slot="left" />
      <mu-icon-button icon="search" slot="right" />
    </mu-appbar>
    <bannerHead :bannerImgArr="bannerImgArr"></bannerHead>
    <div class="content">
      <div class="collection m-t ">
        <mu-flexbox>
          <mu-flexbox-item class="flex-demo">
            <mu-row class="item">
              <mu-col width="30">
                <mu-icon-button icon="search" />
              </mu-col>
              <mu-col width="60">
                <p>今天搜点啥~</p>
                <p class="text-xs">科幻/悬疑/喜剧</p>
              </mu-col>
              <mu-col width="10">
                <p class="arrow b-r"></p>
              </mu-col>
            </mu-row>
          </mu-flexbox-item>
          <mu-flexbox-item class="flex-demo">
            <mu-row class="item">
              <mu-col width="30">
                <mu-icon-button icon="favorite" />
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
      <div class="list-title clearfix">
        <span class="pull-left text-md m-l-sm">正在热映</span>
        <span class="pull-right text-sm">全部<strong class="m-l-xs m-r-xs c-base">{{hotTotal}}</strong> > </span>
      </div>
      <sliderView :imgArr="bannerImgArr"></sliderView>
      <tableList></tableList>
      <div class="list-title clearfix">
        <span class="pull-left text-md m-l-sm">即将上映</span>
        <span class="pull-right text-sm">全部<strong class="m-l-xs m-r-xs c-base">{{commingSoon}}</strong> > </span>
      </div>
      <div class="banner">
        <ul class="clearfix">
          <li v-for="tile, index in listComming">
            <img :src="tile.image" />
            <p class="text">
              {{tile.title}} <i>by</i> {{tile.author}}
            </p>
            <span class="label c-base">{{tile.collect_count}}人已看过</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import bannerHead from '@com/sliders/banner'
import sliderView from '@com/sliders/sliders_view_auto'
import tableList from '@com/table'
import { hotUrl, getUrlData, dealDou } from '@/utils'
export default {
  data() {
    return {
      bannerImgArr: [],
      searchStatus: false,
      hotTotal: 0,
      commingSoon: 0,
      listComming: []
    }
  },
  components: { bannerHead, sliderView, tableList },
  created() {
    let urlHot = hotUrl()
    this.getData(urlHot, (arr, total) => {
      this.bannerImgArr = arr
      this.hotTotal = total
    })
  },
  methods: {
    search() {},
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
