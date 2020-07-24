const supertest = require('supertest');
const server = require('../api/server');

describe('GET /', () => {
  it('returns defined content, JSON format', async () => {
    const res = await supertest(server).get('/api/jokes');
    expect(res.body).toBeDefined();
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
  });
});
