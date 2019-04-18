import CacheKeys from '../types/CacheKeys'
const healthBarWidth = 16
const healthBarHeight = 5

export default class Base extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, key) {
    super(scene, x, y, key)
    this.scene = scene
    this.isBeingCarried = false
    this.health = 100
    this.maxHealth = 100
    this.attached = scene.add.container(x, y).setExclusive(true)
    this.healthBar = scene.add.graphics()
    this.healthBar.fillStyle(0xffff00, 1)
    this.healthBar.fillRect(-10, 0, healthBarWidth, healthBarHeight)
    this.attached.add(this.healthBar)
    scene.sys.events.on('postupdate', this.preRender, this);
    this.attached.setPosition(this.x, this.y)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setDragX(350)
    this.body.maxVelocity.x = 200
    this.body.maxVelocity.y = 400
  }
  
  death () {
    const ashes = this.scene.add.sprite(this.x, this.y, CacheKeys.ashes)
    this.attached.setActive(false)
    this.scene.physics.add.existing(ashes)
    this.setActive(false)
    setTimeout(() => {
      this.destroy()
    })
  }

  preUpdate (timestamp, delta) {
    super.preUpdate(timestamp, delta)
    // this.healthBar.setText(this.health.toFixed(1))
  }
  
  preRender () {
    if (this.body) {
      this.attached.setPosition(this.x, this.body.top - 4)
      const scaleX = 1 - ((this.maxHealth - this.health) / this.maxHealth)
      console.log('scaleX', scaleX)
      this.healthBar.setScale(scaleX, 1)
    }

    // this.healthBar.setScale(1 - ((this.maxHealth - this.health) / this.maxHealth), 1)
  }

  setCarrying (val, player) {
    this.isBeingCarried = val
    if (this.isBeingCarried) {
      this.setRotation(Math.PI / 2)
      this.attached.setRotation(Math.PI / 2)
      this.disableBody()
    } else {
      this.body.x = this.x
      this.body.y = (player && (player.body.touching.down || player.body.blocked.down)) ? player.body.top : player.body.bottom + this.height / 2
      // this.setVelocity(player.body.velocity.x, player.body.velocity.y)
      this.enableBody()
      this.setRotation(0)
      this.attached.setRotation(0)
    }
  }

  damage (val) {
    this.health -= val
    
    if (this.health <= 0) {
      this.death()
    }
  }
}