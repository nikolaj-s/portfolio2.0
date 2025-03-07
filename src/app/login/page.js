'use client'
import React, { Suspense } from 'react';

import styles from './page.module.css'
import LoginForm from '@/components/LoginForm/LoginForm';

const page = () => {
    return (
        <div className={styles.page}>
            <Suspense>
                <LoginForm />
            </Suspense>
        </div>
    )
}

export default page;