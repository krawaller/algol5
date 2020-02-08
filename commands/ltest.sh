#!/bin/bash 
gameId="$1"
echo "Gonna test logic of ${gameId}"

npx jest "modules/logic/test/generatedGameTests/${gameId}.test.ts"