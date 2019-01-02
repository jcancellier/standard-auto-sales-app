import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.1.8:3000/api'
});

export { instance as axios  };