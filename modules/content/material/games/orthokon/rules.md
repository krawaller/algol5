---
updated: 2020-02-24
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

Players take turn to {CMND} a {UNIT} as far as it can go in any of the 8 directions. It is not allowed to stop halfway.

After moving, all orthogonally adjacent pieces become the colour of the current player.

<div class="md-example">

Here {PLR:who=2} opts to {CMND} {UNIT:at=b1,who=2} to {POS:at=d3}, taking over both {UNIT:at=c3,who=1} and {UNIT:at=d2,who=1}!

<div class="md-2col">
{ARR:name=beforemove1}
{ARR:name=aftermove1}
</div>

A good reply for {PLR:who=1} would be {UNIT:at=c1,who=1} to {POS:at=c2}.

</div>

You win if your opponent has no valid move on their next turn.
