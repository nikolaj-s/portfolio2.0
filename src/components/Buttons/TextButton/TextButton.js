import React from 'react'

import "./TextButton.css";

export const TextButton = ({name, action = () => {}, margin, id, type}) => {
    
    const onClick = (e) => {
        
        action();
    }

    return (
        <button
        type={type}
        className='text-button'
        onClick={onClick}
        style={{
            margin: margin
        }}
        id={id}
        >{name}</button>
    )
}
