"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const users_1 = require("../users/users");
const uuid_1 = require("uuid");
const bodyParser_1 = __importDefault(require("../libs/bodyParser/bodyParser"));
const validateBody_1 = __importDefault(require("../libs/validateBody/validateBody"));
class AppController {
    getUsers(req, res) {
        var _a, _b;
        try {
            const baseUrl = (_a = req.url) === null || _a === void 0 ? void 0 : _a.slice(0, req.url.lastIndexOf('/'));
            console.log(baseUrl);
            const arrayFromUrl = (_b = req.url) === null || _b === void 0 ? void 0 : _b.split('/');
            const userId = arrayFromUrl ? arrayFromUrl[arrayFromUrl.length - 1] : '';
            if (req.url === '/api/users') {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.write(JSON.stringify(users_1.users));
                res.end();
            }
            else if (baseUrl === '/api/users' && userId && (0, uuid_1.validate)(userId)) {
                const [singleUser] = users_1.users.filter((user) => user.id === userId);
                if (singleUser) {
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.write(JSON.stringify(singleUser));
                    res.end();
                }
                else {
                    res.writeHead(404, { 'Content-type': 'application/json' });
                    res.end(JSON.stringify({ title: 'Uncorrect user ID', message: 'User not Found' }));
                }
            }
            else if (baseUrl === '/api/users' && userId && !(0, uuid_1.validate)(userId)) {
                res.writeHead(400, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ title: 'Invalid user ID', message: 'User not Found' }));
            }
            else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ title: 'Not Found', message: 'Route not Found' }));
            }
        }
        catch (error) {
            res.writeHead(500, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ title: 'Internal Server Error', message: 'An error occurred' }));
        }
    }
    postUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.url === '/api/users') {
                    try {
                        const body = yield (0, bodyParser_1.default)(req);
                        const isBodyValidate = (0, validateBody_1.default)(body);
                        if (isBodyValidate) {
                            const newUser = Object.assign(Object.assign({}, body), { id: (0, uuid_1.v4)() });
                            users_1.users.push(newUser);
                            res.writeHead(201, { 'Content-type': 'application/json' });
                            res.end(JSON.stringify(newUser));
                            console.log(body);
                        }
                        else {
                            res.writeHead(400, { 'Content-type': 'application/json' });
                            res.end(JSON.stringify({
                                title: 'Validation Failed',
                                message: "Request body doesn't contain required fields",
                            }));
                        }
                    }
                    catch (error) {
                        console.log('Before crash 2');
                        res.writeHead(400, { 'Content-type': 'application/json' });
                        res.end(JSON.stringify({
                            title: 'Validation Failed',
                            message: 'Invalid JSON',
                        }));
                    }
                }
                else {
                    res.writeHead(404, { 'Content-type': 'application/json' });
                    res.end(JSON.stringify({ title: 'Not Found', message: 'Route not Found' }));
                }
            }
            catch (error) {
                res.writeHead(500, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ title: 'Internal Server Error', message: 'An error occurred' }));
            }
        });
    }
    deleteUser(req, res) {
        var _a, _b;
        try {
            const baseUrl = (_a = req.url) === null || _a === void 0 ? void 0 : _a.slice(0, req.url.lastIndexOf('/'));
            const arrayFromUrl = (_b = req.url) === null || _b === void 0 ? void 0 : _b.split('/');
            const userId = arrayFromUrl ? arrayFromUrl[arrayFromUrl.length - 1] : '';
            if (baseUrl === '/api/users' && userId && (0, uuid_1.validate)(userId)) {
                const [singleUser] = users_1.users.filter((user) => user.id === userId);
                const indexOfDeleteUser = users_1.users.findIndex((user) => user.id === userId);
                if (indexOfDeleteUser === -1) {
                    res.writeHead(404, { 'Content-type': 'application/json' });
                    res.end(JSON.stringify({ title: 'Uncorrect user ID', message: 'User not Found' }));
                }
                else {
                    users_1.users.splice(indexOfDeleteUser, 1);
                    res.statusCode = 204;
                    res.setHeader('Content-type', 'application/json');
                    res.write(JSON.stringify(singleUser));
                    res.end();
                }
            }
            else if (baseUrl === '/api/users' && userId && !(0, uuid_1.validate)(userId)) {
                res.writeHead(400, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ title: 'User not Found', message: 'Invalid user ID' }));
            }
            else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ title: 'Not Found', message: 'Route not Found' }));
            }
        }
        catch (error) {
            res.writeHead(500, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ title: 'Internal Server Error', message: 'An error occurred' }));
        }
    }
    putUser(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = (_a = req.url) === null || _a === void 0 ? void 0 : _a.slice(0, req.url.lastIndexOf('/'));
            const arrayFromUrl = (_b = req.url) === null || _b === void 0 ? void 0 : _b.split('/');
            const userId = arrayFromUrl ? arrayFromUrl[arrayFromUrl.length - 1] : '';
            if (baseUrl === '/api/users' && userId && (0, uuid_1.validate)(userId)) {
                const indexOfUpdateUser = users_1.users.findIndex((user) => user.id === userId);
                if (indexOfUpdateUser === -1) {
                    res.writeHead(404, { 'Content-type': 'application/json' });
                    res.end(JSON.stringify({ title: 'Uncorrect user ID', message: 'User not Found' }));
                }
                else {
                    try {
                        const body = yield (0, bodyParser_1.default)(req);
                        const isBodyValidate = (0, validateBody_1.default)(body);
                        if (isBodyValidate) {
                            const newBodyUser = Object.assign(Object.assign({}, body), { id: userId });
                            users_1.users.splice(indexOfUpdateUser, 1, newBodyUser);
                            res.writeHead(200, { 'Content-type': 'application/json' });
                            res.end(JSON.stringify(newBodyUser));
                        }
                        else {
                            res.writeHead(400, { 'Content-type': 'application/json' });
                            res.end(JSON.stringify({
                                title: 'Validation Failed',
                                message: "Request body doesn't contain required fields",
                            }));
                        }
                    }
                    catch (e) {
                        console.error(e);
                        res.writeHead(500, { 'Content-type': 'application/json' });
                        res.end(JSON.stringify({ title: 'Internal Server Error', message: 'An error occurred' }));
                    }
                }
            }
            else if (baseUrl === '/api/users' && userId && !(0, uuid_1.validate)(userId)) {
                res.writeHead(400, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ title: 'User not Found', message: 'Invalid user ID' }));
            }
            else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ title: 'Not Found', message: 'Route not Found' }));
            }
        });
    }
}
exports.AppController = AppController;
//# sourceMappingURL=controller.js.map