// Get the client
import mysql from 'mysql2/promise';
import 'dotenv/config'

const getConnection = async () => {
    // Create the connection to database
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    try {
        const [results, fields] = await connection.query('SELECT * FROM users');
        console.log("results", results);
        console.log("fields", fields);

    } catch (error) {
        console.log(error);

    }
}



export default getConnection;