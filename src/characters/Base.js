export default class Base extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, key) {
    super(scene, x, y, key)
    this.isBeingCarried = false
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setCollideWorldBounds(true)
  }

  setCarrying (val) {
    this.isBeingCarried = val
    if (this.isBeingCarried) {
      // this.setImmovable(true)
      this.setRotation(Math.PI / 2)
      this.disableBody()
    } else {
      this.body.x = this.x
      this.body.y = this.y
      this.enableBody()
      this.setRotation(0)
    }
  }
}