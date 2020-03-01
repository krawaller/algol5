---
updated: 2020-03-01
---

{GAME} is played on an initially empty {DIM} board.

In their first turn players each {CMND:name=deploy} two {UNIT} anywhere on the board.

After that they take turns to {CMND:name=expand} a line of friendly units, doubling it's size. Expanding a "line" of 1 is allowed.

The extension is illegal if...

- it crosses the edge of the board
- it hits a friendly unit
- it hits an enemy belonging to an equal or longer line

If the extension meets a shorter enemy line, then...

- extend up to the first enemy
- the first enemy turns into {UNIT:who=0}

Play until someone cannot make a move, then the player with the most units wins!

<div class="md-example">

If {PLR:who=1} had the following line...

{ARR:name=before,from=a1,to=h1}

...she could {CMND:name=expand} left like this...

{ARR:name=left,from=a1,to=h1}

...or right like this:

{ARR:name=right,from=a1,to=h1}

</div>
