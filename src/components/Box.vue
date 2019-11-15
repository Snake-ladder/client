<template>
  <div class="item" :id="number">
    <div class="content">
        <h2>{{number}}</h2>
        <img :src="image1">
        <img :src="image2">
        <img :src="image3">
        <img :src="image4">
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
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      obstacleStart: '',
      obstacleEnd: '',
      ladderStart: '',
      ladderEnd: ''
    }
  },
  props: [
    'number','players'
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
      this.$store.dispatch('updatePlayerPosition')
    }
  },
  created () {
    // console.log(this.players)
    
        // if(this.players[0].position === this.number) {
        //   this.image1 = this.players[0].image
        // } 
        // if(this.players[1].position === this.number) {
        //   this.image1 = this.players[1].image
        // }
        // if(this.players[2].position === this.number) {
        //   this.image1 = this.players[2].image
        // }
        // if(this.players[3].position === this.number) {
        //   this.image1 = this.players[3].image
        // }
  }
}
</script>

<style>

</style>
