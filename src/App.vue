<template>
  <div id="app">
    <div id="nav">
      <div class="flex justify-center w-full">
        <router-link to="/">Home</router-link> |
        <router-link v-for="(chat,ind) in rooms.slice(1)" :key="ind" :to="'/Chat/' + (ind+1)">Chat {{ind+1}}</router-link> 
      </div>
      <p @click="newRoom()" class="ml-1 text-red-500 hover:underline cursor-pointer">+ Make a new chat</p>

      
      <div class="flex justify-around w-64 ml-auto mr-6">

        <div class="w-6 h-6 rounded-full cursor-pointer relative" @click="changeColor(col)" v-for="(col, ind) in colors" :key="ind" :class="col">
          <div class="h-full w-full absolute bg-transparent rounded-full border border-black"  v-if="colorSelected==col">

          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    computed: {
      colors() {
        return this.$store.getters.getColors
      },
      colorSelected() {
        return this.$store.getters.getColorSelected
      },
      room() {
        return this.$store.getters.getRoom
      },
      rooms() {
        return this.$store.getters.getRooms
      },
    },
    methods: {
      changeColor(val) {
        this.$store.commit('changeColor', val)
      },
      changeRoom(newroom) {
        console.log("Room changes to: " + newroom)
        console.log("Rooms is: " + this.rooms)
        // console.log(this.rooms[newroom])
        this.$socket.emit('switchRoom', this.rooms[newroom])
      },
      newRoom(){
        this.$socket.emit('switchRoom', String("Chat"+this.rooms.length))
      }
    },
    created() {     
      // this.$store.commit('setUserID', Math.floor(Math.random() * 10000) + 1  )
      this.$socket.emit('USERINFO',String(Math.floor(Math.random() * 10000) + 1))
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
