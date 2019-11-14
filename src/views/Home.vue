<template>
  <!-- <div class="home"> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- </div> -->
  <div class="container">

<h1>Snakes and Ladders</h1>
<div>
  <Box v-for="(board,index) in boards " :key='index' :number='board'></Box>
  <!-- <img class="snake1" src="../../public/snake2.png" alt="" width="250px;"> -->
</div>
<button v-if="!isWinner" @click="roledice">Dice Role</button>
<!-- <img src="https://image.flaticon.com/icons/svg/84/84073.svg"> -->
</div>

</template>

<script>
import Box from '@/components/Box'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    Box
  },
  data () {
    return {
      boards: [],
      image: ''
    }
  },
  created () {
    for (let i = 100; i > 0; i--) {
      this.boards.push(i)
    }
  },
  computed: {
    ...mapState([
      'player','isWinner'
    ])
  },
  methods: {
    roledice () {
      this.$store.commit('ROLE_DICE')
      console.log(this.player.position)
    }
  }
}
</script>

<style scoped>
.snake1 {
  position: absolute !important;
  top: 380px !important;
  left: 220px !important;
  z-index: 1 !important;
}
</style>