import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';

const login = (username, password) => {
  const request = axios.post(baseUrl, {
    userName: username,
    password: password,
  });
  return request.then((response) => response.data);
};

export default { login };
