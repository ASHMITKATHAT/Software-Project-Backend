import request from 'supertest';
import app from '../src/index'; // Assuming your express app is exported from index.ts

describe('Integration Tests', () => {
  it('should return 200 OK for the root path', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Software Project Backend API is running!');
  });

  it('should return 404 for an undefined route', async () => {
    const response = await request(app).get('/api/nonexistent');
    expect(response.statusCode).toBe(404);
  });
});
