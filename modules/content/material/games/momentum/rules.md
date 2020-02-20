Momentum is played on an initially empty [DIM] board. Players take turn to [CMND:name=drop] a [UNIT:group=stones,owner=12] onto the board.

Afterwards the momentum of the dropped unit travels outwards in all 8 directions, going through adjacent units, and the last dropped unit in each line will be pushed.

[ARR:name=beforepush1,from=a5,to=g7]

If [PLR:who=1] made a [CMND:name=drop] at [POS:at=d5] in this board state, this would be the result:

[ARR:name=afterpush1,from=a5,to=g7]

Both [UNIT:pos=b7,group=stones,owner=2] and [UNIT:pos=g5,group=stones,owner=1] were pushed off the board and killed, while [UNIT:pos=e6,group=stones,owner=1] was pushed to [POS:at=f7] and [UNIT:pos=b5,group=stones,owner=1] to [POS:at=a5].

If after dropping you have all 8 [UNIT:group=stones,owner=12] out on the board you immediately win!

Draws are not possible.
