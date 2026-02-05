import request from 'supertest';
import app from '../src/index';

describe('Issue API', () => {
  it('GET /api/projects/:id/issues', async () => {
    const res = await request(app).get('/api/projects/507f1f77bcf86cd799439011/issues');
    expect(res.status).toBe(200);
  });

  it('GET with filters', async () => {
    const res = await request(app).get('/api/projects/507f1f77bcf86cd799439011/issues?status=open');
    expect(res.status).toBe(200);
  });
});