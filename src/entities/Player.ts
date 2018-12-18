import Base from './Base'
import CacheKeys from '../types/CacheKeys'
import BaseGrandma from './BaseGrandma'

export enum AnimKeys {
  standing = 'standing',
  standingCarry = 'standingCarry',
  running = 'running',
  runningCarry = 'runningCarry',
  lifting = 'lifting',
  placing = 'placing',
  throwing = 'throwing',
  jumpingUp = 'jumpingUp',
  jumpingDown = 'jumpingDown',
  jumpingUpCarry = 'jumpingUpCarry',
  jumpingDownCarry = 'jumpingDownCarry'
}

export enum PlayerState {
  standing,
  running,
  lifting,
  placing,
  throwing,
  jumpingUp,
  jumping
}

export default class Player extends Base {
  private groundAcc = 1000
  private jumpSpeed = 250
  private bounceSpeed = 400
  private airDrag = 100
  private groundDrag = 400
  public carryObj: Base|null = null
  public interactable: Phaser.GameObjects.GameObject|null = null
  public carrying: BaseGrandma|null = null
  public door: Phaser.GameObjects.GameObject|null = null
  private isThrowing = false
  private isCarrying = false
  private canThrowOrLift = true
  private isHoldingJump: boolean = false
  private state: PlayerState = PlayerState.standing

