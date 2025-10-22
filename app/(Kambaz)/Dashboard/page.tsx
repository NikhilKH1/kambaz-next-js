'use client';

import Link from "next/link";
import * as db from "../Database";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";

export default function Dashboard() {
  const courses = db.courses;

  // Function to get course-specific image
  const getCourseImage = (courseId: string, courseName: string) => {
    const imageMap: { [key: string]: string } = {
      "RS101": "/images/reactjs.jpg", // Rocket Propulsion - using rocket-like image
      "RS102": "/images/algorithms.jpg", // Aerodynamics - using technical image
      "RS103": "/images/nodejs.jpg", // Spacecraft Design - using space-related image
      "RS104": "/images/jsfundamentals.jpg", // Organic Chemistry - using science-related image
      "RS105": "/images/dbms.jpg", // Inorganic Chemistry - using database/structured image
      "RS106": "/images/devops.jpg", // Physical Chemistry - using technical image
      "RS107": "/images/htmlcss.jpg", // Ancient Languages - using language-related image
      "RS108": "/images/stacked.jpg", // Inter-species Diplomacy - using structured image
    };
    
    return imageMap[courseId] || "/images/reactjs.jpg"; // Default fallback
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src={getCourseImage(course._id, course.name)}
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
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
