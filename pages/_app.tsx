import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux-app/store'
import { Head } from 'next/document'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, []) 

  return (
  <>
    <Head>
        <title>貸し借りDB</title>
    </Head>
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  </>
    
  )
}
export default MyApp
