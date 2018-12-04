import NursingHome from '../game/NursingHome'
export default class Room3 extends NursingHome {
  constructor () {
    super({
      key: 'Room3'
    })
    
    this.roomKey = 'Room3'
    this.roomFile = require('../levels/room-3.json')
  }
  
  preload () {
    this.load.tilemapTiledJSON(this.roomKey, this.roomFile)
  }
}