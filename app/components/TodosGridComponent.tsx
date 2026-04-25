import { todos } from "../lib/definitions";

type todoProps = {
    todos: todos[];
    toggleStatus: (status: boolean, id: number) => void;
    toggleEditMode: (todos: todos) => void;
    handleDeleteTodo: (id: number) => void;
};

export function TodosGridComponent({ todos, toggleStatus, toggleEditMode, handleDeleteTodo }: todoProps) {
    return (
        <section className="space-y-3">
            {todos.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white/50 p-10 text-center text-sm text-slate-500">
                    Your list is empty.
                </div>
            ) : (
                <ul className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {todos.map((v) => (
                        <li
                            key={v.id}
                            className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-50"
                        >
                            <input
                                type="checkbox"
                                checked={v.completed}
                                onChange={(e) => toggleStatus(e.target.checked, v.id)}
                                className="h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span
                                className={`flex-1 text-sm ${v.completed
                                    ? "text-slate-400 line-through"
                                    : "text-slate-900"
                                    }`}
                            >
                                {v.title}
                            </span>
                            <div className="flex shrink-0 items-center gap-1">
                                <button
                                    type="button"
                                    aria-label={`Edit ${v.title}`}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                                    onClick={() => toggleEditMode(v)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    >
                                        <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793ZM11.379 5.793 3 14.172V17h2.828l8.379-8.379-2.828-2.828Z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    aria-label={`Delete ${v.title}`}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                                    onClick={() => handleDeleteTodo(v.id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8.75 1A2.75 2.75 0 0 0 6 3.75V4H3.5a.75.75 0 0 0 0 1.5h.379l.853 10.24A2.75 2.75 0 0 0 7.473 18.5h5.054a2.75 2.75 0 0 0 2.741-2.76L16.121 5.5h.379a.75.75 0 0 0 0-1.5H14v-.25A2.75 2.75 0 0 0 11.25 1h-2.5ZM12.5 4v-.25a1.25 1.25 0 0 0-1.25-1.25h-2.5A1.25 1.25 0 0 0 7.5 3.75V4h5ZM8.5 7.75a.75.75 0 0 1 1.5 0v6a.75.75 0 0 1-1.5 0v-6Zm3.5-.75a.75.75 0 0 0-.75.75v6a.75.75 0 0 0 1.5 0v-6a.75.75 0 0 0-.75-.75Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}