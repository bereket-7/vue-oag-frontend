import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8082/api', 
  headers: {
    'Content-Type': 'application/json',

  }
});

instance.interceptors.request.use(
  async (config) => {
    if (await checkTokenExpiration()) {
      const token = localStorage.getItem('token');
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function checkTokenExpiration() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const tokenData = parseToken(token);
      const expirationTimestamp = tokenData.exp * 1000; 
      const currentTimestamp = Date.now();

      if (currentTimestamp > expirationTimestamp) {
        localStorage.removeItem('token');
        window.location.href = '/login'; 
        return false;
      }
    } catch (error) {
      localStorage.removeItem('token');
      window.location.href = '/userLogin'; 
      return false;
    }
  } else {
    window.location.href = '/userLogin'; 
    return false;
  }
  return true;
}

function parseToken(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export default instance;
