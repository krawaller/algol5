Coffee is played on an initially empty [DIM] board. Players take turn to place a [UNIT:group=soldiers,owner=12], trying to be the first to make 4 in a row (in any direction, including diagonals).

On her turn a player selects a neutral [UNIT:group=soldiers,owner=0] on the board to make into her own [UNIT:group=soldiers,owner=12]. Any other[UNIT:group=soldiers,owner=0] are removed. Next the player must choose whether to place new neutral [UNIT:group=soldiers,owner=0] on all free squares [CMND:name=uphill], [CMND:name=downhill], [CMND:name=horisontal] or [CMND:name=vertical] from the chosen unit. These new neutral units will then serve as placement options for the opponent! You cannot select a direction that doesn't yield any [UNIT:group=soldiers,owner=0].

On the very first turn of the game there are no [UNIT:group=soldiers,owner=0], so [PLR:who=1] gets to place a [UNIT:group=soldiers,owner=1] in any location.

[ARR:name=example1]

In this game [PLR:who=1] first placed at [POS:at=b2] and chose [CMND:name=uphill]. [PLR:who=2] then chose [POS:at=d4] and [CMND:name=horisontal]. Now [PLR:who=1] gets to pick between [POS:at=a4], [POS:at=b4], [POS:at=c4] or [POS:at=e4].

There are two endgame conditions:

- [ENDGAME:name=madeline]: If after placing a [UNIT:group=soldiers,owner=12] you have 4 in a row in any direction you immediately win.
- [ENDGAME:name=starvation]: If your opponent cannot place a unit and then give you valid options, you also win.
