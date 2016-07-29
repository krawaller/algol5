

* add endgame step thing
* finish linking
* add turn hydrator
* add performcmnd func

* fix newunitid vs nextunitid

* O.name when start etc

* anyat doesnt need hasOwnProperty


* walker
  - walkedsquares, maybe dont need to save (walklength same)
  - stopreason, dont save needlessly
  - dir, always store in var to prevent silly lookup

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

----

