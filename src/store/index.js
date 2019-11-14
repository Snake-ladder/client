import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/config/firebase'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [],
    player: {
      name: '',
      position: 1,
      image: 'https://image.flaticon.com/icons/svg/47/47058.svg'
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
    SET_POSITION (state, payload) {
      state.user.position = payload
    },
    SET_ROOMS (state, payload) {
      state.rooms = payload
    },
    CHANGE_POSITION (state, payload) {
     
      state.player.position = payload
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
    }
  },
  actions: {
    addPlayer ({ commit, state, dispatch }, payload) {
      console.log('payload====>', payload)
      return new Promise((resolve, reject) => {
        payload.position = 1
        db.collection('users')
          .add(payload)
          .then(doc => {
            localStorage.setItem('userId', doc.id)
            localStorage.setItem('userName', payload.name)
            dispatch('fetchRooms')
            resolve({
              id: doc.id,
              name: payload.name
            })
          })
          .catch(reject)
      })
    },
    getPlayerPosition ({ commit }) {
      let UserId = localStorage.getItem('userId')
      db.collection('users')
        .doc(UserId)
        .onSnapshot(doc => {
          commit('SET_POSITION', doc.data().position)
        })
    },
    fetchRooms ({ commit }) {
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
          commit('SET_ROOMS', result)
        })
    },
    fetchCurrentRoom ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        db.collection('rooms')
          .doc(payload)
          .onSnapshot(room => {
            let objRoom = room.data()
            resolve(objRoom)
          })
      })
    },
    createRoom ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        let data = {
          name: payload.roomName,
          players: [{
            id: localStorage.getItem('userId'),
            name: localStorage.getItem('userName')
          }],
          status: 'waiting'
        }
        db.collection('rooms')
          .add(data)
          .then(doc => {
            localStorage.setItem('currentRoom', doc.id)
            dispatch('fetchRooms')
            resolve({
              message: 'Successfull create room'
            })
          })
          .catch(reject)
      })
    },
    joinRoom ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        db.collection('rooms')
          .doc(payload)
          .get()
          .then(room => {
            let objRoom = room.data()
            let unique = true
            console.log(objRoom)
            if (objRoom.players.length >= 4 || objRoom.status !== 'waiting') {
              throw new Error('room unavailable')
            } else {
              objRoom.players.forEach(player => {
                if (player.id === localStorage.getItem('userId')) unique = false
              })
              if (unique) {
                objRoom.players.push({
                  id: localStorage.getItem('userId'),
                  name: localStorage.getItem('userName')
                })
              }
              localStorage.setItem('currentRoom', room.id)
              if (objRoom.players.length === 4) objRoom.status = 'playing'
              return db.collection('rooms').doc(payload).set(objRoom)
            }
          })
          .then(room => {
            dispatch('fetchRooms')
            resolve({
              message: 'Success join'
            })
          })
          .catch(reject)
      })
    }
  },
  modules: {
  }
})
