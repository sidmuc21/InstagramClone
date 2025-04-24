import mysql from 'mysql2/promise';

// Import environment variables
import {
	DB_HOST,
	DB_USER,
	DB_PORT,
	DB_PASSWORD,
	DB_NAME
} from '$env/static/private';

// Async function to create and return a new database connection
export async function createConnection() {
	return mysql.createConnection({
		host: DB_HOST,
		user: DB_USER,
		port: DB_PORT,
		password: DB_PASSWORD,
		database: DB_NAME
	});
}