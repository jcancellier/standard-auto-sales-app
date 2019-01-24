import axios from 'axios'

const localURL = 'http://192.168.1.20:3000/api';
const herokuURL = 'http://standardautosales.herokuapp.com/api/'

const instance = axios.create({
  baseURL: localURL
});

export default instance;