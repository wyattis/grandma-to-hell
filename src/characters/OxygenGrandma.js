
import CacheKeys from "../types/CacheKeys";
import BaseGrandma from "./BaseGrandma";
export const OxygenAnimKeys = {
  sitting: 'oxygen-sitting',
  smoking: 'oxygen-smoking',
  exploding: 'oxygen-exploding'
}
export const OxygenState = {
  sitting: 0,
  smoking: 1
}
export default class OxygenGrandma extends BaseGrandma {
  constructor (scene, x, y) {
    super(scene, x, y, CacheKeys.boomMa)
    this.scene = scene
    this.health = 10
    this.explosion = scene.add.sprite(0, 0).setActive(false).setVisible(false)
    this.attached.add(this.explosion)
    scene.anims.create({
      key: OxygenAnimKeys.sitting,
      frames: scene.anims.generateFrameNumbers(CacheKeys.boomMa, {start: 0, end: 12}),
      frameRate: 7,
      repeat: -1
    })
    scene.anims.create({
      key: OxygenAnimKeys.smoking,
      frames: scene.anims.generateFrameNumbers(CacheKeys.boomMa, {start: 5, end: 5}).concat(scene.anims.generateFrameNumbers(CacheKeys.boomMa, {start: 0, end: 0})),
      frameRate: 7,
      repeat: -1
    })
    scene.anims.create({
      key: OxygenAnimKeys.exploding,
      frames: scene.anims.generateFrameNumbers(CacheKeys.explosion, {start: 0, end: 12}),
      frameRate: 7
    })
    this.explosion.on('animationcomplete', this.explosionComplete, this);
    this.setState(OxygenState.sitting)
    this.setSize(16, 20)
  }

  damage (val) {
    if (this.state === OxygenState.smoking) {
      this.explode()
    } else {
      this.health -= val
    }
  }

  setState (state) {
    this.state = state
    switch (state) {
      case OxygenState.smoking:
        return this.play(OxygenAnimKeys.smoking, true)
      default:
        return this.play(OxygenAnimKeys.sitting, true)
    }
  }

  explosionComplete () {
    console.log('oxygen animation complete')
    this.scene.add.sprite(this.x, this.y, CacheKeys.ashes)
    this.destroy()
  }

  explode () {
    this.explosion.setVisible(true).setActive(true).setDepth(-100).play(OxygenAnimKeys.exploding, true)
  }

  interact () {
    console.log('oxygen interact')
    this.explode()
    if (this.state !== OxygenState.smoking) {
      this.setState(OxygenState.smoking)
    }
  }
}