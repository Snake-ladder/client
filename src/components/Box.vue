<template>
  <div class="item" :id="number">
    <div class="content">
        <h2>{{number}}</h2>
        <img :src="image">
       {{obstaclePos}}
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
      obstaclePos: ''
    }
  },
  props: [
    'number'
  ],
  computed: {
    ...mapState([
      'player', 'obstacles'
    ])
  },
  watch: {
    'player.position' () {
      if (this.player.position === this.number) {
        this.image = this.player.image
      } else {
        this.image = ''
      }
      for(let i = 0; i < this.obstacles.length; i++) {
          if(this.player.position === this.obstacles[i].start) {
              this.$store.commit('GET_OBSTACLE',this.obstacles[i].end)
          }
      }
    }
  },
  created () {
    if (this.player.position === this.number) {
      this.image = this.player.image      
    }
    
    for(let i = 0; i< this.obstacles.length; i++) {
        if (this.obstacles[i].start === this.number) {
            this.obstaclePos = '🐍'
        }
    }

  }
}
</script>

<style>

</style>
