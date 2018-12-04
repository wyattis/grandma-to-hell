import Player from '../characters/Player'
import WheelchairGrandma from '../characters/WheelchairGrandma'
import FatGrandma from "../characters/FatGrandma";
import OxygenGrandma from "../characters/OxygenGrandma";
import CacheKeys from '../types/CacheKeys'
import WalkerGrandma from "../characters/WalkerGrandma";
import config from '../config'

export default class NursingHome extends Phaser.Scene {
  
  constructor (data) {
    data.physics = {
      arcade: {
        debug: config.debug,
        gravity: {y: 600}
      }
    }
    super(data)
  }
  
  init (data) {
    console.log('initializing room', this.roomFile, this.roomKey)
  }

  preload () {
    console.log('NursingHome.preload')
  }

  shutdown () {
    //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
    console.log('NursingHome.shutdown')
    this.input.keyboard.shutdown()
  }
  
  changeSceneTo (key) {
    this.scene.start(key)
  }
  
  create () {
    
    this.scene.launch('HUD')
     // For tilemap checkout https://labs.phaser.io/edit.html?src=src\game%20objects\tilemap\collision\tile%20callbacks.js
    const yPadding = config.tileSize * 2
    const xPadding = 0 // config.tileSize * 2
    const map = this.make.tilemap({ key: this.roomKey })
    this.cameras.main.setBounds(0, 0, map.widthInPixels + xPadding * 2, map.heightInPixels + yPadding * 2)
    this.physics.world.setBounds(xPadding, yPadding, map.widthInPixels + xPadding, map.heightInPixels + yPadding)
    const environment = map.addTilesetImage('background', CacheKeys.env)
    const fires = map.addTilesetImage('fires', CacheKeys.fires)
    map.createStaticLayer('Background1', environment, xPadding, yPadding)
    const backgroundFires = map.createDynamicLayer('FireBackground', fires, xPadding, yPadding)
    map.createStaticLayer('Background2', environment, xPadding, yPadding)
    map.createStaticLayer('Foreground', environment, xPadding, yPadding)
    const wallsLayer = map.createStaticLayer('Walls', environment, xPadding, yPadding)
    const doorsLayer = map.createStaticLayer('Doors', environment, xPadding, yPadding)

    const breakableWalls = map.createStaticLayer('Breakable-walls', environment, xPadding, yPadding)
    const firesLayer = map.createDynamicLayer('FireForeground', fires, xPadding, yPadding)
    this.initDoors(doorsLayer, xPadding, yPadding)
    this.addCharacters(map, xPadding, yPadding)
    console.log('doors', this.doors.getChildren())
    
 
    this.nowAddFire(backgroundFires)
    this.nowAddFire(firesLayer)

    // Colliders
    wallsLayer.setCollisionBetween(0, 200)
    firesLayer.setCollisionBetween(0, 200)
    this.physics.add.collider(this.grandmas, wallsLayer)
    this.physics.add.collider([this.player], wallsLayer)
    function fireDamage (s1, s2) {
      if (s2.index > -1){
        s1.damage(0.1)
      }
    }
    this.physics.add.overlap(this.player, this.doors, function (player, door) {
      player.interactable = door
    })
    this.physics.add.overlap(firesLayer, this.player, fireDamage)
    this.physics.add.overlap(firesLayer, this.grandmas, fireDamage)
    this.physics.add.overlap(this.player, this.grandmas, function (s1, s2) {
      // console.log('grandma overlap', s1, s2)
      if (s1.body.velocity.y > 0 && s1.body.bottom <= s2.body.top + 10) {
        // console.log(s1.body.bottom, s2.body.top)
        // if (s1.body.velocity.x < 0) debugger
        if (s2 instanceof FatGrandma) {
          s1.bounce()
          s2.bounce()
        } else {
          s1.body.y += (s2.body.top - s1.body.bottom)
          s1.setVelocityY(0)
          s1.body.blocked.down = true
        }
      } else if (s2.body.touching.down || s2.body.blocked.down) {
        s1.interactable = s2
      }
    })
    this.physics.add.overlap(this.grandmas, this.grandmas, function (s1, s2) {
      // TODO: Different for each grandma type
      if (s1.body.velocity.y > 0 && s1.body.bottom <= s2.body.top + 5) {
        s1.body.y += (s2.body.top - s1.body.bottom)
        s1.setVelocityY(0)
        s1.body.blocked.down = true
      } else if (s2.body.velocity.y > 0 && s2.body.bottom <= s1.body.top + 5) {
        s2.body.y += (s1.body.top - s2.body.bottom)
        s2.setVelocityY(0)
        s2.body.blocked.down = true
      }
    })
    // Doors
    this.physics.add.overlap(this.player, this.doors, function (player, door) {
      player.door = door
    })

    this.setupInput()

    // Camera stuff
    this.cameras.main.startFollow(this.player, true)
    this.cameras.main.setDeadzone(config.tileSize * 4 * config.zoom, config.tileSize * 1.1 * config.zoom)
    this.cameras.main.setZoom(config.zoom)

    this.physics.world.on('worldbounds', function (body) {
      body.gameObject.toggleFlipX()
    })

    this.events.on('shutdown', this.shutdown, this)
  }

