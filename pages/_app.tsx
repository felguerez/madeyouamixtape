import * as React from "react";
import NextApp from "next/app";
import { CacheProvider } from "@emotion/core";

// Use only { cache } from 'emotion'. Don't use { css }.
import { cache } from "emotion";

import { globalStyles } from "../shared/styles";
import Layout from "../components/layout";

export default class App extends NextApp {
  render() {
    const { Component, pageProps, router } = this.props;
    const { pathname } = router;
    return (
      <CacheProvider value={cache}>
        {globalStyles}
        <Layout isHome={pathname === "/"}>
          <Component {...pageProps} />
        </Layout>
      </CacheProvider>
    );
  }
}
