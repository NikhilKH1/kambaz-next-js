import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { BsCheckCircleFill, BsSlashCircle } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {/* + Module Button */}
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      {/* Publish All Dropdown */}
      <Dropdown className="float-end me-2">
        <DropdownToggle
          variant="secondary"
          size="lg"
          id="wd-publish-all-btn"
        >
          <BsCheckCircleFill className="text-success me-2" />
          Publish All
        </DropdownToggle>

        <DropdownMenu>
          {/* Publish options */}

          <DropdownItem id="wd-publish-all-modules-and-items">
            <BsCheckCircleFill className="text-success me-2" />
            Publish all modules and items
          </DropdownItem>

          <DropdownItem id="wd-publish-modules-only">
            <BsCheckCircleFill className="text-success me-2" />
            Publish modules only
          </DropdownItem>

          {/* Unpublish options */}
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            <BsSlashCircle className="text-secondary me-2" />
            Unpublish all modules and items
          </DropdownItem>

          <DropdownItem id="wd-unpublish-modules-only">
            <BsSlashCircle className="text-secondary me-2" />
            Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* View Progress Button */}
      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-view-progress"
      >
        View Progress
      </Button>

      {/* Collapse All Button */}
      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-collapse-all"
      >
        Collapse All
      </Button>
    </div>
  );
}
