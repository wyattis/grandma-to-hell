import NursingHome from '../game/NursingHome'
import {Buttons} from "../config/InputMappings";
export default class Room4 extends NursingHome {
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
  
  preUpdate (timestamp: integer, delta: integer) {
    // @ts-ignore
    super.preUpdate(timestamp, delta)
    console.log('preupdate', this.player.body.x)
    if (this.io.buttons[Buttons.up].isDown) {
      return this.scene.start('Win')
    }
    
  }
}