
import React from 'react'

import styles from './Nav.module.css'
import { NavButton } from '../Buttons/NavButton/NavButton'
import { usePathname } from 'next/navigation'

export const Nav = () => {

    const pathName = usePathname();

    return (
        <nav className={styles.nav}>
            {pathName === "/contact" ?
            <NavButton href='/'>Go Back</NavButton>
            :
            <NavButton href='/contact' >Contact</NavButton>
             }
        </nav>
    )
}
