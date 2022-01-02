import Meta from '../components/Meta'
import NextLink from 'next/link'
import {
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
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (user) router.push('/')
  }, [])

  const router = useRouter()
  const { redirect } = router.query // login?redirect=shipping

  // for user context
  const uContext = useContext(UserContext)
  const { login, user } = uContext

  const handleLogin = async ({ email, password }) => {
    // e.preventDefault()
    const isSuccess = await login(email, password)
    if (isSuccess) router.push(redirect || '/')
  }

  const classes = useStyles()
  return (
    <>
      <Meta title="Login" />
      <form className={classes.form} onSubmit={handleSubmit(handleLogin)}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'
                        : 'Password is required'
                      : ''
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              color="secondary">
              Login
            </Button>
          </ListItem>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Typography>
                Don't have an account?
                <NextLink
                  href={`/register?redirect=${redirect || '/'}`}
                  passHref>
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
