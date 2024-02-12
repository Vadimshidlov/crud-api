import { server } from '../index';
import request from 'supertest';

describe('Tests for crud-api ;)', () => {
    it('should return correct status code', async () => {
        const res = await request(server).get('/api/users');

        expect(res.statusCode).toEqual(200);
    });

    it('should return correct data with 4 users', async () => {
        const res = await request(server).get('/api/users');
        const data = res.body;

        expect(data.length).toBe(4);
    });

    it('should create correct data for user with post method', async () => {
        const userData = {
            userName: 'Oleg',
            age: 26,
            hobbies: ['Gym'],
        };

        const res = await request(server).post('/api/users').send(userData);
        const data = res.body;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = data;

        expect(rest).toStrictEqual(userData);
    });

    it('should return correct status code for create user', async () => {
        const userData = {
            userName: 'Oleg',
            age: 26,
            hobbies: ['Gym'],
        };

        const res = await request(server).post('/api/users').send(userData);

        expect(res.statusCode).toBe(201);
    });

    it('should allow to get date of user we created', async () => {
        const userData = {
            userName: 'Oleg',
            age: 26,
            hobbies: ['Gym'],
        };

        const postRes = await request(server).post('/api/users').send(userData);

        expect(postRes.statusCode).toBe(201);

        const { id } = postRes.body;

        const getRes = await request(server).get(`/api/users/${id}`);

        expect(getRes.statusCode).toBe(200);
    });
});
