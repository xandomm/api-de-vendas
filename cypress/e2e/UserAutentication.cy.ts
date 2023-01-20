import EtherealMail from "dist/config/mail/EtherealMail";


const email = "leo@gmail.com";
const password  = "teste1234";
describe('User Autentication ', () => {
  it('Should autenticate user', () => {
    cy.request({
      method: 'POST',
      url: 'localhost:3333/sessions',

      body:{
        "email": email,
        "password": password
      }
    }).then(response => {
      const userId = response.body.id;
      cy.log(userId);
      expect(response.status).to.equal(200);
      expect(response.body.user).has.property("email", email);
    })

  })
  it('Server should provide token', () => {
    cy.request({
      method: 'POST',
      url: 'localhost:3333/sessions',
      body:{
        "email": email,
        "password": password
      }
    }).then(response => {
      const userId = response.body.id;
      cy.log(userId);
      expect(response.status).to.equal(200);
      expect(response.body.token).not.null;
    })

  })
})