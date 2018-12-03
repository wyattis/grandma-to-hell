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
      frameRate: 15,
      repeat: -1
    })
    scene.anims.create({
      key: FatAnimKeys.standing,
      frames: scene.anims.generateFrameNumbers(CacheKeys.bigMaBounce, { start: 0, end: 0 }),
      frameRate: 1
    })
    this.play(FatAnimKeys.standing)
    this.setSize(32, 32)
  }
}