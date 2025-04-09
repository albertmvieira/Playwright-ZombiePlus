const { da } = require('@faker-js/faker');
const {Pool} = require('pg');

const DbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}

export async function executeSql(sqlScript) {
    try {
        console.log('Executando SQL ' + sqlScript);
        const pool = new Pool(DbConfig);
        const client = await pool.connect();
        const result = await client.query(sqlScript);
        console.log(result.rows);
        await client.end();
    }
    catch (err) {
        console.log('Erro ao executar SQL ' + err);
    }
}