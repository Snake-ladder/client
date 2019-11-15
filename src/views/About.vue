<template>
  <div id="lobby">
    <h3>lobby</h3>
    <form @submit.prevent="submitRoom">
      <input type="text" v-model="roomName">
      <input type="submit" value="create">
    </form>
    <ul>
      <li v-for="room in listRoom" :key="room.id" @click="joinRoom(room.id)">{{ room }}</li>
    </ul>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  name: 'Lobby',
  data () {
    return {
      roomName: ''
    }
  },
  computed: {
    listRoom () {
      return this.$store.state.rooms
    }
  },
  methods: {
    submitRoom () {
      this.$store
        .dispatch('createRoom', {
          roomName: this.roomName
        })
        .then(result => {
          console.log(result)
          this.$router.push(`/waiting/${localStorage.getItem('currentRoom')}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    joinRoom (id) {
      this.$store
        .dispatch('joinRoom', id)
        .then(result => {
          console.log(result)
          this.$router.push(`/waiting/${localStorage.getItem('currentRoom')}`)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.$store.dispatch('fetchRooms')
  }
}
</script>

<style>

</style>
