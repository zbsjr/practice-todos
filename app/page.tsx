"use client";

import { fetchTodos, createTodo, updateTodo, deleteTodo, toggleStatusTodo } from "./lib/api";
import { useState, useEffect } from "react";
import { todos } from "./lib/definitions";

export default function Home() {
  const [todos, setTodos] = useState<todos[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [todoUserId, setTodoUserId] = useState(1);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoStatus, setTodoStatus] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };

    loadTodos();
  }, []);

  const completedCount = todos.filter((t) => t.completed).length;

  // Handle create todo
  async function handleCreateTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      userId: todoUserId,
      title: todoTitle,
      completed: todoStatus,
    };

    const res = await createTodo(data);
    setTodos((prevTodos) =>
      res.completed ? [...prevTodos, res] : [res, ...prevTodos]
    );

    setTodoTitle("");
    setTodoStatus(false);
  }

  // Populate form with selected todo
  function toggleEditMode(todos: todos) {
    setTodoId(todos.id);
    setTodoUserId(todos.userId);
    setTodoTitle(todos.title);
    setTodoStatus(todos.completed);
  }

  // Handle update todo
  async function handleUpdateTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      userId: todoUserId,
      title: todoTitle,
      completed: todoStatus,
    };

    const res = await updateTodo(data, todoId);
    const newTodos = todos.map((v) => {
      if (v.id === todoId) {
        return res;
      }
      return v;
    });
    setTodos(newTodos);

    setTodoId(0);
    setTodoTitle("");
    setTodoStatus(false);
  }

  // Handle delete todo
  async function handleDeleteTodo(id: number) {
    if (confirm("Are you sure you want to delete this record?")) {
      const res = await deleteTodo(id);

      if (res === 1) {
        const newTodos = todos.filter((v) => v.id !== id);
        setTodos(newTodos);
      }
    }
  }

  // Toggle status
  async function toggleStatus(status: boolean, id: number) {
    const res = await toggleStatusTodo(status, id);
    const newTodos = todos.map((v) => {
      if (v.id === id) {
        return res;
      }
      return v;
    });
    setTodos(newTodos);
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Todos
          </h1>
          <p className="text-sm text-slate-500">
            {todos.length === 0
              ? "No todos yet — add your first one below."
              : `${completedCount} of ${todos.length} completed`}
          </p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Add a todo
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

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2"
            >
              {todoId ? 'Update' : 'Save'}
            </button>
          </form>
        </section>

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
      </div>
    </main>
  );
}
