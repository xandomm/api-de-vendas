import EtherealMail from "dist/config/mail/EtherealMail";

const name = "leo3";
const email = "leo2@gmail.com";
const password  = "teste1234";
describe('Create new user', () => {
  it('Should create new user', () => {
    cy.request({
      method: 'POST',
      url: 'localhost:3333/users',
      failOnStatusCode: false,
      body:{
        "name": name,
        "email": email,
        "password": password
      }
    }).then(response => {
      const userId = response.body.id;
      cy.log(userId);
      expect(response.status).to.equal(200);
      expect(response.body).has.property("name", name);
      expect(response.body).has.property("email", email);
    })

  })
  it('Shoud not create new user if email alreay used', () => {
    cy.request({
      method: 'POST',
      url: 'localhost:3333/users',
      failOnStatusCode: false,
      body:{
        "name": name,
        "email": email,
        "password": password
      }
    }).then(response => {
      const userId = response.body.id;
      cy.log(userId);
      expect(response.status).to.equal(400);
      expect(response.body).has.property("message","Email address already used.");

    })

  })
})