import React from "react";
import Document, { Head, Main, NextScript } from "next/document";

const gaCode = `
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-169617160-1', 'auto');
  if(typeof window !== 'undefined' && window.location) {
    var p = window.location.href
      .replace(window.location.origin,"")
      .replace(/sid=[^&]*|&|m=/g, "")
      .replace(/\\/?\\?/, "/")
      .replace(/\\/$/, "")
      .replace(/^$/, "/")
    ga("set", "page", p)
  }
  ga("send", "pageview");`;
const gaScript = <script dangerouslySetInnerHTML={{ __html: gaCode }}></script>;

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          {gaScript}
          <link rel="stylesheet" href="/ui.css" />
          <link rel="stylesheet" href="/fonts/fonts.css" />
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
