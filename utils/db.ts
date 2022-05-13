import {createPool} from 'mysql2/promise';

export const pool = createPool({
    host: '0.0.0.0',
    user: 'root',
    database: 'komis',
    namedPlaceholders: true,
    decimalNumbers: true,
});