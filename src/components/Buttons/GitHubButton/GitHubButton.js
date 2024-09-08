import React from 'react'

import { GitHubIcon } from '../../Icons/GitHubIcon'

import "./GitHubButton.css";

export const GitHubButton = () => {

    const onClick = () => {
        window.open('https://github.com/nikolaj-s', "_blank");
    }

    return (
        <button onClick={onClick} type='button' src="https://github.com/nikolaj-s" className='git-hub-button'>
            <p>GitHub</p>
            <GitHubIcon />
        </button>
    )
}
