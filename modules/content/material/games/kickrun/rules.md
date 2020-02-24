Kick & run is played on a {DIM} board with the following setup:

{SETUP}

Players have home bases in opposite corners, and take turn to {CMND} a {UNIT:group=sidekickers} or {UNIT:group=runners}.

- {UNIT:group=sidekickers} move orthogonally towards the opponent base to an empty square, or captures by stepping northwest or southeast.
- {UNIT:group=runners} slides any number of empty squares in any direction that brings it closer to the enemy base.

<div class="md-example">

To the left {UNIT:group=sidekickers,at=b3,who=1} can step to {POS:at=b4} or {POS:at=c3}, or sidekick {UNIT:group=sidekickers,at=c2,who=2}!

<div class="md-2col">
{ARR:name=sidekicker}
{ARR:name=runner}
</div>

To the right you see the valid moves for {UNIT:group=runners,at=d5,who=2}. It can't go to {POS:at=e4} since that isn't closer to the {PLR:who=1} base.

</div>

A player wins by

- moving a {UNIT:group=runners} into the opponent base
- stalemating the opponent
