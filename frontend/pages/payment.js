import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import CheckoutWizard from '../components/CheckoutWizard'
import Meta from '../components/Meta'
import { Store } from '../utils/Store'
import useStyles from '../utils/styles'
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core'
import { useSnackbar } from 'notistack'

const Payment = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { state, dispatch } = useContext(Store)
  const { shippingAddress } = state
  const router = useRouter()
  const classes = useStyles()
  const [paymentMethod, setPaymentMethod] = useState('')
  useEffect(() => {
    if (!shippingAddress) {
      router.push('/shipping')
    } else {
      setPaymentMethod(
        typeof window !== 'undefined' &&
          localStorage.getItem('shoppersCart-paymentMethod')
      )
    }
  }, [])
  const submitHandler = e => {
    e.preventDefault()
    if (!paymentMethod) {
      enqueueSnackbar('Payment Method is required', { variant: 'error' })
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod })
      localStorage.setItem('shoppersCart-paymentMethod', paymentMethod)
      router.push('/placeOrder')
    }
  }

  return (
    <>
      <Meta title="Payment Method" />
      <CheckoutWizard activeStep={2} />
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}>
                <FormControlLabel
                  label="PayPal"
                  value="PayPal"
                  control={<Radio />}></FormControlLabel>
                <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio />}></FormControlLabel>
                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio />}></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={() => router.push('/shipping')}>
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </>
  )
}

export default Payment
