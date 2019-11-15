<template>
  <!-- <div class="home"> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- </div> -->
  <div class="container">

<div style="display:flex; justify-content:center; margin-bottom:10px;">
  <div style="margin-right:10px; margin-top:5px;">
    <h1>Snakes and Ladders</h1>
  </div>
  <div>
    <img src="../../public/logo2.jpg" alt="" style="width:30px;">
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
      image: '',
      dice: null
    }
  },
  created () {
    function snakesAndLadders (num) {
      let result = []
      let numbers = num * num
      for (let i = 0; i < num; i++) {
        result.push([])
        for (let j = 0; j < num; j++) {
          result[i].push(numbers)
          numbers--
        }
      }
      for (let i = 0; i < result.length; i++) {
        if (num % 2 === 0) {
          if (i % 2 != 0) {
            for (let j = 0; j < result[i].length; j++) {
              for (let k = j + 1; k < result[i].length; k++) {
                if (result[i][j] > result[i][k]) {
                  [result[i][j], result[i][k]] = [result[i][k], result[i][j]]
                }
              }
            }
          }
        } else {
          if (i % 2 === 0) {
            for (let j = 0; j < result[i].length; j++) {
              for (let k = j + 1; k < result[i].length; k++) {
                if (result[i][j] > result[i][k]) {
                  [result[i][j], result[i][k]] = [result[i][k], result[i][j]]
                }
              }
            }
          }
        }
      }
      return result
    }
    let numBoard = snakesAndLadders(10)

    let snakeBoard = []

    for (let i = 0; i < numBoard.length; i++) {
      for (let j = 0; j < numBoard[i].length; j++) {
        snakeBoard.push(numBoard[i][j])
      }
    }
    this.boards = snakeBoard
  },
  computed: {
    ...mapState([
      'player1','player2', 'isWinner'
    ])
  },
  methods: {
    roledice () {
      setTimeout(() => {
        // let num = localStorage.getItem('dice')
        this.$store.commit('ROLE_DICE', this.dice)
      }, 2500)
    }
  },
  mounted () {
    let roll = 0
    let self = this
  			$('div.container').on('click', '.dice', function () {
      roll = Math.floor((Math.random() * 6) + 1)
  				$(this).attr('class', 'dice')
  				setTimeout(function () {
        $('.dice').addClass('roll-' + roll)
      }, 2)
      // localStorage.setItem('dice', roll)
      self.dice = roll
    })
  }
}
</script>

<style scoped>
.snake1 {
  position: absolute !important;
  top: 30px !important;
  left: 30px !important;
  z-index: 1 !important;
}
.snake2 {
  position: absolute !important;
  top: 120px !important;
  left: 400px !important;
  z-index: 1 !important;
}
.snake3 {
  position: absolute !important;
  top: 240px !important;
  left: 30px !important;
  z-index: 1 !important;
}
.snake4 {
  position: absolute !important;
  top: 400px !important;
  left: 310px !important;
  z-index: 1 !important;
}
.ladder {
  position: absolute !important;
  top: 355px !important;
  left: 445px !important;
  z-index: 1 !important;
}
.ladder2 {
  position: absolute !important;
  top: 165px !important;
  left: 255px !important;
  z-index: 1 !important;
}
.ladder3 {
  position: absolute !important;
  top: 5px !important;
  left:175px !important;
  z-index: 1 !important;
}
.ladder4 {
  position: absolute !important;
  top: 355px !important;
  left:170px !important;
  z-index: 1 !important;
}
.rollDice {
  position: absolute;
  top: 20%;
  left: 10%;
  height: 100px;
  width: 100px;
  margin: 120px auto !important;
  padding: 0 !important;
}

/* dadu */

.dice {
  cursor: pointer;
  position: absolute;
  transform-style: preserve-3d;
  height: 100%;
  width: 100%;
  transform: translateZ( -50px) rotateX( 0deg) rotateY( 0deg);
  -webkit-transform: translateZ( -50px) rotateX( 0deg) rotateY( 0deg);
}

.dice > div {
  backface-visibility: hidden;
  height: 100px;
  width: 100px;
  position: absolute;
  background: #fff;
  border-radius: 2px;
}

.dice > div > span { /*die dot styling */
  position: absolute;
  background: #000;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  transform: translate3d(-50%, -50%, 0);
  -webkit-transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden;
}

.one {
  transform: rotateY( 0deg) translateZ( 50px);
  -webkit-transform: rotateY( 0deg) translateZ( 50px);
}

.two {
  transform: rotateX( 180deg) translateZ( 50px);
  -webkit-transform: rotateX( 180deg) translateZ( 50px);
}

.three {
  transform: rotateY( 90deg) translateZ( 50px);
  -webkit-transform: rotateY( 90deg) translateZ( 50px);
}

.four {
  transform: rotateY( -90deg) translateZ( 50px);
  -webkit-transform: rotateY( -90deg) translateZ( 50px);
}

.five {
  transform: rotateX( 90deg) translateZ( 50px);
  -webkit-transform: rotateX( 90deg) translateZ( 50px);
}

