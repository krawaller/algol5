import React from "react";
import Document, { Head, Main, NextScript } from "next/document";

const gaCode = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-169617160-1');`;

const gaScript = <script dangerouslySetInnerHTML={{ __html: gaCode }}></script>;

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-169617160-1"
          ></script>
          {gaScript}
          <link rel="stylesheet" href="/ui.css" />
          <meta property="og:site_name" content="Chessicals" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
