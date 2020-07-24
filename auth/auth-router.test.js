const supertest = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

/*
End to End testing: endpoints should return 
 - expected values
 - status codes
 - return data in correct format (JSON)
*/

// a global jest hook to run before each individual test
beforeEach(async () => {
  // re-run the seeds and start with a fresh database for each test
  await db.seed.run();
});

// to remove the weird yellow error in testing console
afterAll(async () => {
  await db.destroy();
});

// test endpoint

describe('POST /register', () => {
  it('returns status code, JSON, body: id, username, pass', async () => {
    const res = await supertest(server).post('/api/auth/register').send({
      username: 'joe',
      password: 'jerrys-pass',
    });
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.username).toBe('joe');
    expect(res.body.data.password).toBeDefined();
    expect(res.statusCode).toBe(201);
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
  });
});

describe('POST /login unauthorized', () => {
  it('returns message, loggedIn, username, session typeof', async () => {
    const res = await supertest(server).post('/api/auth/login').send({
      username: 'bobo',
      password: 'jerrys-pass',
    });
    expect(res.body.message).toBe('Invalid Credentials');
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
  });
});

// how to test authorized?

// describe('POST /login unauthorized', () => {
//     it('returns message, loggedIn, username, session typeof', async () => {
//       const res = await supertest(server).post('/api/auth/login').send({
//         username: 'bobo',
//         password: 'jerrys-pass',
//       });
//       expect(res.body.message).toBe('welcome');
//       expect(res.body.loggedIn).toBe(true);
//       expect(res.body.username).toBe('joe');
//       expect(res.statusCode).toBe(200);
//       expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
//     });
//   });
