import Base from './Base'
export default class OxygenGrandma extends Base {
  constructor (scene, x, y) {
    super(scene, x, y)
    scene.anims.create({
      key: 'oxygen-sitting',
      frames: scene.anims.generateFrameNumbers('grandmas', { start: 6, end: 7 }),
      frameRate: 20
    })
    this.play('oxygen-sitting')
  }
}