export default class GameOver extends Phaser.Scene {

  constructor () {
    super({ key: 'GameOver' })
    
  }

  create () {
      const gameOverText = this.add.text(
        TILE_SIZE * WIDTH * ZOOM / 2,
        TILE_SIZE * HEIGHT * ZOOM / 2 - 100,
        '- YOU AND YOUR GRANDMA DIED -',
        { fontFamily: 'Arial', fontSize: 50, color: 'red' }
        )
      gameOverText.setOrigin(0.5);
      setTimeout(() => {
        this.scene.start('Title')
    }, 3000);
  }

}