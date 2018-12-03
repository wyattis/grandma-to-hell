export default class RoomTransition extends Phaser.Scene {

  constructor () {
    super({ key: 'RoomTransition' })
  }

  preload () {
   
  }

  create (data) {
     setTimeout(() => {
        this.scene.start('NursingHome', data)
     }, 1000)
  }
}