import addCore from './core'
import addGenerate from './generate'
import addFlowLayers from './flow_layers'
import addUtils from './utils'


let o = {}

addCore(o)
addGenerate(o)
addFlowLayers(o)
addUtils(o)

export default o