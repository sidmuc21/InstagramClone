import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

// Load function runs when the page loads
export async function load({ locals }) {
	// Check if user is logged in and is an admin
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login'); // Redirect to login if not admin
	}

	// Connect to the database
	let connection = await createConnection();

	// Fetch all articles from the database
	let [rows] = await connection.execute(
		'SELECT * FROM articles'
	);

	// Return articles to be used in the frontend
	return {
		articles: rows
	};
}

// Handle form actions (delete article)
export const actions = {
	deleteArticle: async ({ request }) => {
		const formData = await request.formData();       // Get form data
		const id = formData.get('id');                   // Get article ID to delete

		const connection = await createConnection();     // Connect to DB

		// Delete the article with the given ID
		const [result] = await connection.execute(
			'DELETE FROM articles WHERE id = ?',
			[id]
		);
	}
};