
import CacheKeys from "../types/CacheKeys";
import BaseGrandma from "./BaseGrandma";
export const OxygenAnimKeys = {
  sitting: 'oxygen-sitting',
  smoking: 'oxygen-smoking'
}
export const OxygenState = {
  sitting: 0,
  smoking: 1
}
export default class OxygenGrandma extends BaseGrandma {
  constructor (scene, x, y) {
    super(scene, x, y, CacheKeys.boomMa)
    scene.anims.create({
      key: OxygenAnimKeys.sitting,
      frames: scene.anims.generateFrameNumbers(CacheKeys.boomMa, {start: 0, end: 12}),
      frameRate: 7,
      repeat: -1
    })
    scene.anims.create({
      key: OxygenAnimKeys.smoking,
      frames: scene.anims.generateFrameNumbers(CacheKeys.boomMa, {start: 5, end: 5}).concat(scene.anims.generateFrameNumbers(CacheKeys.boomMa, {start: 0, end: 0})),
      frameRate: 7,
      repeat: -1
    })
    this.setState(OxygenState.sitting)
  }

  setState (state) {
    switch (state) {
      case OxygenState.smoking:
        return this.play(OxygenAnimKeys.smoking)
      default:
        return this.play(OxygenAnimKeys.sitting)
    }
  }

  interact () {

  }
}