<template>
  <div class="item" :id="number">
    <div class="content">
        <h2>{{number}}</h2>
        <img :src="image">
        <img :src="obstaclePos">
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
      'player', 'obstacle'
    ])
  },
  watch: {
    'player.position' () {
      if (this.player.position === this.number) {
        this.image = this.player.image
      } else {
        this.image = ''
      }
    }
  },
  created () {
    if (this.player.position === this.number) {
      this.image = this.player.image
    }
  }
}
</script>

<style>

</style>
