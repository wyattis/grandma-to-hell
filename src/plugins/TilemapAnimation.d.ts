import '../types/phaser'
import TilemapAnimationPlugin from './TilemapAnimationPlugin'

export interface TilemapAnimationFrame {
  gid: number
  frame: number
}

export interface AnimationTile extends Phaser.Tilemaps.Tile {
  frameIndex: number
}

export interface AnimationLayer {
  lastUpdateTimestamp: number
  tiles: AnimationTile[]
  rate: number
  frames: TilemapAnimationFrame[]
  layer: Phaser.Tilemaps.DynamicTilemapLayer
  gid: number
}

export interface AnimationTileFilter {
  (frame: TilemapAnimationFrame, tile: AnimationTile): boolean
}

export interface TilemapScene extends Phaser.Scene {
  tilemap: TilemapAnimationPlugin
}

declare module 'TilemapAnimation' {
  namespace Phaser {
    class Scene {
      tilemap: TilemapAnimationPlugin
    }
  }
}