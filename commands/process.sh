#!/bin/bash 
gameId="$1"
what="$2"
opts=("analyze" "compile" "graphics" "demo" "content" "pics")
allOpts=$( IFS=/ ; echo "<${opts[*]}>" )

if [ "$gameId" = "" ]; then
  echo "Usage: 'npm process <gameId>' or 'npm process <gameId> ${allOpts}'";
elif [ "what" != "" ] && [[ ! " ${opts[@]} " =~ " ${what} " ]]; then
  echo "Unknown option ${what}! Should be one of ${allOpts}";
else
  echo "Gonna process ${gameId} ${what}"

  cd modules/types # just so that we will always dip out of a module

  if [ "$what" = "analyze" ] || [ "$what" = "" ]; then
    cd ../games;
    npm run analyze "$gameId";
  fi

  if [ "$what" = "compile" ] || [ "$what" = "" ]; then
    cd ../logic;
    npm run compile "$gameId";
  fi

  if [ "$what" = "graphics" ] || [ "$what" = "" ]; then
    cd ../graphics;
    npm run makeGameGraphics "$gameId";
  fi

  if [ "$what" = "demo" ] || [ "$what" = "" ]; then
    cd ../battle;
    npm run makeDemo "$gameId";
  fi

  if [ "$what" = "content" ] || [ "$what" = "" ]; then
    cd ../content;
    npm run writeGame "$gameId";
  fi

  if [ "$what" = "pics" ] || [ "$what" = "" ]; then
    cd ../next;
    npm run importGameImages "$gameId";
  fi
fi
