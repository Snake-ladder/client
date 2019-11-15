<template>
<div class="lobby">
    <div class="d-flex px-5 p-3 align-items-center">
      <div>
        <h1>LOBBY LIST</h1>
      </div>
      <div class="ml-auto">
         <button class="custom-btn" data-toggle="modal" data-target="#myModal">Add</button>
      </div>
    </div>

    <div class="spinner-border" role="status" v-if="listRoom.length == 0 || joiningRoom">
      <span class="sr-only">Loading...</span>
    </div>

    <div class="room-list d-flex justify-content-around px-5">
        <table class="table table-borderless">
            <thead>
                <tr class="table-header">
                    <th scope="col">ROOM NAME</th>
                    <th scope="col">PLAYERS</th>
                    <th scope="col">STATUS</th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-row" v-for="room in listRoom" :key="room.id" @click="joinRoom(room.id)">
                    <td>{{ room.name }}</td>
                    <td>{{ room.players.length }} / 4</td>
                    <td>{{ room.status }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="addRoom" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Create Room</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitRoom" class="d-flex justify-content-space-between">
                        <input required autofocus type="text" name="name" v-model="roomName" placeholder="Enter Room Name" class="p-2 input-modal">
                        <input type="submit" class="p-2 btn btn-light createRoomBtn" value="Create"></input>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'lobby',
  data () {
    return {
      name: '',
      roomName: '',
      joiningRoom: false
    }
  },
  computed: {
    listRoom () {
      return this.$store.state.rooms
    }
  },
  methods: {
    submitRoom () {
      $('#myModal').modal('toggle');
      this.$store
        .dispatch('createRoom', {
          roomName: this.roomName
        })
        .then(result => {
          this.$router.push(`/waiting/${localStorage.getItem('currentRoom')}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    joinRoom (id) {
      this.$store
        .dispatch('joinRoom', id)
        .then(result => {
          this.joiningRoom = true;
          this.$router.push(`/waiting/${localStorage.getItem('currentRoom')}`)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.$store.dispatch('fetchRooms')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');
.lobby {
    font-family: 'Open Sans Condensed', sans-serif;
    height: 100vh;
    background-image: url('https://www.coopermaloy.com.au/wp-content/uploads/2019/03/cooper-maloy-background.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
    overflow: auto;
}

.table-header {
    background-color: black;
}

.table {
    background-color: rgba(0,0,0,0.2);
    color: white;
}

.table-row:hover {
    color: #43a0bd;
    text-shadow:0px 0px 30px #43a0bd;
}

.custom-btn {
    padding: 6px;
    width: 100px;
    color: white;
    background-color: black;
    border: none;
}

.custom-btn:hover {
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 5px 15px #43a0bd;
}

.custom-btn:focus {
  outline: none;
}

.modal-content {
    background-color: rgba(30, 62, 104, 0.8)
}
.spinner-border {
  position: absolute;
  top: 30%;
  left: 50%;
}

.input-modal {
  width: 200px;
}

.input-modal:focus {
  outline: none;
}

.createRoomBtn {
  border-radius: 0;
}
</style>
