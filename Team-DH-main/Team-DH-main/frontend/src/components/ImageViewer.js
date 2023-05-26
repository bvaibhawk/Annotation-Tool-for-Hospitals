import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image, Rect } from "react-konva";
import "./ImageViewer.css";

const ImageViewer = ({
  selectedTool,
  setAnnotationList,
  selectedRectIndex,
  setSelectedRectIndex,
}) => {
  const [image, setImage] = useState(null);
  const [rectangles, setRectangles] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [selectedRect, setSelectedRect] = useState(null);

  const stageRef = useRef(null);

  // Load the image once it is selected by the user
  const handleImageLoad = (e) => {
    const img = e.target;
    setImage({
      width: img.width,
      height: img.height,
      image: img,
    });
  };

  // Handle the image upload by the user
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = handleImageLoad;
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Handle the mouse down event
  const handleMouseDown = (e) => {
    if (selectedTool == "Eraser") return;

    // Check if the user clicked on an existing rectangle
    const clickedRect = rectangles.find((rect) => {
      const x1 = rect.x;
      const y1 = rect.y;
      const x2 = rect.x + rect.width;
      const y2 = rect.y + rect.height;
      return (
        e.evt.layerX >= x1 &&
        e.evt.layerX <= x2 &&
        e.evt.layerY >= y1 &&
        e.evt.layerY <= y2
      );
    });

    // Set the clicked rectangle as selected
    setSelectedRect(clickedRect);

    // If the user did not click on an existing rectangle, start drawing a new one
    if (!clickedRect) {
      setDrawing(true);
      setStartPoint({ x: e.evt.layerX, y: e.evt.layerY });
      setEndPoint({ x: e.evt.layerX, y: e.evt.layerY });
    }
  };

  // Handle the mouse move event
  const handleMouseMove = (e) => {
    if (selectedTool == "Eraser") return;
    if (drawing) {
      setEndPoint({ x: e.evt.layerX, y: e.evt.layerY });
    }
  };

  // Handle the mouse up event
  const handleMouseUp = () => {
    if (selectedTool == "Eraser") return;
    if (drawing) {
      setDrawing(false);
      setRectangles([
        ...rectangles,
        {
          x: Math.min(startPoint.x, endPoint.x),
          y: Math.min(startPoint.y, endPoint.y),
          width: Math.abs(endPoint.x - startPoint.x),
          height: Math.abs(endPoint.y - startPoint.y),
          text: "Annotation Value",
        },
      ]);
    }
    setSelectedRect(null);
  };

  // Update the annotation list when the rectangles change
  useEffect(() => {
    setAnnotationList(rectangles);
  }, [rectangles]);

  // Set the cursor to crosshair when the stage is mounted
  useEffect(() => {
    if (stageRef.current) {
      const stage = stageRef.current.getStage();
      stage.container().style.cursor = "crosshair";
      return () => {
        stage.container().style.cursor = "default";
      };
    }
  }, [stageRef.current]);

  // Handle the deletion of box when double clicked
  const handleDblClick = (i) => {
    if (selectedTool == "Eraser") {
      setRectangles(rectangles.filter((rect, i) => i != selectedRectIndex));
      setSelectedRectIndex(null);
    }
  };

  // Render the Viewer
  return (
    <div>
      <h1>Image Viewer</h1>
      <input
        type="file"
        onChange={handleImageUpload}
        id="file-input"
        style={{ display: "none" }}
      />
      <label htmlFor="file-input" className="custom-file-upload">
        Upload Image (.png,.jpg)
      </label>
      {image && (
        <Stage
          width={Math.min(image.width, 1200) * 1}
          height={Math.min(image.height, 600) * 1}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={stageRef}
        >
          <Layer>
            <Image
              width={Math.min(image.width, 1200) * 1}
              height={Math.min(image.height, 600) * 1}
              image={image.image}
            />
            {rectangles.map((rect, i) => (
              <Rect
                key={i}
                id={`rect-${i}`}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                stroke={selectedRectIndex == i ? "blue" : "red"}
                strokeWidth={2}
                draggable
                onClick={() => {
                  setSelectedRectIndex(i);
                }}
                onDblClick={handleDblClick}
                onDragStart={() => setSelectedRect(rect)}
                onDragEnd={(e) => {
                  const updatedRects = [...rectangles];
                  updatedRects[i] = {
                    ...rect,
                    x: e.target.x(),
                    y: e.target.y(),
                  };
                  setRectangles(updatedRects);
                }}
              />
            ))}
            {drawing && (
              <Rect
                x={Math.min(startPoint.x, endPoint.x)}
                y={Math.min(startPoint.y, endPoint.y)}
                width={Math.abs(endPoint.x - startPoint.x)}
                height={Math.abs(endPoint.y - startPoint.y)}
                stroke="red"
                strokeWidth={2}
              />
            )}
          </Layer>
        </Stage>
      )}
    </div>
  );
};

export default ImageViewer;
