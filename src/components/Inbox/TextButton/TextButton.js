import React from 'react'

import styles from './TextButton.module.css'

export const TextButton = ({onClick = () => {}, name}) => {
    return (
        <button onClick={onClick} className={styles.button}>
            {name}
        </button>
    )
}
