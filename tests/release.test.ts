import request from 'supertest';
import app from '../src/index';

describe('Release API', () => {
  it('GET /api/projects/:id/releases', async () => {
    const res = await request(app).get('/api/projects/507f1f77bcf86cd799439011/releases');
    expect(res.status).toBe(200);
  });
});