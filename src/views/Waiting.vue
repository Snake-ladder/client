<template>
  <div id="waiting">
    <!-- <h3>Waiting other player...</h3>
    <ol>
      <li v-for="player in players" :key="player.id">{{ player.name }}</li>
    </ol> -->
    <div class="main p-5">
        <h3 class="pb-2">{{ room.name }}</h3>
        <p>{{ room.status }}</p>

        <h3 class="pt-2">Players: </h3>
        <div class="row pt-2">
            <div class="col-sm-3" v-for="player in players" :key="player.name">
                <div class="card">
                    <img src="https://lh5.googleusercontent.com/-0ihf5MV1mQs/TXsJ3wJ29gI/AAAAAAAAB78/WWds9wittRE/s1600/satria+baja+hitam+rx+1.jpg" class="card-img-top" alt="...">
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
    fetchCurrentRoom () {
      this.$store
        .dispatch('fetchCurrentRoom', this.$route.params.id)
        .then(result => {
          console.log(result)
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
</style>
