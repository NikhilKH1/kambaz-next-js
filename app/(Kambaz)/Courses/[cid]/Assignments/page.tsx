/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  ListGroupItem,
  Modal,
} from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import {
  BsPlusLg,
  BsThreeDotsVertical,
  BsGripVertical,
  BsFileEarmarkText,
  BsChevronDown,
  BsThreeDots,
} from "react-icons/bs";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as assignmentsClient from "./client";

export default function AssignmentsPage() {
  const params = useParams();
  const cid = params?.cid as string;
  const router = useRouter();
  const [q, setQ] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = (currentUser as any)?.role?.toUpperCase() === "FACULTY";
  const filteredAssignments = assignments.filter((assignment: any) => assignment.course === cid);

  const loadAssignments = async () => {
    if (!cid) return;
    try {
      setError(null);
      const data = await assignmentsClient.findAssignmentsForCourse(cid);
      setAssignments(data);
    } catch (err) {
      setError("Unable to load assignments right now.");
    }
  };

  useEffect(() => {
    loadAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  const filtered = filteredAssignments.filter((a: any) =>
    `${a.title} ${a.availLabel} ${a.availRest} ${a.due} ${a.points}`
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  const SectionHeader = ({ title, pill }: { title: string; pill: string }) => (
    <div className="d-flex align-items-center justify-content-between border rounded-top px-3 py-2 bg-light-subtle wd-section-header">
      <div className="d-flex align-items-center gap-2">
        <BsGripVertical className="text-muted fs-5" />
        <BsChevronDown className="text-muted fs-6 wd-chevron" />
        <span className="wd-section-title">{title}</span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <span className="wd-pill small">{pill}</span>
        <Button size="sm" variant="light" className="border">+</Button>
        <BsThreeDots className="text-muted" />
      </div>
    </div>
  );

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!assignmentToDelete) return;
    try {
      await assignmentsClient.deleteAssignment(assignmentToDelete);
      setAssignments((prev) =>
        prev.filter((assignment) => assignment._id !== assignmentToDelete)
      );
    } catch (err) {
      setError("Unable to delete assignment.");
    } finally {
      setShowDeleteDialog(false);
      setAssignmentToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const RowRight = ({ assignmentId }: { assignmentId?: string }) => (
    <div className="d-flex align-items-center gap-3">
      <FaCheckCircle className="wd-check" />
      {isFaculty && assignmentId && (
        <FaTrash 
          className="text-danger me-2" 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDeleteClick(assignmentId);
          }}
          style={{ cursor: 'pointer' }}
        />
      )}
      <BsThreeDotsVertical className="text-muted" />
    </div>
  );

  // Always render titles in black
  const SingleRow = ({ title, href }: { title: string; href?: string }) => (
    <ListGroupItem className="list-group-item-action py-3 wd-row wd-leftbar-green">
      <div className="d-flex align-items-start justify-content-between">
        <div className="d-flex align-items-start gap-3">
          <BsGripVertical className="text-muted fs-5 mt-1" />
          <BsFileEarmarkText className="text-secondary mt-1" />
          <div>
            {href ? (
              <Link href={href} className="fw-semibold d-block text-dark">
                {title}
              </Link>
            ) : (
              <span className="fw-semibold d-block text-dark">{title}</span>
            )}
          </div>
        </div>
        <RowRight/>
      </div>
    </ListGroupItem>
  );

  return (
    <div id="wd-assignments" className="wd-main p-3">
      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}
      {/* Search + buttons */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <InputGroup style={{ maxWidth: 360 }}>
          <InputGroup.Text><FiSearch /></InputGroup.Text>
          <FormControl
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </InputGroup>
        {isFaculty && (
          <div className="ms-auto d-flex gap-2">
            <Button variant="secondary" className="text-nowrap">
              <BsPlusLg className="me-2" /> Group
            </Button>
            <Button 
              variant="danger" 
              className="text-nowrap"
              onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
            >
              <BsPlusLg className="me-2" /> Assignment
            </Button>
          </div>
        )}
      </div>

      {/* ASSIGNMENTS */}
      <SectionHeader title="ASSIGNMENTS" pill="40% of Total" />
      <ListGroup className="rounded-0 rounded-bottom border-top-0">
        {filtered.map((a) => (
          <ListGroupItem key={a._id} className="list-group-item-action py-3 wd-row wd-leftbar-green">
            <div className="d-flex align-items-start justify-content-between">
              <div className="d-flex align-items-start gap-3">
                <BsGripVertical className="text-muted fs-5 mt-1" />
                <BsFileEarmarkText className="text-secondary mt-1" />
                <div>
                  <Link
                    href={`/Courses/${cid}/Assignments/${a._id}`}
                    className="fw-semibold d-block text-dark"
                  >
                    {a.title}
                  </Link>
                  <div className="small text-muted">
                    <span className="text-danger">{a.availLabel}</span>
                    <span className="text-muted">&nbsp;|&nbsp;{a.availRest}</span>
                    <span className="text-muted">&nbsp;|&nbsp;{a.due}</span>
                    <span className="text-muted">&nbsp;|&nbsp;{a.points} pts</span>
                  </div>
                </div>
              </div>
              <RowRight assignmentId={a._id} />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>

      {/* Delete Confirmation Dialog */}
      <Modal show={showDeleteDialog} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this assignment? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* QUIZZES */}
      <div className="mt-4" />
      <SectionHeader title="QUIZZES" pill="20% of Total" />
      <ListGroup className="rounded-0 rounded-bottom border-top-0">
        <SingleRow title="Quiz 1" />
      </ListGroup>

      {/* EXAMS */}
      <div className="mt-4" />
      <SectionHeader title="EXAMS" pill="20% of Total" />
      <ListGroup className="rounded-0 rounded-bottom border-top-0">
        <SingleRow title="Midterm Exam" />
      </ListGroup>

      {/* PROJECTS */}
      <div className="mt-4" />
      <SectionHeader title="PROJECTS" pill="40% of Total" />
      <ListGroup className="rounded-0 rounded-bottom border-top-0">
        <SingleRow title="Final Project" />
      </ListGroup>
    </div>
  );
}