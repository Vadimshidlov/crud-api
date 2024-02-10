import { v4 as uuidv4 } from 'uuid';

console.log('For test:', uuidv4());

export type UserType = {
    id: string;
    userName: string;
    age: number;
    hobbies: string[];
};

export const users: UserType[] = [
    {
        userName: 'Vadim',
        // id: 'asdasd',
        id: uuidv4(),
        age: 26,
        hobbies: ['Gym', 'Boxing', 'Books', 'Fishing', 'Programming', 'Nature'],
    },
    {
        userName: 'Oleg',
        // id: 'asdasd2',
        id: uuidv4(),
        age: 26,
        hobbies: ['Gym', 'Boxing', 'Books', 'Fishing', 'Programming', 'Nature'],
    },
    {
        userName: 'Peter',
        // id: 'asdasd3',
        id: uuidv4(),
        age: 26,
        hobbies: ['Gym', 'Boxing', 'Books', 'Fishing', 'Programming', 'Nature'],
    },
    {
        userName: 'John',
        // id: 'asdasd4',
        id: uuidv4(),
        age: 26,
        hobbies: ['Gym', 'Boxing', 'Books', 'Fishing', 'Programming', 'Nature'],
    },
];
