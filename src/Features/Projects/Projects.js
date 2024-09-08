import React from 'react'

import { Title } from '../../components/Title/Title'
import { projects } from '../../Utilities/ProjectsInfo';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';

import "./Projects.css";

export const Projects = () => {

    const projectInfo = projects;

    return (
        <div style={{
            height: 'auto'
        }} className='page projects'>
            <Title title={"PROJECTS"} subTitle={"A PREVIEW INTO RECENT WORK"}/>
            <div className='project-cards-wrapper'>
                {projectInfo.map(project => {
                    return <ProjectCard {...project} />
                })}
            </div>
        </div>
    )
}