.six {
  transform: rotateX( -90deg) translateZ( 50px);
  -webkit-transform: rotateX( -90deg) translateZ( 50px);
}

.one span, .three span:nth-child(2), .five span:nth-child(5) {
  top: 50%;
  left: 50%;
}

.two span:nth-child(1), .three span:nth-child(1), .four span:nth-child(1), .five span:nth-child(1), .six span:nth-child(1) {
  top: 25%;
  left: 25%;
}

.two span:nth-child(2), .three span:nth-child(3), .four span:nth-child(4), .five span:nth-child(4), .six span:nth-child(6) {
  top: 75%;
  left: 75%;
}

.four span:nth-child(2), .five span:nth-child(2), .six span:nth-child(2) {
  top: 25%;
  left: 75%;
}

.four span:nth-child(3), .five span:nth-child(3), .six span:nth-child(5)  {
  top: 75%;
  left: 25%;
}

.six span:nth-child(3) {
  top: 50%;
  left: 25%;
}

.six span:nth-child(4) {
  top: 50%;
  left: 75%;
}

.dice.roll-1 {
  animation: roll-one 2s 1 linear forwards;
  -webkit-animation: roll-one 2s 1 linear forwards;
}

.dice.roll-2 {
  animation: roll-two 2s 1 linear forwards;
  -webkit-animation: roll-two 2s 1 linear forwards;
}

.dice.roll-3 {
  animation: roll-three 2s 1 linear forwards;
  -webkit-animation: roll-three 2s 1 linear forwards;
}

.dice.roll-4 {
  animation: roll-four 2s 1 linear forwards;
  -webkit-animation: roll-four 2s 1 linear forwards;
}

.dice.roll-5 {
  animation: roll-five 2s 1 linear forwards;
  -webkit-animation: roll-five 2s 1 linear forwards;
}

.dice.roll-6 {
  animation: roll-six 2s 1 linear forwards;
  -webkit-animation: roll-six 2s 1 linear forwards;
}

@keyframes roll-one {
  0% {
    transform: translateZ( -50px) rotateX( -10deg) rotateY( -10deg);
  }
  100% {
    transform: translateZ( -50px) rotateX( -180deg) rotateY( -540deg);
  }
}

@keyframes roll-two {
  0% {
    transform: translateZ( -50px) rotateX( -10deg) rotateY( -10deg);
  }
  100% {
    transform: translateZ( -50px) rotateX( -360deg) rotateY( -540deg);
  }
}

@keyframes roll-three {
  0% {
    transform: translateZ( -50px) rotateX( -10deg) rotateY( -10deg);
  }
  100% {
    transform: translateZ( -50px) rotateX( -360deg) rotateY( -450deg);
  }
}

@keyframes roll-four {
  0% {
    transform: translateZ( -50px) rotateX( -10deg) rotateY( -10deg);
  }
  100% {
    transform: translateZ( -50px) rotateX( -360deg) rotateY( -630deg);
  }
}

@keyframes roll-five {
  0% {
    -webkit-transform: translateZ( -50px) rotateX( -10deg) rotateY( -10deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: translateZ( -50px) rotateX( -450deg) rotateY( -360deg) rotateZ(0deg);
  }
}

@keyframes roll-six {
  0% {
    -webkit-transform: translateZ( -50px) rotateX( -10deg) rotateY( -10deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: translateZ( -50px) rotateX( -450deg) rotateY( 0deg) rotateZ(-180deg);
  }
}

@-webkit-keyframes roll-one {
  0% {
    -webkit-transform: translateZ( -50px) rotateX( -10deg) rotateY( -10deg);
  }
  100% {
    -webkit-transform: translateZ( -50px) rotateX( -180deg) rotateY( -540deg);
  }
}

@-webkit-keyframes roll-two {
  0% {
    -webkit-transform: translateZ( -50px) rotateX( -10deg) rotateY( -10deg);
  }
  100% {
    -webkit-transform: translateZ( -50px) rotateX( -360deg) rotateY( -540deg);
  }
}

@-webkit-keyframes roll-three {
  0% {
    -webkit-transform: translateZ( -50px) rotateX( -10deg) rotateY( -10deg);
  }
  100% {
    -webkit-transform: translateZ( -50px) rotateX( -360deg) rotateY( -450deg);
  }
}

@-webkit-keyframes roll-four {
  0% {
    -webkit-transform: translateZ( -50px) rotateX( -10deg) rotateY( -10deg);
  }
  100% {
    -webkit-transform: translateZ( -50px) rotateX( -360deg) rotateY( -630deg);
  }
}

@-webkit-keyframes roll-five {
  0% {
    -webkit-transform: translateZ( -50px) rotateX( -10deg) rotateY( -10deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: translateZ( -50px) rotateX( -460deg) rotateY( -360deg) rotateZ(-10deg);
  }
}

@-webkit-keyframes roll-six {
  0% {
    -webkit-transform: translateZ( -50px) rotateX( 0deg) rotateY( -10deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: translateZ( -50px) rotateX( -450deg) rotateY( 0deg) rotateZ(-180deg);
  }
}
</style>
