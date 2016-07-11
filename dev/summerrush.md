`
Qode quality stuff - make DIR, START etc an option

DIR finished in neighbours
`



`
add start
add link to start, command and mark
add afterstep to command and mark

`
var turntree = {
  steps: {
    stepid: STEP,
    // more steps
  },
  canend: [stepid,stepid2, ...]
  blockedby: 'sth or undefined',
  links: {
    stepid: LINKCOLLECTION,
    // more links
  }
}

var step = {
  UNITDATA: {unitid: UNIT, ...}
  UNITLAYERS: LAYERCOLLECTION
  ARTIFACTS: LAYERCOLLECTION
  MARKS: { pos: markid, ... }
  nextunitid: int
  path: [...]
  stepid: 'fk-feskijg-feirg'
}


var linkcollection = { // action is cmnd or position
  action: LINK
}