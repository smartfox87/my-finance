describe("Login modal", () => {
  context("1920x1080 resolution", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit(`/profile`);
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/auth/v1/token?grant_type=password`).as("login");
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/auth/v1/logout?scope=global`).as("logout");
    });

    it("should login by form", () => {
      cy.get('[data-cy="modal-login-btn"]').click();
      cy.get('[data-cy="login-form"]').within(() => {
        cy.get("#email").type(Cypress.env("E2E_LOGIN"));
        cy.get("#password").type(Cypress.env("E2E_PASSWORD"));
        cy.get('button[type="submit"]').click();
      });
      cy.wait("@login").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.access_token).to.be.a("string");
        expect(interception.response?.body.user).to.be.an("object");
      });
      cy.get('[data-cy="logout-btn"]').click();
      cy.wait("@logout").then((interception) => {
        expect(interception.response?.statusCode).to.eq(204);
      });
    });

    it("should demo login", () => {
      cy.get('[data-cy="modal-login-btn"]').click();
      cy.get('[data-cy="demo-login-btn"]').click();
      cy.wait("@login").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.access_token).to.be.a("string");
        expect(interception.response?.body.user).to.be.an("object");
      });
    });
  });

  context("smartphone resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-6");
      cy.visit(`/profile`);
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/auth/v1/token?grant_type=password`).as("login");
      cy.intercept("POST", `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/auth/v1/logout?scope=global`).as("logout");
    });

    it("should login by form", () => {
      cy.get('[data-cy="mobile-menu-btn"]').click();
      cy.get('[data-cy="modal-login-btn"]').click();
      cy.get('[data-cy="login-form"]').within(() => {
        cy.get("#email").type(Cypress.env("E2E_LOGIN"));
        cy.get("#password").type(Cypress.env("E2E_PASSWORD"));
        cy.get('button[type="submit"]').click();
      });
      cy.wait("@login").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.access_token).to.be.a("string");
        expect(interception.response?.body.user).to.be.an("object");
      });
      cy.get(".ant-drawer-close").click();
      cy.get('[data-cy="logout-btn"]').click();
      cy.wait("@logout").then((interception) => {
        expect(interception.response?.statusCode).to.eq(204);
      });
    });

    it("should demo login", () => {
      cy.get('[data-cy="mobile-menu-btn"]').click();
      cy.get('[data-cy="modal-login-btn"]').click();
      cy.get('.ant-drawer-open [data-cy="demo-login-btn"]').click();
      cy.wait("@login").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.access_token).to.be.a("string");
        expect(interception.response?.body.user).to.be.an("object");
      });
    });
  });
});