  constructor (scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, CacheKeys.kid)
    this.health = 20
    this.createAnims(scene)
    console.log(this.displayHeight, this.displayWidth)
    this.setSize(19, 26)
    this.body.offset.y += 8
    this.body.offset.x += 1
    console.log('player', this)
    console.log(this.displayHeight, this.displayWidth)
    this.setCollideWorldBounds(true)
    this.setState(PlayerState.standing)
    this.on('animationcomplete', this.animComplete, this)
  }

  createAnims (scene: Phaser.Scene) {
    const frameRate = 10
    scene.anims.create({
      key: AnimKeys.standing,
      frames: scene.anims.generateFrameNumbers(CacheKeys.kid, { start: 0, end: 0 }),
      frameRate: 1
    })
    scene.anims.create({
      key: AnimKeys.standingCarry,
      frames: scene.anims.generateFrameNumbers(CacheKeys.kid, {start: 1, end: 1}),
      frameRate: 1
    })
    scene.anims.create({
      key: AnimKeys.running,
      frames: scene.anims.generateFrameNumbers(CacheKeys.kid, {start: 5, end: 8}),
      frameRate: frameRate,
      repeat: -1
    })
    scene.anims.create({
      key: AnimKeys.runningCarry,
      frames: scene.anims.generateFrameNumbers(CacheKeys.kid, {start: 12, end: 15}),
      frameRate: frameRate,
      repeat: -1
    })
    scene.anims.create({
      key: AnimKeys.lifting,
      frames: scene.anims.generateFrameNumbers(CacheKeys.kid, {start: 1, end: 3}),
      frameRate: frameRate,
      repeat: -1
    })
    scene.anims.create({
      key: AnimKeys.placing,
      frames: scene.anims.generateFrameNumbers(CacheKeys.kid, {start: 3, end: 4}),
      frameRate: frameRate,
      repeat: -1
    })
    scene.anims.create({
      key: AnimKeys.throwing,
      frames: scene.anims.generateFrameNumbers(CacheKeys.kid, {start: 0, end: 1}),
      frameRate: frameRate,
      repeat: -1
    })
    scene.anims.create({
      key: AnimKeys.jumpingUp,
      frames: scene.anims.generateFrameNumbers(CacheKeys.kid, {start: 10, end: 11}),
      frameRate: 1
    })
    scene.anims.create({
      key: AnimKeys.jumpingDown,
      frames: scene.anims.generateFrameNumbers(CacheKeys.kid, {start: 11, end: 11}),
      frameRate: 1
    })
    scene.anims.create({
      key: AnimKeys.jumpingUpCarry,
      frames: scene.anims.generateFrameNumbers(CacheKeys.kid, {start: 17, end: 18}),
      frameRate: frameRate,
      repeat: -1
    })
    scene.anims.create({
      key: AnimKeys.jumpingDownCarry,
      frames: scene.anims.generateFrameNumbers(CacheKeys.kid, {start: 18, end: 18}),
      frameRate: 1
    })
  }

  animComplete () {
    // console.log('animation complete for', this.state)
    // if (this.state === PlayerState.lifting) {
    //   this.setState(PlayerState.carrying)
    // } else if (this.state === PlayerState.placing) {
    //   this.setState(PlayerState.standing)
    // } else if (this.state === PlayerState.jumpingUp) {
    //   this.setState(PlayerState.jumping)
    // }
    // TODO: Handle the other transitions here
  }
  
  setState (state: PlayerState) {
    if (!this.active) return
    this.state = state
    if (this.isCarrying) {
      switch (state) {
        case PlayerState.running:
          return this.play(AnimKeys.runningCarry, true)
        case PlayerState.placing:
          this.isCarrying = false
          return this.play(AnimKeys.placing, true)
        case PlayerState.throwing:
          this.isCarrying = false
          return this.play(AnimKeys.throwing, true)
        case PlayerState.jumpingUp:
          return this.play(AnimKeys.jumpingUpCarry, true)
        case PlayerState.jumping:
          return this.play(AnimKeys.jumpingDownCarry, true)
        default:
          return this.play(AnimKeys.standingCarry, true)
      }
    } else {
      switch (state) {
        case PlayerState.running:
          return this.play(AnimKeys.running, true)
        case PlayerState.placing:
          this.isCarrying = false
          return this.play(AnimKeys.placing, true)
        case PlayerState.throwing:
          this.isCarrying = false
          return this.play(AnimKeys.throwing, true)
        case PlayerState.lifting:
          this.isCarrying = true
          return this.play(AnimKeys.lifting, true)
        case PlayerState.jumpingUp:
          return this.play(AnimKeys.jumpingUp, true)
        case PlayerState.jumping:
          return this.play(AnimKeys.jumpingDown, true)
        default:
          return this.play(AnimKeys.standing, true)
      }
    }
  }

  preUpdate (timestamp: number, delta: number) {
    super.preUpdate(timestamp, delta)
    if (this.body.blocked.right || this.body.blocked.left) {
      this.setAccelerationX(0)
    }
    if (this.body.blocked.up || this.body.blocked.down) {
      this.setAccelerationY(0)
      if (this.body.blocked.down) {
        this.setDragX(this.groundDrag)
      }
    }
    if (this.carryObj) {
      this.carryObj.setPosition(this.x, this.body.top)
    }
    this.interactable = null
    this.door = null
  }

  lift (object?: Phaser.GameObjects.GameObject) {
    if (object && !this.carryObj && this.state !== PlayerState.lifting && object instanceof Base) {
      this.setState(PlayerState.lifting)
      this.carryObj = object
      object.setPosition(this.x, this.body.top)
      object.setCarrying(true, this)
    }
  }

  place () {
    if (this.carryObj && !this.isThrowing) {
      this.setState(PlayerState.placing)
      this.carryObj.setCarrying(false, this)
      this.carryObj = null
    }
  }

  bounce () {
    this.setVelocityY(-this.bounceSpeed)
    this.setState(PlayerState.jumpingUp)
  }

  interact (object?: BaseGrandma|Phaser.GameObjects.GameObject) {
    // @ts-ignore
    if (object && object.interact) {
      // @ts-ignore
      object.interact()
    }
  }

  throw () {
    if (this.carryObj !== null && this.state !== PlayerState.throwing && this.state !== PlayerState.lifting) {
      this.setState(PlayerState.throwing)
      this.carryObj.setCarrying(false, this)
      this.carryObj.setVelocity(this.flipX ? -200 : 200, -400)
      this.carryObj = null
    }
  }

  throwOrLift (obj?: Phaser.GameObjects.GameObject) {
    if (!this.canThrowOrLift) return
    this.canThrowOrLift = false
    if (this.isCarrying) {
      this.throw()
    } else {
      this.lift(obj)
    }
  }

  right () {
    this.setState(PlayerState.running)
    this.setAccelerationX(this.groundAcc)
    if (this.flipX === true) {
      this.flipX = false
      if (this.carrying && this.carrying.flip()) {
        this.carrying.flip()
      }
    }
  }

  left () {
    this.setState(PlayerState.running)
    this.setAccelerationX(-this.groundAcc)
    if (this.flipX === false) {
      this.flipX = true
      if (this.carrying && this.carrying.flip) {
        this.carrying.flip()
      }
    }
  }

  stop() {
    this.setState(PlayerState.standing)
    this.setAccelerationX(0)
  }

  jump (timestamp?: number) {
    // TODO: Time based jump?
    if (!this.isHoldingJump && (this.body.blocked.down || this.body.touching.down)) {
      this.setState(PlayerState.jumpingUp)
      this.isHoldingJump = true
      this.setVelocityY(-this.jumpSpeed)
      this.setDragX(this.airDrag)
    }
  }

  stopJump () {
    if (this.body.blocked.down || this.body.touching.down) {
      this.isHoldingJump = false
    }
  }

  stopThrowOrLift () {
    this.canThrowOrLift = true
  }
  
  death () {
    super.death()
    const scene = this.scene
    setTimeout(() => {
      scene.scene.start('GameOver')
    }, 2000)
  }
}
