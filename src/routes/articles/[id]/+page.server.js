import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({params}) {
    const id = params.id;
    let connection = await createConnection();
    let [rows] = await connection.execute(
        'SELECT * FROM articles where id = ?',
        [id]
    );

    return {
        articles: rows
    };
}

export const actions = {
    upvotePhoto: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const connection = await createConnection();
		const [result] = await connection.execute(
			'UPDATE articles SET votes = votes + 1 WHERE id = ?',
			[id]
		);

		if (result.affectedRows) {
			return { success: true };
		} else {
			return { error: 'ERROR' };
		}
	}
};