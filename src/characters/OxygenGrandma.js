
import CacheKeys from "../types/CacheKeys";
import BaseGrandma from "./BaseGrandma";
export const OxygenAnimKeys = {
  sitting: 'oxygen-sitting',
  moving: 'oxygen-moving'
}
export default class OxygenGrandma extends BaseGrandma {
  constructor (scene, x, y) {
    super(scene, x, y, CacheKeys.boomMa)
    scene.anims.create({
      key: OxygenAnimKeys.sitting,
      frames: scene.anims.generateFrameNumbers(CacheKeys.boomMa, {start: 0, end: 8}),
      frameRate: 7,
      repeat: -1
    })
    this.play(OxygenAnimKeys.sitting)
  }
}