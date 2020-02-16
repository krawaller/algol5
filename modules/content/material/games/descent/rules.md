Descent is played on a [DIM] board with the following setup:

[SETUP]

The players have 3 units each. [PLR:who=0] units represents unoccupied stacks. The various unit types represent different stack heights. These are shown in descending order below, from height 3 to height 0.

[ARR:name=levels,from=a1,to=d1,pad=false]

<div class="md-2col">
<div>
Every turn a player will [CMND:name=move] a unit to an adjacent unoccupied square with a maximum height difference of 1. Here the [POS:at=b2] [UNIT:group=lvl2,owner=1] can't move to the [POS:at=c2] [UNIT:group=lvl0,owner=0] stack since the height difference is 2. She also can't move to [POS:at=a1] or [POS:at=b3] since they are occupied.
</div>
[ARR:name=move1,from=a1,to=c3]
</div>

<div class="md-2col">
<div>
After moving the player must [CMND:name=dig] on an unoccupied stack adjacent to the [CMND:name=move] destination. Digging means lowering the height of the target stack by 1.
The height of the [CMND:name=move] destination does not matter, but level 0 [UNIT:group=lvl0,owner=0] stacks can never be dug. In our example, if [PLR:who=1] chose to ascend to [POS:at=b1], she could then dig at [POS:at=a2], [POS:at=b2] or [POS:at=c1].
</div>
[ARR:name=dig1,from=a1,to=c3]
</div>

There are two win conditions:

- [ENDGAME:name=madeline] - you win if you arrange all 3 units in a row (including diagonals), and they are all on the same height.
- [ENDGAME:name=starvation] - you win if your opponent does not have a valid [CMND:name=move] and [CMND:name=dig] in her next turn.

Draws are not possible.
