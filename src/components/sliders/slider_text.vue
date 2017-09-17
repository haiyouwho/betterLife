<template>
  <div class="slider">
    <swiper :options="swiperOption" v-if="imgTextarr[0].name">
      <swiper-slide v-for="item,index in nextArr" :key="index">
        <div class="swi-item">
          <img v-lazy="item.avatars.medium" alt="item.avatars.medium">
          <p class="swi-text "><span v-text="index==0 ? '导演' : '主演'" class="c-ccc"></span> {{item.name}}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nextArr: [],
      swiperOption: {
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 0,
        freeMode: true
      }
    }
  },
  props: ['imgTextarr']
}

</script>
<style scoped lang="scss">
.swiper-slide {
  height: 7.5rem;
}

.swi-item {
  position: relative;
  width: 100%;
  height: 6rem;
  text-align: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  p {
    line-height: 1rem;
  }
  .swi-text {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

</style>
