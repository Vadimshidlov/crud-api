export default function validateBody(body: any): boolean {
    if (
        typeof body.userName === 'string' &&
        typeof body.age === 'number' &&
        Array.isArray(body.hobbies) &&
        Object.keys(body).length === 3
    ) {
        const firstLength = body.hobbies.length;

        const secondLength = body.hobbies.filter((hobby: unknown) => typeof hobby === 'string').length;

        return firstLength === secondLength;
    }

    return false;
}
