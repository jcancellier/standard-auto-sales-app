import axios from 'axios'

const localURL = 'http://192.168.1.20:3000/api';
const localURLMac = 'http://192.168.1.25:3000/api'
const jaelynHouseURL = 'http://192.168.0.8:3000/api'

// lt --port 8000 (use this to generate URL)
const localURLCSUB = 'https://nervous-lionfish-58.localtunnel.me/api'

const herokuURL = 'http://standardautosales.herokuapp.com/api/'

const instance = axios.create({
  baseURL: localURLCSUB
});

export default instance;
