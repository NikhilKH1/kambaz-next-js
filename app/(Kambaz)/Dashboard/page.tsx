/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from "react";
import * as client from "../Courses/client";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import { setEnrollments, enrollUser, unenrollUser } from "../Enrollments/reducer";
import { RootState } from "../store";
import * as enrollmentsClient from "../Enrollments/client";

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

  const onAddNewCourse = async () => {
    try {
      await client.createCourse(course);
      // Refresh courses and enrollments to ensure UI is in sync with server
      if (showAllCourses) {
        await fetchAllCourses();
      } else {
        await fetchCourses();
      }
      await fetchEnrollments();
      // Reset the course form to default values
      setCourse({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        department: "D123", credits: 3,
        image: "/images/reactjs.jpg", description: "New Description"
      });
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })));};




  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAllCourses = async () => {
    try {
      const data = await client.fetchAllCourses();
      dispatch(setCourses(data));
    } catch (error) {
      console.error(error);
    }
  };
  const fetchEnrollments = async () => {
    if (!currentUser) {
      dispatch(setEnrollments([]));
      return;
    }
    try {
      const data = await enrollmentsClient.fetchEnrollments("current");
      dispatch(setEnrollments(data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [currentUser]);


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
  const handleEnrollToggle = async (courseId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) return;
    
    const userId = (currentUser as any)._id;
    try {
      if (isEnrolled(courseId)) {
        // Unenroll from course
        await enrollmentsClient.unenrollFromCourse("current", courseId);
        // Refresh enrollments from server to ensure UI is in sync with database
        await fetchEnrollments();
      } else {
        // Enroll in course
        const enrollment = await enrollmentsClient.enrollInCourse(
          "current",
          courseId
        );
        // Refresh enrollments from server to ensure UI is in sync with database
        await fetchEnrollments();
      }
    } catch (error) {
      console.error("Error enrolling/unenrolling:", error);
      // Optionally show error message to user
    }
  };

  // Filter courses based on showAllCourses state
  const getDisplayedCourses = () => {
    if (!currentUser) return [];

    if (showAllCourses) {
      return courses;
    }
    return courses.filter((course) => isEnrolled(course._id));
  };

  const displayedCourses = getDisplayedCourses();

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <div className="d-flex gap-2">
          <Button
            variant="primary"
            onClick={async () => {
              if (!showAllCourses) {
                await fetchAllCourses();
                setShowAllCourses(true);
              } else {
                await fetchCourses();
                setShowAllCourses(false);
              }
            }}
            id="wd-enrollments-button"
          >
            My Courses
          </Button>
          <Button
            variant="secondary"
            onClick={async () => {
              await fetchAllCourses();
              setShowAllCourses(true);
            }}
            id="wd-all-courses-button"
          >
            All Courses
          </Button>
        </div>
      </div>
      <hr />

      {isFaculty && (
        <>
          <h5>New Course
          <button onClick={onAddNewCourse} className="btn btn-primary float-end" id="wd-add-new-course-click" >
             Add </button>
          </h5><br />
          <button onClick={onUpdateCourse} className="btn btn-secondary float-end" id="wd-update-course-click" >
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
                            onDeleteCourse(course._id);
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
