const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

export const config = {
    DB_NAME: DB_NAME || 'default',
    DB_USER: DB_USER || 'default',
    DB_PASSWORD: DB_PASSWORD || 'default',
};
