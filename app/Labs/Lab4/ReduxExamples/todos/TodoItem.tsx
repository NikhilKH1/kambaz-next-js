import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { Button, ListGroupItem } from "react-bootstrap";
interface Todo {
  id: string;
  title: string;
}

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id} className="d-flex align-items-center gap-2">
      <span className="flex-fill">{todo.title}</span>
      <Button 
        variant="primary"
        onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"> Edit </Button>
      <Button 
        variant="danger"
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"> Delete </Button>
    </ListGroupItem>
);}
