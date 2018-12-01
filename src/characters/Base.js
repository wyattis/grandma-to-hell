export default class Base extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, key) {
    super(scene, x, y, key)
    this.setScale(2, 2)
    // Enable drawing and physics
    scene.add.existing(this)
    scene.physics.add.existing(this)
  }
}