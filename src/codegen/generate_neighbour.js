
/*
applyneighbours
  findanddrawneighboursfromstart
    findanddrawsingleneighbour
    --
    findmanyneighbours
      findneighbourindir
        ?performdraw
    drawmanyneighbours
      performdraw
  drawneighbourstart
    performdraw
*/


export default C => Object.assign(C,{

  // ------------ NEIGHBOUR STUFF -----------

  applyneighbours: (O,def)=> {
    let ret = ''
    if (def.start){
      ret += 'var STARTPOS='+C.position(O,def.start)+'; '
      ret += C.findanddrawneighboursfromstart(O,def)
      ret += C.drawneighbourstart(O,def);
    } else {
      //ret += 'var neighbourstarts='+C.set(O,def.starts)+'; '
      //if (!C.contains(def.draw.neighbours))
      ret += 'for(var STARTPOS in '+C.set(O,def.starts)+'){'
      ret += C.findanddrawneighboursfromstart(O,def)
      ret += C.drawneighbourstart(O,def);
      ret += '} '
    }
    return ret;
  },

  // Used in applyneighbours
  // assumes STARTPOS
  findanddrawneighboursfromstart: (O,def)=> {
    def = def || {}
    let ret = ''
    if (def.dir){
      if (C.contains(def,['dir'])){
        ret += 'var DIR='+C.value(O,def.dir)+'; '
        ret += C.findanddrawsingleneighbour(O,def)
      } else {
        ret += C.findanddrawsingleneighbour({...(O||{}),usefordir:C.value(O,def.dir)},def)
      }
    } else {
      ret += C.findmanyneighbours(O,def);
      if (C.contains(def.draw,['neighbourcount'])){
        ret += 'var NEIGHBOURCOUNT=foundneighbours.length; '
        ret += C.drawmanyneighbours(O,def);
      }
    }
    return ret
  },

  // assumes startpos
  findmanyneighbours: (O,def)=> {
    def = def || {}
    let ret = ''
    let usedir = C.contains(def.draw && def.draw.neighbours,['dir'])
    let usecount = C.contains(def.draw,['neighbourcount'])
    ret += 'var neighbourdirs='+C.list(O,def.dirs)+'; ' // TODO - extract if not dynamic
    let predictednbrofdirs = C.listlength(def.dirs),
      nbrvar = predictednbrofdirs;
    if (!predictednbrofdirs){
      ret += 'var nbrofneighbourdirs=neighbourdirs.length; '
      nbrvar = 'nbrofneighbourdirs'
    }
    if (usecount){
      ret += 'var foundneighbours = []; '
      if (usedir){
        ret += 'var foundneighbourdirs=[]; '  
      }
    }
    ret += 'var startconnections = connections[STARTPOS]; '
    // TODO - unroll loop below
    ret += 'for(var dirnbr=0;dirnbr<'+nbrvar+';dirnbr++){'
    O = Object.assign({},O||{},{startconnections:'startconnections'})
    if (usedir){
      ret += 'var DIR=neighbourdirs[dirnbr]; '
      ret += C.findneighbourindir(O,def)
    } else {
      ret += C.findneighbourindir(O,def,'neighbourdirs[dirnbr]')
    }
    ret += '} '
    return ret;
  },


  // wants full neighbour def
  // assumes STARTPOS, DIR, foundneighbours
  findneighbourindir: (O,def,dirtouse)=> {
    def = def || {}
    let ret = ''
    let usedir = C.contains(def.draw && def.draw.neighbours,['dir'])
    let usecount = C.contains(def.draw,['neighbourcount'])
    ret += 'var POS='+(O && O.startconnections || 'connections[STARTPOS]')+'['+(dirtouse||'DIR')+']; '

    let conds = ['POS']
    if (def.condition) conds.push(C.boolean(O,def.condition))
    if (def.ifover) conds.push(C.set(O,def.ifover)+'[POS]')
    if (def.unlessover) conds.push('!'+C.set(O,def.unlessover)+'[POS]')
    ret += 'if ('+conds.join(' && ')+'){'
    //ret += 'if (POS'+(def.condition ? ' && '+C.boolean(O,def.condition) : '')+'){'
    if (usecount){
      ret += 'foundneighbours.push(POS); '
      if (usedir){
        ret += 'foundneighbourdirs.push(DIR); '
      }
    } else if (def.draw && def.draw.neighbours){
      ret += C.performdraw(O,def.draw.neighbours);
    }
    ret += '} '
    return ret
  },

  // assumes POS, foundneighbours, NEIGHBOURCOUNT
  // and foundneighbourdirs if used!
  drawmanyneighbours: (O,def)=> {
    def = def || {}
    let ret = ''
    if (def.draw && def.draw.neighbours){
      let usedir = C.contains(def.draw.neighbours,['dir']);
      ret += 'for(var neighbournbr=0; neighbournbr < NEIGHBOURCOUNT; neighbournbr++){'
      ret += 'POS=foundneighbours[neighbournbr]; '
      if (usedir){
        ret += 'var DIR=foundneighbourdirs[neighbournbr]; '
      }
      ret += C.performdraw(O,def.draw.neighbours)
      ret += '} '
    }
    return ret
  },

  // wants full neighbour def
  // assumes STARTPOS, DIR
  findanddrawsingleneighbour: (O,def)=> {
    let ret = ''
    ret += 'var POS=connections[STARTPOS]['+(O && O.usefordir || 'DIR')+']; '
    let conds = ['POS']
    if (def.condition) conds.push(C.boolean(O,def.condition))
    if (def.ifover) conds.push(C.set(O,def.ifover)+'[POS]')
    if (def.unlessover) conds.push('!'+C.set(O,def.unlessover)+'[POS]')
    ret += 'if ('+conds.join(' && ')+'){'
    if (C.contains(def.draw,['neighbourcount'])){
      ret += 'var NEIGHBOURCOUNT=1; '
    }
    if (def.draw && def.draw.neighbours){
      ret += C.performdraw(O,def.draw.neighbours);
    }
    ret += '} '
    return ret
  },

  drawneighbourstart: (O,def)=> {
    def = def || {}
    let ret = ''
    if (def.draw && def.draw.start){
      ret += C.performdraw({...(O||{}), useforpos: 'STARTPOS'},def.draw.start)
      /*if (C.contains(def.draw.start,['target'])){
        ret += 'POS=STARTPOS; '
        ret += C.performdraw(O,def.draw.start)
      } else {
        ret += C.performdraw(O,def.draw.start,'STARTPOS')
      }*/
    }
    return ret
  }
})
