<template>
  <div v-if="obj.title" class="detail">
    <mu-appbar :title="title" class="head" :style="{backgroundColor:opticay}">
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
    <div class="info">
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
            <v-ratings :rating="obj.rating.average"></v-ratings>
          </div>
        </mu-col>
      </mu-row>
      <mu-row class="m-t-lg">
        <mu-col width="40">
          <mu-raised-button class="rating-btn" label="看过" labelPosition="before" :fullWidth="true" icon="star_border" color="#FFAC2D" />
        </mu-col>
        <mu-col width="50">
          <mu-raised-button label="想看" icon="favorite_border" rippleColor="red" color="#FFAC2D" :fullWidth="true" />
        </mu-col>
      </mu-row>
    </div>
    <div class="sec">
      <div class="title">简介</div>
      <div class="content">{{obj.summary}}</div>
    </div>
    <div class="sec">
      <div class="title">影人</div>
      <div class="content">
        <v-slider :imgTextarr="actorArr"></v-slider>
      </div>
    </div>
  </div>
</template>
<script>
import slider_text from '@com/sliders/slider_text'
import ratings from '@com/common/ratings'
import { detailUrl, getUrlData, dealDou } from '@/utils'
export default {
  data() {
    return {
      obj: {},
      title: '',
      actorArr: [],
      opticay: 'rgba(119,119,119,1)',
    }
  },
  beforeRouteEnter(to, from, next) {
    let id = to.params.id
    next(vm => {
      let url = detailUrl(id)
      getUrlData(vm, url, (data) => {
        vm.obj = data
        vm.init()
      })
    })
  },
  // created() {
  //   let url = detailUrl('25808075')
  //   getUrlData(this, url, (data) => {
  //     this.obj = data
  //     this.init()
  //   })
  // },
  components: {
    'v-slider': slider_text,
    'v-ratings': ratings
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
    console.log('mounted')
  },
  methods: {
    goback() {
      this.$router.goback()
    },
    init() {
      this.title = '短评总数：' + this.obj.comments_count
      this.actorArr = this.obj.casts
      this.actorArr.unshift(this.obj.directors[0])
    },
    onScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.changeOpticay()
      if (top > 300) {
        this.changeTitle()
      } else {
        this.changeTitle(`短评总数：${this.obj.comments_count}`)
      }
    },
    changeTitle(str = this.obj.title) {
      this.title = str
    },
    changeOpticay() {
      let o = Math.floor(this.y / 30) / 10
      this.opticay = `rgba(119,119,119,${o})`
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
}

</script>
<style lang="scss" scoped>
h1 {
  margin: .2rem 0;
}

.head {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background: #000;
}

.banner {
  height: 16rem;
  padding: 1rem 0;
  padding-top: 70px;
  overflow: hidden;
  background: #777;
  img {
    max-height: 100%;
  }
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
  font-size: .6rem;
  .title {
    margin-bottom: .25rem;
    color: #999;
  }
}

.ratings {
  margin-top: .7rem;
  border-radius: 2px;
  box-shadow: 0 19px 60px rgba(0, 0, 0, .298039), 0 15px 20px rgba(0, 0, 0, .219608)
}

</style>
