"use client";
import React, { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
      });
    const [module, setModule] = useState({
        id: "CS5610",
        name: "Web Development",
        description: "Full Stack Web Development with React and Node.js",
        course: "CS5610"
    });
      const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
      const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h5>Retrieving Assignment Objects</h5>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <h5>Retrieving Assignment Properties</h5>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>
      
      {/* Assignment Section */}
      <h4>Assignment</h4>
      <h5>Modifying Assignment Properties</h5>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />

      <h5>Assignment Score</h5>
      <a id="wd-update-assignment-score"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Score </a>
      <FormControl 
        className="w-75" 
        id="wd-assignment-score"
        type="number"
        defaultValue={assignment.score} 
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) || 0 })}/>
      <hr />

      <h5>Assignment Completed</h5>
      <a id="wd-update-assignment-completed"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed.toString()}`}>
        Update Completed </a>
      <FormCheck 
        className="w-75" 
        id="wd-assignment-completed"
        type="checkbox"
        defaultChecked={assignment.completed} 
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })}/>
      <hr />



      {/* Module Section */}
      <h4>Module</h4>
      <h5>Retrieving Module Objects</h5>
      <a id="wd-retrieve-module" className="btn btn-primary"
         href={`${MODULE_API_URL}`}>
        Get Module
      </a><hr/>
      <h5>Retrieving Module Properties</h5>
      <a id="wd-retrieve-module-name" className="btn btn-primary"
         href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a><hr/>

      <h5>Modifying Module Properties</h5>
      <h6>Module Name</h6>
      <a id="wd-update-module-name"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Module Name </a>
      <FormControl className="w-75" id="wd-module-name"
        defaultValue={module.name} onChange={(e) =>
          setModule({ ...module, name: e.target.value })}/>
      <hr />

      <h6>Module Description</h6>
      <a id="wd-update-module-description"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/description/${encodeURIComponent(module.description)}`}>
        Update Module Description </a>
      <FormControl className="w-75" id="wd-module-description"
        defaultValue={module.description} onChange={(e) =>
          setModule({ ...module, description: e.target.value })}/>
      <hr />
    </div>
);}
