import React, { useState, useEffect } from "react";
import './CurrentAnnotations.css'

// Component to display the current list of annotations
const CurrentAnnotations = ({
    annotationList,
    setAnnotationList,
    selectedRectIndex,
    setSelectedRectIndex,
    selectedAnnotationValue,
    selectedTool
}) => {

    // Use effect hook to log the selected tool whenever it changes
    useEffect(() => {
        console.log(selectedTool)
    }, [selectedTool])

    // Use effect hook to log the selected rectangle index whenever it changes
    useEffect(() => {
        console.log(selectedRectIndex);
    }, [selectedRectIndex])

    // Use effect hook to update the annotation list whenever the selected annotation value changes
    useEffect(() => {
        if (selectedRectIndex != null && selectedTool == "Annotate") {
            console.log(selectedAnnotationValue)
            let newArr = [...annotationList]; // Create a copy of the array
            newArr[selectedRectIndex].text = selectedAnnotationValue // Update the value at the specified index
            setAnnotationList(newArr) // Update the annotation list state with the updated array
        }
    }, [selectedAnnotationValue])

    // Render the current list of annotations
    return (
        <div fluid className='m-4'>
            <h4>Current Annotation</h4>
            <div className="annotation-list-container">
                <ul className="annotation-list">
                    {annotationList.map((annotation, i) => (
                        <div onClick={
                            () => setSelectedRectIndex(i)
                        } style={{
                            backgroundColor: i == selectedRectIndex ? 'lightgray' : 'white',
                            cursor: 'pointer'
                        }}>
                            Box: {i} - {annotation.text}
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CurrentAnnotations;
