// Import necessary modules
import React, { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import './AnnotationTool.css';

// Define the AnnotationTool component
const AnnotationTool = () => {
    // Define states and refs using the useState and useRef hooks
    const [canvas, setCanvas] = useState(null); // holds the Fabric.js canvas instance
    const [selectedTool, setSelectedTool] = useState('rectangle'); // holds the currently selected annotation tool
    const [shapeText, setShapeText] = useState(''); // holds the text to be displayed on the annotation shape
    const canvasRef = useRef(null); // a reference to the canvas element in the DOM

    // Run the useEffect hook to create the Fabric.js canvas instance when the component is mounted
    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            backgroundColor: '#f1f1f1',
            selection: false,
            width: 600,
            height: 400
        });
        setCanvas(canvas);
        // Clean up the canvas instance when the component is unmounted
        return () => {
            canvas.dispose();
        };
    }, []);

    // Define event handler functions
    const handleToolChange = (tool) => {
        setSelectedTool(tool);
    };

    const handleTextChange = (event) => {
        setShapeText(event.target.value);
    };

    const handleCanvasMouseDown = (event) => {
        // Check if the canvas exists
        if (canvas) {
            let shape = null;
            // Create the appropriate annotation shape based on the selected tool
            switch (selectedTool) {
                case 'rectangle':
                    shape = new fabric.Rect({
                        left: event.e.clientX - canvasRef.current.getBoundingClientRect().left,
                        top: event.e.clientY - canvasRef.current.getBoundingClientRect().top,
                        fill: 'rgba(0,0,0,0)',
                        stroke: 'red',
                        strokeWidth: 2,
                        width: 0,
                        height: 0
                    });
                    break;
                case 'circle':
                    shape = new fabric.Circle({
                        left: event.e.clientX - canvasRef.current.getBoundingClientRect().left,
                        top: event.e.clientY - canvasRef.current.getBoundingClientRect().top,
                        fill: 'rgba(0,0,0,0)',
                        stroke: 'green',
                        strokeWidth: 2,
                        radius: 0
                    });
                    break;
                case 'polygon':
                    shape = new fabric.Polygon([], {
                        left: event.e.clientX - canvasRef.current.getBoundingClientRect().left,
                        top: event.e.clientY - canvasRef.current.getBoundingClientRect().top,
                        fill: 'rgba(0,0,0,0)',
                        stroke: 'blue',
                        strokeWidth: 2
                    });
                    break;
                default:
                    break;
            }
            // Add the shape to the canvas, set it as the active object, and add an event listener to update the text on the shape when it's clicked
            if (shape) {
                canvas.add(shape);
                canvas.setActiveObject(shape);
                shape.on('mouseup', () => {
                    shape.setCoords();
                    shape.set({
                        text: shapeText
                    });
                    canvas.renderAll();
                });
            }
        }
    };

    const handleShapeEdit = (event) => {
        // Get the shape that was clicked and set its text in the state
        const shape = event.target;
        setShapeText(shape.text || '');
    };

    // Render the component
    return (
        <div className="annotation-tool-container">
            <div className="canvas-container">
                <canvas ref={canvasRef} onMouseDown={handleCanvasMouseDown} />
            </div>
            <div
                className="tool-box">
                <button onClick={() => handleToolChange('rectangle')} className={selectedTool === 'rectangle' ? 'active' : ''}>Rectangle</button>
                <button onClick={() => handleToolChange('circle')} className={selectedTool === 'circle' ? 'active' : ''}>Circle</button>
                <button onClick={() => handleToolChange('polygon')} className={selectedTool === 'polygon' ? 'active' : ''}>Polygon</button>
                <div className="text-input">
                    <input type="text" placeholder="Enter text here" value={shapeText} onChange={handleTextChange} />
                </div>
            </div>
        </div>);

}
export default AnnotationTool;


