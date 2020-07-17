---
updated: 2020-07-16
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

There are 4 different unit types:

- {UNIT:group=warriors} (warriors) can <code>reach</code> one step towards the enemy base, orthogonally or diagonally
- {UNIT:group=heroes} (heroes) can <code>reach</code> any number of unoccupied steps in any direction (like chess queen)
- {UNIT:group=barricades} (barricades) can <code>reach</code> one step in any direction (like chess king)
- {UNIT:group=tyrannos} (tyrannos) can <code>reach</code> one step in any direction (like chess king)

Each turn a player will select a unit and a square it can <code>reach</code> to either...

- {CMND:name=move} to the selected square
- {CMND:name=attack} the selected square, killing an enemy unit there but leaving the selected unit where it is

There are some special rules:

- No unit may ever move/attack diagonally unless they start on a dark square
- {UNIT:group=barricades} may never attack or be attacked
- {UNIT:group=heroes} may never stay on the central square (but they can move and shoot through it)
- A {UNIT:group=warriors} reaching the enemy base is promoted to a {UNIT:group=heroes}

Win by killing the enemy {UNIT:group=tyrannos}!

<div class="md-example">
The {UNIT:group=warriors} selected to the left can move diagonally since it is standing on a dark square.
<div class="md-2col">
{ARR:name=darkwarrior,from=b3,to=e4}
{ARR:name=lightwarrior,from=b3,to=e4}
</div>
But the {UNIT:group=warriors} selected to the right may not move diagonally (nor east since it is a warrior and east isn't closer to the enemy base)
</div>
