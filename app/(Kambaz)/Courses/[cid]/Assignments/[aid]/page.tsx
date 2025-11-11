'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Col, Form, Row, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = (currentUser as any)?.role?.toUpperCase() === "FACULTY";
  
  const isNewAssignment = aid === "new";
  const existingAssignment = !isNewAssignment 
    ? assignments.find((a: any) => a._id === aid)
    : null;

  // Redirect non-faculty users trying to create new assignments
  useEffect(() => {
    if (isNewAssignment && !isFaculty) {
      router.push(`/Courses/${cid}/Assignments`);
    }
  }, [isNewAssignment, isFaculty, cid, router]);

  // Helper function to convert date string to datetime-local format (YYYY-MM-DDTHH:mm)
  // Handles formats like "Due May 13 at 11:59pm" or "Not available until May 6 at 12:00am"
  // or "mm/dd/yyyy, hh:mm AM/PM" format
  const parseToDateTimeLocal = (dateString: string): string => {
    if (!dateString) {
      const now = new Date();
      return formatToDateTimeLocal(now);
    }
    
    let date: Date;
    
    // Try to parse "mm/dd/yyyy, hh:mm AM/PM" format
    const commaMatch = dateString.match(/(\d{2})\/(\d{2})\/(\d{4}),\s+(\d{1,2}):(\d{2})\s+(AM|PM)/i);
    if (commaMatch) {
      const month = parseInt(commaMatch[1]) - 1;
      const day = parseInt(commaMatch[2]);
      const year = parseInt(commaMatch[3]);
      let hours = parseInt(commaMatch[4]);
      const minutes = parseInt(commaMatch[5]);
      const ampm = commaMatch[6].toUpperCase();
      
      if (ampm === 'PM' && hours !== 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      
      date = new Date(year, month, day, hours, minutes);
    }
    // Try to parse "mm/dd/yyyy hh:mm am/pm" format (without comma)
    else {
      const noCommaMatch = dateString.match(/(\d{2})\/(\d{2})\/(\d{4})\s+(\d{1,2}):(\d{2})\s+(am|pm)/i);
      if (noCommaMatch) {
        const month = parseInt(noCommaMatch[1]) - 1;
        const day = parseInt(noCommaMatch[2]);
        const year = parseInt(noCommaMatch[3]);
        let hours = parseInt(noCommaMatch[4]);
        const minutes = parseInt(noCommaMatch[5]);
        const ampm = noCommaMatch[6].toLowerCase();
        
        if (ampm === 'pm' && hours !== 12) hours += 12;
        if (ampm === 'am' && hours === 12) hours = 0;
        
        date = new Date(year, month, day, hours, minutes);
      }
      // Try to parse "Due May 13 at 11:59pm" or "Not available until May 6 at 12:00am" format
      else {
        // Match pattern like "May 6 at 12:00am" (can have text before it like "Not available until")
        const match = dateString.match(/(\w+)\s+(\d+)\s+at\s+(\d{1,2}):(\d{2})(am|pm)/i);
        if (match) {
          const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
          const monthName = match[1];
          const monthIndex = monthNames.findIndex(m => m.toLowerCase().startsWith(monthName.toLowerCase()));
          const day = parseInt(match[2]);
          let hours = parseInt(match[3]);
          const minutes = parseInt(match[4]);
          const ampm = match[5].toLowerCase();
          
          if (monthIndex !== -1) {
            const year = new Date().getFullYear();
            if (ampm === 'pm' && hours !== 12) hours += 12;
            if (ampm === 'am' && hours === 12) hours = 0;
            date = new Date(year, monthIndex, day, hours, minutes);
          } else {
            date = new Date();
          }
        } else {
          date = new Date();
        }
      }
    }
    
    return formatToDateTimeLocal(date);
  };

  // Helper function to format Date to datetime-local format (YYYY-MM-DDTHH:mm)
  const formatToDateTimeLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Helper function to convert datetime-local format to "mm/dd/yyyy, hh:mm AM/PM" format
  const formatDateTimeLocalToDisplay = (dateTimeLocal: string): string => {
    if (!dateTimeLocal) {
      const now = new Date();
      return formatDateDisplay(now);
    }
    
    const date = new Date(dateTimeLocal);
    return formatDateDisplay(date);
  };

  // Helper function to format Date to "mm/dd/yyyy, hh:mm AM/PM" format
  const formatDateDisplay = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${month}/${day}/${year}, ${displayHours}:${minutes} ${ampm}`;
  };

  // Helper function to format Date to "Not available until [Month] [day] at [hh:mm]am/pm" format
  const formatAvailableFromDisplay = (date: Date): string => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const displayHours = hours % 12 || 12;
    return `Not available until ${month} ${day} at ${displayHours}:${minutes}${ampm}`;
  };

  // Helper function to format Date to "Due [Month] [day] at [hh:mm]am/pm" format
  const formatDueDisplay = (date: Date): string => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const displayHours = hours % 12 || 12;
    return `Due ${month} ${day} at ${displayHours}:${minutes}${ampm}`;
  };

  // State for form fields
  const [title, setTitle] = useState(existingAssignment?.title || "");
  const [description, setDescription] = useState(existingAssignment?.description || "");
  const [points, setPoints] = useState(existingAssignment?.points || 100);
  const [due, setDue] = useState(parseToDateTimeLocal(existingAssignment?.due || ""));
  const [availableFrom, setAvailableFrom] = useState(parseToDateTimeLocal(existingAssignment?.availRest || ""));
  const [availableUntil, setAvailableUntil] = useState(parseToDateTimeLocal("2024-05-20T00:00"));

  const handleSave = () => {
    const dueDate = new Date(due);
    const availableFromDate = new Date(availableFrom);
    
    if (isNewAssignment) {
      // Create new assignment
      dispatch(addAssignment({
        title,
        course: cid as string,
        description,
        points: Number(points),
        due: formatDueDisplay(dueDate),
        availRest: formatAvailableFromDisplay(availableFromDate),
        availLabel: "Multiple Modules",
      }));
    } else if (existingAssignment) {
      // Update existing assignment
      dispatch(updateAssignment({
        ...existingAssignment,
        title,
        description,
        points: Number(points),
        due: formatDueDisplay(dueDate),
        availRest: formatAvailableFromDisplay(availableFromDate),
        availLabel: existingAssignment.availLabel || "Multiple Modules",
      }));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3 text-start" style={{ textAlign: 'left' }}>

      <Form className="text-start" style={{ textAlign: 'left' }}>
        {/* Assignment Name */}
        <Form.Group className="mb-3 text-start" controlId="wd-name">
          <Form.Label className="fw-semibold text-start">Assignment Name</Form.Label>
          <Form.Control 
            className="text-start" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Assignment"
            readOnly={!isFaculty}
            disabled={!isFaculty}
          />
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Assignment description will be displayed here."
            readOnly={!isFaculty}
            disabled={!isFaculty}
          />
        </Form.Group>

        {/* SETTINGS (stacked vertically, not side-by-side) */}
        <Card className="border-1 mb-4 text-start">
          <Card.Body className="text-start">
            <Form.Group className="mb-3 text-start" controlId="wd-points">
              <Form.Label className="fw-semibold text-start">Points</Form.Label>
              <Form.Control 
                className="text-start" 
                type="number" 
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                readOnly={!isFaculty}
                disabled={!isFaculty}
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="wd-group">
              <Form.Label className="fw-semibold text-start">Assignment Group</Form.Label>
              <Form.Select className="text-start" defaultValue="ASSIGNMENTS" disabled={!isFaculty}>
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
                <option>PROJECT</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="wd-display-grade-as">
              <Form.Label className="fw-semibold text-start">Display Grade as</Form.Label>
              <Form.Select className="text-start" defaultValue="Percentage" disabled={!isFaculty}>
                <option>Percentage</option>
                <option>Points</option>
                <option>Complete/Incomplete</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="wd-submission-type">
              <Form.Label className="fw-semibold text-start">Submission Type</Form.Label>
              <Form.Select className="text-start" defaultValue="Online" disabled={!isFaculty}>
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
                    <Form.Check className="text-start" id="wd-text-entry" label="Text Entry" disabled={!isFaculty} />
                    <Form.Check className="text-start" id="wd-website-url" label="Website URL" defaultChecked disabled={!isFaculty} />
                    <Form.Check className="text-start" id="wd-media-recordings" label="Media Recordings" disabled={!isFaculty} />
                  </Col>
                  <Col className="text-start">
                    <Form.Check className="text-start" id="wd-student-annotation" label="Student Annotation" disabled={!isFaculty} />
                    <Form.Check className="text-start" id="wd-file-upload" label="File Uploads" disabled={!isFaculty} />
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
              <Form.Control className="text-start" defaultValue="Everyone" readOnly={!isFaculty} disabled={!isFaculty} />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="wd-due">
              <Form.Label className="fw-semibold text-start">Due</Form.Label>
              <Form.Control 
                className="text-start" 
                type="datetime-local" 
                value={due}
                onChange={(e) => setDue(e.target.value)}
                readOnly={!isFaculty}
                disabled={!isFaculty}
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="wd-available-from">
              <Form.Label className="fw-semibold text-start">Available from</Form.Label>
              <Form.Control 
                className="text-start" 
                type="datetime-local" 
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
                readOnly={!isFaculty}
                disabled={!isFaculty}
              />
            </Form.Group>

            <Form.Group className="mb-2 text-start" controlId="wd-available-until">
              <Form.Label className="fw-semibold text-start">Until</Form.Label>
              <Form.Control 
                className="text-start" 
                type="datetime-local" 
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
                readOnly={!isFaculty}
                disabled={!isFaculty}
              />
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Bottom buttons */}
        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="secondary" onClick={handleCancel}>
            {isFaculty ? "Cancel" : "Back"}
          </Button>
          {isFaculty && (
            <Button variant="danger" onClick={handleSave}>
              Save
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
