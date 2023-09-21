const request = require('supertest');
const app = require('../testApp');

describe('Author Routes', () => {


  it('should create a new author', async () => {
    const response = await request(app)
      .post('/api/authors')
      .send({ firstname: 'John', lastname: 'Doe' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.firstname).toBe('John');
    expect(response.body.lastname).toBe('Doe');
  });
  it('should retrieve all authors', async () => {
    const response = await request(app).get('/api/authors');


    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  
  it('get author details', async () => {
    const response = await request(app).get('/api/authors/1');

    expect(response.status).toBe(200);
    expect(response.body.firstname).toBe('George');
    expect(response.body.lastname).toBe('Martin');
  });
  it('update author', async () => {
    const response = await request(app)
    .put('/api/authors/3')
    .send({ firstname: 'John', lastname: 'Doe' });


    expect(response.status).toBe(200);
    expect(response.body.firstname).toBe('John');
    expect(response.body.lastname).toBe('Doe');
  });

  it('should delete author by id', async () => {
    const createResponse = await request(app)
      .post('/api/authors')
      .send({ firstname: 'John', lastname: 'Doe' });

    const deleteResponse = await request(app).delete(`/api/authors/${createResponse.body.id}`);

    expect(deleteResponse.status).toBe(204);
  });
  
})