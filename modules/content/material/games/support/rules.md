---
updated: 2020-10-10
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

The {UNIT:group=bases} are _bases_ and are never moved or captured.

Each turn a player with perform one of these two commands:

- {CMND:name=insert} a new {UNIT:group=soldiers} onto an edge space that is either empty or occupied by a friendly {UNIT:group=soldiers}. In case of the latter, the player must choose a direction to _push_ the blocking unit closer to the center, orthogonally or diagonally (so 3 possible directions). If there is another friendly {UNIT:group=soldiers} in that direction that too is pushed, and so on. Should there be an enemy {UNIT:group=soldiers} at the end of the line, that enemy is captured.

<div class="md-example">
We want to {CMND:name=insert} at {POS:at=c1} (leftmost pic). That means pushing northwest to {POS:at=b2} (middle pic) or northeast to {POS:at=e3}, killing the enemy there (rightmost pic).
<div class="md-3col">
{ARR:name=marked,from=b1,to=e3}
{ARR:name=pushleft,from=b1,to=e3}
{ARR:name=pushright,from=b1,to=e3}
</div>
We cannot push north since the {POS:at=c2} base is in the way.
</div>

- {CMND:name=move} a {UNIT:group=soldiers} that is orthodiagonally adjacent to a friendly {UNIT:group=bases}. It can move across any number of connected friendly {UNIT:group=soldiers}, to a square that's either empty or occupied by an enemy {UNIT:group=soldiers} who is then captured.

<div class="md-example">
If we wanted to {CMND:name=move} {UNIT:group=soldiers,who=1,at=c1} unit instead, here's where we could go:
<div>
{ARR:name=mover,from=a1,to=i3}
</div>
Note that {UNIT:group=soldiers,who=1,at=d2} would have the exact same {CMND:name=move} options.
</div>

There are two ways to win:

- {ENDGAME:name=killed18}: kill 18 enemy {UNIT:group=soldiers}
- {ENDGAME:name=tookcenter}: have 5 {UNIT:group=soldiers} in the center, lasting through the enemy turn
