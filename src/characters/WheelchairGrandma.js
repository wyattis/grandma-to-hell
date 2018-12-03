import CacheKeys from "../types/CacheKeys";
import BaseGrandma from "./BaseGrandma";
export const WheelieAnimKeys = {
  moving: 'wheelie-moving',
  sitting: 'wheelie-sitting'
}
export const WheelchairStates = {
  sitting: 0,
  moving: 1
}
export default class WheelchairGrandma extends BaseGrandma {

  constructor (scene, x, y) {
    super(scene, x, y)
    scene.anims.create({
      key: WheelieAnimKeys.sitting,
      frames: [{ key: CacheKeys.wheelie }],
      frameRate: 1
    })
    scene.anims.create({
      key: WheelieAnimKeys.moving,
      frames: [{key: CacheKeys.wheelieMovin}],
      frameRate: 20,
      repeat: -1
    })
    this.speed = 300
    this.setSize(16, 24)
    this.setState(WheelchairStates.sitting)
  }

  setState (state) {
    this.state = state
    switch (state) {
      case WheelchairStates.moving:
        return this.play(WheelieAnimKeys.moving, true)
      default:
        return this.play(WheelieAnimKeys.sitting, true)
    }
  }

  interact () {
    if (this.state === WheelchairStates.moving) {
      this.setVelocity(0, 0)
    } else {
      if (this.flipX) {
        this.setVelocityX(-this.speed)
      } else {
        this.setVelocityX(this.speed)
      }
    }
  }

  // preUpdate (time, delta) {
  //   super.preUpdate(time, delta)
  // }

}