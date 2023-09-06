import { featureReloader, addQuickSettingsItems } from "../libs/utility.js"
import { UnsafeQuickToggle } from "../libs/unsafeQuickToggleHandler.js"

export class UnsafeQuickToggleFeature {
  load() {
    // setup reloader
    featureReloader.enableWithSettingKeys(this, [
      "add-unsafe-quick-toggle-enabled",
    ])

    // check is feature enabled
    if (!this.settings.get_boolean("add-unsafe-quick-toggle-enabled")) return
    global.context.unsafe_mode = this.settings.get_boolean("last-unsafe-state")

    // Add Unsafe Quick Toggle
    this.unsafeToggle = new UnsafeQuickToggle((state)=>this.settings.set_boolean("last-unsafe-state",state))
    addQuickSettingsItems([this.unsafeToggle])
  }

  unload() {
    // disable feature reloader
    featureReloader.disable(this)

    if (this.unsafeToggle) {
      this.unsafeToggle.destroy()
      global.context.unsafe_mode = false
    }
  }
}
