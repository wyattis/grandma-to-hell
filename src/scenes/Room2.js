import NursingHome from '../game/NursingHome'
export default class Room2 extends NursingHome {
  constructor () {
    super({
      key: 'Room2'
    })
    
    this.roomKey = 'Room2'
    this.roomFile = require('../levels/room-2.json')
  }
  
  preload () {
    this.load.tilemapTiledJSON(this.roomKey, this.roomFile)
  }
}