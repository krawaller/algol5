import addCore from './core'
import addGenerate from './generate'
import addGenerateWalker from './generate_walker'
import addFlowLayers from './flow_layers'
import addUtils from './utils'


let o = {}

addCore(o)
addGenerate(o)
addGenerateWalker(o)
addFlowLayers(o)
addUtils(o)

export default o