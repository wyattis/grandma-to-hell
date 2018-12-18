import Base from './Base'
import CACHE_KEYS from '../types/CacheKeys'
export default class BaseGrandma extends Base {

  public health: number = 50

  constructor (scene: Phaser.Scene, x: number, y: number, key: CACHE_KEYS) {
    super(scene, x, y, key)
    this.setCollideWorldBounds(true)
    this.body.onWorldBounds = true
    this.body.offset.x += 1
    this.body.offset.y += 1
  }

  flip () {
    this.body = <Phaser.Physics.Arcade.Body>this.body
    if (this.body.rotation === 0) {
      this.flipX = !this.flipX
    } else {
      this.flipY = !this.flipY
    }
  }

  public interact () {}

}