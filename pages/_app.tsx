import * as React from "react";
import NextApp from "next/app";
import { CacheProvider } from "@emotion/core";
import { SwapProvider } from "../contexts/swap-context";

// Use only { cache } from 'emotion'. Don't use { css }.
import { cache } from "emotion";

import { globalStyles } from "../shared/styles";
import Layout from "../components/layout";

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <CacheProvider value={cache}>
        {globalStyles}
        <Layout>
          <SwapProvider>
            <Component {...pageProps} />
          </SwapProvider>
        </Layout>
      </CacheProvider>
    );
  }
}
