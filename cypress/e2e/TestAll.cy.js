/// <reference types= "cypress" />

Cypress.Commands.add("LogIn", (username, password, NOI) => {
  let ddl = ["az", "za", "lohi", "hilo"];

  let randomnumberofddl = Math.floor(Math.random() * ddl.length);
  let Randomddl = ddl[randomnumberofddl];

  cy.visit("https://www.saucedemo.com/");
  cy.title().should("eq", "Swag Labs");
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();

  for (let i = 0; i < NOI; i++) {
    cy.get(".btn").eq(i).click()
  }
  //cy.get(".shopping_cart_badge").invoke("text").should("contain", NOI);

  cy.get(".shopping_cart_badge")
    .invoke("text")
    .should("contain", NOI);

  cy.get("select").select(Randomddl);

  if (Randomddl == "az") {
    cy.get(".inventory_item_name ").then((items) => {
      const unsortedItems = items
        .map((index, html) => Cypress.$(html).text())
        .get();
      const sortedItems = unsortedItems.slice().sort();
      expect(sortedItems, "Items are sorted").to.deep.equal(unsortedItems);
    });
  } else if (Randomddl == "za") {
    cy.get(".inventory_item_name ").then((items) => {
      const unsortedItems = items
        .map((index, html) => Cypress.$(html).text())
        .get();
      const sortedItems = unsortedItems.slice().sort().reverse();
      expect(sortedItems, "Items are sorted reverse").to.deep.equal(
        unsortedItems
      );
    });
  } else if (Randomddl == "lohi") {
    cy.get(".inventory_item_price").then(($prices) => {
      const innerText = (el) => el.innerText;
      const firstWord = (text) => text.split(" ")[0];
      const justDigits = (str) => str.replace(/[^0-9.]/g, "");
      const prices = Cypress._.map($prices, (el) =>
        parseFloat(justDigits(firstWord(innerText(el))))
      );
      // confirm the "prices" array is already sorted
      const sorted = Cypress._.sortBy(prices);
      expect(sorted).to.deep.equal(prices);
      return prices;
    });
  } else {
    cy.get(".inventory_item_price").then(($prices) => {
      const innerText = (el) => el.innerText;
      const firstWord = (text) => text.split(" ")[0];
      const justDigits = (str) => str.replace(/[^0-9.]/g, "");
      const prices = Cypress._.map($prices, (el) =>
        parseFloat(justDigits(firstWord(innerText(el))))
      );
      // confirm the "prices" array is already sorted
      const sorted = Cypress._.sortBy(prices).reverse();
      expect(sorted).to.deep.equal(prices);
      return prices;
    });
  }
  cy.get(".shopping_cart_link").click();
  cy.get(".cart_button").should("have.length", NOI);
  cy.get(".checkout_button").click();
  cy.get('[data-test="firstName"]').type("mostafa");
  cy.get('[data-test="lastName"]').type("Alazzam");
  cy.get('[data-test="postalCode"]').type(123);
  cy.get('[data-test="continue"]').click();
  cy.get('[data-test="finish"]').click()
  cy.get('.complete-header').invoke('text').should('include',"Thank you")
});

describe("Swag lab", () => {
  it("Check Element", () => {
    let NumberOfItem = Math.floor(Math.random()*6)
    cy.LogIn("standard_user","secret_sauce", NumberOfItem);

    /*let users = [
      "standard_user",
      "locked_out_user",
      "problem_user",
      "performance_glitch_user",
      "error_user",
      "visual_user",
    ];*/
  });
});
