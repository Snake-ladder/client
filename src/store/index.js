import Vue from 'vue'
import Vuex from 'vuex'
import { User, Room } from '../api/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      position: 1,
      icon: ''
    },
    room: {
      players: [],
      name: '',
      status: ''
    },
    rooms: [],

  },
  mutations: {
    SET_ROOMS (state, payload) {
      state.rooms = payload
    },
    SET_ROOM (state, payload) {
      state.room = payload
    },
    SET_USER (state, payload) {
      state.user = payload
    }
  },
  actions: {
  }
})
