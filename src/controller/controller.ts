import http from 'http';
import { users } from '../users/users';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import bodyParser from '../libs/bodyParser/bodyParser';

export class AppController {
    public getUsers(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
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
    }

    public async postUser(
        req: http.IncomingMessage,
        // res: http.ServerResponse<http.IncomingMessage>
    ) {
        if (req.url === '/api/users') {
            try {
                const body = await bodyParser(req);
                console.log(body);
            } catch (error) {
                console.log(error);
            }
        }
    }
}
