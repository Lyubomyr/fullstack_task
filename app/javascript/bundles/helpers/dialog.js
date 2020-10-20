import vex from 'vex-js'
import vexDialog from 'vex-dialog'

vex.registerPlugin(vexDialog)
vex.defaultOptions.className = 'vex-theme-os'

export default vex.dialog
