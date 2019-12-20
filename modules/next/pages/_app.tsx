import React from "react";
import App from "next/app";
import Router from "next/router";

if (process.env.NODE_ENV !== "production") {
  Router.events.on("routeChangeStart", url => {
    console.log("URL", url);
  });
  Router.events.on("routeChangeError", (err, url) => {
    console.log("URL ERROR", err, url);
  });
  Router.events.on("routeChangeComplete", () => {
    const path = "/_next/static/css/styles.chunk.css";
    const chunksNodes = document.querySelectorAll<HTMLAnchorElement>(
      `link[href*="${path}"]:not([rel=preload])`
    );
    console.log(chunksNodes);
    if (chunksNodes.length) {
      const timestamp = new Date().valueOf();
      chunksNodes[0].href = `${path}?ts=${timestamp}`;
    }
  });
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
