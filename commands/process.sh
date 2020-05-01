#!/bin/bash 
gameId="$1"
what="$2"
opts=("analyze" "compile" "graphics" "demo" "content" "pics" "pages" "link")
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
    npm run renderGameActionShots "$gameId";
    cd ../payloads;
    npm run makeGameListing "$gameId";
  fi

  if [ "$what" = "link" ] || [ "$what" = "" ]; then
    cd ../payloads;
    npm run makeGameAboutArticle "$gameId";
  fi

  if [ "$what" = "demo" ] || [ "$what" = "" ]; then
    cd ../battle;
    npm run makeDemo "$gameId";
  fi

  if [ "$what" = "content" ] || [ "$what" = "" ]; then
    cd ../content;
    npm run writeGame "$gameId";
  fi

  if [ "$what" = "pics" ] || [ "$what" = "graphics" ] || [ "$what" = "" ]; then
    cd ../ui;
    npm run importGameImages "$gameId";
    cd ../next;
    npm run getStatic;
  fi

    if [ "$what" = "pages" ] || [ "$what" = "" ]; then
    cd ../next;
    npm run makeGamePages "$gameId";
  fi
fi
