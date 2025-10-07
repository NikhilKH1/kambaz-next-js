'use client';

import { Button } from "react-bootstrap";
import { MdDoNotDisturbAlt, MdOutlineCampaign, MdOutlineInsights } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { AiOutlineHome } from "react-icons/ai";
import { RiLiveLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: 350 }}>
      <h2 className="h5 mb-3">Course Status</h2>

      {/* Publish controls */}
      <div className="d-flex">
        <div className="w-50 pe-1">
          <Button variant="secondary" size="lg" className="w-100 text-nowrap">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
          </Button>
        </div>
        <div className="w-50">
          <Button variant="success" size="lg" className="w-100 text-nowrap">
            <FaCheckCircle className="me-2 fs-5" /> Publish
          </Button>
        </div>
      </div>

      {/* Action buttons */}
      <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
        <AiOutlineHome className="me-2 fs-5" /> Choose Home Page
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
        <RiLiveLine className="me-2 fs-5" /> View Course Stream
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
        <MdOutlineCampaign className="me-2 fs-5" /> New Announcement
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
        <MdOutlineInsights className="me-2 fs-5" /> New Analytics
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-2 text-start">
        <IoNotificationsOutline className="me-2 fs-5" /> View Course Notifications
      </Button>
    </div>
  );
}
