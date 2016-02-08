
Highlevel TODO

 [ ] Add floater generator
     * needed only for a few games
 [ ] Add offset generator
     * simple slight hack to neighbour
     * we're already adding offsets to boardconnections





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
