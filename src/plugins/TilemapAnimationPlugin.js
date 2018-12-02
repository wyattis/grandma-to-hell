// Heavy influence from https://github.com/nkholski/phaser-animated-tiles/blob/master/src/plugin/main.js
export default class TilemapAnimationPlugin extends Phaser.Plugins.BasePlugin {

  constructor(scene, pluginManager) {
    super(scene, pluginManager)
    this.animationLayers = []
    this.isActive = false
    if (!scene.sys.settings.isBooted) {
      scene.sys.events.once('boot', this.boot, this)
    }
  }

  init () {
    console.log('TilemapAnimationPlugin initialized')
  }

  boot (systems) {
    systems.events.on('postupdate', this.postUpdate, this)
    systems.events.on('shutdown', this.shutdown, this)
    systems.events.on('destroy', this.destroy, this)
  }

  postUpdate (timestamp, delta) {
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

  updateLayer (tiles, frames) {
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
    this.isActive = false
    this.animationLayers = []
  }

  destroy () {
    this.animationLayers.length = 0
  }

  addLayerAnimation (layer, frames, fps, filterCb) {
    const animationLayer = {
      layer: layer,
      rate: 1000 / fps,
      frames,
      tiles: [],
      lastUpdateTimestamp: 0
    }

    // Build optimized animation frames
    for (let frame of frames) {
      const tileset = layer.tileset.find(tileset => tileset.name === frame.key)
      frame.gid = frame.frame + tileset.firstgid
    }

    // Filter the tiles based on a function
    this.animationLayers.push(animationLayer)
    this.isActive = true
    for (let row of layer.layer.data) {
      for (let tile of row) {
        if (tile.index > -1 ){
          const frame = frames.find(frame => frame.gid === tile.index)
          const frameIndex = frames.indexOf(frame)
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