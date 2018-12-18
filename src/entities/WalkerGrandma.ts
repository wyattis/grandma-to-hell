import BaseGrandma from './BaseGrandma'
import CacheKeys from '../types/CacheKeys'
const WalkerStates = {
  walking: 'walker-walking'
}
export default class WalkerGrandma extends BaseGrandma {
  private canStep: boolean = false
  constructor (scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, CacheKeys.walker)
    scene.anims.create({
      key: WalkerStates.walking,
      frames: scene.anims.generateFrameNumbers(CacheKeys.walker, { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1
    })
    this.play(WalkerStates.walking)
    this.setSize(16, 18)
    this.body.offset.y += 5
    this.body.offset.x += 1
  }

  preUpdate (timestamp: number, delta: number) {
    super.preUpdate(timestamp, delta)
    if (this.isBeingCarried) return
    if (this.canStep && this.anims.currentFrame.textureFrame === 0) {
      this.canStep = false
      if (!this.flipX) {
        if (this.body.blocked.right || this.body.touching.right) {
          this.flipX = true
        } else {
          this.x += 1
          this.body.x += 1
        }
      } else {
        if (this.body.blocked.left || this.body.touching.left) {
          this.flipX = false
        } else {
          this.x -= 1
          this.body.x -= 1
        }
      }
    } else if (this.anims.currentFrame.textureFrame !== 0) {
      this.canStep = true
    }
  }
}