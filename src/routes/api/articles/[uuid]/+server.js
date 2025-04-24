import { createConnection } from "$lib/db/mysql.js"; 
import { BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } from "$env/static/private";

// Helper function to handle Basic Auth
async function authenticate(request) {
    const authHeader = request.headers.get('authorization');

    // If no auth header is present, request login
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
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return null; // Auth successful
}

// Handle GET request for a specific article
export async function GET({ params }) {
    const { uuid } = params; // Extract article ID

    try {
        const connection = await createConnection();
        const [rows] = await connection.execute(
            'SELECT * FROM articles WHERE id = ?', [uuid]
        );

        // Return 404 if article not found
        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Article not found' }), {
                status: 404,
                headers: { 'content-type': 'application/json' }
            });
        }

        // Return found article
        return new Response(JSON.stringify(rows[0]), {
            status: 200,
            headers: { 'content-type': 'application/json' }
        });

    } catch (err) {
        console.error(err); // Log DB error
        return new Response(JSON.stringify({ error: 'Database connection failed' }), {
            status: 500,
            headers: { 'content-type': 'application/json' }
        });
    }
}

// Handle PUT request to update an article
export async function PUT({ params, request }) {
    const auth = await authenticate(request); // Check auth
    if (auth) return auth;

    const connection = await createConnection();
    const { uuid } = params;
    const data = await request.json(); // Request body

    // Update article data in DB
    await connection.execute(
        `UPDATE articles SET image = ?, description = ?, author = ?, votes = ? WHERE id = ?`,
        [data.image, data.description, data.author, data.votes, uuid]
    );

    await connection.end(); // Close DB connection

    // Return updated data
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'content-type': 'application/json' }
    });
}

// Handle DELETE request to remove an article
export async function DELETE({ params, request }) {
    const auth = await authenticate(request); // Check auth
    if (auth) return auth;

    const { uuid } = params;

    try {
        const connection = await createConnection();

        // Attempt to delete the article
        const [result] = await connection.execute(
            'DELETE FROM articles WHERE id = ?', [uuid]
        );

        // If nothing was deleted, article doesn't exist
        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'Article not found' }), {
                status: 404,
                headers: { 'content-type': 'application/json' }
            });
        }

        // Return success with no content
        return new Response(null, { status: 204 });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Database connection failed' }), {
            status: 500,
            headers: { 'content-type': 'application/json' }
        });
    }
}