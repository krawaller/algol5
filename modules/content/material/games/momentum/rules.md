---
updated: 2020-02-24
---

{GAME} is played on an initially empty {DIM} board. Players take turn to {CMND:name=drop} a {UNIT} onto the board.

After the first {CMND:name=drop} by {PLR:who=1}, {PLR:who=2} can choose {CMND:name=pie} to take over the placed {UNIT:who=1}.

Afterwards the momentum of the dropped unit travels outwards in all 8 directions, going through adjacent units, and the last dropped unit in each line will be pushed.

<div class="md-example">

{ARR:name=beforepush1,from=a5,to=g7}

If {PLR:who=1} made a {CMND:name=drop} at {POS:at=d5} in the above board state, this would be the result:

{ARR:name=afterpush1,from=a5,to=g7}

Both {UNIT:at=b7,who=2} and {UNIT:at=g5,who=1} were pushed off the board and killed, while {UNIT:at=e6,who=1} was pushed to {POS:at=f7} and {UNIT:at=b5,who=1} to {POS:at=a5}.

</div>

If after dropping you have all 8 {UNIT} out on the board you immediately win!

Draws are not possible.
