import addCore from './core'
import addEffect from './effect'
import addGenerate from './generate'
import addGenerateFilter from './generate_filter'
import addGenerateNeighbour from './generate_neighbour'
import addGenerateWalker from './generate_walker'
import addFlow from './flow'
import addSeed from './seed'

let o = {}

addCore(o)
addEffect(o)
addGenerate(o)
addGenerateFilter(o)
addGenerateNeighbour(o)
addGenerateWalker(o)
addFlow(o)
addSeed(o)

export default o