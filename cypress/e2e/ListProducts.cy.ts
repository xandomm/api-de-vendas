import { debug } from "console";
import EtherealMail from "dist/config/mail/EtherealMail";

const email = "leo@gmail.com";
const password  = "teste1234";
const token = "";
describe('User autentication', () => {
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

  it('Should list all products ', () => {
    cy.request({
      method: 'GET',
      url: 'localhost:3333/products',
      headers: {
        'authorization': 'Bearer ' + token,
      },

    }).its('body').then(response => {
      expect(response[0].id).not.null;
      expect(response[0].avatar).not.null;
      expect(response[0].name).not.null;
      expect(response[0].price).not.null;
      expect(response[0].quantity).not.null;
      expect(response[0].created_at).not.null;
      expect(response[0].updated_at).not.null;
    })
  })

})