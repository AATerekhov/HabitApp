// authConfig.js
import { UserManager, WebStorageStateStore } from 'oidc-client';

const config = {
    authority: import.meta.env.VITE_AUTH_URL, // URL вашего Identity Server
    client_id: 'js', // Идентификатор клиента
    redirect_uri: `${import.meta.env.VITE_APP_URL}callback`, // URI для перенаправления после аутентификации
    response_type: 'code', // Тип ответа (code, id_token, token и т.д.)
    scope: 'openid profile', // Запрашиваемые области (scopes)
    post_logout_redirect_uri: import.meta.env.VITE_APP_URL, // URI для перенаправления после выхода
    //automaticSilentRenew: true, // Автоматическое обновление токена
    //silent_redirect_uri: `${import.meta.env.VITE_APP_URL}silent-renew.html`, // URI для автоматического обновления токена
    //filterProtocolClaims: true, // Фильтрация протокольных claims
    //loadUserInfo: true, // Загрузка информации о пользователе
    userStore: new WebStorageStateStore({ store: window.localStorage })
};

const userManager = new UserManager(config);

export default userManager;