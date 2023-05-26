// Import necessary dependencies
import React, { useState } from "react";
import "./AIpipeline.css"; // Import the CSS file
import { MdArrowForward } from "react-icons/md"; // Import the forward arrow icon

// Define the AIpipeline component
const AIpipeline = () => {
  // Define the state variables and their setters
  const [pipeline, setPipeline] = useState([]); // an empty array
  const [selectedStep, setSelectedStep] = useState(""); // an empty string

  // Define event handlers
  const handleStepSelect = (e) => {
    setSelectedStep(e.target.value); // Set the selectedStep state to the selected option value
  };

  const handleAddStep = () => {
    setPipeline([...pipeline, selectedStep]); // Add the selected step to the pipeline array
  };

  const handleExecute = () => {
    // This function will run the pipeline on the selected image
  };

  const handleUndo = () => {
    const newPipeline = [...pipeline]; // Create a copy of the pipeline array
    newPipeline.pop(); // Remove the last step from the copy
    setPipeline(newPipeline); // Update the pipeline state with the new copy
  };

  // Define an array of options for the pipeline steps
  const stepOptions = [
    { value: "resize", label: "Resize" },
    { value: "crop", label: "Crop" },
    { value: "rotate", label: "Rotate" },
    // Add more options here as needed
  ];

  // Return the JSX for the component
  return (
    <div className="cv-pipeline">
      <div className="cv-pipeline-header">
        <h2>Sequential AI CV Pipeline</h2> {/* Header for the component */}
      </div>
      <div className="cv-pipeline-body">
        <div className="cv-pipeline-form">
          <label htmlFor="step-select">Select a pipeline step:</label> {/* Label for the select input */}
          <select id="step-select" value={selectedStep} onChange={handleStepSelect}>
            <option value="">--Select a step--</option> {/* Default option */}
            {stepOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))} {/* Map through the options array to create the select options */}
          </select>
          <button disabled={!selectedStep} onClick={handleAddStep}>
            Add Step
          </button> {/* Button to add the selected step to the pipeline */}
        </div>
        <div className="cv-pipeline-steps">
          {pipeline.map((step, index) => (
            <div key={index} className="cv-pipeline-step">
              {step}
              <MdArrowForward size={48} />
            </div>
          ))} {/* Map through the pipeline array to create the steps and forward arrow icon */}
        </div>
      </div>
      <div className="cv-pipeline-footer">
        <button disabled={!pipeline.length} onClick={handleExecute}>
          Execute Pipeline
        </button> {/* Button to execute the pipeline */}
        <button disabled={!pipeline.length} onClick={handleUndo}>
          Undo Last Step
        </button> {/* Button to undo the last step of the pipeline */}
      </div>
    </div>
  );
};

export default AIpipeline; // Export the AIpipeline component