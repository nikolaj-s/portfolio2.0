import React from 'react'

import "./Error.css";

export const Error = ({error, errorMessage = ""}) => {
    return (
        <>
        {error ? 
        <div className='error-container'>
            <p>{errorMessage}</p>
        </div>
        :
        null
        }
        </>
    )
}
