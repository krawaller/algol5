import addCore from './core'
import addEffect from './effect'
import addGenerate from './generate'
import addGenerateFilter from './generate_filter'
import addFlow from './flow'

let o = {}

addCore(o)
addEffect(o)
addGenerate(o)
addGenerateFilter(o)
addFlow(o)

export default o