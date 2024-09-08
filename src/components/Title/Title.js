import React from 'react';

import "./Title.css";

export const Title = ({title, subTitle = false}) => {

    return (
        <div className='title'>
            <h2>{title}</h2>
            {subTitle ?
            <p>
            / {subTitle}
            </p>
            : null}
        </div>
    )
}
