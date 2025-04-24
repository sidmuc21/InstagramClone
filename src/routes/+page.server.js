import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load() {
    let connection = await createConnection();
    let [rows] = await connection.execute(
        'SELECT * FROM articles'
    );

    return {
        articles: rows
    };
}

export const actions = {

};