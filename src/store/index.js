import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chats: 
    [
      [],
      [],
      [],
      []
    ],
    colorSelected: 'bg-gray-500',
    colors: ['bg-gray-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-red-500' ]
  },
  getters: {
    getColors(state) {
      return state.colors
    }, 
    getChats(state) {
      return state.chats
    } ,
    getColorSelected(state) {
      return state.colorSelected
    },
  },
  mutations: {
    changeColor(state, val) {
      state.colorSelected = val
    },
    addMessage(state, {color, text, time, chatInd}) {
      window.console.log(color, text, 'here i am')
      state.chats[chatInd].push({
        color, text, time
      })
    },
  },
  actions: {
  },
  modules: {
  }
})
