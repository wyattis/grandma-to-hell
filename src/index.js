import 'phaser'
import Splash from "./scenes/Splash"
import NursingHome from "./scenes/NursingHome";

const config = {
  type: Phaser.AUTO,
  parent: 'grandma-from-hell',
  transparent: true,
  scale: {
    mode: Phaser.DOM.CONTAIN,
    width: 800,
    height: 600,
    min: {
      width: 800,
      height: 600
    },
    max: {
      width: 1600,
      height: 1200
    }
  },
  pixelArt: true,
  scene: [Splash, NursingHome],
  // scale: {x: 2, y: 2},
  // scaleMode: 1 // 0: exact, 1: fill, 2: contain, 3: resize
}

const game = new Phaser.Game(config)

