const { da } = require('@faker-js/faker');
const {Pool} = require('pg');

const DbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus',
    password: 'pwd123',
    port: 5432,
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