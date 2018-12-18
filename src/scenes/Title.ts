let hasSeenIntro = false
export default class Title extends Phaser.Scene {

  constructor () {
    super({ key: 'Title' })
  }
  
  create () {
      let titleText = this.add.text(
        TILE_SIZE * WIDTH * ZOOM / 2,
        240,
        'GRANDMA TO HELL',
        { fontFamily: 'Arial', fontSize: 64, color: 'red' }
        )
      titleText.setOrigin(0.5)
      
      titleText = this.add.text(
        TILE_SIZE * WIDTH * ZOOM / 2,
        400,
        '- PRESS ANY KEY TO PLAY -',
        { fontFamily: 'Arial', fontSize: 32, color: 'white' }
        )
      titleText.setOrigin(0.5)
      
      this.input.keyboard.on('keydown', () => {
        // CHANGE ROOM
        this.scene.pause()
        this.scene.start(hasSeenIntro ? 'Room0' : 'Introduction')
        hasSeenIntro = true
    })
  }

}