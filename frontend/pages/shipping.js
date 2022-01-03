import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import UserContext from '../context/user/UserContext'

const Shipping = () => {
  const router = useRouter()

  // for user context
  const uContext = useContext(UserContext)
  const { user } = uContext

  useEffect(() => {
    if (!user) router.push('/login?redirect=/shipping')
  }, [])

  return (
    <div>
      <h1>Shipping screen</h1>
    </div>
  )
}

export default Shipping
