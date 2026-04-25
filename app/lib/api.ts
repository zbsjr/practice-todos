'use server';

import postgres from 'postgres';
import { todos } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchTodos(): Promise<todos[]> {
    try {
        const data = await sql<todos[]>`
            SELECT id, "userId", title, completed FROM todos
        `;

        return data;
    } catch {
        throw new Error("Failed to fetch data.");
    }
}