import http from 'http';
import { BodyUserType } from 'users/users';

export default async function bodyParser(request: http.IncomingMessage): Promise<BodyUserType> {
    return new Promise((resolve, reject) => {
        try {
            let body = '';

            request.on('data', (chunk) => {
                body += chunk;
            });

            request.on('error', (error) => {
                reject(error);
            });

            request.on('end', () => {
                resolve(JSON.parse(body));
            });
        } catch (error) {
            reject(error);
        }
    });
}
