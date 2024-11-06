describe('use GET  method to get data from typicode', () => {
    it('visit url and get data from typicode', () => {
      cy.visit('/') //con visit url
      cy.request({
        method: 'GET',
        url: '/posts'
      })
    })

    it('visit url and get data from typicode', () => {
        cy.request({
          method: 'GET',
          url: '/posts' //sin hacer visit solo haciendo get sobre la url y declarando los parametros
        })
    })

    it('visit url and get data from typicode', () => {
        cy.request('GET', '/posts') //sin necesidad de declarar los parametros ( se puede declarar de esta manera tanto el GET y DELETE q son parametros que no tienes q enviar nada en el body)
    })

    it('get data from typicode and get status code', () => {
        cy.request('GET', '/posts').then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('get data from typicode and its status code', () => {
        cy.request('GET', '/posts').its('status').should('eq', 200)
    })

    it('get data from typicode and its response body length ', () => {
        cy.request('GET', '/posts').its('body').should('have.length', 100)
    })

    it('get data from typicode and use should on the response and validate status code and lenght of response body ', () => {
        cy.request('GET', '/posts').should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length(100)
        })
    })

    it('get data from typicode and use should on the response and  validate status code and lenght of response body and if its an array ', () => {
        cy.request('GET', '/posts').should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length(100)
            expect(response.body).to.be.a('array')
            expect(response.body).to.not.to.be.a('number')
        })
    })


    it('get data from a typicode/post/1 and check its status code', () => {
        cy.request('GET', '/posts/1').its('status').should('eq', 200)
    })

    it('get data from a typicode/post1 and check its status code, length of response body and type of data', () => {
        cy.request('GET', '/posts/1').should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.to.be.a('array')
            expect(response.body).to.be.a('object')
            expect(response.body.id).to.eq(1)
        })
    })

  })