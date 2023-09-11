import type { AppProps } from "next/app";
import {
  Box,
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Head from "next/head";
import Script from "next/script";

const theme = extendTheme(
  {
    colors: {
      brand: {
        main: "#EF6A20",
        50: "#FFFAF0",
        100: "#FEEBC8",
        200: "#FBD38D",
        300: "#F6AD55",
        400: "#ED8936",
        500: "#EF6A20",
        600: "#D95A10",
        700: "#C24B0F",
        800: "#AB3C0E",
        900: "#952C0D",
      },
    },
    components: {
      Button: {
        baseStyle: {
          fontWeight: "medium",
        },
      },
    },
    fonts: {
      heading: `'Open Sans', sans-serif`,
      body: `'Raleway', sans-serif`,
    },
  },
  withDefaultColorScheme({
    colorScheme: "brand",
  })
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-5651757169642458"
        async
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <Box minH="100vh">
        <Header />
        <Component {...pageProps} />
      </Box>
      <Footer />
    </ChakraProvider>
  );
}
