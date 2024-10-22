/* eslint-disable */
const AUTH_TOKEN = 'AUTH_TOKEN';
const USER_NAME = 'USER_NAME';

class LocalStorageAdapter {
  getToken() {
    return localStorage.getItem(AUTH_TOKEN);
  }

  setToken(value) {
    localStorage.setItem(AUTH_TOKEN, value);
  }

  isHaveToken() {
    return !!this.getToken();
  }

  getUsername() {
    return localStorage.getItem(USER_NAME);
  }

  setUsername(value) {
    localStorage.setItem(USER_NAME, value);
  }

  clear() {
    localStorage.clear();
  }
}

const LocalStorage = new LocalStorageAdapter();

export default LocalStorage;
