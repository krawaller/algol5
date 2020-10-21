---
updated: 2020-10-21
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

Players take turn to either...

- {CMND:name=move} a unit like a chess knight
- {CMND:name=pass} the ball in an uninterrupted orthogonal or diagonal line to another unit. You may keep passing as long as you want and have valid receivers.

There are three unit types, dictating what is possible:

- A {UNIT:group=carriers} is currently carrying the ball. It cannot {CMND:name=move} but it may {CMND:name=pass} the ball to a friendly {UNIT:group=receivers}
- A {UNIT:group=receivers} can both {CMND:name=move} and receive a {CMND:name=pass} from {UNIT:group=carriers}
- A {UNIT:group=resters} is what a {UNIT:group=carriers} becomes after doing a {CMND:name=pass}. It cannot receive passes but may {CMND:name=move}, after which it becomes a {UNIT:group=receivers} and can receive passes again.

<div class="md-example">
In other words, when a {UNIT:group=carriers} makes a {CMND:name=pass} to a {UNIT:group=receivers}...

<ul>
<li>the {UNIT:group=carriers} becomes a {UNIT:group=resters}</li>
<li>the {UNIT:group=receivers} becomes a {UNIT:group=carriers}</li>
</ul>
</div>

There is a special "tournament" rule that we have also implemented: if you {CMND:name=move} adjacent (including diagonals) to the enemy {UNIT:group=carriers}, then in the next turn they must {CMND:name=pass} if able.

Win by getting your ball into the opponent base!

<div class="md-example">
Since the ball-carrying {UNIT:group=carriers} is immobile, this means you have to first {CMND:name=move} until you have a {UNIT:group=receivers} in the opponent base, and then make a {UNIT:group=carriers} do a {CMND:name=pass} to that {UNIT:group=receivers}!
</div>
