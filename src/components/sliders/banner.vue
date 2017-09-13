<template>
  <div class="swiper-inner">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in bannerImgArr">
        <router-link :to="{name:'detail',params:{id:item.id}}">
          <div class="swi-item">
            <img :src="item.image">
            <p>{{item.title}} <span class="c-base text-b">by</span> {{item.author}}</p>
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
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
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
  a{
    display: block;
    width:100%;
    height:100%;
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
    top: 5.5rem;
    z-index: 999;
    padding: .2rem .5rem;
    line-height: 1rem;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    border-radius: 0 .5rem .5rem 0;
  }
}

</style>
