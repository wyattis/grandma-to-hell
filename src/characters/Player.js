import Base from './Base'
export default class Player extends Base {
  constructor (scene, x, y) {
    super(scene, x, y, 'player')
    // Config
    this.groundAcc = 2000
    this.body.maxVelocity.x = 400
    // this.body.maxVelocity.y = 100
  }

  right () {
    this.setAccelerationX(this.groundAcc)
  }

  left () {
    this.setAccelerationX(-this.groundAcc)
  }
}