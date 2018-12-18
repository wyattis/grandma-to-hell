export enum InputType {
  KEYBOARD = 0,
  MOUSE = 1,
  MOUSE_BUTTON = 2,
  GAMEPAD_BUTTON = 3,
  GAMEPAD_ANALOG = 4
}

export interface InputMap {
  type: InputType,
  button: string
}

export interface KeyboardMapping extends InputMap {
  key: Phaser.Input.Keyboard.Key
}

export interface ButtonState {
  isDown: boolean
  isHeld: boolean
  isUp: boolean
  timeDown: integer
  timeUp: integer
  repeats: integer
}

export interface KeyboardButtonConfig {
  type: InputType.KEYBOARD
  key: Phaser.Input.Keyboard.Key | string | integer
}

export interface GamepadButtonConfig {
  type: InputType.GAMEPAD_BUTTON
  key: Phaser.Input.Gamepad.Button | string | integer
}

export type ButtonConfig = KeyboardButtonConfig|GamepadButtonConfig

export interface UnifiedInputConfig {
  buttons: {
    [key: string]: ButtonConfig[]|ButtonConfig
  }
}