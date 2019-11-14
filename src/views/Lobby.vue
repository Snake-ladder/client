<template>
    <form>
        <label for="roomName">Room name: </label>
        <input type="text" name="roomName" v-model="roomName">
        <button type="submit">Create</button>
    </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data () {
        return {
            roomName: ''
        }
    },
    computed: mapState({
        roomName: state => state.newRoom,

    })
}
</script>

<style>

</style>