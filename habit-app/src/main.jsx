import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './app/Store'
import App from './App.jsx'
import UserService from "./services/UserService";


const renderApp = () => createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <StrictMode>
        <App />     
      </StrictMode>
    </Provider> 
  </BrowserRouter>,
)

UserService.initKeycloak(renderApp);
