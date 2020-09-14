#!/bin/bash 
gameId="$1"
what="$2"
opts=("analyze" "compile" "graphics" "demo" "content" "pics" "pages" "link" "list")
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
    npm run makeComposites;
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
    cd ../payloads;
    npm run makeGameAboutArticle "$gameId"
    npm run makeGameRulesArticle "$gameId"
  fi

  if [ "$what" = "list" ] || [ "$what" = "graphics" ] ||[ "$what" = "" ]; then
    cd ../payloads;
    npm run updateCompositeId;
    npm run makeComposites;
    npm run makeGameListing; # have to update all game listings when we mess with composite 
  fi

  if [ "$what" = "list" ] || [ "$what" = "" ]; then
    cd ../payloads;
    npm run makeTagArticle; # to get game included in all tag articles 
  fi

  if [ "$what" = "pics" ] || [ "$what" = "graphics" ] || [ "$what" = "list" ] || [ "$what" = "" ]; then
    cd ../ui;
    npm run importGameImages "$gameId";
    npm run importCompositeImages;
    cd ../next;
    npm run getStatic;
  fi

    if [ "$what" = "pages" ] || [ "$what" = "" ]; then
    cd ../next;
    npm run makeGamePages "$gameId";
  fi
fi
