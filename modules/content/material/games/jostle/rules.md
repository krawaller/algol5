---
updated: 2020-03-01
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

Each turn players {CMND} one of their {UNIT} one orthogonal step to an empty square of higher value than the square they're leaving.

A square's value is defined as the number of orthogonally adjacent friends minus the number of orthogonally adjacent enemies.

If after jostling the opponent has no legal move, you win!

<div class="md-example">

To the left {PLR:who=1} can move {UNIT:at=b2,who=1} east since {POS:at=b2} is worth -1 (1 adjacent friend, 2 adjacent enemies) and {POS:at=c2} will be worth 0 (1 friend, 1 enemy). She could also move {UNIT:at=c3,who=1} there. {UNIT:at=a2,who=1} cannot move at all.

<div class="md-2col">
{ARR:name=jostle1,from=a1,to=d3}
{ARR:name=jostle2,from=a1,to=d3}
</div>

To the right, after {PLR:who=1} moved {UNIT:at=b2,who=1} to {POS:at=c2}, {PLR:who=2} can move {UNIT:at=b3,who=2} west or south (in both cases going from -2 to -1). She could also move {UNIT:at=d2,who=2} (-2) to {POS:at=d3} (-1) or {POS:at=d1} (0).

</div>
