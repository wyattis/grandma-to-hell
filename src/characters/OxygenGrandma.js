import Base from './Base'
import CacheKeys from "../types/CacheKeys";
export const OxygenAnimKeys = {
  sitting: 'oxygen-sitting',
  moving: 'oxygen-moving'
}
export default class OxygenGrandma extends Base {
  constructor (scene, x, y) {
    super(scene, x, y)
    scene.anims.create({
      key: OxygenAnimKeys.sitting,
      frames: scene.anims.generateFrameNumbers(CacheKeys.boomMa, {start: 0, end: 8}),
      frameRate: 20
    })
    this.play(OxygenAnimKeys.sitting)
  }
}