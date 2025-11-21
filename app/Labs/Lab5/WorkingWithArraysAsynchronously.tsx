"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { FaPlusCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import * as client from "./client";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";

export default function WorkingWithArraysAsynchronously() {
    const [errorMessage, setErrorMessage] = useState(null);
  const [todos, setTodos] = useState<any[]>([]);
  const editTodo = (todo: any) => {
    const updatedTodos = todos.map(
      (t) => t.id === todo.id ? { ...todo, editing: true } : t );
    setTodos(updatedTodos);
  };
  
  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };


  const createNewTodo = async () => {
    const todos = await client.createNewTodo();
    setTodos(todos);
  };
  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({ title: "New Posted Todo", completed: false, });
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }  };



  const fetchTodos = async () => {
    const todos = await client.fetchTodos();
    setTodos(todos);
  };


const removeTodo = async (todo: any) => {
  try {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
    setErrorMessage(null);
  } catch (error: any) {
    setErrorMessage(error.response?.data?.message || "Unable to delete todo");
  }
};
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (<div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">{errorMessage}</div>)}
      <h4>Todos <FaPlusCircle onClick={createNewTodo} className="text-success float-end fs-3" /> <FaPlusCircle onClick={postNewTodo}   className="text-primary float-end fs-3 me-3" id="wd-post-todo"   />
      </h4>
      
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id} className="py-2">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  defaultChecked={todo.completed}
                  onChange={(e) =>
                    updateTodo({ ...todo, completed: e.target.checked })
                  }
                />
                {!todo.editing ? (
                  <span
                    className="ms-2"
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <FormControl
                    className="w-50"
                    defaultValue={todo.title}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateTodo({ ...todo, editing: false });
                      }
                    }}
                    onChange={(e) =>
                      updateTodo({ ...todo, title: e.target.value })
                    }
                  />
                )}
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaPencil
                  onClick={() => editTodo(todo)}
                  className="text-primary fs-5"
                />
                <TiDelete
                  onClick={() => removeTodo(todo)}
                  className="text-danger fs-4"
                  id="wd-remove-todo"
                />
                <FaTrash
                  onClick={() => deleteTodo(todo)}
                  className="text-danger fs-5"
                  id="wd-delete-todo"
                />
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>{" "}
      <hr />
    </div>
);}
