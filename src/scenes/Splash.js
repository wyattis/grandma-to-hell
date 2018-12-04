import config from '../config'
export default class Splash extends Phaser.Scene {

  constructor () {
    super({key: 'Splash'})
  }

  preload () {
    // this.load.image('logo', require('../assets/logo.png'))
    this.load.audio('theme', [
      require('../assets/audio/theme.mp3')
    ])
  }

  create () {
    if (!config.debug) {
      const theme = this.sound.add('theme')
      theme.play()
      theme.loop = true
      theme.volume = .5
    }


    setTimeout(() => {
      this.scene.start('Title')
    })
  }
}