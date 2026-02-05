import request from 'supertest';
import app from '../src/index';

describe('Project API', () => {
  it('GET /api/projects should return project list', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.status).toBe(200);
  });

  it('POST /api/projects requires auth', async () => {
    const res = await request(app).post('/api/projects').send({ name: 'Test' });
    expect(res.status).toBe(401);
  });
});