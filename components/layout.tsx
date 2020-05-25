import Head from "next/head";
import Header from "./header";
import styled from "@emotion/styled";
import { ReactNode } from "react";

type Props = {
  isHome: boolean;
  children: ReactNode;
};
const Layout = ({ isHome, children }: Props) => (
  <>
    <Head>
      <link
        rel="preload"
        href="https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Book.3466e0ec.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Bold.8d0a45cc.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://open.scdn.co/cdn/fonts/CircularSpUIv3T-Light.afd9ab26.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <title>Made You A Mixtape</title>
    </Head>

    <Header />

    <main>
      <Container isHome={isHome}>{children}</Container>
    </main>
  </>
);

const Container = styled.div<{ isHome: boolean }>`
  max-width: ${({ isHome }) => (isHome ? "100%" : "68.75rem")};
  margin: 0 auto;
  padding: ${({ isHome }) => (isHome ? `0` : `2rem 1.25rem`)};
`;

export default Layout;
