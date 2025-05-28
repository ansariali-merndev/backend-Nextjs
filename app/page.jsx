"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodo();
  }, []);

  //* ------------------   Get All Todo --------------------
  const getTodo = async () => {
    let res = await fetch("/todos");
    res = await res.json();
    // console.log(res.data);
    setTodos(res.data);
  };

  //* --------------- Add Todo ---------------------
  const addTodo = async () => {
    if (task.trim() === "") return;
    const res = await fetch("/todos", {
      method: "POST",
      body: JSON.stringify({ text: task }),
    });
    const data = await res.json();
    setTodos(data.data);
    setTask("");
  };

  //* ---------------------- Delete Todo ----------------------------
  const deleteTodo = async (id) => {
    const res = await fetch(`/todos/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setTodos(data.data);
  };

  const toggleCompleted = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  return (
    <>
      <header className="bg-indigo-600 h-[10vh] text-2xl flex items-center justify-center my-2">
        <h1 className="font-semibold text-zinc-200">Todo Application</h1>
      </header>
      <main className="min-h-[74vh] flex flex-col items-center gap-4 px-4">
        <div className="flex gap-2 mt-4 w-full max-w-md">
          <input
            type="text"
            value={task}
            name="task"
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addTodo}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
        <ul className="w-full max-w-md space-y-2 mt-4">
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompleted(index)}
                />
                <span
                  className={`${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
      <footer className="bg-indigo-500 h-[10vh] flex items-center justify-center my-2">
        <p className="text-gray-200 text-sm">Code and develop by Ansari Ali</p>
      </footer>
    </>
  );
}
