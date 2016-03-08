

-----------



Highlevel TODO

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
 [ ] Add highlight. it really would be nice, especially for formation win conditions


---------

LAYERS, split for perf and ease of reset. Into:

*    BOARD
     *    board
     *    dark
     *    light
*    TERRAIN
     *    personalised variants
*    UNITS
     *    rebuilt per turn (?)
*    ARTIFACTS
     *    cleared after command (?)


In order to accomplish this we need to...

*    fix generate.addtolayer
*    fix prep.addfromdedf
*    ...?




 -------------------- unit mutations?

 mark, no need
 but after command, always.
 shallowcopy before, then shallowfix for each manipulation?


 mutate layers? would involve moving between bowls. loop through all. crude.
