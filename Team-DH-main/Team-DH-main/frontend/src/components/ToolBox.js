// Importing required modules and components
import { Tooltip } from "@material-ui/core";
import {
  CheckBoxOutlineBlank,
  Clear,
  Delete,
  RadioButtonUnchecked,
  TextFormat,
} from "@material-ui/icons";
import React from "react";
import { Container, Row } from "react-bootstrap";

// Component to display toolbox with various tools
const ToolBox = ({ selectedTool, setSelectedTool }) => {
  return (
    // Container for the toolbox
    <Container fluid className="m-4" style={{ border: "1px solid grey" }}>
      <Row className="justify-content-center">
        <h4>ToolBox</h4>
      </Row>
      {/* Tooltip for Box tool */}
      <Tooltip title="Box">
        <CheckBoxOutlineBlank
          className="m-2"
          style={{
            backgroundColor: selectedTool == "Reactangle" ? "gray" : "white",
          }}
          onClick={() => setSelectedTool("Reactangle")}
        ></CheckBoxOutlineBlank>
      </Tooltip>
      {/* Tooltip for Erase tool */}
      <Tooltip title="Erase">
        <Delete
          className="m-2"
          style={{
            backgroundColor: selectedTool == "Eraser" ? "gray" : "white",
          }}
          onClick={() => setSelectedTool("Eraser")}
        ></Delete>
      </Tooltip>
      {/* Tooltip for Annotate tool */}
      <Tooltip title="Annotate">
        <TextFormat
          className="m-2"
          style={{
            backgroundColor: selectedTool == "Annotate" ? "gray" : "white",
          }}
          onClick={() => setSelectedTool("Annotate")}
        ></TextFormat>
      </Tooltip>
      {/* Tooltip for Circle tool */}
      <Tooltip title="Circle">
        <RadioButtonUnchecked
          className="m-2"
          style={{
            backgroundColor: selectedTool == "Circle" ? "gray" : "white",
          }}
          onClick={() => setSelectedTool("Circle")}
        ></RadioButtonUnchecked>
      </Tooltip>
      {/* Tooltip for Marker tool */}
      <Tooltip title="Marker">
        <Clear
          className="m-2"
          style={{
            backgroundColor: selectedTool == "Marker" ? "gray" : "white",
          }}
          onClick={() => setSelectedTool("Marker")}
        ></Clear>
      </Tooltip>
    </Container>
  );
};

// Exporting the ToolBox component
export default ToolBox;
