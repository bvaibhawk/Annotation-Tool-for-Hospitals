import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const LidarViewer = () => {
    // Declare states
    const [image, setImage] = useState(null);
    const [box, setBox] = useState({});

    // Handle image change event
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    // Handle box click event
    const handleBoxClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setBox({ x, y, width: 0, height: 0 });
    };

    // Handle mouse move event
    const handleMouseMove = (event) => {
        if (box.x && box.y) {
            const rect = event.target.getBoundingClientRect();
            const width = event.clientX - rect.left - box.x;
            const height = event.clientY - rect.top - box.y;
            setBox((prevBox) => ({ ...prevBox, width, height }));
        }
    };

    // Render the component
    return (
        <div>
            <Container fluid>
                {/* Header */}
                <Row>
                    <h3>Lidar Viewer</h3>
                </Row>
                {/* Image Viewer */}
                <Row>
                    {image && (
                        <div
                            style={{
                                position: "relative",
                                display: "inline-block",
                                backgroundImage: `url(${URL.createObjectURL(image)})`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                width: "100%",
                                height: "500px",
                            }}
                            onMouseDown={handleBoxClick}
                            onMouseMove={handleMouseMove}
                            onMouseUp={() => setBox({})}
                        >
                            {box.width > 0 && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: box.y,
                                        left: box.x,
                                        width: box.width,
                                        height: box.height,
                                        border: "2px solid red",
                                        boxSizing: "border-box",
                                    }}
                                />
                            )}
                        </div>
                    )}
                </Row>
                {/* Image Upload */}
                {!image &&
                    <Row className="justify-content-center d-flex">
                        <input type="file" onChange={handleImageChange} />
                    </Row>
                }
                {/* Annotation Buttons */}
                {image &&
                    <Row>
                        <Col xs={3}>
                            <button style={{ width: '120px' }}>Discard<br></br>Image</button>
                        </Col>
                        <Col xs={3}>
                            <button>Save Annotations</button>
                        </Col>
                        <Col xs={3}>
                            <button>Undo Annotations</button>
                        </Col>
                        <Col xs={3}>
                            <button>Clear Annotations</button>
                        </Col>
                    </Row>
                }
            </Container>
        </div>
    );
};

// Export component
export default LidarViewer;
