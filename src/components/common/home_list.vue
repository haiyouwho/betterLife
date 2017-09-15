<template>
  <ul class="home-list" ref="viewList">
    <li class="p-xs" v-for="(item,index) in homeListArr" :keys="index">
      <router-link :to="{name:'detail',params:{id:item.id}}">
        <mu-row>
          <mu-col width="70" tablet="70" desktop="33">
            <div class="list-text text-left text-xs c-333">
              <mu-row>
                <mu-col width="80">
                  <h3 class="text-over">{{item.title}}</h3></mu-col>
                <mu-col width="20">{{item.year}}</mu-col>
              </mu-row>
              <div class="c-999">
                <mu-row class="m-t-xs">
                  <mu-col width="20">
                    <img class="avatar" src="" v-lazy="item.casts[0].avatars.small" alt="">
                  </mu-col>
                  <mu-col width="75">
                    <p class="m-t-xs clearfix text-over">
                      <span class="pull-left">导演： {{item.directors[0].name}}</span>
                    </p>
                    <p class="clearfix">
                      <v-ratings class="m-l-xs pull-right" :rating="item.rating.average"></v-ratings>
                      <span class="pull-left"><i class="c-r">{{item.collect_count}}</i> 短评</span>
                    </p>
                    <p>主演： {{item.castsName}}</p>
                  </mu-col>
                </mu-row>
              </div>
              <p></p>
            </div>
          </mu-col>
          <mu-col width="30" tablet="30" desktop="33">
            <div class="list-img"><img v-lazy="item.images.medium" alt=""></div>
          </mu-col>
        </mu-row>
      </router-link>
    </li>
  </ul>
</template>
<script>
import ratings from '@com/common/ratings'
export default {
  data() {
    return {}
  },
  props: ['homeListArr'],
  components: {
    'v-ratings': ratings
  },
  activated() {
    // let top = +this.count
    // if (top >= 0) {
    //   this.remeberScroll(-1)
    //   this.$refs.viewList.scrollTop = top
    // } else {
    //   this.remeberScroll(0)
    // }
    this.$refs.viewList.scrollTop = 100
  },
  deactivated() {
    console.log(this.$refs.viewList.scrollTop,'scrollTop')
    // this.remeberScroll(this.$refs.viewBox.scrollTop)
  }
}

</script>
<style lang="scss" scoped>
.home-list {
  .list-img img {
    width: 80%;
    height: 5rem;
    margin-left: 10%;
  }
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: .2rem;
  }
}

</style>
