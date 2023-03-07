import dotenv from 'dotenv'

dotenv.config()

const connection = {
    host: process.env.MARIA_DB_HOST,
    user: process.env.MARIA_DB_USER,
    password: process.env.MARIA_DB_PASSWORD,
    port: 3306,
    database: process.env.MARIA_DB_DATABASE
}

export default connection