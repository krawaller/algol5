---
updated: 2020-05-04
---

{GAME} is played on an initially empty {DIM} board.

Players take turn to place {UNIT} on an empty square, until the board is filled.

A newly placed {UNIT} can turn adjacent opponents into {UNIT:who=0} in two ways:

- `intrusion`: If placed between two opponents, on a single line, those opponents are neutralised
- `encircling`: If an opponent is now surrounded on two sides, on a single line, that opponent is neutralised

Multiple simultaneous neutralisations are possible.

<div class="md-example">
Here {PLR:who=2} places {UNIT:group=pawns,who=2,at=b2}, neutralising {UNIT:group=pawns,who=1,at=b1}, {UNIT:group=pawns,who=1,at=b3} and {UNIT:group=pawns,who=1,at=c2}.
  <div class="md-2col">
{ARR:name=example1before,from=a1,to=d3}
{ARR:name=example1after,from=a1,to=d3}
  </div>
</div>

To prevent the corner squares from being invulnerable, `intrusion` and `encircling` happens at a 90&deg; angle instead of a line for them.

<div class="md-example">
Below {PLR:who=1} places {UNIT:group=pawns,who=1,at=a1}, neutralising {UNIT:group=pawns,who=2,at=a2} and {UNIT:group=pawns,who=2,at=b1} through a corner <code>intrusion</code>.
  <div class="md-2col">
{ARR:name=cornerintrusionbefore,from=a1,to=d2}
{ARR:name=cornerintrusionafter,from=a1,to=d2}
  </div>
And here is an example of a corner <code>encircling</code> where {PLR:who=2} places {UNIT:group=pawns,who=2,at=f2} to neutralise {UNIT:group=pawns,who=1,at=f1}.
  <div class="md-2col">
{ARR:name=cornerencirclingbefore,from=c1,to=f2}
{ARR:name=cornerencirclingafter,from=c1,to=f2}
  </div>
</div>

When the board is full, the player with the most {UNIT} wins!
