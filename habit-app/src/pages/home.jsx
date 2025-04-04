import React, { useState } from 'react'
import { signoutRedirect } from '../services/userService'
import { useSelector } from 'react-redux'
import * as apiService from '../services/casesService'
import { prettifyJson } from '../utils/jsonUtils'

function Home() {
  const user = useSelector((state) => state.auth.user)
  const [doughnutData, setDoughnutData] = useState(null)
  function signOut() {
    signoutRedirect()
  }

  async function getDoughnuts() {
    const doughnuts = await apiService.getDoughnutsFromApi()
    setDoughnutData(doughnuts)
  }

  return (
    <div>
      <h1>Habits tracker</h1>
      <p>Привет, {user}</p>
      <p>На платформе вы можете тренировать свои привычки 🏇</p>
      <p>Для начала перейдите во вкладку Rooms 🏠</p>

      <p>💡 <strong>Детали: </strong><em>Веб-сервис разработан в учебных целях для прохождения курса ASP.NET Core разработчик в OTUS🎓</em></p>

      <p><a target='_blank' rel='noopener noreferrer' href='https://github.com/AATerekhov/OtusASPNET2024_08Team4'>Github Repo</a></p>

    </div>
  )  
}

export default Home
