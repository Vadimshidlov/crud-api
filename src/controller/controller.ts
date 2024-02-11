import http from 'http';
import { users, UserType } from '../users/users';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import bodyParser from '../libs/bodyParser/bodyParser';
import validateBody from '../libs/validateBody/validateBody';

export class AppController {
    public getUsers(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
        try {
            const baseUrl = req.url?.slice(0, req.url.lastIndexOf('/'));
            console.log(baseUrl);

            const arrayFromUrl = req.url?.split('/');

            const userId = arrayFromUrl ? arrayFromUrl[arrayFromUrl.length - 1] : '';

            if (req.url === '/api/users') {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.write(JSON.stringify(users));
                res.end();
            } else if (baseUrl === '/api/users' && userId && uuidValidate(userId)) {
                let [singleUser] = users.filter((user) => user.id === userId);

                if (singleUser) {
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.write(JSON.stringify(singleUser));
                    res.end();
                } else {
                    res.writeHead(404, { 'Content-type': 'application/json' });
                    res.end(JSON.stringify({ title: 'Uncorrect user ID', message: 'User not Found' }));
                }
            } else if (baseUrl === '/api/users' && userId && !uuidValidate(userId)) {
                res.writeHead(400, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ title: 'Invalid user ID', message: 'User not Found' }));
            } else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ title: 'Not Found', message: 'Route not Found' }));
            }
        } catch (error) {
            res.writeHead(500, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ title: 'Internal Server Error', message: 'An error occurred' }));
        }
    }

    public async postUser(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
        try {
            if (req.url === '/api/users') {
                try {
                    const body = await bodyParser(req);

                    const isBodyValidate = validateBody(body);

                    if (isBodyValidate) {
                        const newUser: UserType = {
                            ...body,
                            id: uuidv4(),
                        };

                        users.push(newUser);

                        res.writeHead(201, { 'Content-type': 'application/json' });
                        res.end(JSON.stringify(newUser));
                        console.log(body);
                    } else {
                        res.writeHead(400, { 'Content-type': 'application/json' });
                        res.end(
                            JSON.stringify({
                                title: 'Validation Failed',
                                message: "Request body doesn't contain required fields",
                            }),
                        );
                    }
                } catch (error) {
                    console.log('Before crash 2');

                    res.writeHead(400, { 'Content-type': 'application/json' });
                    res.end(
                        JSON.stringify({
                            title: 'Validation Failed',
                            message: 'Invalid JSON',
                        }),
                    );
                }
            } else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ title: 'Not Found', message: 'Route not Found' }));
            }
        } catch (error) {
            res.writeHead(500, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ title: 'Internal Server Error', message: 'An error occurred' }));
        }
    }

    public deleteUser(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
        try {
            const baseUrl = req.url?.slice(0, req.url.lastIndexOf('/'));

            const arrayFromUrl = req.url?.split('/');

            const userId = arrayFromUrl ? arrayFromUrl[arrayFromUrl.length - 1] : '';

            if (baseUrl === '/api/users' && userId && uuidValidate(userId)) {
                let [singleUser] = users.filter((user) => user.id === userId);

                const indexOfDeleteUser = users.findIndex((user) => user.id === userId);

                if (indexOfDeleteUser === -1) {
                    res.writeHead(404, { 'Content-type': 'application/json' });
                    res.end(JSON.stringify({ title: 'Uncorrect user ID', message: 'User not Found' }));
                } else {
                    users.splice(indexOfDeleteUser, 1);
                    res.statusCode = 204;
                    res.setHeader('Content-type', 'application/json');
                    res.write(JSON.stringify(singleUser));
                    res.end();
                }
            } else if (baseUrl === '/api/users' && userId && !uuidValidate(userId)) {
                res.writeHead(400, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ title: 'User not Found', message: 'Invalid user ID' }));
            } else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ title: 'Not Found', message: 'Route not Found' }));
            }
        } catch (error) {
            res.writeHead(500, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ title: 'Internal Server Error', message: 'An error occurred' }));
        }
    }

    public async putUser(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
        const baseUrl = req.url?.slice(0, req.url.lastIndexOf('/'));

        const arrayFromUrl = req.url?.split('/');

        const userId = arrayFromUrl ? arrayFromUrl[arrayFromUrl.length - 1] : '';

        if (baseUrl === '/api/users' && userId && uuidValidate(userId)) {
            const indexOfUpdateUser = users.findIndex((user) => user.id === userId);

            if (indexOfUpdateUser === -1) {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ title: 'Uncorrect user ID', message: 'User not Found' }));
            } else {
                try {
                    const body = await bodyParser(req);

                    const isBodyValidate = validateBody(body);

                    if (isBodyValidate) {
                        const newBodyUser: UserType = {
                            ...body,
                            id: userId,
                        };

                        users.splice(indexOfUpdateUser, 1, newBodyUser);
                        res.writeHead(200, { 'Content-type': 'application/json' });
                        res.end(JSON.stringify(newBodyUser));
                    } else {
                        res.writeHead(400, { 'Content-type': 'application/json' });
                        res.end(
                            JSON.stringify({
                                title: 'Validation Failed',
                                message: "Request body doesn't contain required fields",
                            }),
                        );
                    }
                } catch (e) {
                    console.error(e);
                    res.writeHead(500, { 'Content-type': 'application/json' });
                    res.end(JSON.stringify({ title: 'Internal Server Error', message: 'An error occurred' }));
                }
            }
        } else if (baseUrl === '/api/users' && userId && !uuidValidate(userId)) {
            res.writeHead(400, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ title: 'User not Found', message: 'Invalid user ID' }));
        } else {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ title: 'Not Found', message: 'Route not Found' }));
        }
    }
}
