<template>
  <div class="slider">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item,index in imgArr">
        <div class="swi-item">
          <img :src="item" alt="">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 0,
        freeMode: true
      }
    }
  },
  props: ['imgArr']
}

</script>
<style scoped lang="scss">
.swiper-slide {
  height: 5rem;
}

.swi-item {
  width: 100%;
  height: 5rem;
  text-align: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}

</style>
