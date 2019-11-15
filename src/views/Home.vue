<template>
  <div class="home text-center d-flex align-items-center justify-content-center">
    <div>
      <h1 class="header-font animated infinite pulse slow pb-3">Snake & Ladder</h1>
      <div>
        <form @submit.prevent="submitPlayer">
          <input required autofocus type="text" v-model="name" placeholder="nickname" class="name-input p-3"><br />
          <input type="submit" value="play" class="button-input p-2 m-3">
        </form>
      </div>
    </div>
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
          this.$router.push('/lobby')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Cabin+Sketch&display=swap');
.home {
  height: 100vh;
  font-family: 'Cabin Sketch', cursive;
  background-color: #3f4d71;
  color: white;
}

.header-font {
  font-size: 120px;
}

::placeholder {
  color: #fff;
}
 
 .name-input {
   width: 250px;
   border-radius: 25px;
   background-color: #55ae95;
   border: none;
   color: #fff;
 }

 .button-input {
   width: 100px;
   border-radius: 25px;
   border: none;
   background-color: #ffac8e;
   color: white;
 }

 .name-input:focus {
   outline: none;
 }

  .button-input:focus {
    outline:none;
  }

  .button-input:hover {
    box-shadow: 0 5px 15px rgba(212, 208, 150, 0.8);
  }
</style>
