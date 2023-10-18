import axios from 'axios';

const http = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(request => {
  const token = localStorage.getItem('authToken')

  if (request.url === '/token')
    return request

  if (token) {
    request.headers.Authorization = `Token ${token}`
  } else {
    localStorage.clear()
    window.location.href = 'http://localhost:3000/login'
  }
  return request
})

export { http };
