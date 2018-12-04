import Base from './Base'
export default class BaseGrandma extends Base {
  constructor (scene, x, y, key) {
    super(scene, x, y, key)
    this.setCollideWorldBounds(true)
    this.body.onWorldBounds = true
    this.body.offset.x += 1
    this.body.offset.y += 1
  }

  flip () {
    if (this.body.rotation === 0) {
      this.flipX = !this.flipX
    } else {
      this.flipY = !this.flipY
    }
  }
}