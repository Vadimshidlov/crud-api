import { server } from '../index';
import request from 'supertest';

describe('Tests for crud-api ;)', () => {
    it('should return correct status code', async () => {
        const res = await request(server).get('/api/users');

        expect(res.statusCode).toEqual(200);
    });
});
