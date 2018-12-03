export default class Splash extends Phaser.Scene {

  constructor () {
    super({key: 'Splash', active: true})
  }

  preload () {
    this.load.image('logo', require('../assets/logo.png'))
    this.load.audio('theme', [
      require('../assets/audio/theme.mp3')
    ])
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
    const theme = this.sound.add('theme')
    theme.play()
    theme.loop = true
    theme.volume = .5

    setTimeout(() => {
      this.scene.start('NursingHome', {
        room: 1
      })
    })
  }
}