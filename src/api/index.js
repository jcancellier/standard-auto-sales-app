import axios from './axiosConfig';

const validateServerError = (err) => {
  return err.length > 0 ? err.response.data.message : 'Server Error'
}

export const loginWithUserIdAndLastName = (id) => {
  return new Promise((resolve, reject) => {
    axios.get('/salesperson/' + id)
      .then(res => resolve(res.data))
      .catch(err => reject(validateServerError(err)));
  })
}

export const fetchAllCustomers = () => {
  return new Promise((resolve, reject) => {
    axios.get('/customers')
      .then(res => resolve(res.data))
      .catch(err => reject(validateServerError(err)));
  })
}

export const fetchAllVehicles = () => {
  return new Promise((resolve, reject) => {
    axios.get('/vehicles')
      .then(res => resolve(res.data))
      .catch(err => reject(validateServerError(err)));
  })
}