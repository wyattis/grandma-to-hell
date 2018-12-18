import CacheKeys from '../types/CacheKeys'
import BaseGrandma from './BaseGrandma'
export const WheelieAnimKeys = {
  moving: 'wheelie-moving',
  sitting: 'wheelie-sitting'
}
export enum WheelchairStates {
  sitting,
  moving
}
export default class WheelchairGrandma extends BaseGrandma {

  private speed: number
  private state!: WheelchairStates

  constructor (scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, CacheKeys.wheelieMovin)
    scene.anims.create({
      key: WheelieAnimKeys.sitting,
      frames: [{ key: CacheKeys.wheelie, frame: 0 }],
      frameRate: 1
    })
    scene.anims.create({
      key: WheelieAnimKeys.moving,
      frames: scene.anims.generateFrameNumbers(CacheKeys.wheelieMovin, {start: 0, end: 8}),
      frameRate: 20,
      repeat: -1
    })
    this.speed = 50
    this.setSize(16, 23)
    this.body.offset.x -= 1
    this.body.offset.y -= 1
    this.setState(WheelchairStates.sitting)
  }

  setState (state: WheelchairStates) {
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
      this.setState(WheelchairStates.sitting)
      this.setVelocity(0, 0)
    } else {
      this.setState(WheelchairStates.moving)
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