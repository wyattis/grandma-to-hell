import {InputType, UnifiedInputConfig} from '../plugins/UnifiedInputTypes'

export enum Buttons {
  jump = 'jump',
  interact = 'interact',
  throwOrPickup = 'throwOrPickup',
  up = 'up',
  left = 'left',
  right = 'right',
  down = 'down'
}

const KEYBOARD = InputType.KEYBOARD
const KeyCodes = Phaser.Input.Keyboard.KeyCodes
// TODO: Back this up with persistent storage
export default {
  buttons: {
    [Buttons.jump]: {
      type: KEYBOARD,
      key: KeyCodes.SPACE
    },
    [Buttons.interact]: {
      type: KEYBOARD,
      key: KeyCodes.J
    },
    [Buttons.throwOrPickup]: {
      type: KEYBOARD,
      key: KeyCodes.K
    },
    [Buttons.up]: [{
      type: KEYBOARD,
      key: KeyCodes.W
    }, {
      type: KEYBOARD,
      key: KeyCodes.UP
    }],
    [Buttons.down]: [{
      type: KEYBOARD,
      key: KeyCodes.S
    }, {
      type: KEYBOARD,
      key: KeyCodes.DOWN
    }],
    [Buttons.left]: [{
      type: KEYBOARD,
      key: KeyCodes.A
    }, {
      type: KEYBOARD,
      key: KeyCodes.LEFT
    }],
    [Buttons.right]: [{
      type: KEYBOARD,
      key: KeyCodes.D
    }, {
      type: KEYBOARD,
      key: KeyCodes.RIGHT
    }]
  }
} as UnifiedInputConfig