Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedNoteappUser')).token
      }`,
    },
  });
  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('login', (userName, password) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    userName: userName,
    password: password,
  }).then(({ body }) => {
    localStorage.setItem('loggedNoteappUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});
