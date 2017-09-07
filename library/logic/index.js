import addCore from './core'
import addGenerate from './generate'
import addGenerateFilter from './generate_filter'
import addGenerateNeighbour from './generate_neighbour'
import addGenerateWalker from './generate_walker'
import addFlowLayers from './flow_layers'
import addFlowInstructions from './flow_instruction'
import addUtils from './utils'
import addAI from './flow_ai'


let o = {}

addCore(o)
addGenerate(o)
addGenerateFilter(o)
addGenerateNeighbour(o)
addGenerateWalker(o)
addFlowLayers(o)
addFlowInstructions(o)
addUtils(o)
addAI(o)

export default o