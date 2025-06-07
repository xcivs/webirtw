import axios from 'axios'

const api = axios.create({
  baseURL: '/src/data', // Папка, где хранятся JSON-файлы
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
