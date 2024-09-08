import React from 'react'

import "./ProjectCard.css";

export const ProjectCard = ({name, thumbnail, description, link, color}) => {
    
    const onClick = () => {
        window.open(link, "_blank");
    }
    
    return (
        <div 
        onClick={onClick}
        className='project-card-container'>
            <div 
            style={{
                boxShadow: `0px 0px 5px 5px ${color}`
            }}
            className='project-card-thumbnail'>
                <img alt={thumbnail} src={thumbnail} />
            </div>
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    )
}


