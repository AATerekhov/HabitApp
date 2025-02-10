import React, { useEffect } from 'react'
import { signinRedirectCallback } from '../services/userService'
import { useNavigate } from 'react-router-dom'

function SigninOidc() {
  const navigate = useNavigate()
  useEffect(() => {
    async function signinAsync() {
      await signinRedirectCallback()
      navigate('/')
    }
    signinAsync()
  }, [navigate])

  return (
    <div>
      Redirecting...
    </div>
  )
}

export default SigninOidc
