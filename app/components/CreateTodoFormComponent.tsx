import { todos } from "../lib/definitions";

type todoProps = {
    todoId: number;
    todoUserId: number;
    todoTitle: string;
    todoStatus: boolean;
    setTodoId: (id: number) => void;
    setTodoUserId: (userId: number) => void;
    setTodoTitle: (title: string) => void;
    setTodoStatus: (status: boolean) => void;
    handleUpdateTodo: (e: React.FormEvent<HTMLFormElement>) => void;
    handleCreateTodo: (e: React.FormEvent<HTMLFormElement>) => void;
    clearForm: () => void;
};

export function CreateTodoFormComponent({ todoId, todoUserId, todoTitle, todoStatus, setTodoId, setTodoUserId, setTodoTitle, setTodoStatus, handleUpdateTodo, handleCreateTodo, clearForm }: todoProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
                {todoId ? 'Update todo' : 'Add a todo'}
            </h2>
            <form onSubmit={todoId ? handleUpdateTodo : handleCreateTodo} className="space-y-4">
                <input type="hidden"
                    value={todoId}
                    onChange={(e) => (setTodoId(Number(e.target.value)))}
                />
                <input type="hidden"
                    value={todoUserId}
                    onChange={(e) => (setTodoUserId(Number(e.target.value)))}
                />
                <div className="space-y-1.5">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-slate-700"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="What needs doing?"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        required
                        value={todoTitle}
                        onChange={(e) => (setTodoTitle(e.target.value))}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        id="completed"
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        value={todoStatus ? 1 : 0}
                        checked={todoStatus}
                        onChange={(e) => (setTodoStatus(Boolean(e.target.checked)))}
                    />
                    <label
                        htmlFor="completed"
                        className="text-sm font-medium text-slate-700"
                    >
                        Mark as completed
                    </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                    {todoId ? (
                        <button
                            type="button"
                            onClick={clearForm}
                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400/40 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                    ) : ''}

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2"
                    >
                        {todoId ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </section>
    );
}