

-----------

Highlevel TODO

RIGHTNOW

endturn stuff!
stomp!
copy!


STUFF

 [ ] Add floater generator
     * needed only for a few games
 [ ] Add offset generator
     * simple slight hack to neighbour
     * we're already adding offsets to boardconnections
 [d] Add foridin and forposin to effect
 [d] Delete `dead` groups? simplifies a lot!
     * use a var if u must count or whatever!
     * when kill, delete the unit entirely
     * easier to copy units and default unit groups!
     * speaking of, make unitgroups only use those that are actually used in battle! yeah?
     * need spawn to use NEXTID
     * maybe make an object:
     	kings: [units,kings],
     	queens: [units,]
 [d] Calculate initial terrain 
 [ ] Implement forced moves if opp/you only has 1 option!
 [ ] Implement CALC "layers", for example for Archimedes
 [ ] Also need multilayers, for example for Archers
 [ ] Add highlight. it really would be nice, especially for formation win conditions
 [d] Add ifover and unlessover to draw condition

FLOW
 [d] Instruction type. Universals + if
 [ ] add link to instruction
     * special for endturn, put logic right into the linking!
 [ ] Make a draw func for state. Is also plr specific, can output really nice obj!
 [ ] Markeffect function
     * just adds the mark from a presumed global (which will be a func arg)
 [ ] apply generators func
     * adds single or whole list of runGenerators. obs, needs if and ifelse and playercase!

------------


     ****** FLOW *******

Any runGenerator(s) inside `.endgame` will be run if we attempt to `link` to endturn.
Effects, however, will only be applied on a successful endturn.


------------


PASSCONTROL

CMND
     unpack statearg
     perform effects
     clear marks
     run generators
     set undo // if human
     clear removemarks // if human
     link

MARK
     unpack statearg
          MARKS
          
     add mark
     copy undo // if human
     copy & augment removemarks // if human
     run generators
     link



------------

flow part funcs

saveStep(id){
     steps[id] = {
          // all step-specific props
     }
}

depends on whether mark or cmnd!



move1(prevstep){
     unpack prevstep // utility?
          * new ARTIFACTS!
          * 
     perform stuff
          * new path
          * new id
          * apply effects
          * apply generators (?)
          * add potential links <--- figure out!
     save obj to steps!
}


