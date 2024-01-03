import React from 'react';
import '../assets/projects.css';

function Projects({ projects }) {
    return (
        <div>
            <h2>My Projects</h2>
            {projects.map((project, idx) => (
                <div className="project" key={ idx }>
                    <strong>{ project.title }</strong>
                    <p>{ project.description }</p>
                    <a href={ project.link } target='_blank' rel='noopener noreferrer'>See Project</a>
                </div>
            ))
            }
        </div>
    )
};

export default Projects;