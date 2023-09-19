const request = require('supertest');
const app = require('../testApp');

describe('Book Routes', () => {
  it('should create a new book', async () => {
    const response = await request(app)
      .post('/api/books')
      .send({ title: 'Test Book' });


    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Book');
  });

})