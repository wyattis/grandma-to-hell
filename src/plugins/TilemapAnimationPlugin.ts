// Heavy influence from https://github.com/nkholski/phaser-animated-tiles/blob/master/src/plugin/main.js
import {AnimationLayer, TilemapAnimationFrame, AnimationTile, AnimationTileFilter} from './TilemapAnimation'
export default class TilemapAnimationPlugin extends Phaser.Plugins.ScenePlugin {

  private animationLayers: AnimationLayer[] = []
  private isActive: boolean = false

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    // @ts-ignore
    super(scene, pluginManager)
    if (!scene.sys.settings.isBooted) {
      scene.sys.events.once('boot', this.boot, this)
    }
  }

  init () {
   console.log('TilemapAnimationPlugin.init')
  }

  // @ts-ignore
  boot (systems: Phaser.Scenes.Systems) {
    console.log('TilemapAnimationPlugin.boot')
    systems.events.on('postupdate', this.postUpdate, this)
    systems.events.on('shutdown', this.shutdown, this)
    systems.events.on('destroy', this.destroy, this)
  }

  postUpdate (timestamp: number, delta: number) {
    if (!this.isActive) return
    let i = this.animationLayers.length
    while (i--) {
      if (this.animationLayers[i].lastUpdateTimestamp === 0) {
        this.animationLayers[i].lastUpdateTimestamp = timestamp
        continue
      }
      if (timestamp - this.animationLayers[i].lastUpdateTimestamp >= this.animationLayers[i].rate) {
        this.animationLayers[i].lastUpdateTimestamp = timestamp
        this.updateLayer(this.animationLayers[i].tiles, this.animationLayers[i].frames)
      }
    }
  }

  updateLayer (tiles: AnimationTile[], frames: TilemapAnimationFrame[]) {
    let i = tiles.length
    while (i--) {
      tiles[i].frameIndex++
      if (tiles[i].frameIndex >= frames.length) {
        tiles[i].frameIndex = 0
      }
      tiles[i].index = frames[tiles[i].frameIndex].gid
    }
  }

  shutdown () {
    console.log('TilemapAnimationPlugin.shutdown')
    this.isActive = false
    this.animationLayers = []
  }

  destroy () {
    console.log('TilemapAnimationPlugin.destroy')
    this.animationLayers.length = 0
  }

  addLayerAnimation (layer: Phaser.Tilemaps.DynamicTilemapLayer, frames: AnimationFrameConfig[], fps: number, filterCb: AnimationTileFilter) {

    const animFrames: TilemapAnimationFrame[] = []

    // Build optimized animation frames
    for (let frame of frames) {
      let tileset: Phaser.Tilemaps.Tileset
      // @ts-ignore
      tileset = layer.tileset.find(ts => ts.name === frame.key)
      animFrames.push({
        gid: frame.frame as number + tileset.firstgid,
        frame: frame.frame as number
      })
    }

    const animationLayer: AnimationLayer = {
      layer: layer,
      rate: 1000 / fps,
      frames: animFrames,
      tiles: [],
      lastUpdateTimestamp: 0,
      gid: 0
    }

    // Filter the tiles based on a function
    this.animationLayers.push(animationLayer)
    this.isActive = true
    for (let row of layer.layer.data) {
      for (let tile of row) {
        if (tile.index > -1 ){
          const frame = animFrames.find(frame => frame.gid === tile.index)
          if (frame) {
            const frameIndex = animFrames.indexOf(frame)
            if (frameIndex > -1) {
              tile.frameIndex = frameIndex
              if ((!filterCb || (filterCb && filterCb(frame, tile)))) {
                animationLayer.tiles.push(tile)
              }
            }
          }
        }
      }
    }
  }

}