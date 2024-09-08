import React from 'react'

import "./TextInput.css";

export const TextInput = ({
    value, 
    placeholder = "", 
    action = () => {}, 
    id, margin, error}) => {
    return (
        <>
        {error ? 
        <p className='input-error'>{error}</p>
        : null}
        <input 
        type='text' 
        id={id} 
        value={value} 
        placeholder={placeholder} 
        onChange={action} 
        style={{margin: margin, border: error ? `solid 3px red` : null}}
        />
        </>
    )
}
