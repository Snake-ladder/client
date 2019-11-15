<template>
  <div class="home">
    <form @submit.prevent="submitPlayer">
      <input type="text" v-model="name" placeholder="nickname">
      <input type="submit" value="play">
    </form>
  </div>
</div>
<div style="position:relative;">
  <Box v-for="(board,index) in boards " :key='index' :number='board'></Box>
  <img class="snake1" src="../../public/snake1.png" alt="" width="150px;">
  <img class="snake4" src="../../public/snake5.png" alt="" style="width:150px">
  <img class="snake2" src="../../public/snake6.png" alt="" width="150px;">
  <img class="snake3" src="../../public/snake7.png" alt="" width="150px;">
  <img class="ladder" src="../../public/ladder.png" alt="" style="width:150px; height:180px;">
  <img class="ladder2" src="../../public/ladder.png" alt="" style="width:150px; height:150px; transform: rotate(-30deg);">
  <img class="ladder3" src="../../public/ladder.png" alt="" style="width:150px; height:220px; transform: rotate(32deg);">
  <img class="ladder4" src="../../public/ladder.png" alt="" style="width:150px; height:120px;">
</div>
<!-- <button class="rollDice" v-if="!isWinner" @click="roledice">Dice Role</button> -->
<!-- <img src="https://image.flaticon.com/icons/svg/84/84073.svg"> -->
  <!-- dadu -->
  <div class="container rollDice" @click="roledice" v-if="!isWinner">
  <div class="dice">
    <div class="one">
      <span></span>
    </div>
    <div class="two">
      <span></span>
      <span></span>
    </div>
    <div class="three">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="four">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="five">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="six">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</div>

  <!-- dadu -->
</div>

</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    // ...mapActions({
    //   submitPlayer: 'addPlayer'
    // })
    submitPlayer () {
      console.log('sending...')
      this.$store
        .dispatch('addPlayer', {
          name: this.name
        })
        .then(result => {
          console.log(result)
          this.$router.push('/about')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

