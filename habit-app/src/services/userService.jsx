import { UserManager } from "oidc-client";
import { storeUserError, storeUser} from '../reducers/userSlice';
import { useDispatch } from 'react-redux';
// import { storeUserError, storeUser } from '../actions/authActions'

const config = {
  authority: "https://localhost:5001",
  client_id: "wewantdoughnuts",
  redirect_uri: "http://localhost:3000/signin-oidc",
  response_type: "id_token token",
  scope: "openid profile doughnutapi",
  post_logout_redirect_uri: "http://localhost:3000/signout-oidc",
};

const userManager = new UserManager(config)

export async function loadUserFromStorage(store) { 
  const dispatch = useDispatch();
  try {
    let user = await userManager.getUser()
    if (!user) { return store.dispatch(storeUserError()) }
    dispatch(storeUser(user))
  } catch (e) {
    console.error(`User not found: ${e}`)
    dispatch(storeUserError())
  }
}

export function signinRedirect() {
  return userManager.signinRedirect()
}

export function signinRedirectCallback() {
  return userManager.signinRedirectCallback()
}

export function signoutRedirect() {
  userManager.clearStaleState()
  userManager.removeUser()
  return userManager.signoutRedirect()
}

export function signoutRedirectCallback() {
  userManager.clearStaleState()
  userManager.removeUser()
  return userManager.signoutRedirectCallback()
}

export default userManager