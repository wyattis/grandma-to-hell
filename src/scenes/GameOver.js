import config from '../config'

export default class GameOver extends Phaser.Scene {

  constructor () {
    super({ key: 'GameOver' })
    
  }

  preload () {

  }
  
  create () {
      // Dead text
      this.gameOverText = this.add.text(config.tileSize * config.width * config.zoom / 2, config.tileSize * config.height * config.zoom / 2 - 100, '- YOU AND YOUR GRANDMA DIED -', { fontFamily: 'Arial', fontSize: 50, color: 'red' });
      this.gameOverText.setOrigin(0.5);
      
      // Refresh page
      setTimeout(() => {
        this.scene.start('Title')
    }, 3000);
      
      
    
  }

}