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
        matter: {
          debug: true,
          gravity: { y: 1 },
          enableSleep: true
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
    this.load.spritesheet(CacheKeys.kid, require('../assets/kid.png'), {frameWidth: 19, frameHeight: 26})
  }

  create () {
     // For tilemap checkout https://labs.phaser.io/edit.html?src=src\game%20objects\tilemap\collision\tile%20callbacks.js
    const map = this.make.tilemap({ key: 'map'})
    const environment = map.addTilesetImage('background', 'environment')
    const backgroundLayer = map.createStaticLayer('Background', environment, 0, 0)
    const wallsLayer = map.createDynamicLayer('Walls', environment, 0, 0)
    const firesLayer = map.createDynamicLayer('Fire', environment, 0, 0)

    // Physics setup
    this.matter.world.createDebugGraphic()
    this.matter.world.drawDebug = true
    wallsLayer.setCollisionByProperty({ collides: true })
    this.matter.world.convertTilemapLayer(wallsLayer)
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    wallsLayer.forEachTile(tile => {
      if (tile.physics.matterBody) {
        debugger
      }
    })
    // this.physics.add.collider(this.grandmas, wallsLayer)
    // this.physics.add.collider(this.player, this.grandmas)

    this.grandmas = this.add.group()
    this.grandmas.add(new WheelchairGrandma(this, 200, 0), true)
    this.grandmas.add(new FatGrandma(this, 250, 0), true)
    this.grandmas.add(new OxygenGrandma(this, 300, 0), true)

    // Player
    this.player = new Player(this, 50, 20)
    debugger

    // Register input
    this.cursors = this.input.keyboard.createCursorKeys()
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    // Camera stuff
    this.cameras.main.startFollow(this.player, true)
    this.cameras.main.setDeadzone(400 / 4, 200 / 4)
    this.cameras.main.setZoom(2)
  }

  update () {
    if (this.cursors.right.isDown) {
      this.player.right()
    } else if (this.cursors.left.isDown) {
      this.player.left()
    } else {
      this.player.stop()
    }
    if (this.spacebar.isDown) {
      this.player.jump()
    } else {
      this.player.stopJump()
    }
    if (this.cursors.down.isDown) {
      // TODO: Open doors or interact
    }
  }
}