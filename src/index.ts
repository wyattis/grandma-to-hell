import 'phaser'
import Splash from './scenes/Splash'
import HUD from './scenes/HUD'
import TilemapAnimation from './plugins/TilemapAnimationPlugin'
import Title from './scenes/Title'
import Win from './scenes/Win'
import Introduction from './scenes/Introduction'
import Room0 from './scenes/Room0'
import Room1 from './scenes/Room1'
import Room2 from './scenes/Room2'
import Room3 from './scenes/Room3'
import Room4 from './scenes/Room4'
import GameOver from './scenes/GameOver'
import UnifiedInput from './plugins/UnifiedInput'

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'grandma-from-hell',
  // transparent: true,
  width: TILE_SIZE * WIDTH * ZOOM,
  height: TILE_SIZE * HEIGHT * ZOOM,
  // @ts-ignore
  pixelArt: true,
  plugins: {
    scene: [
      { key: 'tilemapAnimation', plugin: TilemapAnimation, mapping: 'tilemap' },
      { key: 'unifiedInput', plugin: UnifiedInput, mapping: 'io'}
    ]
  },
  scene: [Splash, Title, Introduction, HUD, Room0, Room1, Room2, Room3, Room4, GameOver, Win],
  // scale: {x: 2, y: 2},
  // scaleMode: 1 // 0: exact, 1: fill, 2: contain, 3: resize
})

