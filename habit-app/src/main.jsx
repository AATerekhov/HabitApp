import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './app/Store'
import App from './App.jsx'
import userManager from './services/authConfig.jsx';

userManager.getUser().then((user) => {
  if (user && !user.expired) {
    console.log('User is already authenticated:', user);
  } else {
    console.log('User is not authenticated');
  }
});

const renderApp = () => createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <StrictMode>
        <App />     
      </StrictMode>
    </Provider> 
  </BrowserRouter>,
)
renderApp();
// UserService.initKeycloak(renderApp);
