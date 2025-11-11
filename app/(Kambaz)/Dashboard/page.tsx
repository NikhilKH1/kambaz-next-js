/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";
import Link from "next/link";
import * as db from "../Database";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import { enrollUser, unenrollUser } from "../Enrollments/reducer";
import { RootState } from "../store";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    department: "D123", credits: 3,
    image: "/images/reactjs.jpg", description: "New Description"
  });

  // const addNewCourseHandler = (course: any) => { dispatch(addNewCourse(course)); };
  // const deleteCourseHandler = (courseId: string) => { dispatch(deleteCourse(courseId)); };
  // const updateCourseHandler = () => { dispatch(updateCourse(course)); };

  function getCourseImage(courseId: string) {
    const course = courses.find((c) => c._id === courseId);
    return course?.image || "/images/stacked.jpg"; 
  }

  // Check if current user is Faculty
  const isFaculty = currentUser && String((currentUser as any)?.role || "").toUpperCase().trim() === "FACULTY";

  // Check if user is enrolled in a course
  const isEnrolled = (courseId: string): boolean => {
    if (!currentUser || !enrollments) return false;
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === (currentUser as any)._id &&
        enrollment.course === courseId
    );
  };

  // Handle enrollment/unenrollment
  const handleEnrollToggle = (courseId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) return;
    
    const userId = (currentUser as any)._id;
    if (isEnrolled(courseId)) {
      dispatch(unenrollUser({ userId, courseId }));
    } else {
      dispatch(enrollUser({ userId, courseId }));
    }
  };

  // Filter courses based on showAllCourses state
  const getDisplayedCourses = () => {
    if (!currentUser) return [];
    
    // Both faculty and non-faculty see enrolled courses when showAllCourses is false, or all courses when true
    if (showAllCourses) {
      // Show all courses
      return courses;
    } else {
      // Show only enrolled courses
      return courses.filter((course) => isEnrolled(course._id));
    }
  };

  const displayedCourses = getDisplayedCourses();

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
          id="wd-enrollments-button"
        >
          Enrollments
        </Button>
      </div>
      <hr />

      {isFaculty && (
        <>
          <h5>New Course
          <button className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={() => {
                  dispatch(addNewCourse(course));
                  setCourse({
                    _id: "0", name: "New Course", number: "New Number",
                    startDate: "2023-09-10", endDate: "2023-12-15",
                    department: "D123", credits: 3,
                    image: "/images/reactjs.jpg", description: "New Description"
                  });
                }} > Add </button>
          </h5><br />
          <button className="btn btn-warning float-end me-2"
                id="wd-update-course-click"
                onClick={() => dispatch(updateCourse(course))} >
              Update </button>
          <FormControl value={course.name} className="mb-2"
                 onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
          <FormControl as="textarea" value={course.description} rows={3}
                 onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
          <hr />
        </>
      )}

      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course) => {
            const enrolled = isEnrolled(course._id);
            return (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                {isEnrolled(course._id) ? (
                  <Link
                    href={`/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      src={getCourseImage(course._id)}
                      alt={course.name}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>
                      <div className="d-flex gap-2 mt-2">
                        <Button 
                          variant="primary" 
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/Courses/${course._id}/Home`;
                          }}
                        >
                          Go
                        </Button>
                        {showAllCourses && (
                          <Button
                            variant="danger"
                            onClick={(e) => handleEnrollToggle(course._id, e)}
                            className="ms-auto"
                          >
                            Unenroll
                          </Button>
                        )}
                      </div>
                      {isFaculty && !showAllCourses && (
                        <>
                          <button onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            dispatch(deleteCourse(course._id));
                          }} className="btn btn-danger float-end mt-2"
                          id="wd-delete-course-click">
                          Delete
                          </button>
                          <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end mt-2" >
                          Edit
                        </button>
                        </>
                      )}
                    </CardBody>
                  </Link>
                ) : (
                  <div className="wd-dashboard-course-link text-decoration-none text-dark">
                    <CardImg
                      src={getCourseImage(course._id)}
                      alt={course.name}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>
                      <div className="d-flex gap-2 mt-2">
                        <Button 
                          variant="primary" 
                          disabled
                          style={{ opacity: 0.5, cursor: 'not-allowed' }}
                        >
                          Go
                        </Button>
                        {showAllCourses && (
                          <Button
                            variant="success"
                            onClick={(e) => handleEnrollToggle(course._id, e)}
                            className="ms-auto"
                          >
                            Enroll
                          </Button>
                        )}
                      </div>
                      {isFaculty && !showAllCourses && (
                        <>
                          <button onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            dispatch(deleteCourse(course._id));
                          }} className="btn btn-danger float-end mt-2"
                          id="wd-delete-course-click">
                          Delete
                          </button>
                          <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end mt-2" >
                          Edit
                        </button>
                        </>
                      )}
                    </CardBody>
                  </div>
                )}
              </Card>
            </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
