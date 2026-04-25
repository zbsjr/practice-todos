'use server';

import postgres from 'postgres';
import { todos, todoCreateUpdate } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchTodos(): Promise<todos[]> {
    try {
        const res = await sql<todos[]>`
            SELECT id, user_id AS "userId", title, completed FROM todos
        `;

        return res;
    } catch (err) {
        console.error("fetchTodos failed:", err);
        throw new Error("Failed to fetch data.");
    }
}

export async function createTodo(todo: todoCreateUpdate): Promise<todos> {
    try {
        const [row] = await sql<todos[]>`
            INSERT INTO todos (user_id, title, completed, created_at)
            VALUES (${todo.userId}, ${todo.title}, ${todo.completed}, NOW())
            RETURNING id, user_id AS "userId", title, completed
        `;

        return row;
    } catch (err) {
        console.error("createTodo failed:", err);
        throw new Error("Failed creating new todo");
    }
}

export async function updateTodo(todo: todoCreateUpdate, id: number): Promise<todos> {
    try {
        const [row] = await sql<todos[]>`
            UPDATE todos SET 
                title = ${todo.title},
                completed = ${todo.completed}
            WHERE id = ${id}
            RETURNING id, user_id AS "userId", title, completed
        `;

        return row;
    } catch (err) {
        console.error("updateTodo failed:", err);
        throw new Error("Failed updating todo");
    }
}

export async function deleteTodo(id: number): Promise<number> {
    try {
        await sql<todos[]>`DELETE FROM todos WHERE id = ${id}`;

        return 1;
    } catch (err) {
        console.error("deleteTodo failed:", err);
        throw new Error("Failed deleting todo");
    }
}

export async function toggleStatusTodo(status: boolean, id: number): Promise<todos> {
    try {
        const [row] = await sql<todos[]>`
            UPDATE todos SET 
                completed = ${status}
            WHERE id = ${id}
            RETURNING id, user_id AS "userId", title, completed
        `;

        return row;
    } catch (err) {
        console.error("toggleStatusTodo failed:", err);
        throw new Error("Failed toggling status todo");
    }
}