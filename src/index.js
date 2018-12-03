import 'phaser'
import Splash from "./scenes/Splash"
import NursingHome from "./scenes/NursingHome"
import HUD from "./scenes/HUD"
import config from './config'
import TilemapAnimationPlugin from './plugins/TilemapAnimationPlugin'

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'grandma-from-hell',
  // transparent: true,
  width: config.tileSize * config.width * config.zoom,
  height: config.tileSize * config.height * config.zoom,
  pixelArt: true,
  plugins: {
    scene: [
      { key: 'tilemapAnimation', plugin: TilemapAnimationPlugin, mapping: 'tilemap' }
    ]
  },
  scene: [Splash, HUD, NursingHome],
  // scale: {x: 2, y: 2},
  // scaleMode: 1 // 0: exact, 1: fill, 2: contain, 3: resize
})

