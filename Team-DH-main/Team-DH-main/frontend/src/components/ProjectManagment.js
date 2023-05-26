import React, { useState } from "react";
import "./ProjectManagement.css";
import { Container, Row } from "react-bootstrap";

const ProjectManagement = () => {
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: "Project 1",
            tasks: ["Task 1.A", "Task 1.B", "Task 1.C"],
        },
        {
            id: 2,
            name: "Project 2",
            tasks: ["Task 2.A", "Task 2.B", "Task 2.C"],
        },
        {
            id: 3,
            name: "Project 3",
            tasks: ["Task 3.A", "Task 3.B", "Task 3.C"],
        },
    ]);
    const [selectedProject, setSelectedProject] = useState(projects[0]);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    return (
        <Container fluid className='m-4' style={{ background: '#f5f5f0', padding: '10px' }}>
            <Row className="justify-content-center">
                <h4>Project Management</h4>
            </Row>
            <div className="project-list-container">
                <h6>Projects:</h6>
                <ul className="project-list">
                    {projects.map((project) => (
                        <li
                            key={project.id}
                            className={selectedProject.id === project.id ? "active" : ""}
                            onClick={() => handleProjectClick(project)}
                        >
                            {project.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="task-list-container">
                <h6>Tasks:</h6>
                <ul className="task-list">
                    {selectedProject.tasks.map((task) => (
                        <li key={task}>{task}</li>
                    ))}
                </ul>
            </div>
        </Container>
    );
};

export default ProjectManagement;
