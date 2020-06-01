describe('Blog app', function () {
  const test_user = {
    name: 'Test User',
    userName: 'test_user',
    password: 'test_password',
  };

  const test_user2 = {
    name: 'Test User2',
    userName: 'test_user2',
    password: 'test_password2',
  };

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', test_user);
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function () {
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  it('user can log in valid credentials', function () {
    cy.get('#username').type(test_user.userName);
    cy.get('#password').type(test_user.password);
    cy.contains('login').click();
    cy.contains('blogs');
    cy.get('#userInfoPanel').should('exist');
  });

  it('user can not log in without valid credeltials', function () {
    cy.get('#username').type(test_user.userName);
    cy.contains('login').click();
    cy.get('#userInfoPanel').should('not.exist');
    cy.get('.errorMessage').should('contain', 'Wrong credentials');
    cy.get('.errorMessage').should('have.css', 'color', 'rgb(255, 0, 0)');
    cy.get('.errorMessage').should('have.css', 'border-style', 'solid');
  });

  describe.only('when logged in', function () {
    const TEST_BLOG = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.blog',
    };
    beforeEach(function () {
      cy.login(test_user.userName, test_user.password);
    });

    it('A blog can be created and is shown', function () {
      cy.contains('create new blog');
      const createNewBlogContainer = cy.get('#createNewBlogContainer');
      const createNewBlogButton = createNewBlogContainer.find('button');
      createNewBlogButton.click();
      cy.get('#title').type(TEST_BLOG.title);
      cy.get('#author').type(TEST_BLOG.author);
      cy.get('#url').type(TEST_BLOG.url);
      cy.get('#submitButton').click();
      cy.contains(`${TEST_BLOG.title} by ${TEST_BLOG.author}`);
    });

    describe('when note is created', function () {
      it('Can be liked', function () {
        cy.createBlog(TEST_BLOG);
        cy.server();
        cy.route({
          method: 'PUT',
          url: '/api/blogs/*',
        }).as('blogPut');
        cy.contains('view').click();
        cy.contains('like').click();
        cy.wait('@blogPut');
        cy.contains('likes 1');
      });

      it('Can be deleted by user who created the blog', function () {
        cy.createBlog(TEST_BLOG);
        cy.server();
        cy.route({
          method: 'DELETE',
          url: '/api/blogs/*',
        }).as('blogDelete');
        cy.contains('view').click();
        cy.contains('remove').click();
        cy.wait('@blogDelete');
      });

      it('Can not be deleted by another user', function () {
        cy.createBlog(TEST_BLOG);
        cy.request('POST', 'http://localhost:3001/api/users', test_user2);
        cy.login(test_user2.userName, test_user2.password);

        cy.contains('view').click();
        cy.get('.removeButton').should('not.exist');
      });
    });

    const setBlogLikes = (title, likes) => {
      cy.server();
      cy.route({
        method: 'PUT',
        url: '/api/blogs/*',
      }).as('blogPut');

      cy.get('#blogList')
        .contains(title)
        .parents('#blogRoot')
        .find('.toggleVisibilityButton')
        .click();
      let i;
      for (i = 0; i < likes; i++) {
        cy.get('#blogList')
          .contains(title)
          .parents('#blogRoot')
          .contains('like')
          .click();
        cy.wait('@blogPut');
      }
    };

    it('Blogs are ordered according to like count', function () {
      cy.server();
      cy.route({
        method: 'GET',
        url: '/api/blogs',
      }).as('getBlogs');

      cy.createBlog({
        title: 'Test Blog0',
        author: 'Test Author',
        url: 'http://test.blog',
      });
      cy.wait('@getBlogs');
      cy.createBlog({
        title: 'Test Blog1',
        author: 'Test Author1',
        url: 'http://test.blog',
      });
      cy.wait('@getBlogs');
      cy.createBlog({
        title: 'Test Blog2',
        author: 'Test Author2',
        url: 'http://test.blog',
      });
      cy.wait('@getBlogs');
      setBlogLikes('Test Blog0', 1);
      setBlogLikes('Test Blog1', 3);
      setBlogLikes('Test Blog2', 5);

      let txtContent = [];
      cy.get('.likes')
        .each((like) => {
          txtContent.push(like[0].textContent.slice(6, -4));
        })
        .then(() => {
          expect(txtContent[0]).to.equal('5');
          expect(txtContent[1]).to.equal('3');
          expect(txtContent[2]).to.equal('1');
        });
    });
  });
});
