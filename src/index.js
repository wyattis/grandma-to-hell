import 'phaser'
import Splash from "./scenes/Splash"
import HUD from "./scenes/HUD"
import config from './config'
import TilemapAnimationPlugin from './plugins/TilemapAnimationPlugin'
import Title from './scenes/Title'
import Introduction from './scenes/Introduction'
import Room0 from './scenes/Room0'
import Room1 from './scenes/Room1'
import Room2 from './scenes/Room2'
import Room3 from './scenes/Room3'
import GameOver from './scenes/GameOver'

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
  scene: [Splash, Title, Introduction, HUD, Room0, Room1, Room2, Room3, GameOver],
  // scale: {x: 2, y: 2},
  // scaleMode: 1 // 0: exact, 1: fill, 2: contain, 3: resize
})

