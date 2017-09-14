import addCore from './core'
import addFlowLayers from './flow_layers'
import addUtils from './utils'


let o = {}

addCore(o)
addFlowLayers(o)
addUtils(o)

export default o