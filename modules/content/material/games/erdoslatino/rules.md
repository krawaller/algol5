---
updated: 2020-06-24
---

{GAME} is played on an initially empty {DIM} board.

There are 5 units, ranked level 1-5 from left to right like this:

{ARR:name=levels,from=a1,to=e1,pad=false}

Each turn, a player will place a new unit:

- {CMND:name=place1} - place a level 1 {UNIT:group=lvl1,who=0}
- {CMND:name=place2} - place a level 2 {UNIT:group=lvl2,who=0}
- {CMND:name=place3} - place a level 3 {UNIT:group=lvl3,who=0}
- {CMND:name=place4} - place a level 4 {UNIT:group=lvl4,who=0}
- {CMND:name=place5} - place a level 5 {UNIT:group=lvl5,who=0}

The only rule is, you may never place a unit in a row or column that already has a unit of that type. Think Sudoku!

If the game ends with the players unable to fill the board because of this rule, the last player to place a unit wins via {ENDGAME:name=starvation}.

But, if the board is completely filled, the player controlling the most columns win via {ENDGAME:name=columncount}.

This clever tiebreaker works like this:

- When you place a unit, if that forms an ascending ranking of 3 or more units in the column, you get control.
- It is ok to skip levels, so `1 3 4` would give you control.
- It is ok to have empty squares or even other units inbetween. `1 _ 4 3 5` gives control through 1, 3 and 5.
- {PLR:who=1} gets control for ascending rankings from the bottom of the board and up
- {PLR:who=2} gets control for ascending rankings from the top of the board and down
- Units in controlled columns become the colour of the controlling player
- Once a column is controlled it will stay controlled by that player
- It is possible to give the opponent control through careless placing
- If placing a unit would give _both_ players control, it goes to the active player

<div class="md-example">

Say we have the situation to the left:

<div class="md-3col">
{ARR:name=beforeplace}
{ARR:name=plr1placed}
{ARR:name=plr2placed}
</div>

If {PLR:who=1} places {UNIT:group=lvl3,at=c3,who=0}, she gets control via 2-3-4 (shown in the middle).

But if it is {PLR:who=2}'s turn and she places {UNIT:group=lvl5,at=c3,who=0}, she gets control via 1-4-5 (shown to the right).

</div>
