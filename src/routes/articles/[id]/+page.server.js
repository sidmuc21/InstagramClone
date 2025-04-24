import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

// Load article and its comments
export async function load({ params }) {
    const id = params.id;
    const connection = await createConnection();

    // Fetch article
    const [rows] = await connection.execute(
        'SELECT * FROM articles WHERE id = ?', [id]
    );

    // Fetch comments for the article
    const [comments] = await connection.execute(
        'SELECT * FROM comments WHERE article_id = ?', [id]
    );

    return {
        articles: rows,
        comments: comments
    };
}

export const actions = {
    // Handle upvote
    upvotePhoto: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        const connection = await createConnection();
        const [result] = await connection.execute(
            'UPDATE articles SET votes = votes + 1 WHERE id = ?', [id]
        );

        return result.affectedRows ? { success: true } : { error: 'ERROR' };
    },

    // Handle comment submission
    commentPhoto: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('article_id');
        const user = formData.get('name');
        const comment = formData.get('text');

        const connection = await createConnection();
        await connection.execute(
            'INSERT INTO comments (article_id, name, text) VALUES (?, ?, ?)',
            [id, user, comment]
        );

        // Redirect back to the article page
        return {
            status: 303,
            location: `/articles/${id}`
        };
    }
};