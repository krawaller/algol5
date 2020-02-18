Chameleon is played on a [DIM] board with the following setup:

[SETUP]

Players take turn to move one of their [UNIT:group=knights,owner=12] or [UNIT:group=bishops,owner=12]:

- A [UNIT:group=knights,owner=12] moves like a chess knight or a chess king
- A [UNIT:group=bishops,owner=12] moves like a chess bishop or a chess king

Both units capture opponent units by replacement.

Here's the twist:

- When you move from a light square to a dark square or vice versa, the unit will become a [UNIT:group=knights,owner=12]
- When you move from light to light or dark to dark, the unit becomes a [UNIT:group=bishops,owner=12]

This can also be phrased like this:

- A [UNIT:group=knights,owner=12] becomes a [UNIT:group=bishops,owner=12] when it takes a diagonal "king" step
- A [UNIT:group=bishops,owner=12] becomes a [UNIT:group=knights,owner=12] when it takes an orthogonal "king" step

There are three win conditions:

- [ENDGAME:name=persistentInvader]: if you move a unit into the opponent's base, and she cannot kill it in her subsequent turn, you win!
- [ENDGAME:name=loneInvader]: if you have only 1 unit left and move it into the opponent's base, you immediately win even if the unit can be subsequently captured.
- [ENDGAME:name=starvation]: if you kill all opponent units, you immediately win

Draws are not possible, nor are long games!
