<template>
    <div class="flex flex-col items-center">
         <h1>Welcome to chat room #{{$route.params.id}}. {{shake}}</h1>
        
        <div ref="chatbox" class="flex flex-col  container items-start min-w-64 py-8 overflow-y-scroll" style="height: 50vh;">
            <div v-for="(message, ind) in chat" :key="ind" class="flex mt-2 shadow bg-white mx-4 md:mx-auto"><!--horizantil margin is just for display-->
            <div class="flex items-start px-2 py-4">
                <div class="h-12 w-12 my-auto rounded-full mx-2" :class="message.color"></div>
                <div class="">
                    <p class="mt-3 text-left text-gray-700 mr-6 w-64 text-md">
                        {{message.text}}
                    </p>
                    <div class="flex items-center justify-between">
                        <small class="text-sm text-gray-700">{{message.userid}}</small>
                    </div>
                    <div>
                        <p>{{message.time}}</p>
                    </div>
                </div>
            </div>
        </div>

            

        
        </div>

        <div @keyup.enter="addChat" class="flex mx-auto items-center justify-center shadow-lg mt-16 mx-8 mb-4 max-w-lg">
            <form class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
                    <div class="w-full flex items-center px-3 mb-2 mt-2">
                        <div class="h-10 w-12 my-auto rounded-full mx-6" :class="colorSelected"></div>

                        <textarea v-model="inputText" class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea>
                    </div>
                    <div class="w-full md:w-full flex items-start md:w-full px-3">
                        <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                        </div>
                        <div class="-mr-1">
                        <input type='submit' @click="addChat" class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Post Comment'>
                        </div>
                    </div>
                    </div>
                </form>
            </div>
        <!-- comment form -->
        
  </div>
</template>

<script>
var moment = require('moment');

export default {
    data() {
        return {
            inputText: '',
            messages: [],
        }
    },
    sockets: {
        connect: function () {
            console.log('socket connected')
            
        },
    },
    methods: {
        addMessage() {
            this.$store.commit('addMessage', {color: this.colorSelected, text: this.inputText, time: moment(), chatInd: this.$route.params.id})
            window.console.log('resetting input', this.inputText)
            this.inputText = ''
            window.console.log('resetting input', this.inputText)
            this.messages = this.chats[this.$route.params.id]

        },
        addChat() {
            this.$store.commit('addChat', {text: this.inputText, color: this.colorSelected, time: moment()})
            this.$socket.emit('sendChat', {text: this.inputText, color: this.colorSelected, time: moment()})
            this.inputText = ''
        },
    },
    computed: {
        colorSelected() {
            return this.$store.getters.getColorSelected
        },
        shake() {
            return this.$store.getters.getShake
        },
        chat() {
            return this.$store.getters.getChat
        },
        rooms(){
            return this.$store.getters.rooms
        }
    },
    watch: {
        chat() {
            let objDiv = this.$refs['chatbox']
            setTimeout(() => objDiv.scrollTop = objDiv.scrollHeight, 100)

        },
    },
    mounted() {
        console.log("shoes please")
        this.messages = []
        this.$socket.emit('switchRoom', String('Chat' + this.$route.params.id))
    },
}
</script>

<style>

</style>