'use client';

import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {/* 1 */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1234 React JS
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Full Stack software developer
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* 2 */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link href="/Courses/2201/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/nodejs.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">CS2201 Node.js & APIs</CardTitle>
                  <CardText className="overflow-hidden" style={{ height: "100px" }}>
                    Building REST & GraphQL Services
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* 3 */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link href="/Courses/3300/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/htmlcss.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">CS3300 HTML/CSS Basics</CardTitle>
                  <CardText className="overflow-hidden" style={{ height: "100px" }}>
                    Web Foundations & Layout
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* 4 */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link href="/Courses/4100/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/jsfundamentals.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">CS4100 JavaScript Fundamentals</CardTitle>
                  <CardText className="overflow-hidden" style={{ height: "100px" }}>
                    ESNext, DOM, and Tooling
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* 5 */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link href="/Courses/5200/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/dbms.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">CS5200 Database Systems</CardTitle>
                  <CardText className="overflow-hidden" style={{ height: "100px" }}>
                    SQL, ER Modeling, Transactions
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* 6 */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link href="/Courses/5400/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/algorithms.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">CS5400 Algorithms</CardTitle>
                  <CardText className="overflow-hidden" style={{ height: "100px" }}>
                    Greedy, DP, Graphs
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* 7 */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card className="h-100">
              <Link href="/Courses/5600/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/devops.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">CS5600 DevOps & Cloud</CardTitle>
                  <CardText className="overflow-hidden" style={{ height: "100px" }}>
                    CI/CD, Containers, AWS
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
