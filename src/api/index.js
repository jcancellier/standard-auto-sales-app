import axios from './axiosConfig';

export const loginWithUserIdAndLastName = (id) => {
  return new Promise((resolve, reject) => {
    axios.get('/salesperson/' + id)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response.data.message));
  })
}
