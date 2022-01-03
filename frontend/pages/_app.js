import { useEffect } from 'react'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { StoreProvider } from '../utils/Store'
import { CartProvider } from 'react-use-cart'
import UserState from '../context/user/UserState'
import OrderState from '../context/orders/OrderState'
import { SnackbarProvider } from 'notistack'
import { Zoom } from '@material-ui/core'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={4000}
      TransitionComponent={Zoom}>
      <StoreProvider>
        <UserState>
          <CartProvider>
            <OrderState>
              <Layout>
                <PayPalScriptProvider deferLoading={true}>
                  <Component {...pageProps} />
                </PayPalScriptProvider>
              </Layout>
            </OrderState>
          </CartProvider>
        </UserState>
      </StoreProvider>
    </SnackbarProvider>
  )
}

export default MyApp
