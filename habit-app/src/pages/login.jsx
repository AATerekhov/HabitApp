import React from 'react'
import { signinRedirect } from '../services/userService'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function Login() {
  const user = useSelector((state) => state.auth.user)
  function login() {
    signinRedirect()
  }

  return (
    (user) ?
    
      (<Navigate replace to="/" />)
      :
      (
        <div>
          <h1>Привет!</h1>
            <p>Добро пожалова на Habits tracker.</p>
            <p>На платформе вы можете тренировать свои привычки 🏇</p>
            <p>Для начала перейдите во вкладку Rooms 🏠</p>
            <button onClick={() => login()}>Login</button>
            <p>💡 <strong>Детали: </strong><em>Веб-сервис разработан в учебных целях для прохождения курса ASP.NET Core разработчик в OTUS🎓</em></p>

            <p><a target='_blank' rel='noopener noreferrer' href='https://github.com/AATerekhov/OtusASPNET2024_08Team4'>Github Repo</a></p>     
        </div>
      )
  )
}

export default Login
