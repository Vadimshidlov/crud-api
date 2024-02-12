import { server } from '../index';
import request from 'supertest';

describe('Tests for crud-api ;)', () => {
    afterAll((done) => {
        server.close(done);
    });

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

    // should update user with method put
    it('should update user and return correct data with the same id', async () => {
        const userData = {
            userName: 'Oleg',
            age: 26,
            hobbies: ['Gym'],
        };

        const newUserData = {
            userName: 'Vadim',
            age: 26,
            hobbies: ['Fishing'],
        };

        const postRes = await request(server).post('/api/users').send(userData);

        expect(postRes.statusCode).toBe(201);

        const { id } = postRes.body;

        const getRes = await request(server).get(`/api/users/${id}`);

        expect(getRes.statusCode).toBe(200);

        const putRes = await request(server).put(`/api/users/${id}`).send(newUserData);

        expect(putRes.statusCode).toBe(200);

        const strictUserData = {
            id,
            ...newUserData,
        };

        expect(putRes.body).toStrictEqual(strictUserData);
    });

    it('should correct delete user and return correct status code', async () => {
        const getRes = await request(server).get(`/api/users`);

        expect(getRes.statusCode).toBe(200);

        const { id: theFirstUserId } = getRes.body[0];

        const deleteRes = await request(server).delete(`/api/users/${theFirstUserId}`);

        expect(deleteRes.statusCode).toBe(204);
    });

    it('should return correct status code for getting already delete user', async () => {
        const getRes = await request(server).get(`/api/users`);

        expect(getRes.statusCode).toBe(200);

        const { id: theFirstUserId } = getRes.body[0];

        const deleteRes = await request(server).delete(`/api/users/${theFirstUserId}`);

        expect(deleteRes.statusCode).toBe(204);

        const getResSecond = await request(server).get(`/api/users${theFirstUserId}`);

        expect(getResSecond.statusCode).toBe(404);
    });
});
