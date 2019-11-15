import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/config/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: []
  },
  mutations: {
    setRooms (state, payload) {
      state.rooms = payload
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
    addRoom ({ commit, dispatch }, payload) {
      let data = {
        name: payload
      }
      db.collection('rooms')
        .add(data)
        .then(doc => {
          localStorage.setItem('currentRoom', doc.id)
          dispatch('getRooms')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
