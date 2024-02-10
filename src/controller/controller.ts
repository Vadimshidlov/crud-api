import http from 'http';
import { users } from '../users/users';

export class AppController {
    public getUsers(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
        if (req.url === '/api/users') {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.write(JSON.stringify(users));
            res.end();
        }
    }
}
