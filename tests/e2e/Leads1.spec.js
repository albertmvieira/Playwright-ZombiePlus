
const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');


test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  await page.landingPage.visit();
  await page.landingPage.openLeadModal();
  await page.landingPage.submitLeadForm(leadName, leadEmail);

  const msg = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.components.toastContainText(msg);
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

  await page.landingPage.visit();
  await page.landingPage.openLeadModal();
  await page.landingPage.submitLeadForm(leadName, leadEmail);

  const msg = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.components.toastContainText(msg);
});

test('não deve cadastrar com email incorreto', async ({ page }) => {
  await page.landingPage.visit();
  await page.landingPage.openLeadModal();
  await page.landingPage.submitLeadForm('Albert Vieira', 'albert.com.br');

  await page.components.alertHaveText('Email incorreto');
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.landingPage.visit();
  await page.landingPage.openLeadModal();
  await page.landingPage.submitLeadForm('', 'albert.vieira@yahoo.com');

  await page.components.alertHaveText('Campo obrigatório');

});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await page.landingPage.visit();
  await page.landingPage.openLeadModal();
  await page.landingPage.submitLeadForm('Albert Vieira', '');

  await page.components.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.landingPage.visit();
  await page.landingPage.openLeadModal();
  await page.landingPage.submitLeadForm('', '');

  await page.components.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});