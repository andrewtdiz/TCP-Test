<template>
  <div class="home flex flex-col items-center">
    <p v-if="!isEditing" @mousedown="startEditing" class="text-5xl text-red-500">{{inputText}}</p>
    <input v-else type="text" v-model="inputText" class="text-5xl appearance-none outline-none rounded text-red-500">
    <div v-if="isEditing" class="flex">
      <button @click="sendText" class="bg-green-500 text-white border border-red-700 px-4 py-2">Send</button>
      <button @click="cancelEdit" class="text-gray-800 rounded border border-gray-300 px-4 py-2">Cancel</button>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      isEditing: false,
      inputText: 'Hi',
      inputHold: '',
    }
  },
  methods: {
    startEditing() {
      this.isEditing = true
      this.inputHold = this.inputText
    },
    sendText() {
      this.isEditing = false
      // Do server stuff here 
      this.$socket.emit('USERINFO',this.inputText)
    },
    cancelEdit() {
      this.inputText = this.inputHold
      this.isEditing = false
    },

  },
  components: {
  },
    mounted() {
        this.$socket.emit('switchRoom', 'Home')
    },
  
}
</script>
