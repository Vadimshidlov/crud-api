import { v4 as uuidv4 } from 'uuid';

console.log('For test:', uuidv4());

export type UserType = {
    id: string;
    userName: string;
    age: number;
    hobbies: string[];
};

export type BodyUserType = Omit<UserType, 'id'>;

export const users: UserType[] = [
    {
        userName: 'Vadim',
        id: uuidv4(),
        age: 26,
        hobbies: ['Gym', 'Boxing', 'Books', 'Fishing', 'Programming', 'Nature'],
    },
    {
        userName: 'Oleg',
        id: uuidv4(),
        age: 26,
        hobbies: ['Gym', 'Boxing', 'Books', 'Fishing', 'Programming', 'Nature'],
    },
    {
        userName: 'Peter',
        id: uuidv4(),
        age: 26,
        hobbies: ['Gym', 'Boxing', 'Books', 'Fishing', 'Programming', 'Nature'],
    },
    {
        userName: 'John',
        id: uuidv4(),
        age: 26,
        hobbies: ['Gym', 'Boxing', 'Books', 'Fishing', 'Programming', 'Nature'],
    },
];
