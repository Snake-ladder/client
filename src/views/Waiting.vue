<template>
  <div id="waiting">
    <h3>Waiting other player...</h3>
    <ol>
      <li v-for="player in players" :key="player.id">{{ player.name }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'Waiting',
  data () {
    return {
      players: []
    }
  },
  methods: {
    fetchCurrentRoom () {
      this.$store
        .dispatch('fetchCurrentRoom', this.$route.params.id)
        .then(result => {
          let arr = []
          result.players.forEach(player => {
            arr.push(player)
          })
          this.players = arr
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

</style>
