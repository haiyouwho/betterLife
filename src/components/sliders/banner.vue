<template>
  <div class="swiper-inner">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item,index in bannerImgArr" :key="index">
        <router-link :to="{name:'detail',params:{id:item.id}}">
          <div class="swi-item">
            <img v-lazy="item.images.large">
            <p>{{item.title}} <span class="c-base text-b">by</span> {{item.directors[0].name}}</p>
          </div>
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiperOption: {
        autoplay: 1500,
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        indicatorsColor:'#fff',
        indicatorsActiveColor:'red',
        coverflow: {
          rotate: 100,
          stretch: 0,
          depth: 1000,
          modifier: 1,
          slideShadows: true
        }
      }
    }
  },
  props: ['bannerImgArr']
}

</script>
<style lang="scss" scoped>
.swiper-inner {
  width: 100%;
  height: 8rem;
  padding-bottom: 2rem;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 8rem;
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
}

.swi-item {
  position: relative;
  font-size: .65rem;
  img {
    width: 100%;
    height: auto;
    margin-top: -2rem;
  }
  p {
    position: absolute;
    left: 0;
    top: .25rem;
    z-index: 999;
    padding: .2rem .5rem;
    line-height: 1rem;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    border-radius: 0 .5rem .5rem 0;
  }
}

</style>
