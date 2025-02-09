// @ts-check
const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

const { LandingPage } = require('../pages/LandingPage');
const { Components } = require('../pages/Components');

let landingPage;
let components;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  components = new Components(page);
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const msg = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await components.toastHaveText(msg);
});

test('não deve cadastrar quando o email já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', {
    data: { 
      name: leadName,
      email: leadEmail 
    }
  })
  expect(newLead.ok()).toBeTruthy();

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const msg = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await components.toastHaveText(msg);
});

test('não deve cadastrar com email incorreto', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Albert Vieira', 'albert.com.br');

  await components.alertHaveText('Email incorreto');
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', 'albert.vieira@yahoo.com');

  await components.alertHaveText('Campo obrigatório');

});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Albert Vieira', '');

  await components.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', '');

  await components.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});