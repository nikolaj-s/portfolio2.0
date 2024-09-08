import React from 'react'

import "./TextArea.css";

export const TextArea = ({
    id, placeholder = "", 
    value, 
    action = () => {}, 
    margin, error}) => {
    return (
        <>
        {error ? <p className='input-error'>{error}</p> : null}
        <textarea 
        placeholder={placeholder} 
        value={value} id={id} 
        onChange={action} 
        style={{margin: margin, border: error ? 'solid 3px red' : null}} />
        </>
    )
}
