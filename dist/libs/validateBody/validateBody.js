"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateBody(body) {
    if (typeof body.userName === 'string' &&
        typeof body.age === 'number' &&
        Array.isArray(body.hobbies) &&
        Object.keys(body).length === 3) {
        const firstLength = body.hobbies.length;
        const secondLength = body.hobbies.filter((hobby) => typeof hobby === 'string').length;
        return firstLength === secondLength;
    }
    return false;
}
exports.default = validateBody;
//# sourceMappingURL=validateBody.js.map