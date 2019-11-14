<template>
  <div class="item" :id="number">
    <div class="content">
        <h2>{{number}}</h2>
        <img :src="image">
        {{ obstacleStart }}
        {{ obstacleEnd }}
        {{ ladderStart }}
        {{ ladderEnd }}
    </div>
    <div class="overlay">
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'box',
  data () {
    return {
      image: '',
      obstacleStart: '',
      obstacleEnd: '',
      ladderStart: '',
      ladderEnd: ''
    }
  },
  props: [
    'number'
  ],
  computed: {
    ...mapState([
      'player', 'obstacles', 'ladder'
    ])
  },
  watch: {
    'player.position' () {
      if (this.player.position === this.number) {
        this.image = this.player.image
      } else {
        this.image = ''
      }
      for (let i = 0; i < this.obstacles.length; i++) {
        if (this.player.position === this.obstacles[i].start) {
          this.$store.commit('GET_OBSTACLE', this.obstacles[i].end)
        }
      }
    }
  },
  created () {
    if (this.player.position === this.number) {
      this.image = this.player.image
    }
    // this.obstacles.forEach(el => {
    //   if (el.start === this.number) {
    //     this.obstacleStart = '🐍'
    //   }
    //   if (el.end === this.number) {
    //     this.obstacleEnd = '🐊'
    //   }
    // })
    // this.ladder.forEach(el => {
    //   if (el.start === this.number) {
    //     this.ladderStart = '🌠'
    //   }
    //   if (el.end === this.number) {
    //     this.ladderEnd = '🌟'
    //   }
    // })
  }
}
</script>

<style>

</style>