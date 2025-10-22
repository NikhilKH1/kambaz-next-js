'use client';

import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../Database";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a: any) => a._id === aid);
  
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
    <div id="wd-assignments-editor" className="p-3">

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label className="fw-semibold">Assignment Name</Form.Label>
          <Form.Control defaultValue={assignment?.title || "Assignment"} />
        </Form.Group>

        {/* Description — Canvas-style: no label, short height, full width */}
        <Form.Group
  controlId="wd-description"
  className="mb-4 w-100"
  style={{ width: "100%" }}
>
  <Form.Control
    as="textarea"
    rows={12}
    className="w-100"
    style={{ width: "100%", resize: "vertical" }}
    defaultValue={assignment?.description || "Assignment description will be displayed here."}
  />
</Form.Group>

        {/* SETTINGS (stacked vertically, not side-by-side) */}
        <Card className="border-1 mb-4">
          <Card.Body>
            <Form.Group className="mb-3" controlId="wd-points">
              <Form.Label className="fw-semibold">Points</Form.Label>
              <Form.Control type="number" defaultValue={assignment?.points || 100} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-group">
              <Form.Label className="fw-semibold">Assignment Group</Form.Label>
              <Form.Select defaultValue="ASSIGNMENTS">
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
                <option>PROJECT</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-display-grade-as">
              <Form.Label className="fw-semibold">Display Grade as</Form.Label>
              <Form.Select defaultValue="Percentage">
                <option>Percentage</option>
                <option>Points</option>
                <option>Complete/Incomplete</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-submission-type">
              <Form.Label className="fw-semibold">Submission Type</Form.Label>
              <Form.Select defaultValue="Online">
                <option>Online</option>
                <option>On Paper</option>
                <option>No Submission</option>
              </Form.Select>
            </Form.Group>

            {/* Online Entry Options */}
            <Card className="mt-2">
              <Card.Body>
                <div className="fw-semibold mb-2">Online Entry Options</div>
                <Row xs={1} md={2}>
                  <Col>
                    <Form.Check id="wd-text-entry" label="Text Entry" />
                    <Form.Check id="wd-website-url" label="Website URL" defaultChecked />
                    <Form.Check id="wd-media-recordings" label="Media Recordings" />
                  </Col>
                  <Col>
                    <Form.Check id="wd-student-annotation" label="Student Annotation" />
                    <Form.Check id="wd-file-upload" label="File Uploads" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>

        {/* ASSIGN TO / DATES (stacked vertically) */}
        <Card className="border-1 mb-4">
          <Card.Body>
            <Form.Group className="mb-3" controlId="wd-assign-to">
              <Form.Label className="fw-semibold">Assign to</Form.Label>
              <Form.Control defaultValue="Everyone" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-due">
              <Form.Label className="fw-semibold">Due</Form.Label>
              <Form.Control type="text" defaultValue={dueDate || "May 13, 2024, 11:59 PM"} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="wd-available-from">
              <Form.Label className="fw-semibold">Available from</Form.Label>
              <Form.Control type="text" defaultValue={availableDate || "May 6, 2024, 12:00 AM"} />
            </Form.Group>

            <Form.Group className="mb-2" controlId="wd-available-until">
              <Form.Label className="fw-semibold">Until</Form.Label>
              <Form.Control type="datetime-local" defaultValue="2024-05-20T00:00" />
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
