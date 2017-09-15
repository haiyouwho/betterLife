<template>
  <div class="ratings_" v-if="rating">
    <mu-icon v-for="(item,index) in starArr" :value="item" :keys="index" />
  </div>
  <span v-else="rating">暂无评分</span>
</template>
<script>
export default {
  data() {
    return {
      starArr: []
    }
  },
  props: ['rating'],
  mounted() {
    let score = score = Math.floor(this.rating) || 0,
      i = 0,
      arr = []
    const A = 'star',
      B = 'star_half',
      C = 'star_border'
    for (i; i < 5; i++) {
      let tar = C
      if (score > i * 2) {
        tar = A
      }
      if (score > i * 2 && score <= (i * 2 + 1)) {
        tar = B
      }
      arr.push(tar)
    }
    this.starArr = arr
  }
}

</script>
<style lang="scss" scoped>
.ratings_ i {
  font-size: .65rem;
  color: #FFAC2D;
}

</style>
