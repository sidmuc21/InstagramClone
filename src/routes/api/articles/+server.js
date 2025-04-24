import { createConnection } from "$lib/db/mysql.js"; 
import { BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } from "$env/static/private";

// Basic Auth check
async function authenticate(request) {
    const authHeader = request.headers.get('authorization');

    // If no auth header, prompt for login
    if (!authHeader){
        return new Response(null, {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
        });
    }

    // Decode credentials
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = atob(base64Credentials);
    const [username, password] = credentials.split(':');

    // Validate credentials
    if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD){
        return new Response(JSON.stringify({ message: 'Access denied' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return null; // Auth successful
}

// Handle GET: return all articles
export async function GET({ params }) {

    try {
        const connection = await createConnection(); // Connect to DB
        const [rows] = await connection.execute('SELECT * FROM articles'); // Fetch all articles

        // Return articles as JSON
        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { 'content-type': 'application/json' }
        });

    } catch (err) {
        console.error(err); // Log errors
        return new Response(JSON.stringify({ error: 'Database connection failed' }), {
            status: 500,
            headers: { 'content-type': 'application/json' }
        });
    }
}

// Handle POST: add new article
export async function POST({ request }) {
    const auth = await authenticate(request); // Require auth
    if (auth) return auth;

    const connection = await createConnection(); // Connect to DB
    const data = await request.json(); // Request body

    // Insert article into DB
    await connection.execute(
        'INSERT INTO articles (image, description, author, votes) VALUES (?, ?, ?, ?)',
        [data.image, data.description, data.author, data.votes]
    );

    await connection.end(); // Close DB connection

    // Return inserted data
    return new Response(JSON.stringify(data), {
        status: 201,
        headers: { 'content-type': 'application/json' }
    });
}