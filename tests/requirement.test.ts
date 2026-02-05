import request from 'supertest';
import app from '../src/index';

describe('Requirement API', () => {
  it('GET /api/projects/:id/requirements', async () => {
    const res = await request(app).get('/api/projects/507f1f77bcf86cd799439011/requirements');
    expect(res.status).toBe(200);
  });
});