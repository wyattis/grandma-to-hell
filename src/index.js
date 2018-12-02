import 'phaser'
import Splash from "./scenes/Splash"
import NursingHome from "./scenes/NursingHome"
import config from './config'
import TilemapAnimationPlugin from './plugins/TilemapAnimationPlugin'

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'grandma-from-hell',
  // transparent: true,
  width: config.tileSize * 22 * config.zoom,
  height: config.tileSize * 14 * config.zoom,
  pixelArt: true,
  plugins: {
    scene: [
      { key: 'tilemapAnimation', plugin: TilemapAnimationPlugin, mapping: 'tilemap' }
    ]
  },
  scene: [Splash, NursingHome],
  // scale: {x: 2, y: 2},
  // scaleMode: 1 // 0: exact, 1: fill, 2: contain, 3: resize
})

