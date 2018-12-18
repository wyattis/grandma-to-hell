export default class Win extends Phaser.Scene {

  private titleText!: Phaser.GameObjects.Text

  constructor () {
    super({ key: 'Win' })
    
  }

  create () {
    
        this.titleText = this.add.text(
          TILE_SIZE * WIDTH * ZOOM / 2,
          240,
          'GRANDMA IS SAFE!',
          { fontFamily: 'Arial', fontSize: 64, color: 'green' }
          )
        this.titleText.setOrigin(0.5)
        
        this.titleText = this.add.text(
          TILE_SIZE * WIDTH * ZOOM / 2,
          400,
          '- PRESS ANY KEY TO REPLAY -',
          { fontFamily: 'Arial', fontSize: 32, color: 'white' }
          )
        this.titleText.setOrigin(0.5)
        
        setTimeout(() => {
          this.input.keyboard.on('keydown', () => {
            this.scene.start('Title')
          })
        }, 2000)
        
  }

}