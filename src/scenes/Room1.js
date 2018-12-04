import NursingHome from '../game/NursingHome'
export default class Room1 extends NursingHome {
  constructor () {
    super({
      key: 'Room1'
    })
    
    this.roomKey = 'Room1'
    this.roomFile = require('../levels/room-1.json')
  }
  
  preload () {
    this.load.tilemapTiledJSON(this.roomKey, this.roomFile)
  }
}