<template>
<div class="lobby">
    <div class="d-flex px-5 p-3 align-items-center">
      <div>
        <h1>LOBBY LIST</h1>
      </div>
      <div class="ml-auto">
         <button class="custom-btn" data-toggle="modal" data-target="#addRoom">Add</button>
      </div>
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
                <tr class="table-row" v-for="room in dummyRooms" :key="room.id" @click="joinRoom(room.id)">
                    <td>{{ room.name }}</td>
                    <td>{{ room.players.length }} / 4</td>
                    <td>{{ room.status }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addRoom" tabindex="-1" role="dialog" aria-labelledby="addRoom" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Create Room</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="addRoom(name)">
                        <input autofocus type="text" name="name" v-model="name" placeholder="Enter Room Name" class="p-2">
                        <!-- <button type="submit">Create</button> -->
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Create</button>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
<<<<<<< HEAD
  name: 'lobby',
  data () {
    return {
      name: '',
      dummyRooms: []
    }
  },
  computed: mapState({
    allRooms: 'rooms'
  }),
  methods: {
    ...mapActions([
      'getRooms',
      'addRoom'
    ]),
    setDummyRooms () {
      let arr = [
        {
          id: 1,
          name: 'room 1',
          status: 'PLAYING',
          players: [
            {
              name: 'asd'
            },
            {
              name: 'zxc'
            }
          ]
        },
        {
          id: 2,
          name: 'room 2',
          status: 'WAITING',
          players: [
            {
              name: 'asd'
            },
            {
              name: 'zxc'
            }
          ]
        },
        {
          id: 3,
          name: 'room 3',
          status: 'PLAYING',
          players: [
            {
              name: 'asd'
            },
            {
              name: 'zxc'
            }
          ]
        }
      ]
      this.dummyRooms = arr
    },
    joinRoom (id) {
    //   console.log(id)
      this.$router.push('/waiting')
    //   this.$router.push(`/${id}`)
    }
  },
  created () {
    this.setDummyRooms()
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

.modal-content {
    background-color: rgba(30, 62, 104, 0.8)
}

</style>
=======
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
>>>>>>> stash
