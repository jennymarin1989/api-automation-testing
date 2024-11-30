describe('use POST and PUT on typicode', () => {
  it('crate first post', () => {
    cy.request('POST', '/posts', {
      userID: 1,
      title: 'API testing',
      body: 'first post'
    });
  });

  it('create second post', () => {
    cy.request({
      method: 'POST',
      url: '/posts',
      body: {
        userID: 2,
        title: 'API testing',
        body: 'second post '
      }
    }).then((response) => {
      cy.log(JSON.stringify(response.body)); //Log the result
    });
  });

  it('send third post and add assertions in response', () => {
    cy.request({
      method: 'POST',
      url: '/posts',
      body: {
        userID: 3,
        title: 'API testing',
        body: 'first post'
      }
    }).then((response) => {
      const postBody = response.body;
      expect(response.status).to.eq(201);
      expect(response.duration).not.to.be.greaterThan(300);
      expect(postBody.title).to.be.a('string');
      expect(postBody).to.have.property('title', 'API testing'); //access to property title in object and check value
      expect(postBody).to.have.property('body', 'first post');
    });
  });

  it('send PUT to an existing object', () => {
    const putBody = {
      userID: 1,
      id: 5,
      title: 'news',
      body: 'post updated'
    };

    cy.request({
      method: 'PUT', //modifies the whole object, if only one property is modified the rest of them will need to be written otherwise will be deleted
      url: '/posts/5',
      body: putBody
    }).then((response) => {
      const postBody = response.body;
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(response.duration).not.to.be.greaterThan(500);
      expect(postBody).to.have.property('title', 'news');
      expect(postBody).to.have.property('body', 'post updated');
      expect(postBody).to.deep.eq(putBody); //deep eq it's necessary to validate the whole object
    });
  });

  it('send PATCH to an existing object', () => {
    const putBody = {
      title: 'news ABC'
    };
    cy.request({
      method: 'PATCH', //it doesn't not modify the whole object, only the property specified
      url: '/posts/5',
      body: putBody
    }).then((response) => {
      const postBody = response.body;
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(postBody).to.have.property('title', 'news ABC');
    });
  });

  it('Create an object with POST, get the object ID and request the object info and delete the object', () => {
    const postData = {
      name: 'Objeto creado por Tester A',
      data: {
        year: 2024,
        price: 10,
        'CPU model': 'Api testing with Cypress',
        'Hard disk size': '1 TB'
      }
    };
    cy.request('POST', 'https://api.restful-api.dev/objects', postData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.include(postData);
      cy.wrap(response.body.id).as('objectID');
    });
    cy.get('@objectID').then((objectID) => {
      cy.request('GET', `https://api.restful-api.dev/objects/${objectID}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.include(postData);
      });
      cy.request('DELETE', `https://api.restful-api.dev/objects/${objectID}`);
    });
  });
});
