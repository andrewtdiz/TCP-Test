import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userID: 0,
    chat: [],
    studyRooms: [
      [],
      [],
      [],
      []
    ],
    colorSelected: 'bg-gray-500',
    colors: ['bg-gray-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-red-500' ],
    
    // Socket data
    connected: false,
    currentUsers: 'Johhny',
    room: 'Home',
    rooms: ['Home','chat1']
  },
  getters: {
    getRoom(state) {
      return state.room
    },
    getRooms(state) {
      return state.rooms
    },
    getShake(state) {
      return state.shake
    },
    getColors(state) {
      return state.colors
    }, 
    studyRooms(state) {
      return state.studyRooms
    },
    getChat(state) {
      return state.chat
    },
    getChats(state) {
      return state.chats
    } ,
    getUserID(state) {
      return state.userID
    },
    getColorSelected(state) {
      return state.colorSelected
    },
  },
  mutations: {
    addChat(state, val) {
      // Server stuff goes here
    },
    changeColor(state, val) {
      state.colorSelected = val
    },
    changeUserRoomStatus(state, {room, status, userid}) {
      for(let i=0; i< state.studyRooms[room].length; i++) {
        if(state.studyRooms[room][i].userid == userid) { 
          state.studyRooms[room][i].status = status
        }
      }
    },
    addUserToStudy(state, { room, status, userid, color}) {
      state.studyRooms[room].push(
        {userid, status, color}
      )
    },
    setUserID(state, val) {
      state.userID = val
    },
    addMessage(state, {color, text, time, chatInd}) {
      state.chats[chatInd].push({
        color, text, time, userid: state.userID
      })
    },

    // Socket handlers
    SOCKET_CONNECT(state){
      state.connected = true
    },
    SOCKET_DISCONNECT(state){
      state.connected = false
    },
    SOCKET_updaterooms(state,rooms){
      console.log("Current rooms: " + rooms)
      state.rooms = rooms
    },
    SOCKET_updatechat(state,data){
      console.log("Data is: " + data)
      state.chat.push(data)
      // state.shake = message
    },
    SOCKET_USERINFO(state,username){
      state.userID = username
    },
  },
  actions: {
  },
  modules: {
  }
})
