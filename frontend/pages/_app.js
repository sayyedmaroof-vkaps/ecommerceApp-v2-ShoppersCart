import { useEffect } from 'react'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { StoreProvider } from '../utils/Store'
import { CartProvider } from 'react-use-cart'
import UserState from '../context/user/UserState'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <StoreProvider>
      <UserState>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </UserState>
    </StoreProvider>
  )
}

export default MyApp
