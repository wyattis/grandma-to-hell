import config from '../config'

export default class Title extends Phaser.Scene {

  constructor () {
    super({ key: 'Title' })
    
  }

  preload () {

  }
  
  create () {
      this.titleText = this.add.text(config.tileSize * config.width * config.zoom / 2, 240, 'GRANDMA TO HELL', { fontFamily: 'Arial', fontSize: 64, color: 'red' });
      this.titleText.setOrigin(0.5);
      
      this.titleText = this.add.text(config.tileSize * config.width * config.zoom / 2, 400, '- PRESS ANY KEY TO PLAY -', { fontFamily: 'Arial', fontSize: 32, color: 'white' });
      this.titleText.setOrigin(0.5);
      
      /*
      this.cursors = this.input.keyboard.createCursorKeys()
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
      this.J = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
      this.K = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)
      this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
      this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
      this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
      this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
      */
      
      this.input.keyboard.on('keydown', (event) => {

        console.log("START THE GAME");
        
        // CHANGE ROOM
        this.scene.pause();
        this.scene.start("Introduction");
        
    });
  }
  
  update()
  {
  
  }

}