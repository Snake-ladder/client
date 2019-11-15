<template>
  <div id="waiting">
    <!-- <h3>Waiting other player...</h3>
    <ol>
      <li v-for="player in players" :key="player.id">{{ player.name }}</li>
    </ol> -->
    <div class="main p-5">
      <div class="row">
        <div class="col-10">
          <h3 class="pb-2">{{ room.name }}</h3>
          <p>{{ room.status }}</p>
        </div>
        <div class="col-2">
          <button class="play-btn p-2 animated" @click="goToPlayRoom">PLAY NOW ></button>
        </div>
      </div>

        <h3 class="pt-2">Players: </h3>
        <div class="row pt-2">
            <div class="col-sm-3" v-for="player in players" :key="player.name">
                <div class="card">
                    <img :src="player.image" class="card-img-top" alt="character">
                    <div class="card-body text-center">
                        <p class="card-text">{{ player.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Waiting',
  data () {
    return {
      room: {
        name: '',
        status: ''
      },
      players: []
    }
  },
  methods: {
    goToPlayRoom () {
      this.$router.push(`/game/${localStorage.getItem('currentRoom')}`)
    },
    fetchCurrentRoom () {
      this.$store
        .dispatch('fetchCurrentRoom', this.$route.params.id)
        .then(result => {
          let arr = []
          result.players.forEach(player => {
            arr.push(player)
          })
          this.players = arr
          this.room.name = result.name
          this.room.status = result.status
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    players () {
      this.fetchCurrentRoom()
    }
  },
  mounted () {
    this.fetchCurrentRoom()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');
.main {
    font-family: 'Open Sans Condensed', sans-serif;
    height: 100vh;
    background-image: url('https://www.coopermaloy.com.au/wp-content/uploads/2019/03/cooper-maloy-background.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
}

.card {
    color: black;
}

.card-body {
    padding: 0.8rem;
}

.play-btn {
  height: auto;
  width: 100px;
  border: 0;
}

.play-btn:hover {
  animation-name: wobble; 
}
</style>
