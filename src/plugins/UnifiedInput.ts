// TODO: Add gamepad mappings, add mouse mappings
import {ButtonConfig, ButtonState, InputType, KeyboardMapping, UnifiedInputConfig} from "./UnifiedInputTypes";

export default class UnifiedInputPlugin extends Phaser.Plugins.ScenePlugin {

  public buttons: {[key: string]: ButtonState} = {}
  private mappings: KeyboardMapping[] = []
  private isActive: boolean = false

  constructor(private scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager)
    if (!scene.sys.settings.isBooted) {
      scene.sys.events.once('boot', this.boot, this)
    }
  }

  /**
   * Add a button by name. A button can have one or more input methods assigned to it. Making it easy to use the same
   * logic for keyboard buttons and different types of gamepad buttons
   * @param button
   */
  public addButton (button: string): this {
    this.buttons[button] = {
      isDown: false,
      isHeld: false,
      isUp: true,
      timeDown: 0,
      timeUp: 0,
      repeats: 0
    }
    return this
  }

  /**
   * Map a keyboard key to a registered button
   * @param button
   * @param key
   */
  public mapKeyboard (button: string, key: Phaser.Input.Keyboard.Key | string | integer): this {
    if (!this.buttons[button]) {
      throw new Error(`Button,${button} must be added before if can be mapped`)
    }
    this.mappings.push({
      button: button,
      type: InputType.KEYBOARD,
      key: this.scene.input.keyboard.addKey(key)
    })
    return this
  }

  /**
   * Map a gamepad button to a registered button
   * @param button
   * @param key
   */
  public mapGamepad (button: string, key: Phaser.Input.Gamepad.Button | string | integer): this {
    throw new Error('mapGamepad not supported yet')
    return this
  }

  /**
   * Import a UnifiedInput configuration file
   * @param config
   * @param shouldAddButtons
   */
  public importConfiguration (config: UnifiedInputConfig, shouldAddButtons: boolean = true): this {
    for (let button in config.buttons) {
      const cnf = config.buttons[button]
      const buttonConfigs = (Array.isArray(cnf) ? cnf : [cnf]) as ButtonConfig[]
      if (shouldAddButtons) {
        this.addButton(button)
      }
      for (let buttonConfig of buttonConfigs) {
        switch (buttonConfig.type) {
          case InputType.GAMEPAD_BUTTON:
            this.mapGamepad(button, buttonConfig.key)
            break
          default:
            this.mapKeyboard(button, buttonConfig.key)
        }
      }
    }
    console.error('Implement mouse/analog stick inputs')
    return this
  }



  private init() {
    console.log('UnifiedInput.init')
    this.isActive = true
  }

  // @ts-ignore
  private boot(systems: Phaser.Scenes.Systems) {
    console.log('UnifiedInput.boot')
    systems.events.on('preupdate', this.preUpdate, this)
    systems.events.on('shutdown', this.shutdown, this)
    systems.events.on('destroy', this.destroy, this)
  }

  private preUpdate(timestamp: integer, delta: number) {
    let button
    for (let mapping of this.mappings) {
      button = this.buttons[mapping.button]
      button.isDown = mapping.key.isDown
      button.isUp = mapping.key.isUp
      button.timeDown = mapping.key.timeDown
      button.timeUp = mapping.key.timeUp
      button.repeats = mapping.key.repeats
      if (mapping.key.isDown) break
    }
  }

  private shutdown() {
    console.log('UnifiedInput.shutdown')
    this.isActive = false
    this.scene.input.keyboard.shutdown()
  }

  private destroy() {
    console.log('UnifiedInput.destroy')
    this.scene.input.keyboard.shutdown()
  }

}