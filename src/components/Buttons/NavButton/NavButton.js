import Link from 'next/link'
import React from 'react'

import styles from './NavButto.module.css'

export const NavButton = ({href = "/", children, target = "", rel = ""}) => {

    return (
        <Link rel={rel} className={styles.button} href={href} target={target}>
            {children}
        </Link>
    )
}
