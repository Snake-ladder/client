import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/config/firebase.js'
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
        end:4
      },
      {
        start: 99,
        end: 88
      },
      {
        start: 71,
        end: 54
      }
    ],
    ladder: [
      {
        start: 25,
        end: 40
      },
      {
        start: 33,
        end: 48
      },
      {
        start: 9,
        end: 27
      },
      {
        start: 16,
        end: 21
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
      while (state.player.position !== newPosition) {
        state.player.position+=1
        this.CHANGE_POSITION(this, state.player.position)
      }
      if (newPosition === 100) {
        state.isWinner = true
        Swal.fire('success', 'you win', 'success')
      } else if (newPosition > 100) {
        newPosition = (100 - (newPosition - 100))
      } 
      state.ladder.forEach(el => {
        if(newPosition === el.start){
          newPosition = el.end
        }
      })
      state.obstacles.forEach(el => {
        if(newPosition === el.start){
          newPosition = el.end
        }
      })
      state.player.position = newPosition
    },
    SET_OBSTACLE (state) {

      state.obstacle = randomPos
      console.log(state.obstacle,'-----------');
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
      db.collection('rooms').set(data);
    },
    addUser ({commit}, payload) {

    }
  }
})
