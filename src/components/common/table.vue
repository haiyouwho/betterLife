<template>
  <div class="tab-container">
    <div class="tab-title clearfix">
      <transition name="slide-fade">
        <span v-show="!tabMoving" class="tab-active" v-text="currentTab[0] + ' ( 共'+tabNumber+'部 )'"></span>
      </transition>
      <transition-group name="bunceout" tag="p">
        <span :key="1" v-show="currentTabIndex_!=1" class="tab" @click="tabAnimation(1)" v-text="currentTab[1]"></span>
        <span :key="2" v-show="currentTabIndex_!=2" class="tab" @click="tabAnimation(2)" v-text="currentTab[2]"></span>
      </transition-group>
    </div>
    <div class="tab-content">
      <transition name="fade">
        <div v-show="!tabMoving">
          <ul class="tab-list">
            <li v-for="item, index in listTabs">
              <router-link :to="{name:'detail',params:{id:item.id}}">
                <mu-row>
                  <mu-col width="15" class="tab-img">
                    <img v-lazy="item.images.small">
                  </mu-col>
                  <mu-col width="85">
                    <p class="text-over">
                      <span class="text-sm ">{{item.title}}</span>
                      <span class="c-base text-xs m-r-xs">{{item.genres}}</span>
                    </p>
                    <p class="text-xs">
                      <span class="c-orange" v-text="item.rating.average==0? '暂无评分' : item.rating.average+'分'"></span>
                      <span class="pull-right b-b">{{item.collect_count}}人看过</span>
                    </p>
                  </mu-col>
                </mu-row>
              </router-link>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { top250Url, commingUrl, usboxUrl, getUrlData, dealDou } from '@/utils'
export default {
  data() {
    return {
      listNumObj: {}, //三个栏目各自的电影数量
      tabNumber: 0, //显示的数量
      listTabs: [], //正显示的列表
      listTop250: [], //top250
      listUSBox: [], //北美票房网
      listCom: [], //即将上映
      currentTabIndex: 0,
      currentTabIndex_: 0,
      currentTab: ['Top 250', '即将上映', '北美票房榜'],
      tabMoving: false
    }
  },
  created() {
    this.tabChangTo('Top 250', 1)
    this.tabCurrentName('Top 250')
  },
  methods: {
    tabAnimation(index) { //点击按钮开始动画，并且获取数据
      let me = this
      me.currentTabIndex = index
      me.currentTabIndex_ = index //触发过度动画的状态
      me.tabMoving = !me.tabMoving
      setTimeout(() => {
        let x = me.currentTab[index],
          y = me.currentTab[0]
        me.tabChangTo(x)
        me.currentTab.shift()
        me.currentTab.unshift(x)
        me.currentTab[index] = y
        me.tabMoving = !me.tabMoving
        me.currentTabIndex_ = 0
      }, 300)
    },
    tabCurrentName(str) { //初始化时修正显示数组
      this.currentTab.forEach((v, k) => {
        if (str == v) {
          this.currentTab.splice(k, 1)
          return
        }
      })
      this.currentTab.unshift(str)
    },
    tabChangTo(str) { //获取对应按钮的数据，放入缓存，更新tab
      let url = ''
      switch (str) {
        case 'Top 250':
          url = top250Url()
          this.tabListExist(this.listTop250, this.listNumObj.top250, url, (arr, total) => {
            this.listTop250 = arr.slice(0, 5)
            this.listNumObj.top250 = total
          })
          break
        case '即将上映':
          url = commingUrl()
          this.tabListExist(this.listCom, this.listNumObj.comming, url, (arr, total) => {
            this.listCom = arr
            this.listNumObj.comming = total
          })
          break
        case '北美票房榜':
          url = usboxUrl()
          this.tabListExist(this.listUSBox, this.listNumObj.us, url, (arr, total) => {
            this.listUSBox = arr
            this.listNumObj.us = total
          })
          break
      }
    },
    /*
     *  点击的按钮是否有数据缓存，有就直接使用，没有再去获取
     *  @params tarList 要显示的列表
     *  @params total 总数
     *  @params ulr 没有数据的话要获取的数据url
     *  @params 获取到数据后的回调
     */
    tabListExist(tarList, total, url, callback) {
      if (tarList.length != 0) {
        this.tabNext(tarList, total)
        return
      } else {
        this.getData(url, (arr, total) => {
          this.tabNext(arr, total)
          callback(arr, total)
        })
      }
    },
    tabNext(tabList, total) { //下一个更新的tab数据
      this.listTabs = tabList
      this.tabNumber = total
    },
    getData(url, callback) { //获取数据
      getUrlData(this, url, function(data) {
        let arr = [],
          total = ''
        arr = dealDou(data)
        total = typeof(data.total) == 'undefined' ? data.subjects.length : data.total
        arr = arr.slice(0, 5)
        callback(arr, total)
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.tab-container {
  padding: .5rem;
  border-radius: 10px;
  background: #fff;
}

.tab-title {
  width: 100%;
  padding: .25rem;
  .tab {
    float: right;
    margin-left: .3rem;
    animation: bouncein 0.8s;
  }
  .tab-active {
    float: left;
    background: #ff4081;
    animation: bouncein 0.8s;
  }
  span {
    padding: .2rem .3rem;
    background: #ccc;
    border-radius: 5px;
    color: #fff;
    font-size: .6rem;
  }
}

.tab-content {
  position: relative;
  width: 100%;
  height: 12rem;
  overflow: auto;
}

.tab-list {
  padding: .5rem;
  line-height: 1rem;
  text-align: left;
  li {
    margin-bottom: 1px;
    a{
      color:#666;
    }
  }
  .tab-img {
    width: 15%;
    height: 2rem;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

.bunceout-enter-active {
  transition: all .3s ease;
}

.bunceout-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.bunceout-enter,
.bunceout-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.fade-enter,
.fade-leave-to {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .3s ease;
}

</style>
