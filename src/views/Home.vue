<template>
  <div class="home">
    <form @submit.prevent="submitPlayer">
      <input type="text" v-model="name" placeholder="nickname">
      <input type="submit" value="play">
    </form>
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
