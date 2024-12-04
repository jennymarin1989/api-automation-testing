describe('use POST and PUT on typicode api ', () => {
  beforeEach(() => {
    cy.fixture('typicodePosts').as('typiPosts');
    cy.fixture('apiRestfulPosts').as('apiPosts');
  });
  it('create first post', () => {
    cy.get('@typiPosts').then((postData) => {
      cy.request('POST', '/posts', postData[0]);
    });
  });

  it('create second post', () => {
    cy.get('@typiPosts').then((postData) => {
      cy.request({
        method: 'POST',
        url: '/posts',
        body: postData[1]
      }).then((response) => {
        cy.log(JSON.stringify(response.body)); //Log the result
      });
    });
  });

  it('send third post and add assertions in response', () => {
    cy.get('@typiPosts').then((postData) => {
      cy.request({
        method: 'POST',
        url: '/posts',
        body: postData[2]
      }).then((response) => {
        const postBody = response.body;
        expect(response.status).to.eq(201);
        expect(response.duration).not.to.be.greaterThan(300);
        expect(postBody.title).to.be.a('string');
        expect(postBody).to.have.property('title', 'API testing 3'); //access to property title in object and check value
        expect(postBody).to.have.property('body', 'third post');
      });
    });
  });

  it('send PUT request to an existing object', () => {
    cy.get('@typiPosts').then((postData) => {
      cy.request({
        method: 'PUT', //modifies the whole object, if only one property is modified the rest of them will need to be written otherwise will be deleted
        url: '/posts/5',
        body: postData[4]
      }).then((response) => {
        const postBody = response.body;
        cy.log(JSON.stringify(response.body));
        expect(response.status).to.eq(200);
        expect(response.duration).not.to.be.greaterThan(500);
        expect(postBody).to.have.property('title', 'news');
        expect(postBody).to.have.property('body', 'post updated');
        expect(postBody).to.deep.eq(postData[4]); //deep eq it's necessary to validate the whole object
      });
    });
  });

  it('send PATCH request to an existing object', () => {
    const putBody = {
      title: 'news ABC'
    };
    cy.request({
      method: 'PATCH', //it doesn't not modify the whole object, only the property specified
      url: '/posts/5',
      body: putBody
    }).then((response) => {
      const postBody = response.body;
      expect(response.status).to.eq(200);
      expect(response.duration).not.to.be.greaterThan(500);
      expect(postBody).to.have.property('title', 'news ABC');
    });
  });

  it('Create an object with POST, get the object ID and request the object info and delete the object', () => {
    cy.get('@apiPosts').then((apiPost) => {
      cy.request('POST', 'https://api.restful-api.dev/objects', apiPost[0]).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.duration).not.to.be.greaterThan(500);
        expect(response.body).to.deep.include(apiPost[0]);
        cy.wrap(response.body.id).as('objectID');
      });
      cy.get('@objectID').then((objectID) => {
        cy.request('GET', `https://api.restful-api.dev/objects/${objectID}`).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.deep.include(apiPost[0]);
        });
        cy.request('DELETE', `https://api.restful-api.dev/objects/${objectID}`);
      });
    });
  });
});
