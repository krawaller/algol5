Descent is played on a {DIM} board with the following setup:

{SETUP}

The players have 3 units each. {PLR:who=0} units represents unoccupied stacks. The various unit types represent different stack heights. These are shown in descending order below, from height 3 to height 0.

{ARR:name=levels,from=a1,to=d1,pad=false}

Every turn a player will {CMND:name=move} a unit to an adjacent unoccupied square with a maximum height difference of 1.

After moving the player must {CMND:name=dig} on any unoccupied stack adjacent to the {CMND:name=move} destination. Digging means lowering the stack height by 1. Level 0 {UNIT:group=lvl0,who=0} stacks can never be dug.

<div class="md-example">

See the scene to the left - {UNIT:at=b2,group=lvl2,who=1} can't move to {UNIT:at=c2,group=lvl0,who=0} since the height difference is 2. She also can't move to {UNIT:at=a1,group=lvl2,who=2} or {UNIT:at=b3,who=1,group=lvl3} since they are occupied.

<div class="md-2col">
{ARR:name=move1,from=a1,to=c3}
{ARR:name=dig1,from=a1,to=c3}
</div>

To the right is the situation after {PLR:who=1} chose to ascend to {POS:at=b1}. Now she can dig at {POS:at=a2}, {POS:at=b2} or {POS:at=c1}.

</div>

There are two win conditions:

- {ENDGAME:name=madeline} - you win if you arrange all 3 units in a row (including diagonals), and they are all on the same height.
- {ENDGAME:name=starvation} - you win if your opponent does not have a valid {CMND:name=move} and {CMND:name=dig} in her next turn.

Draws are not possible.
