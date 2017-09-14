<template>
  <div class="ratings_" v-if="rating">
    <mu-icon v-for="item,index in starArr" :keys="index" :value="item" />
  </div>
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
      let score = this.rating || 0,
        a = 'star',
        b = 'star_half',
        c = 'star_border',
        i = 0,
        arr = []
      score = Math.floor(score)
      for (i; i < 5; i++) {
        let tar = c
        if (score > i * 2) {
          tar = a
        }
        if (score > i * 2 && score <= (i * 2 + 1)) {
          tar = b
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
