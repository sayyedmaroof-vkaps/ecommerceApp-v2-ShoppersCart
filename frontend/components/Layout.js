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
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core'
import useStyles from '../utils/styles'
import { Store } from '../utils/Store'
import { useCart } from 'react-use-cart'
import UserContext from '../context/user/UserContext'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const router = useRouter()

  const uContext = useContext(UserContext)
  const { user, logout } = uContext

  const { totalUniqueItems, emptyCart } = useCart()

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
        main: '#2874f0',
      },
      secondary: {
        main: '#fb641b',
      },
    },
  })

  const [anchorEl, setAnchorEl] = useState(null)
  const loginClickHandler = e => {
    setAnchorEl(e.currentTarget)
  }
  const loginMenuCloseHandler = () => {
    setAnchorEl(null)
  }
  const logoutClickHandler = () => {
    setAnchorEl(null)
    logout()
    emptyCart()
  }

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
                  <Badge badgeContent={cartItems} color="secondary">
                    Cart
                  </Badge>
                ) : (
                  'Cart'
                )}
              </Link>
            </NextLink>
            {user ? (
              <>
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}>
                    {user.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}>
                    <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                    <MenuItem onClick={loginMenuCloseHandler}>
                      My account
                    </MenuItem>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              </>
            ) : (
              <NextLink href="/login" passHref>
                <Link>login</Link>
              </NextLink>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography> Copyright &copy; ShoppersCart </Typography>
      </footer>
    </ThemeProvider>
  )
}

export default Layout
