import NursingHome from '../game/NursingHome'
import config from '../config'
export default class Room3 extends NursingHome {
  constructor () {
    super({
      key: 'Room4'
    })
    
    this.roomKey = 'Room4'
    this.roomFile = require('../levels/room-4.json')
  }
  
  preload () {
    this.load.tilemapTiledJSON(this.roomKey, this.roomFile)
  }
  
  create () {
    super.create()
    this.player.interact = () => {
      this.scene.start('Win')
    }
    this.player.lift = () => {
      this.scene.start('Win')
    }
  }
  
  preUpdate (...args) {
    super.preUpdate(...args)
    console.log('preupdate', this.player.body.x)
    if (this.W.isDown) {
      return this.scene.start('Win')
    }
    
  }
}