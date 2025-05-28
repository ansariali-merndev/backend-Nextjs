import todos from "../../../data/todos.json";
import { writeFile } from "fs/promises";

export async function GET(request, context) {
  const { params } = context;
  const { id } = await params;
  const todo = todos.find((todo) => parseInt(id) === todo.id);
  if (!todo) {
    return Response.json({
      message: "ID incorrect",
      todo: null,
    });
  }
  return Response.json({
    message: "success",
    todo,
  });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const todoData = await request.json();
  if (todoData.id) {
    return Response.json({
      message: "ID not allowed",
    });
  }
  const todoIndex = todos.findIndex((item) => parseInt(id) === item.id);
  if (todoIndex === -1) {
    return Response.json({
      message: "Todo Not Find",
    });
  }
  const updatedTodo = { ...todos[todoIndex], ...todoData };
  todos[todoIndex] = updatedTodo;
  await writeFile("data/todos.json", JSON.stringify(todos, null, 5));
  return Response.json({
    message: "success",
    todo: updatedTodo,
  });
}
