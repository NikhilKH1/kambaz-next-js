/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
export default function ArrayStateVariable() {
 const [array, setArray] = useState([1, 2, 3, 4, 5]);
 const { todos } = useSelector((state: RootState) => state.todosReducer);
 const addElement = () => {
   setArray([...array, Math.floor(Math.random() * 100)]);
 };
const deleteElement = (index: number) => {
   setArray(array.filter((item, i) => i !== index));
 };
 return (
  <div id="wd-array-state-variables">
   <h2>Array State Variable</h2>
   <Button variant="success" onClick={addElement} className="mb-3">Add Element</Button>
   <ListGroup>
    {array.map((item, index) => (
     <ListGroupItem key={index} className="d-flex align-items-center gap-2">
      <span className="flex-fill">{item}</span>
      <Button variant="danger" onClick={() => deleteElement(index)}>
       Delete</Button>
     </ListGroupItem>))}
   </ListGroup><hr/>
   <h3>Todos from Redux</h3>
   <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>
            {todo.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
   </div>);}