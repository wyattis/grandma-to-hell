import CacheKeys from "../types/CacheKeys"
import BaseGrandma from "./BaseGrandma"
import Direction from '../types/Direction'
const WalkerStates = {
  walking: 'walker-walking'
}
export default class WalkerGrandma extends BaseGrandma {
  constructor (scene, x, y) {
    super(scene, x, y)
    this.direction = Direction.RIGHT
    scene.anims.create({
      key: WalkerStates.walking,
      frames: scene.anims.generateFrameNumbers(CacheKeys.walker, { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1
    })
    this.play(WalkerStates.walking)
    this.setSize(16, 24)
  }

  preUpdate (...args) {
    super.preUpdate(...args)
    if (this.isBeingCarried) return
    if (this.canStep && this.anims.currentFrame.textureFrame === 0) {
      this.canStep = false
      if (this.direction === Direction.RIGHT) {
        if (this.body.blocked.right || this.body.touching.right) {
          this.direction = Direction.LEFT
        } else {
          this.x += 1
        }
      } else {
        if (this.body.blocked.left || this.body.touching.left) {
          this.direction = Direction.RIGHT
        } else {
          this.x -= 1
        }
      }
    } else if (this.anims.currentFrame.textureFrame !== 0) {
      this.canStep = true
    }
  }
}