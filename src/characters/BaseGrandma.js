import Base from './Base'
export default class BaseGrandma extends Base {
  constructor (scene, x, y, key) {
    super(scene, x, y, key)
    this.body.onWorldBounds = true
  }

  flip () {
    if (this.body.rotation === 0) {
      this.flipX = !this.flipX
    } else {
      this.flipY = !this.flipY
    }
  }
}