"use client";

import { fetchTodos } from "./lib/api";
import { useState, useEffect } from "react";
import { todos } from "./lib/definitions";

function toggleStatus(status: boolean, id: number) {
  // update status here
}

export default function Home() {
  const [todos, setTodos] = useState<todos[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };

    loadTodos();
  }, []);

  const completedCount = todos.filter((t) => t.completed).length;

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
          <form className="space-y-4">
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
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="completed"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
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
              Save
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
                    className={`flex-1 text-sm ${
                      v.completed
                        ? "text-slate-400 line-through"
                        : "text-slate-900"
                    }`}
                  >
                    {v.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
