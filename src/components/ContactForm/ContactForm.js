import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContactForm.module.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { useSearchParams } from 'next/navigation';
import { CheckmarkIcon } from '../Icons/CheckmarkIcon';
import LoadingOverlay from '../Loading/LoadingOverlay/LoadingOverlay';

const ContactForm = () => {

  const search = useSearchParams();

  const initSubject = search.get('subject');

  const [loading, toggleLoading] = React.useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initSubject ? `Inquiring about ${initSubject}` : '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';
    if (!recaptchaToken) newErrors.recaptcha = 'Please verify you are human';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null); // Reset server error on each submit attempt

    toggleLoading(true);

    if (!validateForm()) {
      toggleLoading(false);
      return;
    }

    try {

      const response = await fetch('/api/contact', {  // Use the actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
        cache: 'no-cache'
      });

      if (!response.ok) {
        toggleLoading(false);
        throw new Error('Something went wrong, please try again later');
      }

      toggleLoading(false);
      // On successful submission
      setFormSubmitted(true);
    } catch (error) {
      toggleLoading(false);
      setServerError(error.message);
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <motion.div
      className={styles.formContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {formSubmitted ? (
        <div className={styles.thankYouMessage}>
          <CheckmarkIcon />
          <h2>Thank you!</h2>
          <p>Your message has been sent successfully. I will get back to you soon.</p>
        </div>
      ) : (
        <motion.form 
        initial={{y: 20}}
        animate={{y: 0}}
        onSubmit={handleSubmit} className={styles.form}>
          {loading ? <LoadingOverlay /> : null}
          <h2 className={styles.title}>Contact Me</h2>

          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.subject && <p className={styles.errorMessage}>{errors.subject}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.textarea}
            />
            {errors.message && <p className={styles.errorMessage}>{errors.message}</p>}
          </div>

          <div className={styles.inputGroup}>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
            />
            {errors.recaptcha && <p className={styles.errorMessage}>{errors.recaptcha}</p>}
          </div>

          {serverError && <p className={styles.errorMessage}>{serverError}</p>}

          <button type="submit" className={styles.submitButton}>Send Message</button>
        </motion.form>
      )}
    </motion.div>
  );
};

export default ContactForm;
