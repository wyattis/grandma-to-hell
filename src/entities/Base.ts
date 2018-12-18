import CacheKeys from '../types/CacheKeys'
import Player from './Player'
export default class Base extends Phaser.Physics.Arcade.Sprite {
  public isBeingCarried = false
  public health = 100
  public attached: Phaser.GameObjects.Container
  constructor (protected scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key)
    this.isBeingCarried = false
    this.health = 100
    this.attached = scene.add.container(x, y).setExclusive(true)
    this.body = <Phaser.Physics.Arcade.Body>this.body // Hack to get the correct type of body
    // this.healthBar = scene.add.image(0, -16, this.health, { font: '12px Arial', fill: '#000000' })
    // this.attached.add(this.healthBar)
    // this.healthBar.setOrigin(0.5)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setDragX(350)
    this.body.maxVelocity.x = 200
    this.body.maxVelocity.y = 400
  }
  
  death () {
    const ashes = this.scene.add.sprite(this.x, this.y, CacheKeys.ashes)
    this.scene.physics.add.existing(ashes)
    this.active = false
    setTimeout(() => {
      this.destroy()
    })
  }

  preUpdate (timestamp: number, delta: number) {
    super.preUpdate(timestamp, delta)
    this.attached.setPosition(this.x, this.y)
    // this.healthBar.setText(this.health.toFixed(1))
  }

  setCarrying (val: boolean, player: Player) {
    this.isBeingCarried = val
    if (this.isBeingCarried) {
      this.setRotation(Math.PI / 2)
      this.disableBody()
    } else {
      this.body.x = this.x
      this.body.y = (player && (player.body.touching.down || player.body.blocked.down)) ? player.body.top : player.body.bottom + this.height / 2
      // this.setVelocity(player.body.velocity.x, player.body.velocity.y)
      this.enableBody(false, 0, 0, false, false)
      this.setRotation(0)
    }
  }

  damage (val: number) {
    this.health -= val
    
    if (this.health <= 0) {
      this.death()
    }
  }
}