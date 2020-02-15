Gekitai is played on an initially empty [DIM] board. Each player has 8 offboard [UNIT:group=markers,owner=12], which they take turn to [CMND:name=drop] onto the board on any empty square.

A newly dropped unit will **push** adjacent units, unless there is another unit in the way behind it. Units pushed off the board are removed.

So if [PLR:who=1] were to [CMND:name=drop] at [POS:at=b2] in this board state...

[ARR:name=beforepush1,from=a1,to=f3]

...then this would be the result:

[ARR:name=afterpush1,from=a1,to=f3]

The [POS:at=a1] and [POS:at=a2] units were both pushed off board, and [POS:at=b3] was pushed to [POS:at=b4]. Nothing happened to [POS:at=c2], since the [POS:at=d2] unit blocks the push.

After a drop we check for the following in order:

1. If your opponent has 3 [UNIT:group=markers,owner=12] in a row (including diagonals) you lose by [ENDGAME:name=suicide].
1. If you have deployed all 8 [UNIT:group=markers,owner=12] you win by [ENDGAME:name=allout]
1. If you have 3 [UNIT:group=markers,owner=12] in a row you win by [ENDGAME:name=winline]

Draws are not possible.
