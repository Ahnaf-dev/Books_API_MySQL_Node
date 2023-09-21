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

  it('should retrieve books', async () => {
    const response = await request(app).get('/api/books');

    expect(Array.isArray(response.body)).toBe(true);
  });
  it('search a book', async () => {
    const response = await request(app)
    .post('/api/books')
    .send({ title: 'Hellsing' });
    
    const response = await request(app).get('/api/books/search?term=h');

    expect(Array.isArray(response.body)).toBe(true);
  });
  it('should retrieve all books by author', async () => {
    const response = await request(app).get('/api/books/author/3');

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update a book by ID', async () => {
    const createResponse = await request(app)
      .post('/api/books')
      .send({ title: 'Update Test Book' });

    const updateResponse = await request(app)
      .put(`/api/books/${createResponse.body.id}`)
      .send({ title: 'Updated Book Title' });

    expect(updateResponse.body.id).toBe(`${createResponse.body.id}`);
    expect(updateResponse.body.title).toBe('Updated Book Title');
  });

  it('should delete a book by ID', async () => {
    const createResponse = await request(app)
      .post('/api/books')
      .send({ title: 'Update Test Book' });

    const deleteResponse = await request(app).delete(`/api/books/${createResponse.body.id}`);

    expect(deleteResponse.status).toBe(204);
  });
  
})