import { debug } from "console";
import EtherealMail from "dist/config/mail/EtherealMail";

const email = "leo@gmail.com";
const password  = "teste1234";
const token = "";
describe('Create Order', () => {
  it('Should initiate section and receive token', () => {
    cy.request({
      method: 'POST',
      url: 'localhost:3333/sessions',
      body:{
        "email": email,
        "password": password
      }
    }).then(response => {
      const userId = response.body.id;
      token = response.body.token;
      cy.log(userId);
      expect(response.status).to.equal(200);
      expect(response.body.user).has.property("email", email);
    })
  })

  it('Should create a new order', () => {
    cy.request({
      method: 'POST',
      url: 'localhost:3333/orders',
      headers: {
        'authorization': 'Bearer ' + token,
      },
      body:{
        "customer_id": "bc455857-7280-4d61-84f9-3e4b8ed466ac",
        "products": [{"id":"9ced9f7a-e062-4b6a-b9a8-f594cc27b948","quantity":2}]
      }

    }).its('body').then(response => {
      expect(response.id).not.null;
      expect(response.order_products[0].product_id).not.null;
      expect(response.order_products[0].price).not.null;
      expect(response.order_products[0].quantity).not.null;
      expect(response.order_products[0].order_id).not.null;
      expect(response.order_products[0].id).not.null;
      expect(response.order_products[0].created_at).not.null;
      expect(response.order_products[0].updated_at).not.null;

    })
  })

})