
export default class RoomTransition extends Phaser.Scene {

  constructor () {
    super({ key: 'RoomTransition' })
    this.i = 0
  }

  preload () {

  }

  create (data) {
    // setTimeout(() => {
    //   console.log('adding new nursing home', this.i, data)
    //   // const key = `NursingHome-${this.i}`
    //   // this.scene.add(key, NursingHome, true)
    //   // this.scene.start(key, data)
    //   this.i++
    // }, 3000)
  }
}