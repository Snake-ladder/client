import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player: {
      position: 1,
      image: 'https://image.flaticon.com/icons/svg/47/47058.svg'
    },
    isWinner: false,
    obstacles: [
      {
        start: 29,
        end: 18
      },
      {
        start:31,
        end: 4
      },
      {
        start:99,
        end: 88
      },
      {
        start: 71,
        end: 54
      }
    ]
  },
  mutations: {
    CHANGE_POSITION (state, payload) {
      state.player.position = payload
    },
    ROLE_DICE (state) {
      let randomNum = Math.floor(Math.random() * 13)
      let newPosition = state.player.position += randomNum
      if (newPosition === 100) {
        state.isWinner = true
        Swal.fire('success', 'you win', 'success')
      } else if (newPosition < 100) {
        state.player.position = newPosition
      } else {
        state.player.position = (100 - (newPosition - 100))
      }
    },
    GET_OBSTACLE (state,payload) {
      state.player.position = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
