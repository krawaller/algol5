import addCore from './core'
import addEffect from './effect'
import addGenerate from './generate'
import addFlow from './flow'

let o = {}

addCore(o)
addEffect(o)
addGenerate(o)
addFlow(o)

export default o