import React from 'react';

import styles from './DateDisplay.module.css'

const DateDisplay = ({ dateString }) => {
  // Create a Date object from the provided date string
  const date = new Date(dateString);

  // Convert the date to the local time zone
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short', // Shows the timezone (e.g., GMT, PST)
  };

  const formattedDate = date.toLocaleString('en-US', options);

  return (
    <div className={styles.date}>
      <p>{formattedDate}</p>
    </div>
  );
};

export default DateDisplay;
