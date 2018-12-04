import config from '../config'

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
    this.waitTimer = config.debug ? 100 : 3000;
    
    // Make images
    this.sceneImage1 = this.add.sprite(50, -50, 'scene1').setOrigin(0).setScale(3);
    this.sceneImage2 = this.add.sprite(50, -50, 'scene2').setOrigin(0).setScale(3);
    this.sceneImage3 = this.add.sprite(50, -50, 'scene3').setOrigin(0).setScale(3);
    this.sceneImage4 = this.add.sprite(50, -50, 'scene4').setOrigin(0).setScale(3);

    
    // Initial hide
    this.sceneImage2.visible = false;
    this.sceneImage3.visible = false;
    this.sceneImage4.visible = false;
    
    // Timer galore
    setTimeout(() => {
        this.sceneImage1.visible = false;
        this.sceneImage2.visible = true;
    }, this.waitTimer);
    
    setTimeout(() => {
        this.sceneImage2.visible = false;
        this.sceneImage3.visible = true;
    }, this.waitTimer * 2);
    
    setTimeout(() => {
        this.sceneImage3.visible = false;
        this.sceneImage4.visible = true;
    }, this.waitTimer * 3);
    
    setTimeout(() => {
        // CHANGE ROOM
        this.scene.start("Room0");
        
    }, this.waitTimer * 4);
  }
  


}