import Base from './Base'
export default class WheelchairGrandma extends Base {

  constructor (scene, x, y) {
    super(scene, x, y)
    scene.anims.create({
      key: 'wheelchair-sitting',
      frames: scene.anims.generateFrameNumbers('grandmas', { start: 3, end: 3 }),
      frameRate: 20
    })
    this.play('wheelchair-sitting')
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta)
  }

}