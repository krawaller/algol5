---
id: "underthehood"
title: "Under the hood"
slug: "under_the_hood"
blurb: "A peek at the technology that powers Chessicals"
thumbnail: "fordthumb.png"
mainImage: "fordfocus.jpg"
sort: 50
created: "2020-04-10"
updated: "2020-04-10"
---

{PIC:name=fordfocus.jpg,cred=Photo & model by Dugald Cameron,credurl=https://www.flickr.com/photos/148759221@N04/28398503289/in/album-72157691530514171/,title=Under the hood}

{ME} is a pure web app, implemented with JavaScript (well, {EXTLINK:url=https://www.typescriptlang.org/,text=TypeScript}). All game logic lives inside the app, there is no server backend. This was one of the main motivations behind the original vision - to create an alternative to Zillions et al that didn't require installation or backend roundtrips.

#### TS-powered JSON

The games are defined through a JSON-based language. As you work on a game we generate TypeScript types on the fly, meaning you get game-specific code completion to help you out.

Here for example we're editing the {GAME:id=amazons} data file, and when we want to refer to a layer our editor can show us what the valid references are for this particular game:

{PIC:name=codecompletion.png,cred= ,title=Game-specific code completion}

#### Compiled JavaScript

In earlier generations the JSON definitions of a game was fed into the app, and voilà - now you can play the game. However, this meant that performance took a hit whenever we expanded the language grammar, which didn't scale.

The latest generation of {ME} therefore generates JavaSript code from each JSON definitions, writing code optimised for the inidividual games.

#### Custom content pipeline

To make adding contents easier we've created a {ME}-flavoured version of {EXTLINK:url=https://daringfireball.net/projects/markdown/syntax,text=Markdown}. Here for example is a peek at the source code for the {GAME:id=chameleon} rules description:

{PIC:name=contentpipeline.png,cred= ,title=Chessicals-flavoured Markdown}

#### Web app

Finally, this web app is built using {EXTLINK:url=https://reactjs.org/,text=React}, with a {EXTLINK:url=https://nextjs.org/,text=NextJS} layer on top.

{PIC:name=technologies.png,cred= ,title=Used technologies}
