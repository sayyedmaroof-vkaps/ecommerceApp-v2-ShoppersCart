import NextLink from 'next/link'
import { useContext, useEffect, useState } from 'react'
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
} from '@material-ui/core'
import useStyles from '../utils/styles'
import { Store } from '../utils/Store'
import { useCart } from 'react-use-cart'

const Layout = ({ children }) => {
  const { totalUniqueItems } = useCart()

  const [cartItems, setCartItems] = useState(0)
  useEffect(() => {
    setCartItems(totalUniqueItems)
  }, [totalUniqueItems])

  const { state, dispatch } = useContext(Store)

  const { darkMode } = state

  const classes = useStyles()

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  })

  const tiggleDarkMode = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography className={classes.brand}>ShoppersCart</Typography>
            </Link>
          </NextLink>
          <div className={classes.grow}></div>
          <div>
            <Switch checked={darkMode} onChange={tiggleDarkMode} />

            <NextLink href="/cart" passHref>
              <Link>
                {cartItems > 0 ? (
                  <Badge badgeContent={cartItems} color="primary">
                    Cart
                  </Badge>
                ) : (
                  'Cart'
                )}
              </Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>login</Link>
            </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography> Copyright &copy; NotesInfinity </Typography>
      </footer>
    </ThemeProvider>
  )
}

export default Layout
