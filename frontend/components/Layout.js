import NextLink from 'next/link'
import { useContext, useEffect, useState } from 'react'
import Loader from './Loader'
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
import {
  AccountCircle,
  DeleteSweep,
  ExitToApp,
  ExposurePlus1,
  Input,
  Person,
  PlusOne,
  Remove,
  RemoveTwoTone,
  Settings,
  ShoppingCartOutlined,
  ShoppingCartSharp,
  ViewList,
} from '@material-ui/icons'
import useStyles from '../utils/styles'
import { Store } from '../utils/Store'
import { useCart } from 'react-use-cart'
import UserContext from '../context/user/UserContext'
import { useRouter } from 'next/router'
import ProductContext from '../context/product/productContext'
import CategoryContext from '../context/category/categoryContext'
import OrderContext from '../context/orders/orderContext'

const Layout = ({ children }) => {
  const router = useRouter()

  const uContext = useContext(UserContext)
  const { user, logout, userLoading } = uContext
  // for Product context
  const pContext = useContext(ProductContext)
  const { productsLoading } = pContext
  // for category context
  const cContext = useContext(CategoryContext)
  const { categoriesLoading } = cContext
  // for product context
  const oContext = useContext(OrderContext)
  const { ordersLoading } = oContext

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
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null)
    if (redirect) {
      router.push(redirect)
    }
  }
  const logoutClickHandler = () => {
    setAnchorEl(null)
    logout()
  }

  const tiggleDarkMode = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {ordersLoading ||
        productsLoading ||
        userLoading ||
        (categoriesLoading && <Loader />)}
      <AppBar position="sticky" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/" passHref>
            <a>
              <Typography className={classes.brand}>
                <ShoppingCartOutlined /> ShoppersCart
              </Typography>
            </a>
          </NextLink>
          <div className={classes.grow}></div>
          <div>
            <Switch checked={darkMode} onChange={tiggleDarkMode} />

            <NextLink href="/cart" passHref>
              <Link>
                {cartItems > 0 ? (
                  <Badge badgeContent={cartItems} color="secondary">
                    Cart <ShoppingCartSharp />
                  </Badge>
                ) : (
                  <>
                    Cart
                    <ShoppingCartSharp />
                  </>
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
                    {user.name} <Person />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}>
                    <MenuItem
                      onClick={e => loginMenuCloseHandler(e, '/profile')}>
                      <AccountCircle /> Profile
                    </MenuItem>
                    <MenuItem
                      onClick={e => loginMenuCloseHandler(e, '/order-history')}>
                      <ViewList /> Order History
                    </MenuItem>
                    {user.role === 'admin' && (
                      <MenuItem
                        onClick={e => loginMenuCloseHandler(e, '/admin')}>
                        <Settings /> Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>
                      <ExitToApp /> Logout
                    </MenuItem>
                  </Menu>
                </>
              </>
            ) : (
              <NextLink href="/login" passHref>
                <Link>
                  Login <Input />
                </Link>
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
