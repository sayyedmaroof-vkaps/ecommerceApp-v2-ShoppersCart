import Meta from '../components/Meta'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Grid,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core'
import useStyles from '../utils/styles'
import UserContext from '../context/user/UserContext'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()
  const { redirect } = router.query // login?redirect=shipping

  // for user context
  const uContext = useContext(UserContext)
  const { login, user } = uContext

  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleLogin = async e => {
    e.preventDefault()
    console.log(redirect)
    const isSuccess = await login(credentials.email, credentials.password)
    if (isSuccess) router.push(redirect || '/')
  }
  useEffect(() => {
    if (user) router.push('/')
  }, [])

  const classes = useStyles()
  return (
    <>
      <Meta title="Login" />
      <form className={classes.form} onSubmit={handleLogin}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              id="email"
              label="email"
              name="email"
              onChange={handleChange}
              inputProps={{ type: 'email' }}></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              id="password"
              label="password"
              name="password"
              onChange={handleChange}
              inputProps={{ type: 'password' }}></TextField>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              //   size="small"
              color="secondary">
              Login
            </Button>
          </ListItem>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Typography>
                Don't have an account?
                <NextLink href="/signup" variant="body2" passHref>
                  <Link> Register</Link>
                </NextLink>
              </Typography>
            </Grid>
          </Grid>
        </List>
      </form>
    </>
  )
}

export default Login
