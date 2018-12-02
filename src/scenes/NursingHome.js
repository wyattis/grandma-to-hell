import Player from '../characters/Player'
import WheelchairGrandma from '../characters/WheelchairGrandma'
import FatGrandma from "../characters/FatGrandma";
import OxygenGrandma from "../characters/OxygenGrandma";
import CacheKeys from '../types/CacheKeys'
import WalkerGrandma from "../characters/WalkerGrandma";
import config from '../config'

export default class NursingHome extends Phaser.Scene {
  constructor () {
    super({
      key: 'NursingHome',
      physics: {
        arcade: {
          debug: true,
          gravity: {y: 600}
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
    this.load.spritesheet(CacheKeys.kid, require('../assets/kid.png'), {frameWidth: 38, frameHeight: 37})

  }

  create () {
     // For tilemap checkout https://labs.phaser.io/edit.html?src=src\game%20objects\tilemap\collision\tile%20callbacks.js
    const yPadding = config.tileSize * 2
    const xPadding = 0 //config.tileSize * 2
    const map = this.make.tilemap({ key: 'map' })
    this.cameras.main.setBounds(0, 0, map.widthInPixels + xPadding * 2, map.heightInPixels + yPadding * 2)
    this.physics.world.setBounds(xPadding, yPadding, map.widthInPixels + xPadding, map.heightInPixels + yPadding)
    const environment = map.addTilesetImage('background', 'environment')
    map.createStaticLayer('Background1', environment, xPadding, yPadding)
    map.createStaticLayer('Background2', environment, xPadding, yPadding)
    const wallsLayer = map.createStaticLayer('Walls', environment, xPadding, yPadding)
    const fires = map.createStaticLayer('Fire', environment, xPadding, yPadding)
    const breakableWalls = map.createStaticLayer('Breakable walls', environment, xPadding, yPadding)
    const doors = map.createStaticLayer('Doors', environment, xPadding, yPadding)
    this.grandmas = this.physics.add.group({ allowGravity: true, immovable: false })
    this.grandmas.add(new WalkerGrandma(this, 125, 0), true)
    this.grandmas.add(new WheelchairGrandma(this, 200, 0), true)
    this.grandmas.add(new FatGrandma(this, 250, 0), true)
    this.grandmas.add(new OxygenGrandma(this, 300, 0), true)

    // Player
    this.player = new Player(this, 50, 20)

    // Colliders
    wallsLayer.setCollisionBetween(0, 200)
    this.physics.add.collider(this.grandmas, wallsLayer)
    this.physics.add.collider(this.player, wallsLayer)
    this.physics.add.overlap(this.player, this.grandmas, function (s1, s2) {
      if (s1.body.velocity.y > 0 && s1.body.overlapY < 5 && s1.body.bottom <= s2.body.top + s1.body.overlapY) {
        // console.log(s1.body.bottom, s2.body.top)
        // if (s1.body.velocity.x < 0) debugger
        s1.body.y += (s2.body.top - s1.body.bottom)
        s1.setVelocityY(0)
      } else if (s2.body.touching.down || s2.body.blocked.down) {
        s1.interactable = s2
      }
    })
    this.physics.add.overlap(this.grandmas, this.grandmas, function (s1, s2) {
      // TODO: Different for each grandma type
      if (s1.body.velocity.y > 0 && s1.body.overlapY < 5 && s1.body.bottom <= s2.body.top + s1.body.overlapY) {
        s1.body.y += (s2.body.top - s1.body.bottom)
        s1.setVelocityY(0)
      }
    })

    this.setupInput()

    // Camera stuff
    this.cameras.main.startFollow(this.player, true)
    this.cameras.main.setDeadzone(400 / 4, 200 / 4)
    this.cameras.main.setZoom(3)

    this.physics.world.on('worldbounds', function (body) {
      body.gameObject.toggleFlipX()
    })
  }

  setupInput () {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.J = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
    this.K = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)
    this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  }

  update (timestamp, delta) {

    if (this.cursors.right.isDown || this.D.isDown) {
      this.player.right()
    } else if (this.cursors.left.isDown || this.A.isDown) {
      this.player.left()
    } else {
      this.player.stop()
    }

    if (this.spacebar.isDown) {
      this.player.jump()
    } else {
      this.player.stopJump()
    }

    // Interact
    if (this.J.isDown && this.player.body.blocked.down) {
      if (this.player.interactable) {
        this.player.interact(this.player.interactable)
      }
    }

    // Place
    if (this.S.isDown || this.cursors.down.isDown) {
      this.player.place()
    }

    // Throw/lift
    if (this.K.isDown) {
      this.player.throwOrLift(this.player.interactable)
    } else {
      this.player.stopThrowOrLift()
    }
  }
}