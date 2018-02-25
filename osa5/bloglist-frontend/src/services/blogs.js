import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (object) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, object, config)
  return response.data
}

export default { getAll, setToken, create }