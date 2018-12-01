import Base from './Base'
export default class FatGrandma extends Base {
  constructor (scene, x, y) {
    super(scene, x, y)
    scene.anims.create({
      key: 'fat-sitting',
      frames: scene.anims.generateFrameNumbers('grandmas', { start: 3, end: 4 }),
      frameRate: 20
    })
    this.play('fat-sitting')
  }
}