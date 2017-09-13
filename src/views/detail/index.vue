<template>
  <div v-if="obj.title">
    <mu-appbar :title="title" class="head">
      <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goback" />
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="菜单 1" />
        <mu-menu-item title="菜单 2" />
        <mu-menu-item title="菜单 3" />
      </mu-icon-menu>
    </mu-appbar>
    <div class="banner">
      <img :src="obj.images.large" alt="">
    </div>
    <div class="info bd">
      <mu-row>
        <mu-col width="70" class="text-left item">
          <h2>{{obj.title}}</h2>
          <p>
            <span>{{obj.year}}</span> /
            <span>{{obj.genres.join(' / ')}}</span>
          </p>
          <p>原名：<span>{{obj.original_title}}</span></p>
          <p>上映时间：<span>{{obj.mainland_pubdate}}</span>中国大陆</p>
          <p>片长：<span>{{obj.durations || '暂无'}}</span></p>
        </mu-col>
        <mu-col width="30">
          <div class="ratings text-center">
            <p>豆瓣评分</p>
            <h1>{{obj.rating.average}}</h1>
            <p>{{obj.ratings_count}}人</p>
          </div>
        </mu-col>
      </mu-row>
      <mu-row class="m-t-md">
        <mu-col width="40">
          <mu-raised-button label="想看" icon="favorite_border" rippleColor="red" color="#FFAC2D" fullWidth="1" />
        </mu-col>
        <mu-col width="50">
          <mu-raised-button class="rating-btn" label="看过" labelPosition="before" fullWidth="1" icon="star_border" color="#FFAC2D" />
        </mu-col>
      </mu-row>
    </div>
    <div class="sec">
      <div class="title">简介</div>
      <div class="content">{{obj.summary}}</div>
    </div>
  </div>
</template>
<script>
import { detailUrl, getUrlData, dealDou } from '@/utils'
export default {
  data() {
    return {
      obj: {},
      title: ''
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   let id = to.params.id
  //   next(vm => {
  //     let url = detailUrl(id)
  //     getUrlData(vm, url, (data) => {
  //       vm.obj = data
  //       vm.init()
  //     })
  //   })
  // },
  created() {
    let url = detailUrl('26264454')
    getUrlData(this, url, (data) => {
      this.obj = data
      this.init()
    })
  },
  methods: {
    goback() {
      this.$router.goback()
    },
    init() {
      this.title = '短评总数：' + this.obj.comments_count
    }
  }
}

</script>
<style lang="scss" scoped>
.head {
  background: #666;
}

.info {
  padding: .5rem;
  line-height: 1.2rem;
  font-size: .6rem;
  .item h2 {
    padding: .25rem 0;
  }
  p {
    line-height: .9rem;
    color: #999;
  }
}

.rating-btn button {
  color: #FFAC2D;
}

.sec {
  padding: .5rem;
  text-align: left;
  line-height: 1rem;
  color: #333;
  font-size:.6rem;
  .title {
  	margin-bottom:.25rem;
    color: #999;
  }
}

</style>
