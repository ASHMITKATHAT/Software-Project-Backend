import request from 'supertest';
import app from '../src/index';

describe('Changelog API', () => {
  it('GET /api/projects/:id/releases/:rid/changelogs', async () => {
    const res = await request(app).get('/api/projects/507f1f77bcf86cd799439011/releases/507f1f77bcf86cd799439012/changelogs');
    expect(res.status).toBe(200);
  });
});