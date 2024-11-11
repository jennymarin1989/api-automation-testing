describe('use POST and PUT on typicode', () => {
  it('send first post', () => {
    // otra forma de crear un post
    cy.request('POST', '/posts', {
      userID: 1,
      title: 'API testing',
      body: 'first post '
    });
  });

  it('send first post', () => {
    cy.request({
      method: 'POST',
      url: '/posts',
      body: {
        userID: 1,
        title: 'API testing',
        body: 'first post '
      }
    }).then((response) => {
      // se puede utilizar then() o bien should()
      cy.log(JSON.stringify(response.body)); //imprimir por pantalla
    });
  });

  it('send first post', () => {
    cy.request({
      method: 'POST',
      url: '/posts',
      body: {
        userID: 1,
        title: 'API testing',
        body: 'first post'
      }
    }).then((response) => {
      const postBody = response.body;
      cy.log(JSON.stringify(response.body)); //imprimir por pantalla
      expect(response.status).to.eq(201);
      expect(postBody.title).to.be.a('string');
      expect(postBody).to.have.property('title', 'API testing'); // acceder a la property del objeto y q contenga key title y value API testing
      expect(postBody).to.have.property('body', 'first post');
      //   expect(response.duration).to.eq(147) esto es para validar duracion de respuesta lo suyo es que sea entre un rango de tiempo
    });
  });

  it('send PUT to an existing object', () => {
    const putBody = {
      userID: 5,
      id: 5,
      title: 'news',
      body: 'post updated'
    };

    cy.request({
      method: 'PUT', // sobreescribe todo el objeto, si se modifica una propiedad solo el resto tambien hay que introducirlas sino las borraria
      url: '/posts/5',
      body: putBody
    }).then((response) => {
      const postBody = response.body;
      cy.log(JSON.stringify(response.body)); //imprimir por pantalla
      expect(response.status).to.eq(200);
      expect(postBody).to.have.property('title', 'news'); // acceder a la property del objeto y q contenga key title y value API testing
      expect(postBody).to.have.property('body', 'post updated');
      expect(postBody).to.deep.eq(putBody); //deep eq es necesario para validar un objeto solo con to.eq fallaria
    });
  });

  it('send PATCH to an existing object', () => {
    const putBody = {
      title: 'news ABC'
    };
    cy.request({
      method: 'PATCH', // solo modifica la property q estoy mandando el resto se mantienen igual, no hay que mandar el objeto entero
      url: '/posts/5',
      body: putBody
    }).then((response) => {
      const postBody = response.body;
      cy.log(JSON.stringify(response.body)); //imprimir por pantalla
      expect(response.status).to.eq(200);
      expect(postBody).to.have.property('title', 'news ABC'); // acceder a la property del objeto y q contenga key title y value API testing
    });
  });

  it('Create an object with POST, get the object ID and request the object info and delete the object', () => {
    const postData = {
      name: 'Objeto creado por Javier Flores',
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
      cy.log(objectID);
      cy.request('GET', `https://api.restful-api.dev/objects/${objectID}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.include(postData);
      });
      cy.request('DELETE', `https://api.restful-api.dev/objects/${objectID}`);
    });
  });
});
