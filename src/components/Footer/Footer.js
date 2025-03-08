import React from 'react';
import styles from './Footer.module.css';
import { NavButton } from '../Buttons/NavButton/NavButton';

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get the current year dynamically

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.siteName}>Nor. X West Designs</p>
                <NavButton rel='noreferer' href='https://github.com/nikolaj-s' target='_blank'>GitHub</NavButton>
                <NavButton href="mailto:contact@norxwestdesigns.com">Shoot Me An Email</NavButton>
                <p className={styles.rights}>© {currentYear} Nor. X West Designs. All rights reserved.</p>

            </div>
        </footer>
    );
};

export default Footer;
