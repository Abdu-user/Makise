import emailSession from "../fakeDataForTheTests/emailSession";
import user from "../fakeDataForTheTests/user";
import userData from "../fakeDataForTheTests/userData";

describe("expect makise page", () => {
  const email = "testuser@example.com";
  const password = "yourPassword123";

  const userDataUri = `https://fra.cloud.appwrite.io/v1/databases/${process.env.APPWRITE_DATABASE_ID}/collections/${process.env.APPWRITE_COLLECTION_ID}/documents/${userData.$id}`;
  const collection = process.env.APPWRITE_COLLECTION_ID || "683e587500315429dcf2";
  const database = process.env.APPWRITE_DATABASE_ID || "683e5827002cd4ba72b3";
  const document = userData.$id || "6860a449f2767f18ab11";

  it("should redirect to /sign-in after visiting /profile", () => {
    cy.visit("http://localhost:3000/profile");
    cy.url().should("eq", "http://localhost:3000/sign-in");
  });
  it("fill the sign in form", () => {
    cy.intercept("POST", "/v1/account/sessions/email", {
      statusCode: 201,
      body: { ...emailSession, email },
    }).as("appwriteSession");

    cy.intercept("GET", userDataUri, {
      statusCode: 200,
      body: userData,
    }).as("getUserData");
    cy.visit("http://localhost:3000/sign-in");

    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);

    cy.get('input[type="password"]').should("exist");

    cy.get('input[type="password"]').should("have.value", password);

    cy.intercept("GET", "https://fra.cloud.appwrite.io/v1/account", {
      body: { ...user, email },
    }).as("getUser");

    cy.get('button[type="submit"]').click();
    cy.wait("@getUser");
    cy.url().should("eq", "http://localhost:3000/profile");
  });

  it("check the password visibility toggle button", () => {
    cy.visit("http://localhost:3000/sign-in");

    cy.get('input[type="password"]').type(password);
    cy.get('button[aria-label*="Toggle password visibility"]').click();

    cy.get('input[type="password"]').should("not.exist");
    cy.get('input[type="text"]').should("have.value", password);

    cy.get('button[aria-label*="Toggle password visibility"]').click();

    cy.get('input[type="text"]').should("not.exist");
    cy.get('input[type="password"]').should("have.value", password);
  });

  it("check login button existence", () => {
    cy.visit("http://localhost:3000/sign-in");

    // cy.get('button[aria-label="Google"]').should("exist");
    cy.contains("Google").should("exist");
  });
  it("google register success flow", () => {
    // Mock the Appwrite account.get() response
    cy.intercept("GET", "/v1/account", {
      body: { ...user, email },
    }).as("getAccount");

    // Mock your GET document request
    cy.intercept(
      "GET",
      `https://fra.cloud.appwrite.io/v1/databases/${database}/collections/${collection}/documents/${document}`,
      { statusCode: 404 } // Simulate no existing document
    ).as("getUserDoc");

    cy.intercept("POST", "/api/auth/store-user", {
      statusCode: 200,
      body: { success: true },
    });

    cy.intercept("POST", "/api/update-user", {
      statusCode: 200,
      body: { success: true },
    });

    // Mock your POST create document request
    cy.intercept("POST", `https://fra.cloud.appwrite.io/v1/databases/${database}/collections/${collection}/documents`, {
      body: { success: true },
    }).as("createDoc");

    // Visit the page directly
    cy.visit("http://localhost:3000/google-register-success");

    // Wait for all the calls to happen
    cy.wait("@getAccount");
    cy.wait("@getUserDoc");
    cy.wait("@createDoc");

    cy.intercept("GET", `https://fra.cloud.appwrite.io/v1/databases/${database}/collections/${collection}/documents/${document}`, {
      body: userData,
    });

    // Should end up on /profile
    cy.url().should("include", "/profile");
    cy.contains(userData.email).should("exist");
    cy.contains(userData.username).should("exist");
  });
});
