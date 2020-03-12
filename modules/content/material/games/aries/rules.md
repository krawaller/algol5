---
updated: 2020-03-12
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

The player takes turn to {CMND} one of their 16 {UNIT}, who moves like chess rooks.

If they move onto an enemy {UNIT} then that {UNIT}, and all enemy {UNIT} in a line behind it, are pushed back. If the line ends with a friendly {UNIT} or board edge then the last {UNIT} in the line is killed.

<div class="md-example">

Here {PLR:who=1} is about to use {UNIT:at=f1,who=1} to push {UNIT:at=d1,who=2}.

{ARR:name=beforepush1,to=h1}

All {UNIT:who=2} are then pushed one step left except {UNIT:at=b1,who=2} who is squished against {UNIT:at=a1,who=1} and killed.

{ARR:name=afterpush1,to=h1}

</div>

A pushed {UNIT} may not push back at the {UNIT} who pushed it in the directly subsequent move.

The first player to get a unit into their opponent's starting corner is the winner!
