import Player from '../characters/Player'
import WheelchairGrandma from '../characters/WheelchairGrandma'
import FatGrandma from "../characters/FatGrandma";
import OxygenGrandma from "../characters/OxygenGrandma";
import CacheKeys from '../types/CacheKeys'

export default class NursingHome extends Phaser.Scene {
  constructor () {
    super({
      key: 'NursingHome',
      physics: {
        arcade: {
          gravity: { y: 300 },
          debug: true
        }
      }
    })
  }

  preload () {
    this.load.image(CacheKeys.env, require('../assets/grandmabgtiles.png'))
    const levelUrl = require('../levels/test-1.json')
    this.load.tilemapTiledJSON('map', levelUrl)
    // this.load.image('player', require('../assets/kid.png'))
    this.load.spritesheet(CacheKeys.grandmas, require('../assets/grandmas.png'), {frameWidth: 32, frameHeight: 48})
    this.load.spritesheet(CacheKeys.walker, require('../assets/walker.png'), {frameWidth: 27, frameHeight: 29})
    this.load.image(CacheKeys.wheelie, require('../assets/wheelie.png'))
    this.load.spritesheet(CacheKeys.wheelieMovin, require('../assets/wheeliemovin.png'), {frameWidth: 29, frameHeight: 27})
    this.load.spritesheet(CacheKeys.boomMa, require('../assets/boom-ma.png'), {frameWidth: 34, frameHeight: 31})
    this.load.spritesheet(CacheKeys.bigMaBounce, require('../assets/bigmabounce.png'), {frameWidth: 47, frameHeight: 37})
    this.load.spritesheet(CacheKeys.bigMaBall, require('../assets/bigmaball.png'), {frameWidth: 47, frameHeight: 37})
  }

  create () {
     // For tilemap checkout https://labs.phaser.io/edit.html?src=src\game%20objects\tilemap\collision\tile%20callbacks.js
    const map = this.make.tilemap({ key: 'map'})
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    const environment = map.addTilesetImage('background', 'environment')
    const backgroundLayer = map.createStaticLayer('Background', environment, 0, 0)
    const wallsLayer = map.createStaticLayer('Walls', environment, 0, 0)
    const firesLayer = map.createDynamicLayer('Fire', environment, 0, 0)

    for (let layer of [backgroundLayer, wallsLayer, firesLayer]) {
      // layer.setScale(2, 2)
    }

    const grandmas = this.physics.add.staticGroup({ allowGravity: false })
    grandmas.add(new WheelchairGrandma(this, 200, 64))
    grandmas.add(new FatGrandma(this, 250, 64))
    grandmas.add(new OxygenGrandma(this, 300, 64))

    // Player
    this.player = new Player(this, 50, 20)

    // Colliders
    this.physics.add.collider(this.player, grandmas)
    this.physics.add.collider(grandmas, wallsLayer)
    this.physics.add.collider(this.player, wallsLayer)

    // Register input
    this.cursors = this.input.keyboard.createCursorKeys()

    // Camera stuff
    this.cameras.main.startFollow(this.player, true)
    this.cameras.main.setDeadzone(400, 200)
  }

  update () {
    if (this.cursors.right.isDown) {
      this.player.right()
    }
    if (this.cursors.left.isDown) {
      this.player.left()
    }
    if (this.cursors.up.isDown) {
      // TODO: Open doors or interact
    }
    if (this.cursors.down.isDown) {
      // TODO: Duck?
    }
  }
}