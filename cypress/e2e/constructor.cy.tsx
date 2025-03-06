/// <reference types="cypress" />

const fillingSelector = `[data-cy="643d69a5c3f7b9001cfa0941"]`;
const fillingInOrderSelector = '.constructor-element';
const bunSelector = `[data-cy="643d69a5c3f7b9001cfa093c"]`;
const buttonOrderSelector = '[data-cy="buttonOrder"]';
const modalSelector = `[data-cy="modal"]`;
const modalOverlaySelector = `[data-cy="modalOverlay"]`;
const noBunsTopSelector = `[data-cy="noBunsTop"]`;
const noBunsBottomSelector = `[data-cy="noBunsBottom"]`;
const noFillingSelector = `[data-cy="noFilling"]`;
const modalCloseButtonSelector = `[data-cy="modalCloseButton"]`;

beforeEach(() => {
  cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
    fixture: 'ingredients.json'
  });

  cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
    fixture: 'userData.json'
  });

  cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
    fixture: 'orderData.json'
  });

  cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
    fixture: 'userData.json'
  });

  cy.visit('http://localhost:4000');
});

it('Добавление ингредиента из списка в конструктор', () => {
  cy.get(fillingSelector).find('button').click();
  cy.get(fillingSelector).find('.counter__num').contains('1');

  cy.get(fillingInOrderSelector).contains('Биокотлета');
});

it('создание заказа', () => {
  cy.get(fillingSelector).find('button').click();
  cy.get(bunSelector).find('button').click();

  cy.get(buttonOrderSelector).click();

  cy.get(modalSelector).should('exist');
  cy.get(modalSelector).contains('70189');

  cy.get(modalOverlaySelector).click({ force: true });
  cy.get(modalSelector).should('not.exist');

  cy.get(noBunsTopSelector).should('be.visible');
  cy.get(noBunsBottomSelector).should('be.visible');
  cy.get(noFillingSelector).should('be.visible');
});

describe('работа модальных окон', () => {
  it('открытие модального окна', () => {
    cy.get(fillingSelector).find('a').click();
    cy.get(modalSelector).should('be.not.empty');
    cy.get(modalSelector).contains('Детали ингредиента');
  });

  it('закрытие модального окна на крестик', () => {
    cy.get(fillingSelector).find('a').click();
    cy.get(modalSelector).should('exist');
    cy.get(modalCloseButtonSelector).click();
    cy.get(modalSelector).should('not.exist');
  });

  it('закрытие модального окна на оверлей', () => {
    cy.get(fillingSelector).find('a').click();
    cy.get(modalSelector).should('exist');
    cy.get(modalOverlaySelector).click({ force: true });
    cy.get(modalSelector).should('not.exist');
  });
});
