import { createContext, useReducer } from 'react'

export const Store = createContext()
const initialState = {
  darkMode: false,
  shippingAddress:
    typeof window !== 'undefined' &&
    localStorage.getItem('shoppersCart-shippingAddress')
      ? JSON.parse(localStorage.getItem('shoppersCart-shippingAddress'))
      : {},
  paymentMethod:
    typeof window !== 'undefined' &&
    localStorage.getItem('shoppersCart-paymentMethod')
      ? localStorage.getItem('shoppersCart-paymentMethod')
      : null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true }
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false }
    case 'SAVE_SHIPPING_ADDRESS':
      return { ...state, shippingAddress: action.payload }
    case 'SAVE_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.payload }
    default:
      return state
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
