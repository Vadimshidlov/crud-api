"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const supertest_1 = __importDefault(require("supertest"));
describe('Tests for crud-api ;)', () => {
    afterAll((done) => {
        index_1.server.close(done);
    });
    it('should return correct status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.server).get('/api/users');
        expect(res.statusCode).toEqual(200);
    }));
    it('should return correct data with 4 users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.server).get('/api/users');
        const data = res.body;
        expect(data.length).toBe(4);
    }));
    it('should create correct data for user with post method', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            userName: 'Oleg',
            age: 26,
            hobbies: ['Gym'],
        };
        const res = yield (0, supertest_1.default)(index_1.server).post('/api/users').send(userData);
        const data = res.body;
        const { id } = data, rest = __rest(data, ["id"]);
        expect(rest).toStrictEqual(userData);
    }));
    it('should return correct status code for create user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            userName: 'Oleg',
            age: 26,
            hobbies: ['Gym'],
        };
        const res = yield (0, supertest_1.default)(index_1.server).post('/api/users').send(userData);
        expect(res.statusCode).toBe(201);
    }));
    it('should allow to get date of user we created', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            userName: 'Oleg',
            age: 26,
            hobbies: ['Gym'],
        };
        const postRes = yield (0, supertest_1.default)(index_1.server).post('/api/users').send(userData);
        expect(postRes.statusCode).toBe(201);
        const { id } = postRes.body;
        const getRes = yield (0, supertest_1.default)(index_1.server).get(`/api/users/${id}`);
        expect(getRes.statusCode).toBe(200);
    }));
    it('should update user and return correct data with the same id', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const postRes = yield (0, supertest_1.default)(index_1.server).post('/api/users').send(userData);
        expect(postRes.statusCode).toBe(201);
        const { id } = postRes.body;
        const getRes = yield (0, supertest_1.default)(index_1.server).get(`/api/users/${id}`);
        expect(getRes.statusCode).toBe(200);
        const putRes = yield (0, supertest_1.default)(index_1.server).put(`/api/users/${id}`).send(newUserData);
        expect(putRes.statusCode).toBe(200);
        const strictUserData = Object.assign({ id }, newUserData);
        expect(putRes.body).toStrictEqual(strictUserData);
    }));
    it('should correct delete user and return correct status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const getRes = yield (0, supertest_1.default)(index_1.server).get(`/api/users`);
        expect(getRes.statusCode).toBe(200);
        const { id: theFirstUserId } = getRes.body[0];
        const deleteRes = yield (0, supertest_1.default)(index_1.server).delete(`/api/users/${theFirstUserId}`);
        expect(deleteRes.statusCode).toBe(204);
    }));
    it('should return correct status code for getting already delete user', () => __awaiter(void 0, void 0, void 0, function* () {
        const getRes = yield (0, supertest_1.default)(index_1.server).get(`/api/users`);
        expect(getRes.statusCode).toBe(200);
        const { id: theFirstUserId } = getRes.body[0];
        const deleteRes = yield (0, supertest_1.default)(index_1.server).delete(`/api/users/${theFirstUserId}`);
        expect(deleteRes.statusCode).toBe(204);
        const getResSecond = yield (0, supertest_1.default)(index_1.server).get(`/api/users${theFirstUserId}`);
        expect(getResSecond.statusCode).toBe(404);
    }));
});
//# sourceMappingURL=index.test.js.map