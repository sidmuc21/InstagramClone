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

};