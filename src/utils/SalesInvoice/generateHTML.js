import stylesheet from './style';
import CarImage from './CarImage';

export const generateReceipt = (customer, sale, vehicle, salesperson) => {
  const {
    street,
    city,
    state,
    zipcode,
    first_name,
    last_name
  } = customer;

  const {
    date,
    sale_price
  } = sale;
  
  const {
    color,
    date_received,
    odo_reading,
    year,
    vin
  } = vehicle;

  const {
    make,
    model
  } = vehicle.maker;

  const sales_tax = 0.07;

  return (
    `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>Example 2</title>
            <style>
                ${stylesheet}
            </style>
          </head>
          <body>
            <header class="clearfix">
              <div id="logo">
                <img src="${CarImage}">
              </div>
              <div id="company">
                <h2 class="name">Standard Auto Sales</h2>
                <div>112 Belle Terrace, Ste. C, Bakersfield, CA 93307</div>
                <div>(661)348-4042</div>
                <div><a href="mailto:sales@standardautosales.com">sales@standardautosales.com</a></div>
              </div>
              </div>
            </header>
            <main>
              <div id="details" class="clearfix">
                <div id="client">
                  <div class="to">INVOICE TO:</div>
                  <h2 class="name">${first_name} ${last_name}</h2>
                  <div class="address">${street}, ${city}, ${state} ${zipcode}</div>
                  <div class="email"><a href="mailto:${first_name}@hotmail.com">${first_name}@hotmail.com</a></div>
                </div>
                <div id="invoice">
                  <h1>Vehicle Sale Invoice</h1>
                  <div class="date">Date of Invoice: ${date}</div>
                  <div class="date">Due Date: 2019-12-31</div>
                </div>
              </div>
              <table border="0" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="no">#</th>
                    <th class="desc">DESCRIPTION</th>
                    <th class="unit">UNIT PRICE</th>
                    <th class="qty">QUANTITY</th>
                    <th class="total">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="no">01</td>
                    <td class="desc">
                      <h3 class="vehicle_title">${make} ${model}</h3>
                      <p>
                      <strong>Year:</strong> ${year}
                    </p>
                      <p>
                        <strong>VIN:</strong> ${vin}
                      </p>
                      <p>
                        <strong>Odometer Reading:</strong> ${odo_reading} miles
                      </p>
                      <p>
                        <strong>Color:</strong> ${color}
                      </p>
                      <p>
                      <strong>Date Received:</strong> ${date_received}
                    </p>
                    </td>
                    <td class="unit">$${sale_price}</td>
                    <td class="qty">1</td>
                    <td class="total">$${sale_price}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2"></td>
                    <td colspan="2">SUBTOTAL</td>
                    <td>$${sale_price.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colspan="2"></td>
                    <td colspan="2">TAX 7%</td>
                    <td>$${(sales_tax * sale_price).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colspan="2"></td>
                    <td colspan="2">GRAND TOTAL</td>
                    <td>$${((sales_tax * sale_price) + sale_price).toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
              <div id="employee_info">
                <p>
                  <strong>Sale fulfilled by Salesperson: </strong> ${salesperson.first_name} ${salesperson.last_name}
                </p>
              </div>
              <div id="thanks">Thank you!</div>
              <div id="notices">
                <div>NOTICE:</div>
                <div class="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
              </div>
            </main>
          </body>
        </html>
        `
  )
}
