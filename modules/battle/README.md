# Battle module

This module will take the generated code from the `logic` module, and wrap it in an ergonomic API containing logic common to all games (like pruning dead branches, end turn commands, etc). This is done via the `npm run exportGameAPIs <gameId>` command. Typically you'll only need to run this once, when the game is initially created.

The battle module also contains the code to generate demos for games, via `npm run makeDemo <gameId>`. This you might need to rerun as you are working on a game.
