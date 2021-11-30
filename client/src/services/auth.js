import axios from 'axios';

const API_URL = '/api/auth/';

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
}

function login(username, password) {
  return axios
    .post(`${API_URL}login/local`, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem(
          'currentUser',
          JSON.stringify(response.data.token)
        );
      }
      return response.data;
    });
}

const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'));

export const auth = {
  login,
  logout,
  getCurrentUser,
};

export default auth;
