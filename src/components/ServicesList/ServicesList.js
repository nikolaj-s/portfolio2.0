// components/ServicesList.js

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './ServicesList.module.css';

const services = [
    {
      title: "Web Development",
      description: "Need a responsive and high-performing website built using the latest web technologies? Let's bring your ideas to life.",
    },
    {
      title: "UI/UX Design",
      description: "Looking to create modern, intuitive, and user-friendly interfaces that provide a seamless user experience? I can help.",
    },
    {
      title: "SEO Optimization",
      description: "Want to improve your website's visibility on search engines and drive more organic traffic? Let’s get you noticed.",
    },
    {
      title: "Custom Email Services",
      description: "Need a secure, easy-to-use email service tailored to your business? Let’s make sure your communication is seamless.",
    },
    {
      title: "Performance Optimization",
      description: "Is your website slow or not performing as it should? Let’s optimize it for speed and deliver a smooth user experience.",
    },
  ];
  
const ServicesList = () => {
  return (
    <section className={styles.servicesContainer}>
      <div className={styles.servicesWrapper}>
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={styles.serviceCard}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <Link
              href={{
                pathname: '/contact',
                query: { subject: service.title },
              }}
              className={styles.serviceLink}
            >
             
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
          
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
