export default class Introduction extends Phaser.Scene {

  constructor () {
    super({ key: 'Introduction' })
  }

  preload () {
    this.load.image('scene1', require('../assets/scene1.png'))
    this.load.image('scene2', require('../assets/scene2.png'))
    this.load.image('scene3', require('../assets/scene3.png'))
    this.load.image('scene4', require('../assets/scene4.png'))
  }
  
  create () {
    const waitTimer = DEBUG ? 100 : 3000
    
    // Make images
    const sceneImage1 = this.add.sprite(50, -50, 'scene1').setOrigin(0).setScale(3)
    const sceneImage2 = this.add.sprite(50, -50, 'scene2').setOrigin(0).setScale(3)
    const sceneImage3 = this.add.sprite(50, -50, 'scene3').setOrigin(0).setScale(3)
    const sceneImage4 = this.add.sprite(50, -50, 'scene4').setOrigin(0).setScale(3)

    // Initial hide
    sceneImage2.visible = false
    sceneImage3.visible = false
    sceneImage4.visible = false
    
    // Timer galore
    setTimeout(() => {
        sceneImage1.visible = false
        sceneImage2.visible = true
    }, waitTimer)
    
    setTimeout(() => {
        sceneImage2.visible = false
        sceneImage3.visible = true
    }, waitTimer * 2)
    
    setTimeout(() => {
        sceneImage3.visible = false
        sceneImage4.visible = true
    }, waitTimer * 3)
    
    setTimeout(() => {
        this.scene.start('Room0')
    }, waitTimer * 4)
  }

}