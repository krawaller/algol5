import addCore from './core'
import addEffect from './effect'
import addGenerate from './generate'
import addGenerateFilter from './generate_filter'
import addGenerateNeighbour from './generate_neighbour'
import addGenerateWalker from './generate_walker'
import addFlow from './flow'
import addFlowMark from './flow_mark'
import addFlowLayers from './flow_layers'

let o = {}

addCore(o)
addEffect(o)
addGenerate(o)
addGenerateFilter(o)
addGenerateNeighbour(o)
addGenerateWalker(o)
addFlow(o)
addFlowMark(o)
addFlowLayers(o)

export default o