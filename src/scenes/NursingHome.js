import Player from '../characters/Player'
import WheelchairGrandma from '../characters/WheelchairGrandma'
import FatGrandma from "../characters/FatGrandma";
import OxygenGrandma from "../characters/OxygenGrandma";

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
    this.load.image('environment', require('../assets/grandmabgtiles.png'))
    const levelUrl = require('../levels/test-1.json')
    this.load.tilemapTiledJSON('map', levelUrl)
    // this.load.image('player', require('../assets/kid.png'))
    this.load.spritesheet('grandmas', require('../assets/grandmas.png'), {frameWidth: 32, frameHeight: 32})
  }

  create () {
     // For tilemap checkout https://labs.phaser.io/edit.html?src=src\game%20objects\tilemap\collision\tile%20callbacks.js
    const grandmas = this.physics.add.group({ allowGravity: false })
    grandmas.add(new WheelchairGrandma(this, 200, 20), true)
    grandmas.add(new FatGrandma(this, 250, 20), true)
    grandmas.add(new OxygenGrandma(this, 300, 20), true)

    const map = this.make.tilemap({ key: 'map'})
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    const environment = map.addTilesetImage('background', 'environment')
    const backgroundLayer = map.createStaticLayer('Background', environment, 0, 0)
    const wallsLayer = map.createStaticLayer('Walls', environment, 0, 0)
    const firesLayer = map.createDynamicLayer('Fire', environment, 0, 0)

    for (let layer of [backgroundLayer, wallsLayer, firesLayer]) {
      layer.setScale(2, 2)
    }

    // const walls = this.physics.add.staticGroup({
    //   key: 'wall',
    //   frameQuantity: 100,
    //   setXY: { x: 0, y: 400, stepX: 32 },
    //   frictionX: 1
    // })

    // Player
    this.player = new Player(this, 50, 20)
    this.player.setCollideWorldBounds(true)

    // Colliders
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