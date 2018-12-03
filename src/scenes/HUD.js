import config from '../config'
export default class HUD extends Phaser.Scene {
  constructor() {
    super({
      key: 'HUD'
    })
  }

  preload () {
    this.load.spritesheet('mute', require('../assets/mute.png'), {frameHeight: 32, frameWidth: 32})
  }

  create () {
    const mute = this.add.sprite(config.tileSize * config.zoom * (config.width - .5), config.tileSize * config.zoom, 'mute', 0).setInteractive()
    mute.on('pointerdown', () => {
      if (!this.sound.mute) {
        mute.setFrame(1)
        this.sound.mute = true
      } else {
        mute.setFrame(0)
        this.sound.mute = false
      }
    })
  }
}