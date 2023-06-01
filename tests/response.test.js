const request = require('supertest');
const app = require('../app');

describe('GET /ping', () => {
  it('should return status code 200', async () => {
    const response = await request(app).get('/ping');
    expect(response.status).toBe(200);
  });
});