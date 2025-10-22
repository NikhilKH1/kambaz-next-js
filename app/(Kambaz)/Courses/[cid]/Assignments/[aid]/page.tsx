'use client';

import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../Database";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a: db.Assignment) => a._id === aid);
  
  // Parse dates from assignment data
  const parseDate = (dateString: string) => {
    if (!dateString) return "";
    // Extract date from strings like "Due May 13 at 11:59pm" or "Not available until May 6 at 12:00am"
    const match = dateString.match(/(\w+ \d+)/);
    if (match) {
      const monthDay = match[1];
      const year = new Date().getFullYear();
      return `${monthDay}, ${year}`;
    }
    return "";
  };
  
  const dueDate = parseDate(assignment?.due || "");
  const availableDate = parseDate(assignment?.availRest || "");

  return (
    <div id="wd-assignments-editor" className="p-3 text-start" style={{ textAlign: 'left' }}>

      <Form className="text-start" style={{ textAlign: 'left' }}>
        {/* Assignment Name */}
        <Form.Group className="mb-3 text-start" controlId="wd-name">
          <Form.Label className="fw-semibold text-start">Assignment Name</Form.Label>
          <Form.Control className="text-start" defaultValue={assignment?.title || "Assignment"} />
        </Form.Group>

        {/* Description — Canvas-style: no label, short height, full width */}
        <Form.Group
          controlId="wd-description"
          className="mb-4 w-100 text-start"
          style={{ width: "100%" }}
        >
          <Form.Control
            as="textarea"
            rows={12}
            className="w-100 text-start"
            style={{ width: "100%", resize: "vertical", textAlign: "left" }}
            defaultValue={assignment?.description || "Assignment description will be displayed here."}
          />
        </Form.Group>

        {/* SETTINGS (stacked vertically, not side-by-side) */}
        <Card className="border-1 mb-4 text-start">
          <Card.Body className="text-start">
            <Form.Group className="mb-3 text-start" controlId="wd-points">
              <Form.Label className="fw-semibold text-start">Points</Form.Label>
              <Form.Control className="text-start" type="number" defaultValue={assignment?.points || 100} />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="wd-group">
              <Form.Label className="fw-semibold text-start">Assignment Group</Form.Label>
              <Form.Select className="text-start" defaultValue="ASSIGNMENTS">
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
                <option>PROJECT</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="wd-display-grade-as">
              <Form.Label className="fw-semibold text-start">Display Grade as</Form.Label>
              <Form.Select className="text-start" defaultValue="Percentage">
                <option>Percentage</option>
                <option>Points</option>
                <option>Complete/Incomplete</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="wd-submission-type">
              <Form.Label className="fw-semibold text-start">Submission Type</Form.Label>
              <Form.Select className="text-start" defaultValue="Online">
                <option>Online</option>
                <option>On Paper</option>
                <option>No Submission</option>
              </Form.Select>
            </Form.Group>

            {/* Online Entry Options */}
            <Card className="mt-2 text-start">
              <Card.Body className="text-start">
                <div className="fw-semibold mb-2 text-start">Online Entry Options</div>
                <Row xs={1} md={2} className="text-start">
                  <Col className="text-start">
                    <Form.Check className="text-start" id="wd-text-entry" label="Text Entry" />
                    <Form.Check className="text-start" id="wd-website-url" label="Website URL" defaultChecked />
                    <Form.Check className="text-start" id="wd-media-recordings" label="Media Recordings" />
                  </Col>
                  <Col className="text-start">
                    <Form.Check className="text-start" id="wd-student-annotation" label="Student Annotation" />
                    <Form.Check className="text-start" id="wd-file-upload" label="File Uploads" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>

        {/* ASSIGN TO / DATES (stacked vertically) */}
        <Card className="border-1 mb-4 text-start">
          <Card.Body className="text-start">
            <Form.Group className="mb-3 text-start" controlId="wd-assign-to">
              <Form.Label className="fw-semibold text-start">Assign to</Form.Label>
              <Form.Control className="text-start" defaultValue="Everyone" />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="wd-due">
              <Form.Label className="fw-semibold text-start">Due</Form.Label>
              <Form.Control className="text-start" type="text" defaultValue={dueDate || "May 13, 2024, 11:59 PM"} />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="wd-available-from">
              <Form.Label className="fw-semibold text-start">Available from</Form.Label>
              <Form.Control className="text-start" type="text" defaultValue={availableDate || "May 6, 2024, 12:00 AM"} />
            </Form.Group>

            <Form.Group className="mb-2 text-start" controlId="wd-available-until">
              <Form.Label className="fw-semibold text-start">Until</Form.Label>
              <Form.Control className="text-start" type="datetime-local" defaultValue="2024-05-20T00:00" />
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Bottom buttons */}
        <div className="d-flex justify-content-end gap-2 mt-3">
          <Link href={`/Courses/${cid}/Assignments`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Link href={`/Courses/${cid}/Assignments`}>
            <Button variant="danger">Save</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
