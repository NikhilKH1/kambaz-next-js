import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />

      <div id="wd-dashboard-courses">
        {/* 1 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="React JS" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">Full Stack Software Developer</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* 2 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/2201" className="wd-dashboard-course-link">
            <Image src="/images/nodejs.jpg" width={200} height={150} alt="Node.js" />
            <div>
              <h5>CS2201 Node.js & APIs</h5>
              <p className="wd-dashboard-course-title">Building REST & GraphQL Services</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* 3 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/3300" className="wd-dashboard-course-link">
            <Image src="/images/htmlcss.jpg" width={200} height={150} alt="HTML & CSS" />
            <div>
              <h5>CS3300 HTML/CSS Basics</h5>
              <p className="wd-dashboard-course-title">Web Foundations & Layout</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* 4 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/4100" className="wd-dashboard-course-link">
            <Image src="/images/jsfundamentals.jpg" width={200} height={150} alt="JavaScript" />
            <div>
              <h5>CS4100 JavaScript Fundamentals</h5>
              <p className="wd-dashboard-course-title">ESNext, DOM, and Tooling</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* 5 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5200" className="wd-dashboard-course-link">
            <Image src="/images/dbms.jpg" width={200} height={150} alt="DBMS" />
            <div>
              <h5>CS5200 Database Systems</h5>
              <p className="wd-dashboard-course-title">SQL, ER Modeling, Transactions</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* 6 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5400" className="wd-dashboard-course-link">
            <Image src="/images/algorithms.jpg" width={200} height={150} alt="Algorithms" />
            <div>
              <h5>CS5400 Algorithms</h5>
              <p className="wd-dashboard-course-title">Greedy, DP, Graphs</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* 7 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5600" className="wd-dashboard-course-link">
            <Image src="/images/devops.jpg" width={200} height={150} alt="DevOps" />
            <div>
              <h5>CS5600 DevOps & Cloud</h5>
              <p className="wd-dashboard-course-title">CI/CD, Containers, AWS</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
