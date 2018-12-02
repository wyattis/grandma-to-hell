
import CacheKeys from "../types/CacheKeys"
import BaseGrandma from "./BaseGrandma"
export default class FatGrandma extends BaseGrandma {
  constructor (scene, x, y) {
    super(scene, x, y)
    scene.anims.create({
      key: 'fat-sitting',
      frames: scene.anims.generateFrameNumbers(CacheKeys.grandmas, { start: 3, end: 4 }),
      frameRate: .2,
      repeat: -1
    })
    this.play('fat-sitting')
    // this.setSize(32, 50)
  }
}