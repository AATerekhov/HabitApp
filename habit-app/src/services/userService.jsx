import { UserManager } from "oidc-client";

const config = {
  authority: `${import.meta.env.VITE_AUTH_URL}`,
  client_id: "wewantdoughnuts",
  redirect_uri: `${import.meta.env.VITE_APP_URL}/signin-oidc`,
  response_type: "id_token token",
  scope: "openid profile doughnutapi",
  post_logout_redirect_uri: `${import.meta.env.VITE_APP_URL}/signout-oidc`,
};

const userManager = new UserManager(config)

export function loadUserFromStorage() {     
  let user = userManager.getUser().then((user) => {
    if (!user) {
      console.log("user is not authenticated..!");
      return null;
    }
    return user;
  })
  .catch(console.error);
  return user;
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