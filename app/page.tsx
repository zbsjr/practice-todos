"use client";

import { fetchTodos, createTodo, updateTodo, deleteTodo, toggleStatusTodo } from "./lib/api";
import { useState, useEffect } from "react";
import { todos } from "./lib/definitions";
import { CompletedCountComponent } from "./components/CompletedCountComponent";
import { CreateTodoFormComponent } from "./components/CreateTodoFormComponent";
import { TodosGridComponent } from "./components/TodosGridComponent";
import Loading from "./loading";

export default function Home() {
  const [todos, setTodos] = useState<todos[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [todoUserId, setTodoUserId] = useState(1);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoStatus, setTodoStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
      setIsLoading(false);
    };

    loadTodos();
  }, []);

  const completedCount = todos.filter((t) => t.completed).length;

  // Handle create todo
  async function handleCreateTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
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
    setIsLoading(false);
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

    setIsLoading(true);
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
    setIsLoading(false);
  }

  // Handle delete todo
  async function handleDeleteTodo(id: number) {
    setIsLoading(true);
    if (confirm("Are you sure you want to delete this record?")) {
      const res = await deleteTodo(id);

      if (res === 1) {
        const newTodos = todos.filter((v) => v.id !== id);
        setTodos(newTodos);
        setIsLoading(false);
      }
    }
  }

  // Toggle status
  async function toggleStatus(status: boolean, id: number) {
    setIsLoading(true);
    const res = await toggleStatusTodo(status, id);
    const newTodos = todos.map((v) => {
      if (v.id === id) {
        return res;
      }
      return v;
    });
    setTodos(newTodos);
    setIsLoading(false);
  }

  // Clear form
  function clearForm() {
    setTodoId(0);
    setTodoUserId(1);
    setTodoTitle("");
    setTodoStatus(false);
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 px-4 py-10 sm:py-16">
      {isLoading ? <Loading /> : (
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Todos
            </h1>
            <CompletedCountComponent
              completedCount={completedCount}
              todosCount={todos.length}
            />
          </header>

          <CreateTodoFormComponent
            todoId={todoId}
            todoUserId={todoUserId}
            todoTitle={todoTitle}
            todoStatus={todoStatus}
            setTodoId={setTodoId}
            setTodoUserId={setTodoUserId}
            setTodoTitle={setTodoTitle}
            setTodoStatus={setTodoStatus}
            handleUpdateTodo={handleUpdateTodo}
            handleCreateTodo={handleCreateTodo}
            clearForm={clearForm}
          />

          <TodosGridComponent
            todos={todos}
            toggleStatus={toggleStatus}
            toggleEditMode={toggleEditMode}
            handleDeleteTodo={handleDeleteTodo}
          />
        </div>
      )}

    </main>
  );
}
