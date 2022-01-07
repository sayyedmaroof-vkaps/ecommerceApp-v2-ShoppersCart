import { useEffect } from 'react'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { StoreProvider } from '../utils/Store'
import { CartProvider } from 'react-use-cart'
import UserState from '../context/user/UserState'
import OrderState from '../context/orders/OrderState'
import ProductState from '../context/product/ProductState'
import { SnackbarProvider } from 'notistack'
import { Zoom } from '@material-ui/core'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import CategoryState from '../context/category/CategoryState'

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
        <CartProvider>
          <UserState>
            <CategoryState>
              <ProductState>
                <OrderState>
                  <Layout>
                    <PayPalScriptProvider deferLoading={true}>
                      <Component {...pageProps} />
                    </PayPalScriptProvider>
                  </Layout>
                </OrderState>
              </ProductState>
            </CategoryState>
          </UserState>
        </CartProvider>
      </StoreProvider>
    </SnackbarProvider>
  )
}

export default MyApp
