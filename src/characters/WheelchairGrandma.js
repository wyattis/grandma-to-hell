import Base from './Base'
import CacheKeys from "../types/CacheKeys";
export const WheelieAnimKeys = {
  moving: 'wheelie-moving',
  sitting: 'wheelie-sitting'
}
export default class WheelchairGrandma extends Base {

  constructor (scene, x, y) {
    super(scene, x, y)
    scene.anims.create({
      key: WheelieAnimKeys.sitting,
      frames: [{ key: CacheKeys.wheelie }],
      frameRate: 1
    })
    scene.anims.create({
      key: WheelieAnimKeys.moving,
      frames: [{key: CacheKeys.wheelieMovin}]
    })
    this.play(WheelieAnimKeys.sitting)
    this.setSize(16, 24)
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta)
  }

}