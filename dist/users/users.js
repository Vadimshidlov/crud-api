"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const uuid_1 = require("uuid");
console.log('For test:', (0, uuid_1.v4)());
exports.users = [
    {
        userName: 'Vadim',
        id: (0, uuid_1.v4)(),
        age: 26,
        hobbies: ['Gym', 'Boxing', 'Books', 'Fishing', 'Programming', 'Nature'],
    },
    {
        userName: 'Oleg',
        id: (0, uuid_1.v4)(),
        age: 26,
        hobbies: ['Gym', 'Boxing', 'Books', 'Fishing', 'Programming', 'Nature'],
    },
    {
        userName: 'Peter',
        id: (0, uuid_1.v4)(),
        age: 26,
        hobbies: ['Gym', 'Boxing', 'Books', 'Fishing', 'Programming', 'Nature'],
    },
    {
        userName: 'John',
        id: (0, uuid_1.v4)(),
        age: 26,
        hobbies: ['Gym', 'Boxing', 'Books', 'Fishing', 'Programming', 'Nature'],
    },
];
//# sourceMappingURL=users.js.map