import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/config/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      position: 0
    },
    rooms: []
  },
  mutations: {
    SET_POSITION (state, payload) {
      state.user.position = payload
    },
    SET_ROOMS (state, payload) {
      state.rooms = payload
    }
  },
  actions: {
    addPlayer ({ commit, state, dispatch }, payload) {
      console.log('payload====>', payload)
      return new Promise((resolve, reject) => {
        payload.position = 0
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
