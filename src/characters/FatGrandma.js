import Base from './Base'
import CacheKeys from "../types/CacheKeys";
export default class FatGrandma extends Base {
  constructor (scene, x, y) {
    super(scene, x, y)
    scene.anims.create({
      key: 'fat-sitting',
      frames: scene.anims.generateFrameNumbers(CacheKeys.grandmas, { start: 3, end: 4 }),
      frameRate: 20
    })
    this.play('fat-sitting')
    this.setSize(32, 50)
  }
}