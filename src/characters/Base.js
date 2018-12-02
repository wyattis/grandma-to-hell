export default class Base extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, key) {
    super(scene, x, y, key)
    scene.add.existing(this)
    scene.matter.add.gameObject(this)
    // scene.physics.add.existing(this)
    // this.setCollideWorldBounds(true)
  }
}