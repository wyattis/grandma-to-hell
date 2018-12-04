import config from '../config'

export default class Win extends Phaser.Scene {

  constructor () {
    super({ key: 'Win' })
    
  }

  create () {
    
        this.titleText = this.add.text(config.tileSize * config.width * config.zoom / 2, 240, 'GRANDMA IS SAFE!', { fontFamily: 'Arial', fontSize: 64, color: 'green' })
        this.titleText.setOrigin(0.5)
        
        this.titleText = this.add.text(config.tileSize * config.width * config.zoom / 2, 400, '- PRESS ANY KEY TO REPLAY -', { fontFamily: 'Arial', fontSize: 32, color: 'white' })
        this.titleText.setOrigin(0.5)
        
          
        this.input.keyboard.on('keydown', (event) => {
          this.scene.start("Title");
        })
  }

}