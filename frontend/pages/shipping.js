import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import Meta from '../components/Meta'
import { useRouter } from 'next/router'
import useStyles from '../utils/styles'
import UserContext from '../context/user/UserContext'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { Store } from '../utils/Store'
import CheckoutWizard from '../components/CheckoutWizard'

const Shipping = () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const classes = useStyles()
  const router = useRouter()

  const { state, dispatch } = useContext(Store)
  const { shippingAddress } = state

  // for user context
  const uContext = useContext(UserContext)
  const { user } = uContext

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    })
    localStorage.setItem(
      'shoppersCart-shippingAddress',
      JSON.stringify({ fullName, address, city, postalCode, country })
    )
    router.push('/payment')
  }

  useEffect(() => {
    if (!user) router.push('/login?redirect=/shipping')
    setValue('fullName', shippingAddress.fullName)
    setValue('address', shippingAddress.address)
    setValue('city', shippingAddress.city)
    setValue('postalCode', shippingAddress.postalCode)
    setValue('country', shippingAddress.country)
  }, [])

  return (
    <>
      <Meta title="Shipping Address" />
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'Minimum 3 characters are required'
                        : 'Full Name is required'
                      : ''
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 10,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === 'minLength'
                        ? 'Minimum 10 characters are required'
                        : 'Address is required'
                      : ''
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === 'minLength'
                        ? 'Minimum 3 characters are required'
                        : 'City is required'
                      : ''
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  name="postalCode"
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === 'minLength'
                        ? 'Minimum 3 characters are required'
                        : 'Postal Code is required'
                      : ''
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === 'minLength'
                        ? 'Minimum 3 characters are required'
                        : 'Country is required'
                      : ''
                  }
                  {...field}></TextField>
              )}></Controller>
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </>
  )
}

export default Shipping
