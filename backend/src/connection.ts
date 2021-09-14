import mysql from 'mysql2';


const connection  = mysql.createConnection({
    host: 'localhost',
    user: 'aplikacija',
    password: 'aplikacija',
    database: 'aplikacija'
})


export default connection;