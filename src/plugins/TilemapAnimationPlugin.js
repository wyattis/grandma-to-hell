class TilemapAnimationPlugin extends Phaser.Plugins.BasePlugin {

  constructor (pluginManager) {
    super('TilemapAnimationPlugin', pluginManager)
  }

  init () {
    console.log('TilemapAnimationPlugin intialized')
  }

  addLayerAnimation (layer, animation) {
    const layerData = map.getLayer(layerId)
  }

}