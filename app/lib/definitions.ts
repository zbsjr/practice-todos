export type todos = {
    id: number,
    userId: number,
    title: string,
    completed: boolean,
};

export type todoCreateUpdate = Omit<todos, "id">;