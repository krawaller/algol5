import lib from '../src/codegen'

import fs from 'fs'

let preProcess = {
  preProcess(game){
    game = this.mapFlow(game)
    //fs.writeFileSync(__dirname+'/processed/'+game.meta.name+'.json',JSON.stringify(game))
    return game
  },
  mapFlow(game){
    let actions = [{name:'start',def:game.startTurn,type:'start',path:[]}]
    while(actions.length){
      let {name,def,type,path} = actions.shift();
      (def.link ? [def.link] : []).concat(def.links || []).reduce((mem,l)=>mem.concat(lib.possibilities(l)),[]).filter(l=>l!=='endturn').forEach(targetName=>{
        let targetType = game.marks[targetName] ? 'mark' : 'command'
        let targetDef = game[targetType+'s'][targetName]
        if (targetDef.flow){
          targetDef.flow = 'cyclic'
        } else {
          targetDef.flow = path.concat({name,type})
          actions.push({
            name: targetName,
            type: targetType,
            def: targetDef,
            path: path.concat({name,type})
          })
        }
      })
      if (name === 'selectfiretarget'){
        console.log("FIRETARGET",def.flow)
      }
    }
    return game
  }
}

export default preProcess