  initDoors (doorLayer, xPadding, yPadding) {
    let n = 0
    this.doors = this.physics.add.group()
    const doorKeys = []
    for (let key in doorLayer.layer.properties) {
      doorKeys.push(doorLayer.layer.properties[key])
    }
    const doorIndexes = [145, 182, 183, 184, 185, 186, 187]
    console.log('doorKeys', doorKeys)
    for (let row of doorLayer.layer.data) {
      for (let tile of row) {
        const x = xPadding + tile.pixelX + config.tileSize / 2
        const y = yPadding + tile.pixelY + config.tileSize / 2
        // TODO: Filter for only tops of doors
        if (tile.index > -1) console.log('door index', tile.index)
        if (doorIndexes.indexOf(tile.index) > -1) {
          const door = this.add.zone(tile.pixelX, tile.pixelY + config.tileSize * 2).setSize(16, 32)
          this.physics.world.enable(door)
          door.body.setAllowGravity(false)
          door.body.moves = false
          this.doors.add(door)
          if (n < doorKeys.length) {
            door.leadsTo = doorKeys[n]
            console.log('assiging key', door.leadsTo)
          } else {
            console.error('Not enough door keys added', n)
          }
          n++
        }
      }
    }
  }

  nowAddFire (firesLayer) {
    const fireFps = 8
    let groups = [
      [0, 4, 8],
      [1, 5, 9],
      [2, 6, 10],
      [3, 7, 11],

      [12, 16, 20],
      [13, 17, 21],
      [14, 18, 22],
      [15, 19, 23],

      [24, 25, 26],
      [28, 29, 30],

      [36, 37, 38],
      [40, 41, 42],

      [48, 49, 50],
      [52, 53, 54],

      [60, 61, 62],
      [64, 65, 66]
    ]
    for (let group of groups) {
      this.tilemap.addLayerAnimation(firesLayer, group.map(i => ({
        key: CacheKeys.fires,
        frame: i
      })), fireFps, function (frame) {
        return group.indexOf(frame.frame) > -1
      })
    }
  }

  addCharacters (map, xPadding, yPadding) {
    this.grandmas = this.physics.add.group({ allowGravity: true, immovable: false })
    const layer = map.getLayer('Characters')
    for (let x = 0; x < layer.data.length; x++) {
      for (let tile of layer.data[x]) {
        const x = xPadding + tile.pixelX + config.tileSize / 2
        const y = yPadding + tile.pixelY + config.tileSize / 2
        if (tile.index > 0) {
          console.log('adding character for', tile.index)
        }
        switch (tile.index) {
          case 178:
            this.grandmas.add(new OxygenGrandma(this, x, y), true)
            break
          case 179:
            this.grandmas.add(new WalkerGrandma(this, x, y), true)
            break
          case 180:
            this.grandmas.add(new WheelchairGrandma(this, x, y), true)
            break
          case 181:
            this.grandmas.add(new FatGrandma(this, x, y), true)
            break
          case 194:
          case 195:
            this.player = new Player(this, x, y)
            this.player.flipX = tile.index === 195
            break
          default:
            if (tile.index > 0) {
              console.log('invalid tile in characters', tile.index)
            }
        }
      }
    }
  }

  setupInput () {
    // this.cursors = this.input.keyboard.createCursorKeys()
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.J = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
    this.K = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)
    this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  }

  update (timestamp, delta) {

    if (!this.player || !this.player.active) return

    if (this.D.isDown) {
      this.player.right()
    } else if (this.A.isDown) {
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
    if (this.canInteract && this.J.isDown && this.player.body.blocked.down) {
      this.canInteract = false
      if (this.player.interactable) {
        this.player.interact(this.player.interactable)
      }
    } else if (!this.J.isDown) {
      this.canInteract = true
    }

    // Place
    if (this.S.isDown) {
      this.player.place()
    }
    
    // Open door
    if (this.canOpenDoor && this.W.isDown) {
      this.canOpenDoor = false
      if (this.player.door) {
         this.changeSceneTo('Room' + this.player.door.leadsTo)
      }
    } else {
      this.canOpenDoor = true
    }

    // Throw/lift
    if (this.K.isDown) {
      this.player.throwOrLift(this.player.interactable)
    } else {
      this.player.stopThrowOrLift()
    }
  }
}