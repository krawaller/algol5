
* finish packager
* add endgame step thing
* finish linking
* add turn hydrator
* add performcmnd func


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