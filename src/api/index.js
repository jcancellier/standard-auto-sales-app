import axios from './axiosConfig';

const validateServerError = (err) => {
  return err.length > 0 ? err.response.data.message : 'Server Error'
}

// Salesperson
export const loginWithUserIdAndLastName = (id) => {
  return new Promise((resolve, reject) => {
    axios.get('/salesperson/' + id)
      .then(res => resolve(res.data))
      .catch(err => reject(validateServerError(err)));
  })
}

// Customers
export const fetchAllCustomers = () => {
  return new Promise((resolve, reject) => {
    axios.get('/customers')
      .then(res => resolve(res.data))
      .catch(err => reject(validateServerError(err)));
  })
}

// Vehicles
export const fetchAllVehicles = () => {
  return new Promise((resolve, reject) => {
    axios.get('/vehicles')
      .then(res => resolve(res.data))
      .catch(err => reject(validateServerError(err)));
  })
}

// Sale
export const addSale = (req) => {
  const { customer_id, salesperson_id, vehicle_id, date, sale_price, odo_reading } = req;
  return new Promise((resolve, reject) => {
    axios.post('/sales', {
      customer_id,
      salesperson_id,
      vehicle_id,
      date,
      sale_price,
      odo_reading
    })
      .then(res => resolve(res.data))
      .catch(err => reject(validateServerError(err)));
  })
}

export const addCustomer = (req) => {

  const { 
    first_name,
    last_name,
    drivers_license,
    dob,
    issue_date,
    expiration_date,
    sex,
    street,
    city,
    state,
    zipcode
  } = req;

  return new Promise((resolve, reject) => {
    axios.post('/customers', {
      first_name,
      last_name,
      drivers_license,
      dob,
      issue_date,
      expiration_date,
      sex,
      street,
      city,
      state,
      zipcode
    })
      .then(res => resolve(res.data))
      .catch(err => reject(validateServerError(err)));
  })
}
