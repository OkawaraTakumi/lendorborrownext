import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { AppProps } from "next/app";
import * as React from "react";
import { Provider } from "react-redux";
import Header from "../components/templates/Header";
import { store } from "../redux-app/store";

import createEmotionCache from "../styles/createEmotionCache";
import theme from "../styles/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Header/>
            <Component {...pageProps} />
          </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}