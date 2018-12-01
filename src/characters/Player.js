import Base from './Base'
import CacheKeys from "../types/CacheKeys";

export const PlayerAnimKeys = {
  standing: 'standing',
  jumping: 'jumping',
  throwing: 'throwing',
  running: 'running'
}

export default class Player extends Base {
  constructor (scene, x, y) {
    super(scene, x, y)
    // Config
    this.groundAcc = 2000
    this.body.maxVelocity.x = 400
    // this.body.maxVelocity.y = 100
    scene.anims.create({
      key: PlayerAnimKeys.standing,
      frames: scene.anims.generateFrameNumbers(CacheKeys.grandmas, { start: 0, end: 0 }),
      frameRate: 1
    })
    this.play(PlayerAnimKeys.standing)
    this.setSize(16, 16);
  }

  right () {
    this.setAccelerationX(this.groundAcc)
  }

  left () {
    this.setAccelerationX(-this.groundAcc)
  }
}