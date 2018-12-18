export default class Splash extends Phaser.Scene {

  constructor () {
    super({key: 'Splash'})
  }

  preload () {
    if (!DEBUG) {
      this.load.audio('theme', [
        require('../assets/audio/theme.mp3')
      ])
    }
  }

  create () {
    if (!DEBUG) {
      const theme = this.sound.add('theme') as Phaser.Sound.HTML5AudioSound
      theme.play()
      theme.loop = true
      theme.volume = .4
    }


    setTimeout(() => {
      this.scene.start('Title')
    })
  }
}