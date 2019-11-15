import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/config/firebase.js'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    turn: null,
    player1:
      {
        id: 1,
        position: 1,
        image: 'https://image.flaticon.com/icons/svg/47/47058.svg'
      },
    player2: 
      {
        id: 2,
        position: 1,
        image: 'https://image.flaticon.com/icons/svg/47/47150.svg' 
      },
    isWinner: false,
    obstacles: [
      {
        start: 29,
        end: 6
      },
      {
        start: 60,
        end: 37
      },
      {
        start: 99,
        end: 63
      },
      {
        start: 71,
        end: 53
      }
    ],
    ladder: [
      {
        start: 47,
        end: 66
      },
      {
        start: 64,
        end: 95
      },
      {
        start: 10,
        end: 31
      },
      {
        start: 16,
        end: 36
      }
    ]
  },
  mutations: {
    CHANGE_POSITION (state, payload) {
      state.player.position = payload
    },
    CHANGE_TURN (state, payload) {
      state.turn = payload
    },
    ROLE_DICE (state, payload) {
      // let randomNum = Math.floor(Math.random() * 13)
      console.log(payload, 'payyyyyy')
      console.log(state.player.position, ':0')
      
      let newPosition = state.player.position += Number(payload)
      console.log(newPosition, '---------')

      // while (state.player.position !== newPosition) {
      //   state.player.position += 1
      //   this.CHANGE_POSITION(this, state.player.position)
      // }

      if (newPosition === 100) {
        state.isWinner = true
        Swal.fire('success', 'you win', 'success')
      } else if (newPosition > 100) {
        newPosition = (100 - (newPosition - 100))
      }
      state.ladder.forEach(el => {
        if (newPosition === el.start) {
          newPosition = el.end
        }
      })
      state.obstacles.forEach(el => {
        if (newPosition === el.start) {
          newPosition = el.end
        }
      })
      state.player.position = newPosition
    },
    GET_OBSTACLE (state, payload) {
      state.player.position = payload
    }
  },
  actions: {
    getRooms ({ commit }) {
      db.collection('rooms')
        .onSnapshot(querySnapshot => {
          let result = []
          querySnapshot.forEach(doc => {
            let room = {
              id: doc.id,
              ...doc.data()
            }
            result.push(room)
          })
          commit('setRooms', result)
        })
    },
    addRoom ({ commit }) {
      let data = {}
      db.collection('rooms').set(data)
    },
    addUser ({ commit }, payload) {

    }
  }
})
