const mysql = require('mysql2/promise');
// const sqlite3 = require('sqlite3');
const path = require('path');

async function testMysql() {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'ballotic'
    });
    console.log('MySQL Connection successful!');
    const [rows] = await conn.execute('SELECT 1');
    console.log('MySQL query result:', rows);
    await conn.end();
  } catch (err) {
    console.error('MySQL connection failed:', err.message);
  }
}

async function main() {
  await testMysql();
}

main();
