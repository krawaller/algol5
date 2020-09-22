---
updated: 2020-09-19
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

Each player has 4 {UNIT} on the board and 12 in reserve.

Players take turn to perform any number of these commands:

- {CMND:name=hop} a {UNIT} over an orthodiagonally adjacent _friend_ into an empty square.
- {CMND:name=jump} a {UNIT} over an orthogonally adjacent _enemy_ into an empty square, capturing the jumped enemy into your reserve.
- {CMND:name=spawn} a {UNIT} from your reserve in an empty square orthodiagonally adjacent to the last {CMND:name=hop}

There are some rules for the flow of a turn:

- You will only ever {CMND:name=hop} and {CMND:name=jump} with a single {UNIT} during your turn
- If you have a 2x2 formation of {UNIT} at the start of your turn, you must move with one of those
- You can {CMND:name=hop} and {CMND:name=jump} multiple times
- Once you make a {CMND:name=jump} you may no longer {CMND:name=hop}
- If you don't make a {CMND:name=jump} you must end your turn with a {CMND:name=spawn}
- After {PLR:who=2}'s first turn she must immediately move again. Neither sequence may contain {CMND:name=jump}.

<div class="md-example">

Here are some examples of valid turns:

<ul>
  <li>{CMND:name=hop} {CMND:name=spawn}</li>
  <li>{CMND:name=hop} {CMND:name=hop} {CMND:name=hop} {CMND:name=spawn}</li>
  <li>{CMND:name=jump}</li>
  <li>{CMND:name=hop} {CMND:name=hop} {CMND:name=jump} {CMND:name=jump}</li>
</ul>

And {PLR:who=2}'s first turn likely looks like this:

<ul>
  <li>{CMND:name=hop} {CMND:name=spawn} {CMND:name=hop} {CMND:name=spawn}</li>
</ul>

</div>

If your opponent would be unable to finish her next turn, you win by {ENDGAME:name=starvation}!

<div class="md-example">
This win condition means that if you have 0 in reserve at the start of your turn then you must {CMND:name=jump}, since you otherwise cannot affort to {CMND:name=spawn}.
</div>
