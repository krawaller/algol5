Go with the Floe is played on a {DIM} board with the following setup:

{SETUP}

{PLR:who=1} controls 2 {UNIT:group=seals,who=1} (seals) and {PLR:who=2} controls 2 {UNIT:group=bears,who=2} (polar bears). There are three different actions which players take turns to perform:

- Both {UNIT:group=seals,who=1} and {UNIT:group=bears,who=2} can {CMND:name=move} like a chess queen but only up to 2 spaces, to a free square. Squares that units leave and pass through are destroyed, represented by {UNIT:group=holes,who=0} (holes).

- They can also {CMND:name=jump} over an adjacent {UNIT:group=holes,who=0} to a free square beyond it.

- {PLR:who=2} can also opt to have her {UNIT:group=bears,who=2} {CMND:name=eat} an adjacent {UNIT:group=seals,who=1}, which will destroy both the {UNIT:group=bears,who=2} and the {UNIT:group=seals,who=1}.

There are two victory conditions:

- {ENDGAME:name=safeseal}: If a {UNIT:group=seals,who=1} is in an unreachable spot, {PLR:who=1} wins
- {ENDGAME:name=sealseaten}: If both {UNIT:group=seals,who=1} are eaten, {PLR:who=2} wins
