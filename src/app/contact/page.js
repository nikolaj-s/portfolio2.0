'use client'
import ContactForm from '@/components/ContactForm/ContactForm'
import React, { Suspense } from 'react'

import styles from './page.module.css';

const page = () => {
    return (
        <div className={styles.page}>
            <Suspense>
                <ContactForm />
            </Suspense>
        </div>
    )
}

export default page