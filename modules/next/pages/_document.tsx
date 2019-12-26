import React from "react";
import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/components.css" />
          <link rel="stylesheet" href="/site.css" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <script>{hack}</script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

const hack = `
if (('standalone' in navigator) && navigator.standalone) {
  document.addEventListener('click', function(e) {
    var curnode = e.target
    while (!(/^(a|html)$/i).test(curnode.nodeName)) {
      curnode = curnode.parentNode
    }
    if ('href' in curnode
      && (chref = curnode.href).replace(document.location.href, '').indexOf('#')
      && (!(/^[a-z\+\.\-]+:/i).test(chref)
      || chref.indexOf(document.location.protocol + '//' + document.location.host) === 0)
    ) {
      e.preventDefault()
      document.location.href = curnode.href
    }
  }, false)
}
`;
