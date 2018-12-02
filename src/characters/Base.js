export default class Base extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, key) {
    super(scene, x, y, key)
    this.isBeingCarried = false
    this.health = 100
    this.healthBar = scene.add.text(10, 10, this.health, { font: '12px Arial', fill: '#000000' })
    this.healthBar.setOrigin(0.5)
    scene.add.existing(this)
    scene.physics.add.existing(this)
  }

  preUpdate (timestamp, delta) {
    super.preUpdate(timestamp, delta)
    this.healthBar.setPosition(this.x, this.body.top - 30)
    this.healthBar.setText(this.health.toFixed(1))
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

  damage (val) {
    this.health -= val
  }
}