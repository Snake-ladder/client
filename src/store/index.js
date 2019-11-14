import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/config/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [],
    newRoom: ''
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
    addRoom ({ commit }) {
      let data = {}
      db.collection('rooms').set(data);
    },
    addUser ({commit}, payload) {
      
    }
  }
})
