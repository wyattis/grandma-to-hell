import CacheKeys from "../types/CacheKeys";
import BaseGrandma from "./BaseGrandma";
export const WheelieAnimKeys = {
  moving: 'wheelie-moving',
  sitting: 'wheelie-sitting'
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
    this.play(WheelieAnimKeys.sitting)
    this.setSize(16, 24)
  }

  setBrake (val) {
    this.setImmovable(val)
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta)
  }

}