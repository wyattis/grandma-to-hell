import Base from './Base'
import CacheKeys from "../types/CacheKeys";

export const PlayerAnimKeys = {
  standing: 'standing',
  jumping: 'jumping',
  throwing: 'throwing',
  running: 'running',
  holding: 'holding'
}

export default class Player extends Base {
  constructor (scene, x, y) {
    super(scene, x, y)
    // Config
    this.groundAcc = 1000
    this.jumpSpeed = 250
    this.airDrag = 100
    this.groundDrag = 300
    // this.body.maxVelocity.x = 200
    scene.anims.create({
      key: PlayerAnimKeys.standing,
      frames: scene.anims.generateFrameNumbers(CacheKeys.kid, { start: 0, end: 0 }),
      frameRate: 1
    })
    scene.anims.create({
      key: PlayerAnimKeys.holding,
      frames: scene.anims.generateFrameNumbers(CacheKeys.kid, {start: 1, end: 1}),
      frameRate: 1
    })
    this.play(PlayerAnimKeys.standing)
    // this.setSize(19, 26)
    // this.setDragX(300)
  }

  // preUpdate () {
  //   console.log(this.body.blocked.down, this.body.touching.down)
  //   if (this.body.blocked.right || this.body.blocked.left) {
  //     this.setAccelerationX(0)
  //   }
  //   if (this.body.blocked.up || this.body.blocked.down) {
  //     this.setAccelerationY(0)
  //     if (this.body.blocked.down) {
  //       this.setDragX(this.groundDrag)
  //     }
  //   }
  // }

  lift (grandma) {

  }

  right () {
    this.setAccelerationX(this.groundAcc)
  }

  left () {
    this.setAccelerationX(-this.groundAcc)
  }

  stop() {
    // this.setAccelerationX(0)
  }

  jump (timestamp) {
    // TODO: Time based jump?
    if (!this.isHoldingJump && (this.body.blocked.down || this.body.touching.down)) {
      this.isHoldingJump = true
      this.setVelocityY(-this.jumpSpeed)
      this.setDragX(this.airDrag)
    }
  }

  stopJump () {
    // if (this.body.blocked.down || this.body.touching.down) {
    //   this.isHoldingJump = false
    // }
  }
}
