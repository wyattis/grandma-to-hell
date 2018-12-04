export default class Base extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, key) {
    super(scene, x, y, key)
    this.scene = scene
    this.isBeingCarried = false
    this.health = 100
    this.attached = scene.add.container(x, y).setExclusive(true)
    this.healthBar = scene.add.text(0, -16, this.health, { font: '12px Arial', fill: '#000000' })
    this.attached.add(this.healthBar)
    this.healthBar.setOrigin(0.5)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setDragX(350)
  }

  preUpdate (timestamp, delta) {
    super.preUpdate(timestamp, delta)
    this.attached.setPosition(this.x, this.y)
    this.healthBar.setText(this.health.toFixed(1))
  }

  setCarrying (val) {
    this.isBeingCarried = val
    if (this.isBeingCarried) {
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
    if (this.health <= 0) {
      console.log('killing')
      console.dir(this)
      this.destroy()
    }
  }
}