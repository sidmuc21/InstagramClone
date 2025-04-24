import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

// Load function to restrict access to admins only
export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		// Redirect non-admins to login page
		redirect(302, '/login');
	}
}

// Action handler for creating a new article
export const actions = {
	createArticle: async ({ request }) => {
		const formData = await request.formData(); // Submitted form data
        const image = formData.get('image');       // Get uploaded image

		// Upload image to Vercel Blob Storage
		const { url } = await put('Projekt/' + image.name, image, {
			addRandomSuffix: true,          // Add random string to filename
			access: 'public',               // Make file publicly accessible
			token: BLOB_READ_WRITE_TOKEN    // Use secure token from env
		});

		const connection = await createConnection(); // Create DB connection

		// Insert article data into the database
		const [result] = await connection.execute(
			'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
			[
				url,                             // Image URL from blob storage
				formData.get('description'),     // Article description
				formData.get('author')           // Author name
			]
		);

		// Redirect to admin page if insertion is successful
		if (result.affectedRows) {
			redirect(303, '/admin');
		}
	}
};
