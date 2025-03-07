import Link from 'next/link'
import React from 'react'

import styles from './NavButto.module.css'

export const NavButton = ({href = "/", children}) => {

    return (
        <Link className={styles.button} href={href}>
            {children}
        </Link>
    )
}
