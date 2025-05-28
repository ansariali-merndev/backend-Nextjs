import todos from "../../data/todos.json";
import { writeFile } from "fs/promises";

export function GET() {
  return Response.json({
    message: "success",
    data: todos,
  });
}

export async function POST(request, context) {
  const { text } = await request.json();
  const newTodo = {
    id: todos.length + 1,
    text,
    completed: false,
  };
  todos.push(newTodo);
  await writeFile("data/todos.json", JSON.stringify(todos, null, 5));
  return Response.json({
    message: "success",
    todo: newTodo,
  });
}
