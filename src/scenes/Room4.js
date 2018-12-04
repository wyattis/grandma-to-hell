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
    const painting = this.add.zone(16 * config.tileSize, 11 * config.tileSize).setSize(48, 32).setOrigin(0)
    window.painting = painting
    this.physics.world.enable(painting)
    this.physics.overlap(this.grandmas, painting, function (s1, s2) {
      this.scene.start('Win')
    })
  }
}