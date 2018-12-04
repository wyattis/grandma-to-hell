import CacheKeys from '../types/CacheKeys'
import NursingHome from '../game/NursingHome'

export default class Room0 extends NursingHome {
  constructor () {
    super({ key: 'Room0' })
    
    this.roomKey = 'Room0'
    this.roomFile = require('../levels/room-0.json')
    
  }
  
  create () {
    super.create()
  }
  
  preload () {
    this.load.tilemapTiledJSON(this.roomKey, this.roomFile)
    
    this.load.image(CacheKeys.env, require('../assets/grandmabgtiles.png'))
    this.load.spritesheet(CacheKeys.walker, require('../assets/walker.png'), {frameWidth: 27, frameHeight: 29})
    this.load.image(CacheKeys.wheelie, require('../assets/wheelie.png'))
    this.load.spritesheet(CacheKeys.wheelieMovin, require('../assets/wheeliemovin.png'), {frameWidth: 29, frameHeight: 27})
    this.load.spritesheet(CacheKeys.boomMa, require('../assets/boom-ma.png'), {frameWidth: 34, frameHeight: 31})
    this.load.spritesheet(CacheKeys.bigMaBounce, require('../assets/bigmabounce.png'), {frameWidth: 47, frameHeight: 37})
    this.load.spritesheet(CacheKeys.bigMaBall, require('../assets/bigmaball.png'), {frameWidth: 47, frameHeight: 37})
    this.load.spritesheet(CacheKeys.kid, require('../assets/kid.png'), {frameWidth: 38, frameHeight: 37})
    this.load.spritesheet(CacheKeys.fires, require('../assets/fires.png'), {frameWidth: 16, frameHeight: 16})
    this.load.spritesheet(CacheKeys.explosion, require('../assets/explosion.png'), {frameWidth: 42, frameHeight: 43})
    this.load.image(CacheKeys.ashes, require('../assets/ashes.png'))
  }
  
}