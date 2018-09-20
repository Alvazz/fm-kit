<template>
  <div>
    <div class="card" v-for="(room, index) in roomData">
      <div class="card-content_">
        <div class="config-room" :class="['rph-' + (index+1)]">
          <div class="config-room__header">
            <strong>{{ $tc("order.room", 1) }} {{index+1}}</strong>
            <a class="remove-room" v-show="index !== 0" :data-rph="room.rph" @click="removeRoom(room.rph)"><small>Remove</small></a>
          </div>
          <div class="config-room__item">
            <div>
              <div class="config-room__type">Adults</div>
              <small>18+ years</small>
            </div>
            <div class="spinner-box">
              <a class="button is-rounded is-small spinner-minus" :disabled="room.adults === 1">
              <span class="icon is-small" @click="removeAdult(room.rph)">
                <i class="fa fa-minus"></i>
              </span>
            </a>
              <span class="spinner-total">{{room.adults}}</span>
              <a class="button is-rounded is-small spinner-plus" :disabled="room.adults >= 8">
              <span class="icon is-small" @click="addAdult(room.rph)">
                <i class="fa fa-plus"></i>
              </span>
            </a>
            </div>
          </div>
          <div class="config-room__item">
            <div>
              <div class="config-room__type">Children</div>
              <small>Under 18 years</small>
            </div>
            <div class="spinner-box">
              <a class="button is-rounded is-small spinner-minus " :disabled="room.children.length === 0">
              <span class="icon is-small" @click="removeChild(room.rph)">
                <i class="fa fa-minus"></i>
              </span>
            </a>
              <span class="spinner-total">{{room.children.length}}</span>
              <a class="button is-rounded is-small spinner-plus" :disabled="room.children.length >= 3">
              <span class="icon is-small" @click="addChild(room.rph)">
                <i class="fa fa-plus"></i>
              </span>
            </a>
            </div>
          </div>
          <div class="config-room__age">
            <div v-show="room.children.length > 0">Age of children</div>
            <div class="config-room__age__select-group">
              <div class="select is-small" v-for="i in room.children.length">
                <select @change="addAge(room.rph, i+1, $event.target.value)">
                  <option v-for="i in ageMax" :value="i-1">{{i-1}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr/>
    <a class="button is-primary is-fullwidth add-room" @click="addRoom()">
      <span class="icon">
        <i class="fa fa-plus"></i>
      </span>
      <span>Add Room</span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    rooms: {
      type: Array
    }
  },
  data() {
    return {
      ageMax: 18,
      age: 0,
      roomData: this.rooms
    }
  },
  mounted() {},
  methods: {
    addRoom() {
      const rph = this.roomData.length + 1
      this.roomData.push({ rph: rph, adults: 1, children: [] })
    },
    removeRoom(rph) {
      this.roomData = this.roomData.filter(item => {
        return item.rph !== rph
      })
    },
    addAdult(rph) {
      const currentRoom = this.roomData.filter(item => {
        return item.rph === rph
      })
      if (currentRoom[0].adults < 8) {
        currentRoom[0].adults = currentRoom[0].adults + 1
      }
    },
    removeAdult(rph) {
      const currentRoom = this.roomData.filter(item => {
        return item.rph === rph
      })
      if (currentRoom[0].adults > 1) {
        currentRoom[0].adults = currentRoom[0].adults - 1
      }
    },
    addChild(rph) {
      this.age = 0
      const currentRoom = this.roomData.filter(item => {
        return item.rph === rph
      })
      const count = currentRoom[0].children.length
      if (count < 3) {
        currentRoom[0].children.push({ id: count+1, age: 0 })
      }
    },
    removeChild(rph) {
      console.log(rph)
      const currentRoom = this.roomData.filter(item => {
        return item.rph === rph
      })
      const count = currentRoom[0].children.length
      currentRoom[0].children = currentRoom[0].children.filter(item => {
        return item.id !== count
      })
    },
    addAge(rph, index, value) {
      const currentRoom = this.roomData.filter(item => {
        return item.rph === rph
      })

      const currentChild = currentRoom[0].children.filter(item => {
        return item.id === index-1
      })
      currentChild[0].age = value
    }
  }
}
</script>

<style scoped>
.card .card-content {
  min-height: 70px;
}

.config-room {
  padding: 10px;
}

.config-room:last-child {
}

.config-room__header {
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
  padding-bottom: 3px;
}

.config-room__item {
  display: flex;
  justify-content: space-between;
}

.config-room__type {
  font-weight: bold;
  line-height: 10px;
  padding-top: 10px;
}

.config-room__age {
  padding-top: 3px;
}

.config-room__age__select-group {
  display: flex;
  justify-content: start;
  padding-top: 5px;
}

.config-room__age__select-group .select {
  width: 33%;
}
.config-room__age__select-group .select select {
  width: 100%;
}

.config-room__age__select-group .select {
  margin-right: 10px;
}

.config-room__age__select-group .select:last-child {
  margin-right: 0px;
}

.spinner-box {
  margin: 5px 0;
}

.spinner-total {
  font-size: 14px;
  font-weight: bold;
  padding: 0 5px;
}
</style>
