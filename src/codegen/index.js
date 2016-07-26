import addCore from './core'
import addEffect from './effect'
import addGenerate from './generate'
import addGenerateFilter from './generate_filter'
import addGenerateNeighbour from './generate_neighbour'
import addGenerateWalker from './generate_walker'
import addFlowMark from './flow_mark'
import addFlowCmnd from './flow_cmnd'
import addFlowLink from './flow_link'
import addFlowLayers from './flow_layers'
import addFlowInstructions from './flow_instruction'
import addFlowStart from './flow_start'
import addFlowPackage from './flow_package'

let o = {}

addCore(o)
addEffect(o)
addGenerate(o)
addGenerateFilter(o)
addGenerateNeighbour(o)
addGenerateWalker(o)
addFlowMark(o)
addFlowCmnd(o)
addFlowLink(o)
addFlowLayers(o)
addFlowInstructions(o)
addFlowStart(o)
addFlowPackage(o)

export default o