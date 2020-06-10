<template>
    <div class="flex flex-col items-center overflow-y-scroll" style="max-height: 100vh;">
         <h1>Welcome to study room #{{$route.params.id}}</h1>
        
        <div v-if="$route.params.id<4" class="flex flex-col  container items-center min-w-64">
            <div v-for="(user, ind) in studyRooms[$route.params.id]" :key="ind" class="flex mt-2 shadow bg-white mx-4 md:mx-auto"><!--horizantil margin is just for display-->
                <div class="h-12 w-12 my-auto rounded-full mx-2" :class="user.color"></div>
                <div class="w-64 h-8 my-auto" :class="statuses[user.status]"></div>
            </div>

            <div class="w-64 h-64" @click="changeStatus" :class="statuses[status]">

            </div>

        </div>
        <!-- comment form -->
        <div v-else>
            <p class="text-4xl">No study Room found for ID</p>
        </div>
        
  </div>
</template>

<script>
var moment = require('moment');

export default {
    data() {
        return {
            status: 0,
            statuses: ['bg-gray-500', 'bg-blue-500', 'bg-green-500'],
        }
    },
    methods: {
        changeStatus() {
            if(this.status<2) this.status++
            else this.status = 0
            this.$store.commit('changeUserRoomStatus', {room: this.$route.params.id, userid: this.getUserID, status: this.status})
        },
    },
    computed: {
        colorSelected() {
            return this.$store.getters.getColorSelected
        },
        studyRooms() {
            return this.$store.getters.studyRooms
        },
        getUserID() {
            return this.$store.getters.getUserID
        },
    },
    created() {
        this.$store.commit('addUserToStudy', {color: this.colorSelected, room: this.$route.params.id, userid: this.getUserID, status: this.status})
    },
}
</script>

<style>

</style>