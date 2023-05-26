import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ImageViewer.css";
import { Button } from "@mui/material";

function Taxonomy({ setSelectedAnnotationValue }) {

  // Declare state using the useState hook with an initial object
  const [taxonomyList, setTaxonomyList] = useState({
    decision: {
      YES: {},
      NO: {},
    },
    severity: {
      mild: {},
      moderate: {},
      severe: {},
    },
    oral: {
      mouth: {
        type1: {},
        type2: {},
        type3: {},
        type4: {},
      },
      tounge: {},
    },
  });

  // Handler function for file upload
  const handleFileUpload = (event) => {
    // Create a new file reader instance
    const fileReader = new FileReader();
    // Read the file as text using UTF-8 encoding
    fileReader.readAsText(event.target.files[0], "UTF-8");
    // Set up an event listener for when file is loaded
    fileReader.onload = (e) => {
      // Parse the JSON data from the loaded file
      const parsedJsonData = JSON.parse(e.target.result);
      // Update the taxonomyList state with the parsed data
      setTaxonomyList(parsedJsonData);
    };
  };

  // Function to recursively render the taxonomy as an unordered list
  const renderTaxonomy = (taxonomy) => {
    return Object.keys(taxonomy).map((key) => (
      <li key={key} style={{ marginTop: `2px` }}>
        <Button
          variant="outlined"
          onClick={() => {
            setSelectedAnnotationValue(key);
          }}
        >
          {" "}
          {key}
        </Button>
        {Object.keys(taxonomy[key]).length > 0 && (
          <ul>{renderTaxonomy(taxonomy[key])}</ul>
        )}
      </li>
    ));
  };

  // Render the Taxonomy component
  return (
    <div>
      <h4>Taxonomy</h4>
      {/* Input field for uploading a JSON file */}
      <input
        className="mt-2"
        type="file"
        accept=".json"
        onChange={handleFileUpload}
      />

      {/* Div to display the rendered taxonomy */}
      <div className="mt-4" style={{ height: "250px", overflowY: "auto" }}>
        <ul>{renderTaxonomy(taxonomyList)}</ul>
      </div>
    </div>
  );
}
// Export the Taxonomy component as default
export default Taxonomy;
