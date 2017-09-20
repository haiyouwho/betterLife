<template>
  <div class="list">
    <div class="fix-head" :style="{background:fliterBG}">
      <div class="head">
        <mu-appbar :title="selectName">
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
        <div class="f-item p-box" v-if="flterOn">
          <transition-group name="fade" mode="out-in">
            <div class="tab" v-if="activeTab === 'tab1'" :key="1">
              <mu-row gutter>
                <mu-col width="30">
                  <div v-for="(item,index) in acts" :keys="index" @click="actsName(index)" :class="typeIndex == index ? 'i-type active':'i-type'">
                    {{item.type}}
                  </div>
                </mu-col>
                <mu-col width="70" class="i-name">
                  <span v-for="(name,i) in activeActs" :keys="i" @click="searchName(name)" :class="selectName == name ? 'active':''">{{name}}</span>
                </mu-col>
              </mu-row>
            </div>
            <div class="tab i-name" v-if="activeTab === 'tab2'" :key="2" >
              <div class="scroll">
                <span v-for="(name,i) in area" :keys="i" @click="searchName(name)" :class="selectName == name ? 'active':''">{{name}}</span>
              </div>
            </div>
            <div class="tab i-name" v-if="activeTab === 'tab3'" :key="3">
              <div class="scroll">
                <span v-for="(name,i) in types" :keys="i" @click="searchName(name)" :class="selectName == name ? 'active':''">{{name}}</span>
              </div>
            </div>
            <div class="tab i-name" v-if="activeTab === 'tab4'" :key="4">
              <div class="scroll">
                <span v-for="(name,i) in features" :keys="i" @click="searchName(name)" :class="selectName == name ? 'active':''">{{name}}</span>
              </div>
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
      activeTab: 'tab4',
      activeActs:[],
      typeIndex:0,
      selectName:'找影视',
      acts:[
      {
        'type':'电视剧',
        'names':['吴秀波','胡歌','张靓颖','林更新']
      },
      {
        'type':'综艺',
        'names':['黄渤','黄磊','孙红雷','何炅']
      },
      {
        'type':'小鲜肉',
        'names':['吴亦凡','鹿晗','TFboys']
      },
      {
        'type':'脱口秀',
        'names':['汪涵','田源','欧弟']
      }
      ],
      area:['全部','大陆','美国','香港','台湾','日本','韩国','德国','泰国','意大利','英国','法国','俄罗斯'],
      types:['全部','剧情','爱情','喜剧','科幻','动作','悬疑','犯罪','恐怖','青春','励志','文艺','战争'],
      features:['全部','经典','豆瓣高分','冷门佳片','自定义标签']
    }
  },
  computed: {
    fliterBG: function() {
      return this.flterOn ? 'rgba(0,0,0,.5)' : '#FFF'
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      this.flterOn = this.activeTab == '' ? false : true
      this.activeActs = this.acts[0].names
    },
    goback() {
      this.$router.goback()
    },
    tabClick(val) {
      if (val === this.activeTab) {
        this.flterOn = !this.flterOn 
      } else {
        this.flterOn = true
        this.activeTab = val
      }
    },
    actsName(index){
      this.typeIndex = index
      this.activeActs = this.acts[index].names
    },
    searchName(name){
      this.selectName = name
      this.flterOn = false 
      // this.activeTab = '' 
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
  max-height: 8rem;
  border-radius: 0 0 2rem 2rem;
  background: #fff;
  overflow-y:auto; 
  .i-type{
    padding: .2rem 0;
    &.active{
      color:$base-act; 
    }
  }
  .i-name span{
    margin:.25rem;
    padding:.1rem .5rem;
    border:1px solid $base-act-l;
    border-radius: 4px;
    float: left;
    &.active{
      background: $base-act;
      color: #fff;
    }
  }
  .scroll{
    width: 300%;
    padding: 0 .25rem;
    white-space: nowrap;
  }
}
  .f-item.no-border {
    @include no-border();
  }
  </style>