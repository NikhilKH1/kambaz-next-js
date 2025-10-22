'use client';

import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules;

  return (
    <div id="wd-modules-page" className="container-fluid px-3">
      <div className="wd-modules-controls mb-4">
        <ModulesControls />
      </div>
      <div style={{ height: 24 }} />

      <ListGroup className="rounded-0 w-100 mt-3" id="wd-modules">
        {modules.filter((module: db.Module) => module.course === cid).map((module: db.Module) => (
          <ListGroupItem key={module._id} className="p-0 mb-4 wd-module-card">
            <div className="wd-module-header">
              <div className="d-flex align-items-center gap-2">
                <BsGripVertical className="fs-5 text-muted" />
                <span className="fw-unbold">{module.name}</span>
              </div>
              <ModuleControlButtons />
            </div>
            {module.lessons && (
              <ListGroup variant="flush" className="wd-lesson-list">
                {module.lessons.map((lesson: db.Lesson) => (
                  <ListGroupItem key={lesson._id} className="wd-lesson-row">
                    <div className="d-flex align-items-start justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <BsGripVertical className="fs-6 text-muted" />
                        <span className="fw-unbold">{lesson.name}</span>
                      </div>
                      <LessonControlButtons />
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
