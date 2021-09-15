import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/theme';
import { Provider } from 'react-redux';
import { store } from '../redux-app/store';


const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    const jssStyles: Element | null = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
          </ThemeProvider>
        </StylesProvider>
    </Provider>
  );
};

export default MyApp;