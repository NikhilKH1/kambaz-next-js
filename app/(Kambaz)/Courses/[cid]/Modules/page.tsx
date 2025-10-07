'use client';

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  return (
    <div id="wd-modules-page" className="container-fluid px-3">   {/* <-- fluid */}
      <div className="wd-modules-controls mb-4">
        <ModulesControls />
      </div>
      <div style={{ height: 24 }} />

      <ListGroup className="rounded-0 w-100 mt-3" id="wd-modules">
        {/* ============ Week 1 ============ */}
        <ListGroupItem className="p-0 mb-4 wd-module-card">
          {/* Header */}
          <div className="wd-module-header">
            <div className="d-flex align-items-center gap-2">
              <BsGripVertical className="fs-5 text-muted" />
              <span className="fw-unbold">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</span>
            </div>
            <ModuleControlButtons />
          </div>

          {/* Body */}
          <ListGroup variant="flush" className="wd-lesson-list">

            {/* Lecture 1 - Learning Objectives */}
            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold">LEARNING OBJECTIVES</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold ms-4">Introduction to the course</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold ms-4">Learn what is Web Development</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

            

            {/* Lecture 1 - Reading */}
            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold">READING</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold ms-4">Full Stack Developer - Chapter 1 - Introduction</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold ms-4">Full Stack Developer - Chapter 2 - Creating User Interfaces With HTML</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

            {/* Lecture 1 - Slides */}
            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold">SLIDES</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold ms-4">Introduction to Web Development</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold ms-4">Creating an HTTP server with Node.js</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold ms-4">Creating a React Application</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

            {/* ======= ADDED CONTENT END ======= */}
          </ListGroup>
        </ListGroupItem>

        <ListGroupItem className="p-0 mb-4 wd-module-card">
          <div className="wd-module-header">
            <div className="d-flex align-items-center gap-2">
              <BsGripVertical className="fs-5 text-muted" />
              <span className="fw-unbold">Week 1, Lecture 2 - Formatting User Interfaces with HTML</span>
            </div>
            <ModuleControlButtons />
          </div>

          <ListGroup variant="flush" className="wd-lesson-list">
            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span >LEARNING OBJECTIVES</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

                        <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold ms-4">Learn how to create user interfaces with HTML</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>


                        <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold ms-4">Deploy the assignment to Netlify</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

                                    <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span>SLIDES</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

                                    <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold ms-4">Introduction to HTML and the DOM</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

                                    <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold ms-4">Formatting Web content with Headings</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

                                    <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span className="fw-unbold ms-4">Formatting content with Lists and Tables</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>


          </ListGroup>
        </ListGroupItem>

        {/* ============ Week 2 ============ */}
        <ListGroupItem className="p-0 mb-4 wd-module-card">
          <div className="wd-module-header">
            <div className="d-flex align-items-center gap-2">
              <BsGripVertical className="fs-5 text-muted" />
              <span className="fw-unbold">Week 2</span>
            </div>
            <ModuleControlButtons />
          </div>

          <ListGroup variant="flush" className="wd-lesson-list">
            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span >LEARNING OBJECTIVES</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span>LESSON 1</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span>LESSON 2</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        {/* ============ Week 3 ============ */}
        <ListGroupItem className="p-0 mb-4 wd-module-card">
          <div className="wd-module-header">
            <div className="d-flex align-items-center gap-2">
              <BsGripVertical className="fs-5 text-muted" />
              <span className="fw-unbold">Week 3</span>
            </div>
            <ModuleControlButtons />
          </div>

          <ListGroup variant="flush" className="wd-lesson-list">
            <ListGroupItem className="wd-lesson-row">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <BsGripVertical className="fs-6 text-muted" />
                  <span>LESSON 1</span>
                </div>
                <LessonControlButtons />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
