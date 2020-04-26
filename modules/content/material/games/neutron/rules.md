---
updated: 2020-04-23
---

{GAME} has 2 boards and setups:

<div class="md-2col">
{SETUP}
{SETUP:name=paperneutron,board=paperneutron}
</div>

Regular to the left, the Paper Neutron variant to the right.

All units can {CMND} in 8 directions by moving as far as possible until they hit another unit or the board edge.

On their turn, players must first {CMND} the neutral {UNIT:who=0} (both neutrals if playing the Paper Neutron variant) and then one of their own {UNIT}.

Except for the very first turn where {PLR:who=1} just moves one of her own {UNIT:who=1}.

After completing all slides, you...

- lose by {ENDGAME:name=suicide} if you had to {CMND} a {UNIT:who=0} into the opponent base
- win by {ENDGAME:name=goal} if you manage to {CMND} a {UNIT:who=0} into your own base
- win by {ENDGAME:name=starvation} if your opponent cannot complete her following turn
