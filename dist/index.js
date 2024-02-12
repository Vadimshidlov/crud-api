"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const controller_1 = require("./controller/controller");
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const appController = new controller_1.AppController();
const PORT = process.env.PORT || 4001;
exports.server = http_1.default.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            appController.getUsers(req, res);
            break;
        case 'POST':
            appController.postUser(req, res);
            break;
        case 'DELETE':
            appController.deleteUser(req, res);
            break;
        case 'PUT':
            appController.putUser(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader('Content-type', 'application/json');
            res.write(JSON.stringify({ message: 'Hello! This endpoint is doesnt exist!' }));
            res.end();
            break;
    }
});
exports.server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
//# sourceMappingURL=index.js.map