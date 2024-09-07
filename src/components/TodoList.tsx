import React,{ FC } from "react";
import { useTodo } from "../store/context";
import TodoItem from "./TodoItem";

const TodoList: FC = () => {
  const { state } = useTodo();

  return (
    <div>
      {state.todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
