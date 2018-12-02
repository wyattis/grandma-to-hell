export default class Splash extends Phaser.Scene {

  constructor () {
    super({key: 'Splash', active: true})
  }

  preload () {
    this.load.image('logo', require('../assets/logo.png'))
  }

  create () {
    const logo = this.add.image(400, 150, 'logo')
    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1
    })
    setTimeout(() => {
      this.scene.start('NursingHome')
    })
  }
}