import axios from 'axios'

const localURL = 'http://192.168.1.20:3000/api';
const localURLCSUB = 'https://rotten-bullfrog-64.localtunnel.me/api'
const herokuURL = 'http://standardautosales.herokuapp.com/api/'

const instance = axios.create({
  baseURL: localURLCSUB
});

export default instance;