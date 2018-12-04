import CacheKeys from "../types/CacheKeys"
import BaseGrandma from "./BaseGrandma"
export const FatAnimKeys = {
  standing: 'fat-standing',
  bouncing: 'fat-bouncing'
}
export default class FatGrandma extends BaseGrandma {
  constructor (scene, x, y) {
    super(scene, x, y)
    scene.anims.create({
      key: FatAnimKeys.bouncing,
      frames: scene.anims.generateFrameNumbers(CacheKeys.bigMaBounce, { start: 0, end: 11 }),
      frameRate: 15
    })
    scene.anims.create({
      key: FatAnimKeys.standing,
      frames: scene.anims.generateFrameNumbers(CacheKeys.bigMaBounce, { start: 0, end: 0 }),
      frameRate: 1,
      repeat: -1
    })
    this.on('animationcomplete', this.animationComplete, this)
    this.play(FatAnimKeys.standing)
    this.setSize(32, 30)
    this.body.offset.y += 1
  }

  animationComplete (animation) {
    if (animation.key === FatAnimKeys.bouncing) {
      this.play(FatAnimKeys.standing, true)
    }
  }

  bounce () {
    this.play(FatAnimKeys.bouncing)
  }
}