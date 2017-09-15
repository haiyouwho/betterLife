<template>
  <div class="slider">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item,index in imgArr" :key="index">
        <router-link :to="{name:'detail',params:{id:item.id}}">
          <div class="swi-item">
            <img v-lazy="item.images.medium" alt="">
            <p class="c-base">
              <mu-icon value="star" />
              <span>{{item.collect_count}}想看</span>
            </p>
          </div>
        </router-link>
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
        spaceBetween: 10
      }
    }
  },
  props: ['imgArr']

}

</script>
<style lang="scss" scoped>
.slider {
  height: 7rem;
  overflow: hidden;
}

.swi-item {
  height: 7rem;
  position: relative;
  font-size: .6rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
  p {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100%;
    padding: .2rem;
    color: #fff;
    font-size: .6rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .mu-icon {
    margin: 0;
    padding: 0;
    vertical-align: middle;
  }
}

</style>
