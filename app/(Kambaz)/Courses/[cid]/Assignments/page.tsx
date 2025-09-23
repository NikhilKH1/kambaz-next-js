import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>

      {/* ASSIGNMENTS */}
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 – ENV + HTML
          </Link>
          <div className="wd-assignment-meta">
            Multiple Modules | <strong>Not available until</strong> May 1 at
            12:00am | <strong>Due</strong> May 13 at 11:59pm |{" "}
            <strong>100 pts</strong>
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/124"
            className="wd-assignment-link"
          >
            A2 – CSS + BOOTSTRAP
          </Link>
          <div className="wd-assignment-meta">
            Multiple Modules | <strong>Not available until</strong> May 8 at
            12:00am | <strong>Due</strong> May 20 at 11:59pm |{" "}
            <strong>100 pts</strong>
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/125"
            className="wd-assignment-link"
          >
            A3 – JAVASCRIPT + REACT
          </Link>
          <div className="wd-assignment-meta">
            Multiple Modules | <strong>Not available until</strong> May 15 at
            12:00am | <strong>Due</strong> May 27 at 11:59pm |{" "}
            <strong>100 pts</strong>
          </div>
        </li>
      </ul>

      {/* QUIZZES */}
      <h3 id="wd-quizzes-title">
        QUIZZES - 20% of Total <button>+</button>
      </h3>
      <ul id="wd-quiz-list">
        <li className="wd-assignment-list-item">Quiz 1</li>
      </ul>

      {/* EXAMS */}
      <h3 id="wd-exams-title">
        EXAMS - 20% of Total <button>+</button>
      </h3>
      <ul id="wd-exam-list">
        <li className="wd-assignment-list-item">Midterm Exam</li>
      </ul>

      {/* PROJECTS */}
      <h3 id="wd-projects-title">
        PROJECTS - 40% of Total <button>+</button>
      </h3>
      <ul id="wd-project-list">
        <li className="wd-assignment-list-item">Final Project</li>
      </ul>
    </div>
  );
}
