import { AppController } from './controller/controller';
import { users } from './users/users';
import http from 'http';
import dotenv from 'dotenv';

// dotenv.config();

const appController = new AppController();

const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            appController.getUsers(req, res);
            break;

        default:
            res.statusCode = 404;
            res.setHeader('Content-type', 'application/json');
            res.write(JSON.stringify({ message: 'Hello! This endpoint is doesnt exist!' }));
            res.end();
            break;
    }
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
