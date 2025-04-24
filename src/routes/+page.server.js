import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

// Load function that retrieves articles from the database
export async function load() {
    let connection = await createConnection(); // Establish a connection to the database
    let [rows] = await connection.execute( // Execute a query to fetch all articles
        'SELECT * FROM articles'
    );

    // Return the articles fetched from the database
    return {
        articles: rows
    };
}